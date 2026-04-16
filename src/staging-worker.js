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

    // Handle report page redirect (short URL for Zalo/Email)
    if (request.method === 'GET' && url.pathname === '/api/report') {
      const params = url.searchParams;
      const reportUrl = new URL('/report/', url.origin);
      // Pass through all params
      for (const [k, v] of params) {
        reportUrl.searchParams.set(k, v);
      }
      return Response.redirect(reportUrl.toString(), 302);
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
    source: data.source || data.funnelCode || data.funnel_code || data.page_variant || 'unknown',
    page: data.page || data.page_url || '',
    utmSource: data.utm_source || data.utmSource || '',
    utmMedium: data.utm_medium || data.utmMedium || '',
    utmCampaign: data.utm_campaign || data.utmCampaign || '',
    // Quiz funnel fields — support both camelCase and snake_case
    quizScore: parseInt(data.quizScore ?? data.quiz_score, 10) || 0,
    quizLevel: data.quizLevel || data.quiz_level || '',
    funnelCode: data.funnelCode || data.funnel_code || data.source || '',
    quizAnswers: Array.isArray(data.quizAnswers || data.quiz_answers) ? (data.quizAnswers || data.quiz_answers) : [],
  };
}

// === QUIZ RESULT HELPERS ===
function isQuizLead(data) {
  return data.quizScore > 0 || data.funnelCode.startsWith('trai-he-');
}

function getQuizResultLabel(score) {
  if (score >= 75) return 'Tốt';
  if (score >= 50) return 'Trung bình';
  return 'Cần can thiệp';
}

function getQuizResultEmoji(score) {
  if (score >= 75) return '✅';
  if (score >= 50) return '⚠️';
  return '🔴';
}

function deriveLocation(funnelCode) {
  if (funnelCode.includes('go-vap')) return 'Gò Vấp';
  if (funnelCode.includes('binh-tan')) return 'Bình Tân';
  if (funnelCode.includes('can-giuoc')) return 'Cần Giuộc';
  if (funnelCode.includes('rach-gia')) return 'Rạch Giá';
  return '';
}

function deriveCampLevel(funnelCode) {
  if (funnelCode.includes('tieu-hoc')) return 'Tiểu học';
  if (funnelCode.includes('thcs')) return 'THCS';
  if (funnelCode.includes('thpt')) return 'THPT';
  return '';
}

// Generate quiz result report URL (personalized link)
function getQuizReportUrl(data) {
  const params = new URLSearchParams({
    name: data.fullName,
    score: data.quizScore.toString(),
    level: data.quizLevel || getQuizResultLabel(data.quizScore),
    school: data.schoolLevel,
    loc: deriveLocation(data.funnelCode),
    funnel: data.funnelCode,
  });
  // Add per-question scores if available
  if (data.quizAnswers && Array.isArray(data.quizAnswers) && data.quizAnswers.length > 0) {
    data.quizAnswers.forEach((a, i) => params.set(`q${i+1}`, a.toString()));
  }
  return `https://hoc.truongvietanh.com/report/?${params.toString()}`;
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

        // Warm sales page tags
        if (data.source && data.source.includes('trai-he-') && !isQuizLead(data)) {
          tags.push('warm_sales_page');
          tags.push('lead_nong');
          const campLvl = deriveCampLevel(data.source);
          if (campLvl) tags.push(`trai-he-${campLvl.toLowerCase()}`);
          const loc = deriveLocation(data.source);
          if (loc) tags.push(`cs-${loc.toLowerCase().replace(/\s+/g, '-')}`);
        }

        // Quiz-specific tags
        if (isQuizLead(data)) {
          tags.push('quiz-lead');
          tags.push(`quiz-${getQuizResultLabel(data.quizScore).toLowerCase().replace(/\s+/g, '-')}`);
          const loc = deriveLocation(data.funnelCode);
          if (loc) tags.push(`cs-${loc.toLowerCase().replace(/\s+/g, '-')}`);
          const campLvl = deriveCampLevel(data.funnelCode);
          if (campLvl) tags.push(`trai-he-${campLvl.toLowerCase()}`);
        }

        // Split Vietnamese full name: "Nguyen Van An" → firstName="An", lastName="Nguyen Van"
        const nameParts = (data.fullName || '').trim().split(/\s+/);
        const ghlFirstName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0] || '';
        const ghlLastName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';

        const ghlBody = {
          locationId: GHL_LOCATION_ID,
          firstName: ghlFirstName,
          lastName: ghlLastName,
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          source: `Website - ${data.source}`,
          tags,
        };

        // Custom fields for all trai-he leads
        ghlBody.customFields = ghlBody.customFields || [];

        // Location + level for all camp leads
        const loc = deriveLocation(data.funnelCode || data.source);
        const campLvl = deriveCampLevel(data.funnelCode || data.source);
        if (loc) ghlBody.customFields.push({ id: 'z1ephcXkEvcNWtyBjiWp', field_value: loc });
        if (campLvl) ghlBody.customFields.push({ id: 'wDAaUCcIklmwhODgCeC6', field_value: campLvl });

        // Nguon traffic
        if (data.source) ghlBody.customFields.push({ id: 'vkzg6XE4djR10VyGb2H8', field_value: data.source });

        // Child name / grade
        if (data.childName) ghlBody.customFields.push({ id: 'OcylouF8wHIZPJkoMpj6', field_value: data.childName });
        if (data.grade) ghlBody.customFields.push({ id: 'cvoJJ9T82wbLJY6Pr70p', field_value: data.grade });

        // Trang thai
        ghlBody.customFields.push({ id: '3U5RWUZqGGoZP0PaMzNS', field_value: 'New_Lead' });

        // Quiz-specific fields
        if (isQuizLead(data)) {
          ghlBody.customFields.push(
            { id: 'EoYde4vUysFckhpYeu1V', field_value: data.quizScore.toString() },
            { id: '4pJj3NJZhiaiCAvI3dhd', field_value: data.quizLevel || getQuizResultLabel(data.quizScore) },
            { id: 'ufyzDQCInYMAotvxCj12', field_value: getQuizReportUrl(data) }  // Báo cáo URL
          );
        }

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
        const contactId = ghlData?.contact?.id || null;
        results.ghl = { status: ghlRes.status, contactId };
        // Opportunity creation handled later via createQuizOpportunity()
        // for both quiz + sales page trai-he leads (isQuizLead=true for all trai-he)
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
          if (pancakeRes.status >= 200 && pancakeRes.status < 300) {
            results.pancake = { status: pancakeRes.status, id: pancakeData?.data?.id || null };
          } else if (pancakeRes.status === 422 && /already exists/i.test(pancakeText) && data.phone) {
            // Phone/email already exists — idempotent success, lookup existing record
            try {
              const lookupRes = await fetch(
                `https://crm.pancake.vn/api/workspaces/${PANCAKE_WORKSPACE_ID}/lead/records?api_key=${pancakeApiKey}&phone_number=${encodeURIComponent(data.phone)}`,
                { headers: { 'Accept': 'application/json', 'User-Agent': 'TruongVietAnh-LeadForm/1.0' } }
              );
              const lookupData = await lookupRes.json();
              const existing = lookupData?.data?.entries?.[0] || null;
              results.pancake = {
                status: 200,
                id: existing?.id || null,
                duplicate: true,
                note: 'Phone already in CRM — existing lead found',
              };
            } catch {
              results.pancake = { status: 200, duplicate: true, id: null, note: 'Phone already in CRM (lookup failed)' };
            }
          } else {
            results.pancake = {
              status: pancakeRes.status,
              error: pancakeData?.message || pancakeData?.error || pancakeText.substring(0, 400),
              details: pancakeData?.errors || pancakeData?.data || null,
              payload: { name: record.name, phone: record.phone_number, email: record.email, khoi: record.khoi_quan_tam || null },
            };
          }
        } catch {
          results.pancake = { status: pancakeRes.status, error: pancakeText.substring(0, 400) };
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
      // Actual quiz leads (with score > 0): send quiz result email with score
      if (data.quizScore > 0) {
        promises.push(sendQuizResultEmail(data, env, contactId, ghlApiKey).catch(() => {}));
      }
      // Trai-he sales page + VSL leads (no quiz score): send consultation confirmation email
      else if ((data.source || '').match(/trai-he|vsl-/) && data.email) {
        promises.push(sendTraiHeConsultEmail(data, env, contactId, ghlApiKey).catch(() => {}));
      }
      // Create opportunity for ALL trai-he leads (quiz or sales page)
      if (isQuizLead(data) && contactId) {
        promises.push(createQuizOpportunity(contactId, data, ghlApiKey).catch(() => {}));
      }
      // Add contact to appropriate GHL workflow
      if (contactId) {
        const wfSource = data.funnelCode || data.source;
        promises.push(addContactToWorkflow(contactId, wfSource, ghlApiKey).catch(() => {}));
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
  // WF1: Checklist Chọn Trường
  'squeeze-checklist':      'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  // WF2: Ebook Lộ Trình Lớp 10
  'squeeze-ebook-lo-trinh': '7303fea4-3b2b-4efa-8248-b43c6c3396cd',
  // WF3: Học Thử Miễn Phí
  'squeeze-hoc-thu':        '385a3068-41ab-4875-aed2-cb1a2ec6df22',
  // WF4: Test Năng Lực
  'squeeze-test-nang-luc':  '2abb3b36-0c08-49dd-96a3-a3506520fcb1',
  // WF5: Webinar Phụ Huynh
  'squeeze-webinar':        'e8bc47e9-ac16-4a4e-90f9-e542edcc4719',
  // WF6: Tuyển Sinh Chung (all tuyen-sinh-* variants)
  'tuyen-sinh-mam-non':     'e621dee0-eae8-483e-997c-3912704bc9ba',
  'tuyen-sinh-tieu-hoc':    'e621dee0-eae8-483e-997c-3912704bc9ba',
  'tuyen-sinh-thcs':        'e621dee0-eae8-483e-997c-3912704bc9ba',
  'tuyen-sinh-thpt':        'e621dee0-eae8-483e-997c-3912704bc9ba',
  // WF8: Post-Tour Follow-up
  'post-tour':              'faf0eeab-253d-4c29-bce3-9152f7f36637',
  'post-hoc-thu':           'faf0eeab-253d-4c29-bce3-9152f7f36637',
  // WF7: Re-engagement Inactive
  'inactive-90days':        '7579d127-d5dd-4405-9cf9-e6741cc0e618',
  // WF9: Trại Hè Lion Camp 2026 — routed to "Trại hè - Email Drip 7 ngày"
  'trai-he-tieu-hoc-go-vap':    '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'trai-he-tieu-hoc-binh-tan':  '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'trai-he-tieu-hoc-can-giuoc': '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'trai-he-tieu-hoc-rach-gia':  '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'trai-he-thcs-go-vap':        '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'trai-he-thcs-binh-tan':      '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'trai-he-thpt-go-vap':        '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'trai-he-thpt-binh-tan':      '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  // Main Trại hè workflow (fallback prefix match)
  'trai-he':                    '023f00e9-d100-40d8-a8dc-2bd575ecb6c4',
  // VSL variants — route to same trai-he workflow
  'vsl-tieu-hoc-go-vap':        '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'vsl-tieu-hoc-binh-tan':      '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'vsl-tieu-hoc-can-giuoc':     '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'vsl-tieu-hoc-rach-gia':      '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'vsl-thcs-go-vap':            '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'vsl-thcs-binh-tan':          '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'vsl-thpt-go-vap':            '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'vsl-thpt-binh-tan':          '698086d0-d38c-4b45-9a52-81cb3e3962ac',
  'vsl':                        '023f00e9-d100-40d8-a8dc-2bd575ecb6c4',
  // WF9: Alumni & Referral
  'alumni-referral':        '5665d8b0-ab23-4238-aa95-4753827a2a76',
  // Nurture Series: 30 Tình Huống Dạy Con (Batch 1 — triggers chain to 13 batches)
  'squeeze-30-tinh-huong':  'NURTURE_N1_PLACEHOLDER',

  // WF10: Trại Hè Quiz Funnel → uses Squeeze Full Funnel workflow
  // (nurture sequence: quiz result email → follow-up → urgency → consultation invite)
  'trai-he-tieu-hoc-go-vap':    'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'trai-he-tieu-hoc-binh-tan':  'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'trai-he-tieu-hoc-can-giuoc': 'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'trai-he-tieu-hoc-rach-gia':  'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'trai-he-thcs-go-vap':        'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'trai-he-thcs-binh-tan':      'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'trai-he-thpt-go-vap':        'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
  'trai-he-thpt-binh-tan':      'c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2',
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

// === OPPORTUNITY (Pipeline) FOR QUIZ LEADS ===
const TRAI_HE_PIPELINE_ID = 'wBGA6IWGRd14sCXrasTp'; // Tuyển Sinh 2026
const TRAI_HE_STAGE_ID = '622d8a0e-c396-422b-a62c-f984652cdaa4'; // New Lead

async function createQuizOpportunity(contactId, data, ghlApiKey) {
  const loc = deriveLocation(data.funnelCode);
  const campLvl = deriveCampLevel(data.funnelCode);
  const score = data.quizScore || 0;
  const level = score > 0 ? getQuizResultLabel(score) : '';

  // Monetary value: default 19.998M for sales page leads, or score-based for quiz leads
  const monetaryValue = score === 0 ? 19998000
    : score < 50 ? 15000000
    : score < 75 ? 12000000
    : 10000000;

  // Name format: sales → "Trại Hè {Level} {Location} — {Name}"
  //              quiz  → same + " ({score}đ {label})"
  const oppName = score > 0
    ? `Trại Hè ${campLvl} ${loc} — ${data.fullName} (${score}đ ${level})`
    : `Trại Hè ${campLvl} ${loc} — ${data.fullName}`;

  await fetch('https://services.leadconnectorhq.com/opportunities/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ghlApiKey}`,
      'Version': '2021-07-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pipelineId: TRAI_HE_PIPELINE_ID,
      locationId: GHL_LOCATION_ID,
      name: oppName,
      pipelineStageId: TRAI_HE_STAGE_ID,
      contactId,
      status: 'open',
      monetaryValue,
      source: `Trai He Funnel - ${data.funnelCode}`,
    }),
  });
}

// === NOTIFICATION FUNCTIONS ===

// === Helper: send email via GHL Conversations API (works reliably with SES backend) ===
async function sendEmailViaGHL({ contactId, subject, html, ghlApiKey }) {
  if (!contactId) return { error: 'No contactId' };
  try {
    const res = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ghlApiKey || 'pit-3a3f370c-7e6a-47f0-977f-053d093bc06c'}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'Email',
        contactId,
        subject,
        html,
      }),
    });
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
}

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
      ${isQuizLead(data) ? `<tr style="background:#fff8e1;">
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-weight:bold;color:#1a1a5e;">📊 Quiz Score</td>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;">
          <strong style="font-size:18px;color:${data.quizScore >= 75 ? '#16A34A' : data.quizScore >= 50 ? '#F59E0B' : '#EF4444'};">
            ${data.quizScore}/100 — ${getQuizResultLabel(data.quizScore)}
          </strong>
          ${data.quizScore < 50 ? '<br><span style="color:#EF4444;font-weight:bold;">⚡ CAN THIEP GAP — Goi ngay!</span>' : ''}
        </td>
      </tr>
      <tr>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-weight:bold;color:#1a1a5e;">🏫 Trai he</td>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;">${deriveCampLevel(data.funnelCode)} — ${deriveLocation(data.funnelCode)}</td>
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

  const lines = [
    `🔔 LEAD MỚI TỪ WEBSITE`,
    `👤 ${data.fullName}`,
    `📧 ${data.email}`,
    `📱 ${data.phone}`,
    `🎓 ${schoolLabel}`,
    `📄 Nguồn: ${data.source}`,
  ];

  // Add quiz info if available
  if (isQuizLead(data)) {
    const loc = deriveLocation(data.funnelCode);
    const campLvl = deriveCampLevel(data.funnelCode);
    lines.push('');
    lines.push(`📊 QUIZ TRẠI HÈ: ${data.quizScore}/100 điểm`);
    lines.push(`${getQuizResultEmoji(data.quizScore)} Mức: ${getQuizResultLabel(data.quizScore)}`);
    lines.push(`🏫 Cơ sở: ${loc}`);
    lines.push(`📚 Cấp: ${campLvl}`);
    lines.push('');
    lines.push(`🔥 Gọi NGAY — lead quiz score ${data.quizScore < 50 ? 'THẤP → CẦN CAN THIỆP GẤP!' : data.quizScore < 75 ? 'TB → Khả năng chốt cao' : 'TỐT → Upsell gói premium'}`);
  }

  lines.push('');
  lines.push(`👉 Liên lạc ngay!`);

  await fetch('https://openapi.zalo.me/v3.0/oa/message/cs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': zaloToken,
    },
    body: JSON.stringify({
      recipient: { user_id: zaloUserId },
      message: { text: lines.join('\n') },
    }),
  });
}

// === QUIZ RESULT EMAIL TO PARENT ===
async function sendQuizResultEmail(data, env, contactId, ghlApiKey) {
  const score = data.quizScore;
  const level = getQuizResultLabel(score);
  const emoji = getQuizResultEmoji(score);
  const loc = deriveLocation(data.funnelCode);
  const campLvl = deriveCampLevel(data.funnelCode);
  const reportUrl = getQuizReportUrl(data);
  const nameParts = (data.fullName || '').trim().split(/\s+/).filter(w => !/^\d+$/.test(w));
  const firstName = nameParts.length ? nameParts[nameParts.length - 1] : 'Ba/Mẹ';

  // Color based on score (0-100 scale)
  const color = score >= 75 ? '#16A34A' : score >= 50 ? '#F59E0B' : '#EF4444';
  const barWidth = score;

  const subject = `📊 Kết quả đánh giá Lion Camp — ${score}/100 điểm — Báo cáo dành riêng cho gia đình ${firstName}`;

  const body = `
<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;background:#fff;">
  <!-- Header -->
  <div style="background:linear-gradient(135deg,#1a1a5e,#2a2a7e);color:#fff;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
    <img src="https://hoc.truongvietanh.com/logo-vietanh.webp" alt="Trường Việt Anh" style="max-width:200px;height:auto;margin-bottom:12px;background:#fff;padding:8px 16px;border-radius:8px;" />
    <h1 style="margin:0;font-size:20px;font-weight:800;">KẾT QUẢ ĐÁNH GIÁ KỸ NĂNG HÈ 2026</h1>
    <p style="margin:6px 0 0;opacity:.85;font-size:14px;">Lion Camp — ${campLvl} ${loc}</p>
  </div>

  <div style="padding:24px;border:1px solid #e0e0e0;border-top:none;">
    <p style="font-size:15px;color:#333;margin:0 0 16px;">
      Kính gửi ${firstName},<br><br>
      Cảm ơn Ba/Mẹ đã dành thời gian làm bài đánh giá cho con. Dưới đây là kết quả sơ bộ:
    </p>

    <!-- Score Card -->
    <div style="background:#F0F9FF;border:2px solid #7DD3FC;border-radius:14px;padding:20px;text-align:center;margin-bottom:20px;">
      <div style="font-size:42px;font-weight:800;color:#1F4E79;font-family:Montserrat,Arial,sans-serif;">${score}<span style="font-size:18px;color:#999;font-weight:400;"> / 100</span></div>
      <!-- Score bar -->
      <div style="background:#E5E7EB;border-radius:6px;height:12px;margin:12px 0;overflow:hidden;">
        <div style="background:${color};height:100%;width:${barWidth}%;border-radius:6px;"></div>
      </div>
      <div style="font-size:16px;font-weight:700;color:${color};">${emoji} ${level}</div>
    </div>

    <!-- What this means -->
    <div style="background:#F9FAFB;border-radius:10px;padding:16px;margin-bottom:20px;">
      <p style="font-weight:700;color:#1F4E79;margin:0 0 8px;">📋 Kết quả này có nghĩa là gì?</p>
      ${score >= 75 ? `<p style="margin:0;font-size:14px;color:#555;line-height:1.6;">Con đã có nền tảng tốt! Trại hè sẽ giúp con <strong>tỏa sáng hơn nữa</strong> và phát triển kỹ năng vượt trội so với bạn bè.</p>` : score >= 50 ? `<p style="margin:0;font-size:14px;color:#555;line-height:1.6;">Con đang ở giai đoạn <strong>cần hỗ trợ kịp thời</strong>. 6 tuần tại Lion Camp sẽ giúp con tiến bộ rõ rệt về tự tin và kỷ luật.</p>` : `<p style="margin:0;font-size:14px;color:#555;line-height:1.6;">Đây là <strong>thời điểm vàng để can thiệp</strong>. Mùa hè này là cơ hội quan trọng nhất để giúp con thay đổi toàn diện.</p>`}
    </div>

    <!-- Recommended action -->
    <div style="background:linear-gradient(135deg,#FFFBEB,#FEF3C7);border:2px solid #F59E0B;border-radius:12px;padding:18px;margin-bottom:20px;">
      <p style="font-weight:800;color:#E8792B;margin:0 0 8px;font-size:15px;">🎁 Khuyến nghị cho gia đình ${firstName}:</p>
      <p style="margin:0 0 12px;font-size:14px;color:#7C2D12;line-height:1.6;">
        Con rất phù hợp với <strong>Lion Camp ${campLvl} tại cơ sở ${loc}</strong>.
        Đăng ký giữ chỗ trong 48 giờ tới để nhận <strong>Học bổng Early Bird đến 30%</strong>.
      </p>
      <div style="text-align:center;">
        <a href="https://zalo.me/1678310120468101523" style="display:inline-block;background:#E8792B;color:#fff;padding:14px 28px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;">
          💬 Chat Zalo giữ chỗ ngay
        </a>
      </div>
    </div>

    <!-- Next steps -->
    <div style="margin-bottom:16px;">
      <p style="font-weight:700;color:#1F4E79;margin:0 0 8px;">📋 Các bước tiếp theo:</p>
      <ol style="margin:0;padding-left:20px;font-size:14px;color:#555;line-height:1.8;">
        <li><strong>Tư vấn viên sẽ gọi</strong> trong vài phút để giải thích chi tiết kết quả</li>
        <li>Nhận <strong>Báo cáo PDF đầy đủ</strong> qua Zalo trong 24 giờ</li>
        <li>Đặt lịch <strong>tư vấn 1:1 miễn phí</strong> (15 phút) để chọn lộ trình phù hợp</li>
        <li>Giữ chỗ Lion Camp + nhận <strong>Học bổng Early Bird</strong></li>
      </ol>
    </div>

    <div style="text-align:center;padding-top:16px;border-top:1px solid #eee;">
      <p style="margin:0 0 8px;font-size:13px;color:#999;">Xem lại kết quả đánh giá:</p>
      <a href="${reportUrl}" style="color:#1a1a5e;font-size:13px;">${reportUrl}</a>
    </div>

    <div style="text-align:center;margin-top:16px;">
      <p style="color:#999;font-size:12px;">
        Lion Camp 2026 — Trường Việt Anh<br>
        Hotline/Zalo: 0916 961 409
      </p>
    </div>
  </div>
</div>`.trim();

  // Primary: send via GHL Conversations API (uses SES backend, reliable)
  if (contactId) {
    await sendEmailViaGHL({ contactId, subject, html: body, ghlApiKey });
  }
  // Fallback: MailChannels (legacy, may fail with 401)
  try {
    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: data.email, name: data.fullName }] }],
        from: { email: 'results@hoc.truongvietanh.com', name: 'Lion Camp — Trường Việt Anh' },
        subject,
        content: [{ type: 'text/html', value: body }],
      }),
    });
  } catch (_) {}
}

// === TRAI HE CONSULTATION CONFIRMATION EMAIL (non-quiz sales page leads) ===
async function sendTraiHeConsultEmail(data, env, contactId, ghlApiKey) {
  const loc = deriveLocation(data.source) || '';
  const campLvl = deriveCampLevel(data.source) || '';
  const nameParts = (data.fullName || '').trim().split(/\s+/).filter(w => !/^\d+$/.test(w));
  const firstName = nameParts.length ? nameParts[nameParts.length - 1] : 'Ba/Mẹ';
  const childName = data.childName || 'bé';

  const subject = `✅ Đã nhận đăng ký tư vấn Trại hè Lion Camp ${loc} — Liên hệ trong 24h`;

  const body = `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f5;margin:0;padding:20px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
  <!-- Header -->
  <div style="background:linear-gradient(135deg,#1a1a5e,#12123e);color:#fff;padding:28px 24px;text-align:center;">
    <img src="https://hoc.truongvietanh.com/logo-vietanh.webp" alt="Trường Việt Anh" style="max-width:200px;height:auto;background:#fff;padding:10px 20px;border-radius:10px;margin-bottom:16px;"/>
    <h1 style="color:#fff;font-size:22px;margin:8px 0;line-height:1.3;">✅ Đã nhận đăng ký tư vấn!</h1>
    <p style="color:#ffd89a;font-size:14px;margin:4px 0 0;">Trại hè Lion Camp 2026 — ${campLvl} ${loc}</p>
  </div>

  <div style="padding:26px 24px;">
    <p style="font-size:16px;color:#1a1a2e;line-height:1.7;margin:0 0 16px;">Dạ chào Ba/Mẹ <strong>${firstName}</strong>,</p>

    <p style="font-size:15px;color:#2d2d42;line-height:1.7;margin:0 0 16px;">
      Cảm ơn Ba/Mẹ đã đăng ký tư vấn 1:1 cho bé <strong>${childName}</strong> tại Trại hè Lion Camp 2026.
    </p>

    <p style="font-size:15px;color:#2d2d42;line-height:1.7;margin:0 0 20px;">
      <strong>Tư vấn viên của em sẽ liên hệ Ba/Mẹ qua Zalo hoặc điện thoại trong 24 giờ tới</strong> để trao đổi chi tiết lộ trình phù hợp nhất cho bé.
    </p>

    <!-- Next steps box -->
    <div style="background:#f8faff;border-left:4px solid #D4A843;padding:18px 20px;border-radius:10px;margin-bottom:20px;">
      <p style="font-weight:800;color:#1a1a5e;margin:0 0 12px;font-size:15px;">📋 Các bước tiếp theo:</p>
      <ol style="margin:0;padding-left:22px;font-size:14px;color:#2d2d42;line-height:1.9;">
        <li><strong>Tư vấn viên gọi/Zalo</strong> trong 24 giờ</li>
        <li>Trao đổi nhu cầu của bé và gia đình</li>
        <li>Nhận <strong>lộ trình Lion Camp 6 tuần</strong> cá nhân hóa</li>
        <li>Chọn ưu đãi <strong>học bổng Early Bird</strong> phù hợp</li>
      </ol>
    </div>

    <!-- CTA Zalo -->
    <div style="text-align:center;margin:24px 0;">
      <a href="https://zalo.me/1678310120468101523" style="display:inline-block;background:linear-gradient(135deg,#D4A843,#c09530);color:#12123e;padding:14px 28px;border-radius:12px;font-weight:800;font-size:15px;text-decoration:none;box-shadow:0 4px 14px rgba(212,168,67,.4);">
        📞 Chat Zalo tư vấn nhanh hơn
      </a>
    </div>

    <!-- Trust box -->
    <div style="background:#f0faf4;border:1px solid #c8e9d4;border-radius:10px;padding:14px 18px;margin:16px 0;">
      <p style="margin:0;font-size:14px;color:#1e8449;line-height:1.6;">
        🛡️ <strong>Tư vấn miễn phí, không cam kết.</strong> Ba/Mẹ chỉ quyết định sau khi trao đổi trực tiếp với tư vấn viên.
      </p>
    </div>

    <!-- Contact info -->
    <div style="text-align:center;padding-top:16px;border-top:1px solid #eee;margin-top:16px;">
      <p style="margin:0 0 6px;font-size:13px;color:#999;">Hotline / Zalo:</p>
      <a href="tel:+84916961409" style="color:#1a1a5e;font-size:15px;font-weight:700;text-decoration:none;">0916 961 409</a>
    </div>
  </div>

  <div style="background:#12123e;color:#ffd89a;padding:16px 20px;text-align:center;font-size:12px;">
    Lion Camp 2026 — Trường Việt Anh<br/>
    <a href="https://hoc.truongvietanh.com" style="color:#ffd89a;">hoc.truongvietanh.com</a>
  </div>
</div>
</body></html>`.trim();

  // Primary: send via GHL Conversations API (uses SES backend, reliable)
  if (contactId) {
    await sendEmailViaGHL({ contactId, subject, html: body, ghlApiKey });
  }
  // Fallback: MailChannels (legacy, may fail with 401)
  try {
    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: data.email, name: data.fullName }] }],
        from: { email: 'results@hoc.truongvietanh.com', name: 'Lion Camp — Trường Việt Anh' },
        reply_to: { email: 'tu@truongvietanh.com', name: 'Ban Tuyển sinh Việt Anh' },
        subject,
        content: [{ type: 'text/html', value: body }],
      }),
    });
  } catch (_) {}
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
