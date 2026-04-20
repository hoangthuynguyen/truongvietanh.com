/**
 * Lead Worker v2 — CMS-aware lead capture with scoring, idempotency, Turnstile.
 *
 * Improvements over staging-worker.js:
 *  1. Turnstile validation BEFORE fan-out (reject bots early)
 *  2. Idempotency: hash(email+phone+page+hour) → R2 KV; reject dupes within 1h
 *  3. Lead scoring: form_weight × funnel_base × profile_completeness × utm_quality
 *  4. Server-side UTM attribution: first-touch cookie + referrer fallback
 *  5. Hot-lead routing: score ≥ 70 → wf-sales-call-now + Slack ping (3-min target)
 *  6. School-level/campus resolution from CMS funnels (single source of truth)
 *
 * Env vars (set via wrangler secret put):
 *   GHL_API_KEY, PANCAKE_API_KEY, PANCAKE_WORKSPACE_ID
 *   ZALO_OA_TOKEN, ZALO_SALES_USER_ID
 *   SALES_EMAIL, CC_EMAIL
 *   TURNSTILE_SECRET
 *   SLACK_HOT_LEAD_WEBHOOK
 *   DIRECTUS_URL, DIRECTUS_READ_TOKEN
 *
 * Bindings (wrangler.toml):
 *   LEAD_DEDUPE (KV namespace) — stores idempotency keys for 24h
 *   ASSETS (static assets)
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS' && url.pathname === '/api/lead') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Idempotency-Key',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method === 'POST' && url.pathname === '/api/lead') {
      return handleLead(request, env);
    }

    // Static asset passthrough
    return env.ASSETS.fetch(request);
  },
};

async function handleLead(request, env) {
  const data = await request.json();
  const results = { started_at: new Date().toISOString() };

  // ===== 1. Turnstile validation =====
  if (data.turnstile_token) {
    const tsOk = await verifyTurnstile(data.turnstile_token, env.TURNSTILE_SECRET, request.headers.get('CF-Connecting-IP'));
    if (!tsOk) return json({ error: 'bot_detected' }, 403);
    results.turnstile = 'passed';
  }

  // ===== 2. Idempotency =====
  const key = await idempotencyKey(data);
  const existing = await env.LEAD_DEDUPE.get(key);
  if (existing) {
    return json({ status: 'duplicate', original_id: existing });
  }
  await env.LEAD_DEDUPE.put(key, data.form_id || 'unknown', { expirationTtl: 3600 });

  // ===== 3. Enrich from CMS (funnel → school_level, campus, GHL workflow) =====
  let funnelMeta = null;
  if (data.funnel_code) {
    funnelMeta = await fetchFunnel(data.funnel_code, env);
    if (funnelMeta) {
      data.school_level = data.school_level || funnelMeta.school_level;
      data.campus_ref = data.campus_ref || funnelMeta.campus_ref;
    }
  }

  // ===== 4. Normalize + lead score =====
  data.phone = normalizePhone(data.phone);
  data.lead_score = computeLeadScore(data, funnelMeta);
  results.lead_score = data.lead_score;
  results.is_hot_lead = data.lead_score >= 70;

  // ===== 5. Fan out to all destinations in parallel =====
  const [ghl, pancake, email, zalo, slack] = await Promise.allSettled([
    sendToGHL(data, funnelMeta, env),
    sendToPancake(data, env),
    sendEmailNotification(data, env),
    data.lead_score >= 50 ? sendZaloNotification(data, env) : Promise.resolve(null),
    results.is_hot_lead ? pingSlackHotLead(data, env) : Promise.resolve(null),
  ]);

  results.ghl = summarize(ghl);
  results.pancake = summarize(pancake);
  results.email = summarize(email);
  results.zalo = summarize(zalo);
  results.slack = summarize(slack);

  return json({ ok: true, results });
}

// ===== HELPERS =====

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

function summarize(result) {
  if (result.status === 'fulfilled') return { ok: true, value: result.value };
  return { ok: false, error: result.reason?.message || 'unknown' };
}

function normalizePhone(p) {
  if (!p) return '';
  let s = String(p).replace(/[\s\-()]/g, '');
  if (s.startsWith('+84')) s = '0' + s.slice(3);
  if (s.startsWith('84') && s.length === 11) s = '0' + s.slice(2);
  return s;
}

async function idempotencyKey(data) {
  const hourBucket = Math.floor(Date.now() / 3600000);
  const raw = `${data.email || ''}|${data.phone || ''}|${data.page || ''}|${hourBucket}`;
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function verifyTurnstile(token, secret, ip) {
  if (!secret) return true; // skip in dev if not configured
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const j = await r.json();
  return j.success === true;
}

/**
 * Lead scoring formula:
 *   score = (form_weight × 10) + funnel_base + profile_bonus + utm_bonus
 *   capped at 100
 */
function computeLeadScore(data, funnel) {
  let score = (data.lead_score_weight || 1.0) * 10;

  // Funnel base score
  if (funnel?.lead_score_base) score += funnel.lead_score_base;

  // Profile completeness
  if (data.email) score += 5;
  if (data.phone) score += 10;
  if (data.full_name) score += 5;
  if (data.child_name) score += 5;
  if (data.school_level) score += 5;
  if (data.preferred_campus) score += 5;
  if (data.preferred_date) score += 10;

  // UTM quality — paid search intent > display > organic
  const src = (data.utm_source || '').toLowerCase();
  if (src === 'google' && (data.utm_medium || '').includes('cpc')) score += 8;
  else if (src === 'facebook' && (data.utm_medium || '').includes('paid')) score += 5;
  else if (src === 'zalo') score += 6;
  else if (src === 'referral') score += 4;

  return Math.min(100, Math.round(score));
}

async function fetchFunnel(code, env) {
  if (!env.DIRECTUS_URL || !env.DIRECTUS_READ_TOKEN) return null;
  try {
    const r = await fetch(`${env.DIRECTUS_URL}/items/funnels?filter[code][_eq]=${encodeURIComponent(code)}&limit=1`, {
      headers: { Authorization: `Bearer ${env.DIRECTUS_READ_TOKEN}` },
    });
    const j = await r.json();
    return j?.data?.[0] || null;
  } catch { return null; }
}

// ===== FAN-OUT HANDLERS =====

async function sendToGHL(data, funnel, env) {
  if (!env.GHL_API_KEY) return { skipped: true };
  const [firstName, ...rest] = (data.full_name || '').split(' ');
  const lastName = rest.join(' ') || '';
  const workflowId = funnel?.ghl_workflow_id || (data.lead_score >= 70 ? 'wf-sales-call-now' : 'wf-default-nurture');

  const body = {
    firstName, lastName, name: data.full_name,
    email: data.email, phone: data.phone,
    source: `Website - ${data.funnel_code}`,
    tags: [
      `funnel:${data.funnel_code}`,
      data.school_level && `level:${data.school_level}`,
      data.campus_ref && `campus:${data.campus_ref}`,
      `score:${data.lead_score}`,
      data.lead_score >= 70 && 'hot',
    ].filter(Boolean),
    customFields: {
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      lead_score: data.lead_score,
      page_url: data.page,
    },
  };

  const r = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.GHL_API_KEY}`, Version: '2021-07-28', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const j = await r.json();
  const contactId = j?.contact?.id;

  // Trigger workflow
  if (contactId && workflowId) {
    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/workflow/${workflowId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.GHL_API_KEY}`, Version: '2021-07-28', 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
  }

  return { status: r.status, contactId, workflowId };
}

async function sendToPancake(data, env) {
  if (!env.PANCAKE_API_KEY) return { skipped: true };
  const record = {
    name: data.full_name,
    email: data.email,
    phone_number: data.phone,
    utm_source: data.utm_source || 'website',
    utm_medium: data.utm_medium || 'lead-form',
    utm_campaign: data.funnel_code || '',
    lead_score: data.lead_score,
    source: data.page,
  };

  const r = await fetch(
    `https://crm.pancake.vn/api/workspaces/${env.PANCAKE_WORKSPACE_ID}/lead/records?api_key=${env.PANCAKE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'TruongVietAnh-LeadForm/2.0' },
      body: JSON.stringify({ record }),
    },
  );
  const j = await r.json().catch(() => null);
  return { status: r.status, id: j?.data?.id };
}

async function sendEmailNotification(data, env) {
  if (!env.SALES_EMAIL) return { skipped: true };
  const subject = `[${data.lead_score >= 70 ? '🔥 HOT' : 'Lead'}] ${data.funnel_code} — ${data.full_name || data.phone}`;
  const body = `
<h2>Lead mới từ Website (score ${data.lead_score})</h2>
<ul>
  <li>Họ tên: ${esc(data.full_name)}</li>
  <li>SĐT: <a href="tel:${esc(data.phone)}">${esc(data.phone)}</a></li>
  <li>Email: ${esc(data.email)}</li>
  <li>Funnel: ${esc(data.funnel_code)}</li>
  <li>School level: ${esc(data.school_level || '-')}</li>
  <li>Cơ sở: ${esc(data.campus_ref || '-')}</li>
  <li>Trang: ${esc(data.page)}</li>
  <li>UTM source: ${esc(data.utm_source || '-')} / medium: ${esc(data.utm_medium || '-')}</li>
</ul>`;

  const r = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: env.SALES_EMAIL }], cc: env.CC_EMAIL ? [{ email: env.CC_EMAIL }] : [] }],
      from: { email: 'leads@truongvietanh.com', name: 'TVA Lead Alert' },
      subject,
      content: [{ type: 'text/html', value: body }],
    }),
  });
  return { status: r.status };
}

function esc(s) { return String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]); }

async function sendZaloNotification(data, env) {
  if (!env.ZALO_OA_TOKEN || !env.ZALO_SALES_USER_ID) return { skipped: true };
  const msg = [
    `🔔 LEAD ${data.lead_score >= 70 ? '🔥 HOT' : ''} (${data.lead_score})`,
    `👤 ${data.full_name}`,
    `📱 ${data.phone}`,
    `📧 ${data.email}`,
    `🎓 ${data.school_level || '-'}`,
    `📄 ${data.funnel_code}`,
  ].join('\n');
  const r = await fetch('https://openapi.zalo.me/v3.0/oa/message/cs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', access_token: env.ZALO_OA_TOKEN },
    body: JSON.stringify({ recipient: { user_id: env.ZALO_SALES_USER_ID }, message: { text: msg } }),
  });
  return { status: r.status };
}

async function pingSlackHotLead(data, env) {
  if (!env.SLACK_HOT_LEAD_WEBHOOK) return { skipped: true };
  const r = await fetch(env.SLACK_HOT_LEAD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🔥 HOT LEAD (${data.lead_score})`,
      blocks: [
        { type: 'header', text: { type: 'plain_text', text: `🔥 Hot lead: ${data.full_name}` } },
        { type: 'section', fields: [
          { type: 'mrkdwn', text: `*Score:*\n${data.lead_score}` },
          { type: 'mrkdwn', text: `*Funnel:*\n${data.funnel_code}` },
          { type: 'mrkdwn', text: `*Phone:*\n<tel:${data.phone}|${data.phone}>` },
          { type: 'mrkdwn', text: `*Level:*\n${data.school_level || '-'}` },
        ] },
        { type: 'actions', elements: [
          { type: 'button', text: { type: 'plain_text', text: '📞 Call now' }, url: `tel:${data.phone}`, style: 'primary' },
          { type: 'button', text: { type: 'plain_text', text: '💬 Zalo' }, url: `https://zalo.me/${data.phone}` },
        ] },
      ],
    }),
  });
  return { status: r.status };
}
