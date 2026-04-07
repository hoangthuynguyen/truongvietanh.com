/**
 * Worker script cho hoc.truongvietanh.com
 *
 * Handles:
 * 1. POST /api/lead → forward to GoHighLevel CRM + Pancake CRM
 * 2. Everything else → static assets
 *
 * API keys stored in Cloudflare Worker Secrets (env bindings).
 */

const GHL_LOCATION_ID = 'Mo8F9woTvjBHFakzawxY';
const PANCAKE_WORKSPACE_ID = '1728';

// Sales notification config
const SALES_EMAIL = 'tu@truongvietanh.com';
const CC_EMAIL = 'duong@truongvietanh.com';
const SALES_PHONE = '0916961409';

// Pancake CRM "Khối quan tâm" dropdown UUID mapping
const KHOI_QUAN_TAM_MAP = {
  // Mầm non
  'mau-non':  '3 tuổi-89af-8179-5066-cd19-db36-3229-a824',
  '2-tuoi':   '2 tuổi-3988-7226-be92-2356-3dc9-c263-55e8',
  '3-tuoi':   '3 tuổi-89af-8179-5066-cd19-db36-3229-a824',
  '4-tuoi':   '4 tuổi-ea52-2cb0-f79e-ffd6-0677-ece1-a07f',
  '5-tuoi':   '5 tuổi-6355-9335-df2d-8044-cf44-aa53-71db',
  // Tiểu học
  'tieu-hoc': 'Lớp 1-a8a8-c0a1-524c-6330-249d-abed-8d7a',
  'lop-1':    'Lớp 1-a8a8-c0a1-524c-6330-249d-abed-8d7a',
  'lop-2':    'Lớp 2-fb67-71be-3ea9-9d68-7054-4419-b181',
  'lop-3':    'Lớp 3-04d3-f826-f6e7-efe1-c25c-f95b-a39b',
  'lop-4':    'Lớp 4-36a9-f952-5aca-2a5b-1bf2-f279-0308',
  'lop-5':    'Lớp 5-fcc5-8196-655c-6e4d-6510-4532-0646',
  // THCS
  'thcs':     'Lớp 6-06f9-d562-6016-bf17-2b25-802d-aa19',
  'lop-6':    'Lớp 6-06f9-d562-6016-bf17-2b25-802d-aa19',
  'lop-7':    'Lớp 7-c384-b023-a747-9e5f-ac2d-8795-4e43',
  'lop-8':    'Lớp 8-7d0a-09ee-8345-dfb6-abc7-f2c3-5a4a',
  'lop-9':    'Lớp 9-bc6a-dc49-de23-e585-49bf-d9cf-cd50',
  // THPT
  'thpt':     'Lớp 10-409c-da48-23b3-6d7f-ea9a-d7a3-ac71',
  'lop-10':   'Lớp 10-409c-da48-23b3-6d7f-ea9a-d7a3-ac71',
  'lop-11':   'Lớp 11-2daa-fd52-3080-8a8b-bb14-e46c-c074',
  'lop-12':   'Lớp 12-af1a-06bf-81bc-4f93-342a-b847-dc85',
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS' && url.pathname === '/api/lead') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Handle lead form submissions
    if (request.method === 'POST' && url.pathname === '/api/lead') {
      return handleLeadSubmission(request, env);
    }

    // Everything else → static assets with cache control
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Cache-Control', 'public, max-age=60, s-maxage=30');
      return new Response(response.body, { status: response.status, headers: newHeaders });
    }
    return response;
  },
};

function normalizePhone(phone) {
  if (!phone) return '';
  let p = phone.replace(/[\s\-\(\)]/g, '');
  if (p.startsWith('+84')) p = '0' + p.slice(3);
  if (p.startsWith('84') && p.length === 11) p = '0' + p.slice(2);
  return p;
}

function resolveKhoiQuanTam(schoolLevel, grade) {
  // Try grade first (more specific), then schoolLevel
  const key = (grade || schoolLevel || '').toLowerCase().trim();
  return KHOI_QUAN_TAM_MAP[key] || null;
}

function normalizeFormData(data) {
  return {
    step: data.step || 'full_submit',
    fullName: data.fullName || data.parent_name || '',
    email: data.email || '',
    phone: normalizePhone(data.phone || ''),
    childName: data.childName || data.child_name || '',
    schoolLevel: data.schoolLevel || data.school_level || '',
    grade: data.grade || '',
    source: data.source || data.funnel_code || data.page_variant || 'unknown',
    page: data.page || data.page_url || '',
    utmSource: data.utm_source || '',
    utmMedium: data.utm_medium || '',
    utmCampaign: data.utm_campaign || '',
  };
}

async function handleLeadSubmission(request, env) {
  try {
    const rawData = await request.json();

    if (!rawData.email) {
      return jsonResponse({ success: false, error: 'Email is required' }, 400);
    }

    // Read secrets from env bindings (fallback to hardcoded for dev)
    const ghlApiKey = env.GHL_API_KEY || 'pit-3a3f370c-7e6a-47f0-977f-053d093bc06c';
    const pancakeApiKey = env.PANCAKE_API_KEY || 'd49378937bc14bae97d2b61a698265ce';

    const data = normalizeFormData(rawData);
    const results = { ghl: null, pancake: null };

    if (data.step !== 'partial_capture') {
      // === GoHighLevel: Upsert Contact ===
      try {
        const tags = ['website-lead'];
        if (data.schoolLevel) tags.push(data.schoolLevel);
        if (data.grade) tags.push(data.grade);
        if (data.source) tags.push(data.source);

        const ghlBody = {
          locationId: GHL_LOCATION_ID,
          firstName: data.fullName,
          email: data.email,
          phone: data.phone,
          source: `Website - ${data.source}`,
          tags,
        };

        const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ghlApiKey}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ghlBody),
        });

        const ghlData = await ghlRes.json();
        results.ghl = { status: ghlRes.status, contactId: ghlData?.contact?.id || null };
      } catch (err) {
        results.ghl = { error: err.message };
      }

      // === Pancake CRM: Create Lead ===
      try {
        const record = {
          name: data.fullName,
          email: data.email,
          phone_number: data.phone,
          utm_source: data.utmSource || 'website',
          utm_medium: data.utmMedium || 'lead-form',
          utm_campaign: data.source || '',
        };

        // Map schoolLevel/grade to Pancake dropdown UUID
        const khoiId = resolveKhoiQuanTam(data.schoolLevel, data.grade);
        if (khoiId) {
          record.khoi_quan_tam = khoiId;
        }

        const pancakeRes = await fetch(
          `https://crm.pancake.vn/api/workspaces/${PANCAKE_WORKSPACE_ID}/lead/records?api_key=${pancakeApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'TruongVietAnh-LeadForm/1.0',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ record }),
          }
        );

        const pancakeText = await pancakeRes.text();
        try {
          const pancakeData = JSON.parse(pancakeText);
          results.pancake = { status: pancakeRes.status, id: pancakeData?.data?.id || null };
        } catch {
          results.pancake = { status: pancakeRes.status, error: pancakeText.substring(0, 200) };
        }
      } catch (err) {
        results.pancake = { error: err.message };
      }
    }

    if (data.step === 'partial_capture') {
      results.step = 'partial_capture';
      results.email = data.email;
    }

    // === Send notifications + add to workflow for full submissions ===
    if (data.step !== 'partial_capture') {
      const contactId = results.ghl?.contactId;
      const promises = [
        sendEmailNotification(data, env).catch(() => {}),
        sendZaloNotification(data, env).catch(() => {}),
      ];
      // Add contact to appropriate GHL workflow
      if (contactId) {
        promises.push(addContactToWorkflow(contactId, data.source, ghlApiKey).catch(() => {}));
      }
      await Promise.allSettled(promises);
    }

    return jsonResponse({ success: true, results });
  } catch (err) {
    return jsonResponse({ success: false, error: 'Invalid request body' }, 400);
  }
}

// === WORKFLOW FUNCTIONS ===

// Map funnel codes to GHL workflow IDs
const WORKFLOW_MAP = {
  // Squeeze pages → Squeeze Page 2-Step Full Funnel
  'squeeze-checklist':      'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'squeeze-ebook-lo-trinh': 'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'squeeze-hoc-thu':        'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'squeeze-test-nang-luc':  'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'squeeze-webinar':        'e8bc47e9-ac16-4a4e-90f9-e542edcc4719', // Webinar Sequence
  // Tuyen sinh pages → Squeeze Page 2-Step Full Funnel
  'tuyen-sinh-mam-non':     'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'tuyen-sinh-tieu-hoc':    'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'tuyen-sinh-thcs':        'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'tuyen-sinh-thpt':        'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
};

async function addContactToWorkflow(contactId, source, ghlApiKey) {
  // Find matching workflow - try exact match first, then prefix match
  let workflowId = WORKFLOW_MAP[source];
  if (!workflowId) {
    // Try prefix match for tuyen-sinh-* variants
    for (const [key, id] of Object.entries(WORKFLOW_MAP)) {
      if (source && source.startsWith(key.replace('-*', ''))) {
        workflowId = id;
        break;
      }
    }
  }
  // Default to Squeeze Full Funnel
  if (!workflowId) {
    workflowId = 'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2';
  }

  await fetch(
    `https://services.leadconnectorhq.com/contacts/${contactId}/workflow/${workflowId}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlApiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }
  );
}

// === NOTIFICATION FUNCTIONS ===

async function sendEmailNotification(data, env) {
  const schoolLabel = {
    'mau-non': 'Mam non', 'tieu-hoc': 'Tieu hoc',
    'thcs': 'THCS', 'thpt': 'THPT',
  }[data.schoolLevel] || data.schoolLevel || 'Chua chon';

  // Derive which program they're interested in from the source/page
  const sourceLabel = (data.source || '').replace(/-/g, ' ').replace('squeeze ', '');
  const pageUrl = data.page || 'https://hoc.truongvietanh.com';
  const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  const subject = `[HOC VIEN MOI] ${data.fullName} - ${schoolLabel} - Lien lac ngay ${data.phone}`;

  const body = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#1a1a5e;color:#fff;padding:16px 24px;border-radius:8px 8px 0 0;">
    <h2 style="margin:0;font-size:20px;">Co hoc vien moi quan tam!</h2>
    <p style="margin:4px 0 0;opacity:0.9;font-size:14px;">${now}</p>
  </div>

  <div style="background:#fff;border:1px solid #e0e0e0;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
    <p style="margin:0 0 16px;font-size:15px;color:#333;">
      Chao Tu, co mot phu huynh vua dang ky quan tam tren website. Vui long lien lac ngay!
    </p>

    <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
      <tr style="background:#f8f9fa;">
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-weight:bold;width:140px;color:#1a1a5e;">Ho ten phu huynh</td>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-size:16px;font-weight:bold;">${data.fullName}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-weight:bold;color:#1a1a5e;">So dien thoai</td>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-size:16px;">
          <a href="tel:${data.phone}" style="color:#D4A843;font-weight:bold;text-decoration:none;">${data.phone}</a>
        </td>
      </tr>
      <tr style="background:#f8f9fa;">
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-weight:bold;color:#1a1a5e;">Email</td>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;">
          <a href="mailto:${data.email}" style="color:#1a1a5e;">${data.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-weight:bold;color:#1a1a5e;">Cap hoc quan tam</td>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;"><strong>${schoolLabel}</strong>${data.grade ? ' - ' + data.grade : ''}</td>
      </tr>
      ${data.childName ? `<tr style="background:#f8f9fa;">
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-weight:bold;color:#1a1a5e;">Ten con em</td>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;">${data.childName}</td>
      </tr>` : ''}
      <tr style="background:#f8f9fa;">
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-weight:bold;color:#1a1a5e;">Quan tam toi</td>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;">${sourceLabel || 'Thong tin chung'}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-weight:bold;color:#1a1a5e;">Trang dang ky</td>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;">
          <a href="${pageUrl}" style="color:#1a1a5e;font-size:13px;">${pageUrl}</a>
        </td>
      </tr>
    </table>

    <div style="background:#fff8e1;border:2px solid #D4A843;border-radius:8px;padding:16px;text-align:center;margin-bottom:16px;">
      <p style="margin:0 0 12px;font-weight:bold;color:#1a1a5e;font-size:16px;">Lien lac ngay voi phu huynh:</p>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
        <a href="tel:${data.phone}" style="background:#1a1a5e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">Goi dien: ${data.phone}</a>
        <a href="https://zalo.me/${data.phone}" style="background:#0068ff;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">Nhan Zalo</a>
        <a href="mailto:${data.email}" style="background:#D4A843;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">Gui Email</a>
      </div>
    </div>

    <p style="color:#999;font-size:12px;margin:0;text-align:center;">
      Email tu dong tu he thong tuyen sinh hoc.truongvietanh.com
    </p>
  </div>
</div>`.trim();

  await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: SALES_EMAIL, name: 'Tu - Sales TVA' }],
        cc: [{ email: CC_EMAIL, name: 'Duong Nguyen' }],
      }],
      from: { email: 'leads@hoc.truongvietanh.com', name: 'Truong Viet Anh - Lead Alert' },
      subject,
      content: [{ type: 'text/html', value: body }],
    }),
  });
}

async function sendZaloNotification(data, env) {
  const zaloToken = env.ZALO_OA_TOKEN;
  const zaloUserId = env.ZALO_SALES_USER_ID;
  if (!zaloToken || !zaloUserId) return;

  const schoolLabel = {
    'mau-non': 'Mầm non', 'tieu-hoc': 'Tiểu học',
    'thcs': 'THCS', 'thpt': 'THPT',
  }[data.schoolLevel] || data.schoolLevel || 'Chưa chọn';

  const message = [
    `🔔 LEAD MỚI TỪ WEBSITE`,
    `👤 ${data.fullName}`,
    `📧 ${data.email}`,
    `📱 ${data.phone}`,
    `🎓 ${schoolLabel}`,
    `📄 Nguồn: ${data.source}`,
    ``,
    `👉 Liên lạc ngay!`,
  ].join('\n');

  await fetch('https://openapi.zalo.me/v3.0/oa/message/cs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': zaloToken,
    },
    body: JSON.stringify({
      recipient: { user_id: zaloUserId },
      message: { text: message },
    }),
  });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}
