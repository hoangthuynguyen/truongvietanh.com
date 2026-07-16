/**
 * Worker script cho truongvietanh.com
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
  'mam-non':  '3 tuổi-89af-8179-5066-cd19-db36-3229-a824',  // alias đúng
  'mau-non':  '3 tuổi-89af-8179-5066-cd19-db36-3229-a824',  // legacy
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

    // Redirect hoc.truongvietanh.com và www.truongvietanh.com → truongvietanh.com (301)
    if (url.hostname === 'hoc.truongvietanh.com' || url.hostname === 'www.truongvietanh.com') {
      return Response.redirect('https://truongvietanh.com' + url.pathname + url.search, 301);
    }

    // Redirect /tin-tuc → /blog/ (301 permanent — blog is now the canonical URL)
    if (url.pathname === '/tin-tuc' || url.pathname === '/tin-tuc/') {
      return Response.redirect('https://truongvietanh.com/blog/', 301);
    }

    // Gộp trang nội trú trùng: /tuyen-sinh/lop-10-noi-tru → URL ngắn /lop-10-noi-tru/ (301)
    if (url.pathname === '/tuyen-sinh/lop-10-noi-tru' || url.pathname === '/tuyen-sinh/lop-10-noi-tru/') {
      return Response.redirect('https://truongvietanh.com/lop-10-noi-tru/', 301);
    }

    // Quiz: /quiz-vietanh → /quiz (301 permanent — canonical short URL)
    if (url.pathname === '/quiz-vietanh' || url.pathname === '/quiz-vietanh/') {
      return Response.redirect('https://truongvietanh.com/quiz', 301);
    }

    // Quiz: explicit fetch by file path to bypass Cloudflare asset manifest routing issues
    if (url.pathname === '/quiz' || url.pathname === '/quiz/') {
      const assetReq = new Request(new URL('/quiz/index.html', url.origin).toString());
      const assetResp = await env.ASSETS.fetch(assetReq);
      if (assetResp.ok) {
        const h = new Headers(assetResp.headers);
        h.set('cache-control', 'public, max-age=0, must-revalidate');
        return new Response(assetResp.body, { status: 200, headers: h });
      }
    }

    // Handle CORS preflight
    if (request.method === 'OPTIONS' && (url.pathname === '/api/lead' || url.pathname === '/api/khieu-nai')) {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Handle lead form submissions
    if (request.method === 'POST' && url.pathname === '/api/lead') {
      return handleLeadSubmission(request, env);
    }

    // Handle complaint form submissions — endpoint riêng, KHÔNG mix với sales lead pipeline
    if (request.method === 'POST' && url.pathname === '/api/khieu-nai') {
      return handleKhieuNaiSubmission(request, env);
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

    // Serve media files from R2 bucket at /media/*
    if (request.method === 'GET' && url.pathname.startsWith('/media/')) {
      return handleR2Media(request, env, url);
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

  // Cron (khai báo ở wrangler.jsonc "triggers.crons"): tự gắn nhãn kênh cho
  // lead Facebook/Zalo Messenger MỚI (do Pancake kéo về, không qua website).
  async scheduled(event, env, ctx) {
    ctx.waitUntil(labelNewInboxLeads(env));
  },
};

// Suy nhãn kênh cho lead INBOX (Messenger/Zalo) từ ad_id + source của Pancake.
// Chỉ đụng lead inbox đang TRỐNG nhãn — KHÔNG chạm lead website (đã có nhãn sẵn).
function inboxChannelLabel(e) {
  if (e.dien_giai_nguon_mkt) return null;                      // đã có nhãn
  if (!e.conversation_id && !e.ad_id && !e.ad_id_fb) return null; // không phải inbox → bỏ
  const adId = e.ad_id || (Array.isArray(e.ad_id_fb) ? e.ad_id_fb[0] : e.ad_id_fb);
  const src = Array.isArray(e.source) ? e.source : [];
  const s0 = String(src[0] || '');
  const s1 = String(src[1] || '').toLowerCase();
  if (adId) return 'Facebook Ads';
  if (s0 === '-2' || /^p?zl_/.test(s1)) return 'Zalo';
  if (s0 === '-1') return 'Facebook (organic)';
  return null;
}

async function labelNewInboxLeads(env) {
  const key = env.PANCAKE_API_KEY;
  if (!key) { console.error('[cron] thiếu PANCAKE_API_KEY'); return; }
  const BASE = `https://crm.pancake.vn/api/workspaces/${PANCAKE_WORKSPACE_ID}/lead/records`;
  const MAX_PAGES = 3, MAX_UPDATES = 40;
  let cursor = '', scanned = 0, updated = 0;
  for (let p = 0; p < MAX_PAGES && updated < MAX_UPDATES; p++) {
    let d;
    try {
      const res = await fetch(`${BASE}?api_key=${key}&page_size=100${cursor ? '&cursor=' + encodeURIComponent(cursor) : ''}`,
        { headers: { Accept: 'application/json' } });
      d = await res.json();
    } catch (err) { console.error('[cron] fetch lỗi', err); break; }
    const rows = (d.data && d.data.entries) || [];
    if (!rows.length) break;
    for (const e of rows) {
      scanned++;
      const label = inboxChannelLabel(e);
      if (!label || updated >= MAX_UPDATES) continue;
      try {
        const r = await fetch(`${BASE}?api_key=${key}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ record: { id: e.id, dien_giai_nguon_mkt: label } }),
        });
        if (r.ok) updated++;
      } catch (err) { /* lead lỗi (trùng SĐT 422...) → bỏ qua */ }
    }
    cursor = d.data && d.data.cursor;
    if (!cursor) break;
  }
  console.log(`[cron] inbox labels: quét ${scanned}, gắn ${updated}`);
}

// === R2 MEDIA HANDLER ===
async function handleR2Media(request, env, url) {
  if (!env.MEDIA_BUCKET) {
    return new Response('Media storage not configured', { status: 503 });
  }

  // Strip /media/ prefix to get the R2 object key
  const key = decodeURIComponent(url.pathname.replace(/^\/media\//, ''));
  if (!key) return new Response('Not Found', { status: 404 });

  try {
    const object = await env.MEDIA_BUCKET.get(key);
    if (!object) return new Response('Not Found', { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    // Cache media files aggressively (1 year for immutable assets)
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Access-Control-Allow-Origin', '*');

    // Support conditional requests (304 Not Modified)
    const ifNoneMatch = request.headers.get('If-None-Match');
    if (ifNoneMatch && ifNoneMatch === object.httpEtag) {
      return new Response(null, { status: 304, headers });
    }

    return new Response(object.body, { status: 200, headers });
  } catch (err) {
    return new Response('Error fetching media', { status: 500 });
  }
}

function normalizePhone(phone) {
  if (!phone) return '';
  let p = String(phone).replace(/[\s\-\.\(\)]/g, '');
  if (p.startsWith('+84')) p = '0' + p.slice(3);
  if (p.startsWith('84') && p.length === 11) p = '0' + p.slice(2);
  return p;
}

// Số di động VN hợp lệ: 10 số, bắt đầu 03/05/07/08/09 (sau khi đã normalize +84/84 → 0)
function isValidVnPhone(p) {
  return /^0[35789][0-9]{8}$/.test(p);
}

function resolveKhoiQuanTam(schoolLevel, grade) {
  // Try grade first (more specific), THEN fall back to schoolLevel.
  // Quiz gửi grade dạng "Mầm non · 3–4 tuổi" (không phải key trong map) → phải lùi
  // về schoolLevel ('mau-non'/'thcs'…) để cột "Khối quan tâm" vẫn được điền.
  const g = (grade || '').toLowerCase().trim();
  const s = (schoolLevel || '').toLowerCase().trim();
  return KHOI_QUAN_TAM_MAP[g] || KHOI_QUAN_TAM_MAP[s] || null;
}

// Suy ra nhãn kênh MKT từ utm_source/utm_medium để sales đọc nhanh.
// Tách NỀN TẢNG (Facebook/YouTube/TikTok...) và PHÂN BIỆT trả phí vs organic:
//   - có utm_medium cpc/paid... → "<nền tảng> Ads"  (vd "Facebook Ads")
//   - còn lại (social/post/bio)  → nền tảng organic  (vd "YouTube", "Facebook (Fanpage)")
// Chịu được tên chiến dịch lộn xộn (vd 'New-Search-VA-...-PerformanMaxCamp' → Google Ads).
function channelLabel(src, med, url) {
  const s = String(src || '').toLowerCase().trim();
  const m = String(med || '').toLowerCase().trim();
  const u = String(url || '').toLowerCase();
  const noSrc = !s || s === 'direct' || s === 'website' || s === '(direct)';

  // KHÔNG có utm_source → dựa vào click-id nền tảng tự thêm vào URL khi user click.
  if (noSrc) {
    if (/[?&](gclid|gbraid|wbraid|gclsrc)=/.test(u)) return 'Google Ads'; // gclid CHỈ có từ Google Ads
    if (/[?&]fbclid=/.test(u)) return 'Facebook';   // fbclid có ở cả ads LẪN post organic → chỉ chắc "từ Facebook"
    if (/[?&]ttclid=/.test(u)) return 'TikTok';
    return 'Organic';
  }

  const paid = /cpc|ppc|paid|cpm|display|banner|\bads?\b/.test(m);
  // Google Search / Performance Max / GDN — luôn là quảng cáo trả phí
  if (/google|gclid|adwords|gads|\bgg\b|gdn|pmax|performanmax|performancemax|\bsearch\b/.test(s)) return 'Google Ads';
  if (/youtube|\byt\b/.test(s))            return paid ? 'YouTube Ads'   : 'YouTube';
  if (/tiktok|\btt\b|ttclid/.test(s))      return paid ? 'TikTok Ads'    : 'TikTok';
  if (/zalo/.test(s))                      return paid ? 'Zalo Ads'      : 'Zalo';
  if (/instagram|\big\b/.test(s))          return paid ? 'Instagram Ads' : 'Instagram';
  if (/facebook|\bfb\b|meta|messenger|fanpage/.test(s)) return paid ? 'Facebook Ads' : 'Facebook Fanpage';
  if (/email|edm|newsletter/.test(s) || /email|edm/.test(m)) return 'Email';
  if (m === 'none' || m === 'lead-form' || m === 'organic' || m === 'referral') return 'Organic';
  if (paid) return 'Paid Ads';
  return src ? String(src) : 'Organic';
}

// Chuẩn hóa utm_medium về đúng CHUẨN TEAM (file build UTM của sếp), suy từ nhãn kênh:
//   paid = quảng cáo trả phí · organic = organic social (YouTube/Fanpage) · none = vào thẳng · email.
// Nhờ vậy lọc "UTM Medium = paid" bắt đúng MỌI ads (kể cả chiến dịch Google ghi lộn xộn).
function utmMediumFromChannel(ch, rawMedium) {
  const m = String(rawMedium || '').toLowerCase().trim();
  // GIỮ NGUYÊN giá trị chuẩn của team; chỉ đồng bộ cpc→paid, social→organic, lead-form→none.
  const clean = {
    paid: 'paid', cpc: 'paid', ppc: 'paid', ads: 'paid', cpm: 'paid',
    organic: 'organic', social: 'organic',
    referral: 'referral', direct: 'direct', email: 'email', edm: 'email',
    affiliate: 'affiliate', affilicate: 'affiliate', offline: 'offline',
    none: 'none', 'lead-form': 'none',
  };
  if (clean[m]) return clean[m];
  // Giá trị LỘN XỘN (tên chiến dịch Google...) → suy từ nhãn kênh
  if (/Ads$/.test(ch)) return 'paid';
  if (ch === 'Email') return 'email';
  if (ch === 'YouTube' || ch === 'Facebook Fanpage' || ch === 'Instagram' || ch === 'TikTok' || ch === 'Zalo') return 'organic';
  if (ch === 'Organic') return 'none';
  return m || 'lead-form';
}

function normalizeFormData(data) {
  return {
    step: data.step || 'full_submit',
    fullName: data.fullName || data.parent_name || '',
    email: data.email || '',
    phone: normalizePhone(data.phone || ''),
    childName: data.childName || data.child_name || '',
    schoolLevel: data.schoolLevel || data.school_level || '',
    grade: data.grade || data.childGrade || '',
    province: data.province || '',
    source: data.source || data.funnelCode || data.funnel_code || data.page_variant || 'unknown',
    page: data.page || data.page_url || '',
    utmSource: data.utm_source || data.utmSource || '',
    utmMedium: data.utm_medium || data.utmMedium || '',
    utmCampaign: data.utm_campaign || data.utmCampaign || '',
    utmContent: data.utm_content || data.utmContent || '',
    utmTerm: data.utm_term || data.utmTerm || '',
    // "người chạy quảng cáo" — Pancake gán vào trường nguoi_chay để phân biệt lead
    // của từng người (vd van.le / nghia.pham / huong.vo03). Marketer gắn ?utm_pke_mkter=<username> vào link ads.
    pkeMkter: data.utm_pke_mkter || data.utmPkeMkter || data.pke_mkter || '',
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

// Derive level từ grade dropdown — dùng cho page chung trai-he-viet-anh
// Khi user chọn lớp, suy ra cấp tương ứng để gắn tag workflow đúng
function deriveLevelFromGrade(grade) {
  if (!grade) return '';
  const g = String(grade).toLowerCase().trim();
  // Tiểu học: 6 tuổi / lớp 1-5
  if (g === '6-tuoi' || /^lop-[1-5]$/.test(g)) return 'Tiểu học';
  // THCS: lớp 6-9
  if (/^lop-[6-9]$/.test(g)) return 'THCS';
  // THPT: lớp 10-12
  if (/^lop-1[0-2]$/.test(g)) return 'THPT';
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
  return `https://truongvietanh.com/report/?${params.toString()}`;
}

async function handleLeadSubmission(request, env) {
  try {
    const rawData = await request.json();

    // Cần ít nhất 1 cách liên hệ. Lead từ quiz chỉ có SĐT (không email) → vẫn nhận.
    if (!rawData.email && !rawData.phone) {
      return jsonResponse({ success: false, error: 'Email or phone is required' }, 400);
    }

    // API keys đọc từ Cloudflare secrets (wrangler secret put GHL_API_KEY / PANCAKE_API_KEY).
    // KHÔNG hard-code key vào file này — repo nằm trên GitHub.
    const ghlApiKey = env.GHL_API_KEY || '';
    const pancakeApiKey = env.PANCAKE_API_KEY || '';
    if (!ghlApiKey || !pancakeApiKey) {
      console.error('[lead] Thiếu secret GHL_API_KEY / PANCAKE_API_KEY — kiểm tra wrangler secret list');
    }

    const data = normalizeFormData(rawData);

    // Chặn SĐT sai định dạng VN ngay tại cổng — tránh đổ rác vào CRM.
    // Có email thì vẫn nhận lead (bỏ số rác); chỉ có SĐT mà sai → trả 400 để form báo người dùng.
    if (data.phone && !isValidVnPhone(data.phone)) {
      if (rawData.email) {
        data.phone = '';
      } else {
        return jsonResponse(
          { success: false, error: 'Số điện thoại không hợp lệ. Vui lòng nhập số di động Việt Nam 10 số, bắt đầu bằng 03/05/07/08/09.' },
          400
        );
      }
    }

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
          // Page riêng cấp: tag level (1 tag duy nhất)
          // Page chung trai-he-viet-anh: master tag 'trai-he-2026' + level tag từ grade
          //   → workflow chung gửi brochure tổng + workflow cấp gửi chuỗi nuôi dưỡng
          const campLvl = deriveCampLevel(data.source);
          if (campLvl) {
            tags.push(`trai-he-${campLvl.toLowerCase()}`);
            const cl = campLvl.toLowerCase();
            if (cl === 'tiểu học') tags.push('trai-he-2026-tieu-hoc');
            else if (cl === 'thcs') tags.push('trai-he-2026-thcs');
            else if (cl === 'thpt') tags.push('trai-he-2026-thpt');
          } else {
            // Page chung trai-he-viet-anh — TÁCH HOÀN TOÀN khỏi level workflow riêng cấp
            // Dùng tag prefix 'chung-*' để workflow toan-he-thong filter, KHÔNG dính level workflow
            tags.push('trai-he-2026');
            tags.push('trai-he-2026-toan-he-thong');
            const lvlFromGrade = deriveLevelFromGrade(data.grade);
            if (lvlFromGrade) {
              const cl = lvlFromGrade.toLowerCase();
              if (cl === 'tiểu học') tags.push('chung-tieu-hoc');
              else if (cl === 'thcs') tags.push('chung-thcs');
              else if (cl === 'thpt') tags.push('chung-thpt');
            }
          }
          const loc = deriveLocation(data.source);
          if (loc) tags.push(`cs-${loc.toLowerCase().replace(/\s+/g, '-')}`);
        }

        // Squeeze-specific tags (dùng làm GHL workflow trigger)
        if (data.source === 'squeeze-reading-challenge') {
          tags.push('reading-challenge-30-ngay');
          tags.push('squeeze-tieu-hoc');
        }
        if (data.source === 'squeeze-checklist-mam-non') {
          tags.push('checklist-mam-non-2026');
          tags.push('squeeze-mam-non');
        }
        if (data.source === 'squeeze-checklist-tieu-hoc') {
          tags.push('chon-truong-tieu-hoc');   // → GHL workflow trigger
          tags.push('checklist-tieu-hoc-2026');
          tags.push('squeeze-tieu-hoc');
        }
        if (data.source === 'squeeze-checklist-cap3') {
          tags.push('chon-truong-cap3');       // → GHL workflow trigger (checklist thăm trường cấp 3 / lớp 10)
          tags.push('checklist-cap3-2026');
          tags.push('squeeze-thpt');
        }
        if (data.source === 'squeeze-checklist') {
          tags.push('checklist-chon-truong-2026');
        }
        // Tags from form data (e.g. checklist-mam-non.html passes tags array)
        if (Array.isArray(data.tags)) {
          data.tags.forEach(t => { if(t && !tags.includes(t)) tags.push(t); });
        }

        if (data.source === 'squeeze-50-truong-ielts') tags.push('ielts-tuyen-sinh-dh');
        if (data.source === 'squeeze-cam-nang-thpt') tags.push('cam-nang-chon-thpt');
        if (data.source === 'squeeze-ky-nang-lop1') tags.push('checklist-ky-nang-lop1');
        if (data.source === 'squeeze-du-hoc-lop10') tags.push('du-hoc-lop10-chuan-bi');
        if (data.source === 'squeeze-chuyen-truong-lop6') tags.push('chuyen-truong-lop6-2026');
        if (data.source === 'squeeze-conversation-cards') tags.push('conversation-cards-song-ngu');
        if (data.source === 'squeeze-ebook-9-linh-vuc') tags.push('ebook-9-linh-vuc-mam-non');
        if (data.source === 'squeeze-giai-doan-vang') tags.push('giai-doan-vang-ngon-ngu');
        if (data.source === 'squeeze-dang-ky-lop1') tags.push('dang-ky-vao-lop1-2026');
        if (data.source === 'squeeze-lo-trinh-ielts-thcs') tags.push('lo-trinh-ielts-thcs');
        if (data.source === 'squeeze-lo-trinh-tieng-anh') tags.push('lo-trinh-tieng-anh-tieu-hoc');
        if (data.source === 'squeeze-oxford-cambridge-ib') tags.push('oxford-cambridge-ib-so-sanh');
        if (data.source === 'squeeze-phuong-phap-teen') tags.push('phuong-phap-hoc-teen');
        if (data.source === 'squeeze-quiz-phuong-phap') tags.push('quiz-phuong-phap-giao-duc');
        if (data.source === 'squeeze-so-sanh-chi-phi') tags.push('so-sanh-chi-phi-truong');
        if (data.source === 'squeeze-so-sanh-thcs') tags.push('so-sanh-truong-thcs');
        // Master tag cho funnel Ebook Cẩm Nang Tuyển Sinh Lớp 10 — trigger workflow LM-ebook-cam-nang-tuyen-sinh-lop-10 trong GHL
        if (data.source === 'squeeze-ebook-tuyen-sinh-lop-10') {
          tags.push('ebook-cam-nang-tuyen-sinh-lop-10');
          tags.push('squeeze-thpt');
        }

        // Chuỗi nuôi dưỡng chung 435 ngày — kết nối TẤT CẢ squeeze page vào 1 workflow
        const SQUEEZE_SOURCES = [
          'squeeze-checklist-mam-non', 'squeeze-giai-doan-vang', 'squeeze-ebook-9-linh-vuc',
          'squeeze-quiz-phuong-phap', 'squeeze-lo-trinh-tieng-anh', 'squeeze-so-sanh-chi-phi',
          'squeeze-dang-ky-lop1', 'squeeze-reading-challenge', 'squeeze-ky-nang-lop1',
          'squeeze-chuyen-truong-lop6', 'squeeze-lo-trinh-ielts-thcs', 'squeeze-phuong-phap-teen',
          'squeeze-so-sanh-thcs', 'squeeze-cam-nang-thpt', 'squeeze-du-hoc-lop10',
          'squeeze-50-truong-ielts', 'squeeze-oxford-cambridge-ib', 'squeeze-conversation-cards',
          'squeeze-checklist', 'squeeze-checklist-tieu-hoc',
          'squeeze-ebook-tuyen-sinh-lop-10',
        ];
        if (data.source && SQUEEZE_SOURCES.includes(data.source)) {
          tags.push('nurture-435-ngay');
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
          email: data.email || undefined,
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
      // Pancake bắt buộc SĐT. Form chỉ thu email (newsletter blog) không có SĐT
      // → bỏ qua Pancake, chỉ vào GHL. Mọi form có SĐT đều vào cả 2 CRM.
      if (!data.phone) {
        results.pancake = { skipped: true, reason: 'no_phone', note: 'Email-only lead → GHL only' };
      } else try {
        const mktChannel = channelLabel(data.utmSource, data.utmMedium, data.page);
        const record = {
          // Pancake bắt buộc có Tên. Form chỉ thu email/SĐT (popup exit-intent,
          // blog subscribe) không có tên → fallback để lead vẫn vào CRM, không bị 422.
          name: data.fullName || data.phone || data.email || 'Lead Web (chưa rõ tên)',
          email: data.email,
          phone_number: data.phone,
          utm_source: data.utmSource || 'website',
          utm_medium: utmMediumFromChannel(mktChannel, data.utmMedium),
          // Giữ tên chiến dịch marketer đặt (file build UTM); nếu link không có thì dùng funnel trang.
          utm_campaign: data.utmCampaign || data.source || '',
        };
        if (data.utmContent) record.utm_content = data.utmContent;
        if (data.utmTerm) record.utm_term = data.utmTerm;
        // Người chạy quảng cáo → filter theo từng người trong Pancake
        if (data.pkeMkter) record.nguoi_chay = data.pkeMkter;

        // Map schoolLevel/grade to Pancake dropdown UUID
        const khoiId = resolveKhoiQuanTam(data.schoolLevel, data.grade);
        if (khoiId) {
          record.khoi_quan_tam = khoiId;
        }

        // KHÔNG set "Người phụ trách" (owner) — để rule tự phân SO của Pancake xử lý.
        // Ghi nguồn vào trường "Nguồn Khách Hàng" để nhận diện lead web.
        // LƯU Ý: nguon_khach_hang_omi là DROPDOWN — chỉ nhận option có sẵn ('website').
        // Giá trị tự ghép kiểu "Website - <funnel>" KHÔNG phải option hợp lệ → Pancake
        // trả 422 và lead bị loại. Funnel/campaign đã được lưu riêng ở utm_campaign.
        record.nguon_khach_hang_omi = 'website';

        // "Diễn giải nguồn MKT" (dien_giai_nguon_mkt) là TEXT tự do → ghi funnel/landing
        // page + nhãn kênh trong ngoặc để sales đọc nhanh, vd:
        //   "lop10-noitru (Google Ads)" · "squeeze-hoc-phi (Facebook Ads)" · "tieu-hoc-pillar (Organic)"
        if (data.source) {
          record.dien_giai_nguon_mkt = data.source + ' (' + mktChannel + ')' +
            (data.pkeMkter ? ' · ' + data.pkeMkter : '');
        }

        const postPancake = (rec) => fetch(
          `https://crm.pancake.vn/api/workspaces/${PANCAKE_WORKSPACE_ID}/lead/records?api_key=${pancakeApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'TruongVietAnh-LeadForm/1.0',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ record: rec }),
          }
        );

        let pancakeRes = await postPancake(record);
        let pancakeText = await pancakeRes.text();
        // nguoi_chay là DROPDOWN — chỉ nhận username đã có trong workspace. Nếu marketer
        // gắn utm_pke_mkter chưa được thêm vào Pancake (hoặc gõ sai), Pancake trả
        // 422 "Value X not found" và LOẠI CẢ LEAD. → Bỏ nguoi_chay rồi thử lại để lead
        // vẫn vào CRM; tên người chạy vẫn được giữ trong dien_giai_nguon_mkt (text tự do).
        if (pancakeRes.status === 422 && /not found/i.test(pancakeText) && record.nguoi_chay) {
          console.warn(`[lead] Pancake từ chối nguoi_chay="${record.nguoi_chay}" (không có trong dropdown) — thử lại không kèm nguoi_chay`);
          delete record.nguoi_chay;
          pancakeRes = await postPancake(record);
          pancakeText = await pancakeRes.text();
        }
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
      // Squeeze page leads: send resource delivery email to the registrant
      else if ((data.source || '').match(/squeeze-/) && data.email) {
        promises.push(sendSqueezeResourceEmail(data, env, contactId, ghlApiKey).catch(() => {}));
      }
      // All other landing pages (mam-non/tieu-hoc/thcs/thpt/ngay-mo-cua/dat-lich/brand/future-ready)
      // → send generic confirmation email "we'll call you in 24h"
      else if (data.email && (data.source || '').match(/^(mam-non|tieu-hoc|thcs|thpt|ngay-mo-cua|dat-lich-tham-quan|brand-story|future-ready-challenge)/)) {
        promises.push(sendLandingConfirmEmail(data, env, contactId, ghlApiKey).catch((e) => { console.error('landing confirm email fail', e); }));
      }
      // Create opportunity for ALL trai-he leads (quiz or sales page)
      if (isQuizLead(data) && contactId) {
        promises.push(createQuizOpportunity(contactId, data, ghlApiKey).catch(() => {}));
      }
      // Create opportunity for non-quiz landing pages too — so leads appear in pipeline
      else if (contactId) {
        promises.push(createLandingOpportunity(contactId, data, ghlApiKey).catch((e) => { console.error('opp fail', e); }));
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
  // WF5: Livestream Phụ Huynh
  'squeeze-livestream':        'e8bc47e9-ac16-4a4e-90f9-e542edcc4719',
  // WF6: Tuyển Sinh Chung (all tuyen-sinh-* variants)
  'tuyen-sinh-mam-non':     'e621dee0-eae8-483e-997c-3912704bc9ba',
  'tuyen-sinh-tieu-hoc':    'e621dee0-eae8-483e-997c-3912704bc9ba',
  'tuyen-sinh-thcs':        'e621dee0-eae8-483e-997c-3912704bc9ba',
  'tuyen-sinh-thpt':        'e621dee0-eae8-483e-997c-3912704bc9ba',
  // Landing Tuyển Sinh Lớp 10 (/lop-10) → workflow nurture lớp 10 riêng
  'lop-10':                 '9a7391a0-57fa-4e05-8ca7-16320e7386fc',
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
  // ── 18 SQUEEZE PAGE LEAD MAGNET WORKFLOWS ──────────────────────────────────
  // LM01 · Checklist Chọn Trường Mầm Non
  'squeeze-checklist-mam-non':   '70107f73-45e5-4f5f-8be6-d8979fa5b805',
  // LM02 · Giai Đoạn Vàng Ngôn Ngữ
  'squeeze-giai-doan-vang':      'c522afe2-d236-4c0f-b9ad-3639a9a5ecbe',
  // LM03 · Ebook 9 Lĩnh Vực Mầm Non
  'squeeze-ebook-9-linh-vuc':    '963b0420-e26d-47d4-8bfe-13a4dab08650',
  // LM07 · Quiz Phương Pháp Giáo Dục
  'squeeze-quiz-phuong-phap':    '9dccb699-d511-490c-b3c7-1d93771b97df',
  // LM11 · Lộ Trình Tiếng Anh Lớp 1–5
  'squeeze-lo-trinh-tieng-anh':  '607f1636-fd30-4ea6-ba43-5791eb10c4b9',
  // LM12 · So Sánh Chi Phí Học
  'squeeze-so-sanh-chi-phi':     '7d83c3bb-f647-45dc-a95b-d31d78ef291d',
  // LM13 · Hướng Dẫn Đăng Ký Vào Lớp 1
  'squeeze-dang-ky-lop1':        'fe089ade-dfda-4fbb-bb68-c0abb56ee1bb',
  // LM15 · Reading Challenge 30 Ngày
  'squeeze-reading-challenge':   'f6f128cc-9b78-4e9a-8c4f-db8ef6aa9c08',
  // LM17 · Checklist 10 Kỹ Năng Vào Lớp 1
  'squeeze-ky-nang-lop1':        'ea62b9c5-411b-4ee4-a21f-b0265851ec10',
  // LM19 · Chuyển Trường Lên Lớp 6
  'squeeze-chuyen-truong-lop6':  'acd5fd89-e4a4-47b4-acff-56c95484ebe9',
  // LM20 · Lộ Trình IELTS THCS
  'squeeze-lo-trinh-ielts-thcs': '5d55727b-b0db-4e65-8214-3fa76110c65c',
  // LM21 · Phương Pháp Học Teen
  'squeeze-phuong-phap-teen':    'd02082cb-57b4-409e-a6d4-8a0c8aabb172',
  // LM24 · So Sánh Trường THCS
  'squeeze-so-sanh-thcs':        '479222b7-f49c-419b-bbf3-ccfa933cace5',
  // LM26 · Cẩm Nang Chọn THPT
  'squeeze-cam-nang-thpt':       '8c5c1f53-efd1-4b8e-883e-eca9c9a339ff',
  // LM27 · Chuẩn Bị Du Học Từ Lớp 10
  'squeeze-du-hoc-lop10':        'de732eb3-361b-4c48-9788-15b1f439d4ba',
  // LM29 · 50 Trường ĐH Xét IELTS
  'squeeze-50-truong-ielts':     'a69846d6-bed8-451c-99a1-cbafa5863750',
  // LM33 · Oxford vs Cambridge vs IB
  'squeeze-oxford-cambridge-ib': '3f9c5202-9e8e-49b0-a532-049b84e80197',
  // LM47 · Conversation Cards Song Ngữ
  'squeeze-conversation-cards':  '9ba3a5a1-f36f-49c3-a575-bff07cc1bff4',
  // NURTURE: Chuỗi Email Nuôi Dưỡng 435 Ngày — trigger bằng tag "nurture-435-ngay"
  'nurture-435-ngay':       '9eae9375-8c2b-4890-9a08-3d2e1896c546',
  // Nurture Series: 30 Tình Huống Dạy Con (Batch 1 — triggers chain to 13 batches)
  'squeeze-30-tinh-huong':  '9eae9375-8c2b-4890-9a08-3d2e1896c546',

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

// === OPPORTUNITY for general landing pages (non-quiz) ===
// Mỗi submit form từ landing → tạo 1 opportunity mới trong pipeline để sales thấy "lead mới"
async function createLandingOpportunity(contactId, data, ghlApiKey) {
  const src = (data.source || data.funnelCode || '').toLowerCase();

  // Map source → tên hiển thị Cấp + Cơ sở
  const LEVEL_LABEL = {
    'mam-non':  'Mầm Non',
    'tieu-hoc': 'Tiểu Học',
    'thcs':     'THCS',
    'thpt':     'THPT',
  };
  const LOC_LABEL = {
    'go-vap':              'Gò Vấp',
    'binh-tan':            'Bình Tân',
    'phu-nhuan':           'Phú Nhuận',
    'rach-gia':            'Rạch Giá',
    'can-giuoc':           'Cần Giuộc',
    'thai-son':            'Thái Sơn (Long Hậu)',
    'thai-son-long-hau':   'Thái Sơn (Long Hậu)',
  };

  // Build opportunity name
  let oppName;
  if (src.startsWith('trai-he-')) {
    const level = src.includes('tieu-hoc') ? 'Tiểu Học' : src.includes('thcs') ? 'THCS' : src.includes('thpt') ? 'THPT' : '';
    let loc = '';
    for (const k of Object.keys(LOC_LABEL)) { if (src.endsWith('-' + k)) { loc = LOC_LABEL[k]; break; } }
    oppName = `Trại Hè${level ? ' ' + level : ''}${loc ? ' ' + loc : ''} — ${data.fullName}`;
  } else if (src.startsWith('ngay-mo-cua')) {
    let loc = '';
    for (const k of Object.keys(LOC_LABEL)) { if (src.endsWith('-' + k)) { loc = LOC_LABEL[k]; break; } }
    oppName = `Ngày Mở Cửa${loc ? ' ' + loc : ''} — ${data.fullName}`;
  } else if (src === 'future-ready-challenge') {
    oppName = `Future Ready Challenge — ${data.fullName}`;
  } else if (src === 'dat-lich-tham-quan') {
    oppName = `Đặt Lịch Tham Quan — ${data.fullName}`;
  } else if (src === 'brand-story') {
    oppName = `Brand Story — ${data.fullName}`;
  } else {
    // Cấp + Cơ sở: vd mam-non-go-vap
    let level = '';
    let loc = '';
    for (const k of Object.keys(LEVEL_LABEL)) { if (src.startsWith(k + '-')) { level = LEVEL_LABEL[k]; break; } }
    for (const k of Object.keys(LOC_LABEL)) { if (src.endsWith('-' + k)) { loc = LOC_LABEL[k]; break; } }
    oppName = `${level || 'Tuyển Sinh'}${loc ? ' ' + loc : ''} — ${data.fullName}`;
  }

  // Estimated annual value by cấp (VND)
  const sl = (data.schoolLevel || '').toLowerCase();
  const monetaryValue =
    sl === 'mam-non'  ?  84000000 :   // 7tr × 12 tháng
    sl === 'tieu-hoc' ? 108000000 :   // 9tr × 12 tháng
    sl === 'thcs'     ? 132000000 :   // 11tr × 12 tháng
    sl === 'thpt'     ? 156000000 :   // 13tr × 12 tháng
    src.startsWith('trai-he-') ? 19998000 :
    50000000;

  const res = await fetch('https://services.leadconnectorhq.com/opportunities/', {
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
      source: `Website - ${src}`,
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error('createLandingOpportunity fail:', res.status, txt.substring(0, 200));
  }
  return res;
}

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
        'Authorization': `Bearer ${ghlApiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'Email',
        contactId,
        subject,
        html,
        emailReplyTo: 'tu@truongvietanh.com',
      }),
    });
    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
}

async function sendEmailNotification(data, env) {
  const schoolLabel = {
    'mam-non': 'Mam non', 'mau-non': 'Mam non', 'tieu-hoc': 'Tieu hoc',
    'thcs': 'THCS', 'thpt': 'THPT',
  }[data.schoolLevel] || data.schoolLevel || 'Chua chon';

  // Derive which program they're interested in from the source/page
  const sourceLabel = (data.source || '').replace(/-/g, ' ').replace('squeeze ', '');
  const pageUrl = data.page || 'https://truongvietanh.com';
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
          <a href="tel:${data.phone}" style="color:#f9dd0e;font-weight:bold;text-decoration:none;">${data.phone}</a>
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
      ${data.province ? `<tr>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-weight:bold;color:#1a1a5e;">Tinh/Thanh</td>
        <td style="padding:10px 12px;border:1px solid #e0e0e0;font-size:16px;font-weight:bold;">${data.province}</td>
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

    <div style="background:#fff8e1;border:2px solid #f9dd0e;border-radius:8px;padding:16px;text-align:center;margin-bottom:16px;">
      <p style="margin:0 0 12px;font-weight:bold;color:#1a1a5e;font-size:16px;">Lien lac ngay voi phu huynh:</p>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
        <a href="tel:${data.phone}" style="background:#1a1a5e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">Goi dien: ${data.phone}</a>
        <a href="https://zalo.me/${data.phone}" style="background:#0068ff;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">Nhan Zalo</a>
        <a href="mailto:${data.email}" style="background:#f9dd0e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">Gui Email</a>
      </div>
    </div>

    <p style="color:#999;font-size:12px;margin:0;text-align:center;">
      Email tu dong tu he thong tuyen sinh truongvietanh.com
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
      from: { email: 'leads@truongvietanh.com', name: 'Truong Viet Anh - Lead Alert' },
      reply_to: { email: 'tu@truongvietanh.com', name: 'Tu - Sales TVA' },
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

  if (data.province) lines.push(`📍 Tỉnh/Thành: ${data.province}`);

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
  <div style="background:linear-gradient(135deg,#1a1a5e,#363876);color:#fff;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
    <img src="https://truongvietanh.com/logo-vietanh.webp" alt="Trường Việt Anh" style="max-width:200px;height:auto;margin-bottom:12px;background:#fff;padding:8px 16px;border-radius:8px;" />
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
      <div style="font-size:42px;font-weight:800;color:#26275D;font-family:Montserrat,Arial,sans-serif;">${score}<span style="font-size:18px;color:#999;font-weight:400;"> / 100</span></div>
      <!-- Score bar -->
      <div style="background:#E5E7EB;border-radius:6px;height:12px;margin:12px 0;overflow:hidden;">
        <div style="background:${color};height:100%;width:${barWidth}%;border-radius:6px;"></div>
      </div>
      <div style="font-size:16px;font-weight:700;color:${color};">${emoji} ${level}</div>
    </div>

    <!-- What this means -->
    <div style="background:#F9FAFB;border-radius:10px;padding:16px;margin-bottom:20px;">
      <p style="font-weight:700;color:#26275D;margin:0 0 8px;">📋 Kết quả này có nghĩa là gì?</p>
      ${score >= 75 ? `<p style="margin:0;font-size:14px;color:#555;line-height:1.6;">Con đã có nền tảng tốt! Trại hè sẽ giúp con <strong>tỏa sáng hơn nữa</strong> và phát triển kỹ năng vượt trội so với bạn bè.</p>` : score >= 50 ? `<p style="margin:0;font-size:14px;color:#555;line-height:1.6;">Con đang ở giai đoạn <strong>cần hỗ trợ kịp thời</strong>. 6 tuần tại Lion Camp sẽ giúp con tiến bộ rõ rệt về tự tin và kỷ luật.</p>` : `<p style="margin:0;font-size:14px;color:#555;line-height:1.6;">Đây là <strong>thời điểm vàng để can thiệp</strong>. Mùa hè này là cơ hội quan trọng nhất để giúp con thay đổi toàn diện.</p>`}
    </div>

    <!-- Recommended action -->
    <div style="background:linear-gradient(135deg,#FFFBEB,#FEF3C7);border:2px solid #F59E0B;border-radius:12px;padding:18px;margin-bottom:20px;">
      <p style="font-weight:800;color:#f9dd0e;margin:0 0 8px;font-size:15px;">🎁 Khuyến nghị cho gia đình ${firstName}:</p>
      <p style="margin:0 0 12px;font-size:14px;color:#7C2D12;line-height:1.6;">
        Con rất phù hợp với <strong>Lion Camp ${campLvl} tại cơ sở ${loc}</strong>.
        Đăng ký giữ chỗ trong 48 giờ tới để nhận <strong>Học bổng Early Bird đến 30%</strong>.
      </p>
      <div style="text-align:center;">
        <a href="https://zalo.me/1678310120468101523" style="display:inline-block;background:#f9dd0e;color:#fff;padding:14px 28px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;">
          💬 Chat Zalo giữ chỗ ngay
        </a>
      </div>
    </div>

    <!-- Next steps -->
    <div style="margin-bottom:16px;">
      <p style="font-weight:700;color:#26275D;margin:0 0 8px;">📋 Các bước tiếp theo:</p>
      <ol style="margin:0;padding-left:20px;font-size:14px;color:#555;line-height:1.8;">
        <li><strong>Tư vấn viên sẽ gọi</strong> trong vài phút để giải thích chi tiết kết quả</li>
        <li>Nhận <strong>Báo cáo PDF đầy đủ</strong> qua Zalo trong 24 giờ</li>
        <li>Đặt lịch <strong>tư vấn cá nhân hóa 1:1</strong> (15 phút) để chọn lộ trình phù hợp</li>
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
        from: { email: 'results@truongvietanh.com', name: 'Lion Camp — Trường Việt Anh' },
        reply_to: { email: 'tu@truongvietanh.com', name: 'Tư vấn Trường Việt Anh' },
        subject,
        content: [{ type: 'text/html', value: body }],
      }),
    });
  } catch (_) {}
}

// === LANDING CONFIRMATION EMAIL (Mầm non / Tiểu học / THCS / THPT / Open House / Brand / Retgt) ===
async function sendLandingConfirmEmail(data, env, contactId, ghlApiKey) {
  const src = (data.source || data.funnelCode || '').toLowerCase();
  const sl = (data.schoolLevel || '').toLowerCase();
  const nameParts = (data.fullName || '').trim().split(/\s+/);
  const firstName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0] || 'Ba/Mẹ';

  // Map cấp + cơ sở (vietnamese display)
  const LEVEL_LABEL = { 'mam-non':'Mầm Non','tieu-hoc':'Tiểu Học','thcs':'THCS','thpt':'THPT' };
  const LOC_LABEL = {
    'go-vap':'Gò Vấp', 'binh-tan':'Bình Tân', 'rach-gia':'Rạch Giá',
    'can-giuoc':'Cần Giuộc', 'thai-son':'Thái Sơn (Long Hậu)', 'thai-son-long-hau':'Thái Sơn (Long Hậu)',
  };
  // Default address per location (TH/THCS/THPT)
  const ADDR = {
    'go-vap':'160/72 Phan Huy Ích, Phường 12, An Hội Tây, Hồ Chí Minh',
    'binh-tan':'Số 7 Đường 38A, Tân Tạo, Q.Bình Tân, TPHCM',
    'rach-gia':'Lô E7, KĐT Tây Bắc Mekong Xanh, TP. Rạch Giá, An Giang',
    'can-giuoc':'22 Đường D2, KDC Cần Giuộc, H.Cần Giuộc, Tây Ninh',
    'thai-son':'KDC Thái Sơn, Long Hậu, Cần Giuộc, Tây Ninh',
    'thai-son-long-hau':'KDC Thái Sơn, Long Hậu, Cần Giuộc, Tây Ninh',
  };
  // Override per full source (eg. Mầm non có cơ sở riêng tách khỏi liên cấp)
  const ADDR_OVERRIDE = {
    'mam-non-go-vap':'573 Lê Đức Thọ, P.16, Q.Gò Vấp, TP.HCM',
  };

  let level = LEVEL_LABEL[sl] || '';
  let loc = '', addr = '';
  for (const k of Object.keys(LOC_LABEL)) { if (src.endsWith('-' + k)) { loc = LOC_LABEL[k]; addr = ADDR[k] || ''; break; } }
  if (ADDR_OVERRIDE[src]) addr = ADDR_OVERRIDE[src];

  // Headline + lead phrase based on source type
  let headline, leadPhrase;
  if (src.startsWith('ngay-mo-cua')) {
    headline = `Đã nhận đăng ký Ngày Mở Cửa${loc ? ' ' + loc : ''}`;
    leadPhrase = 'tham gia Ngày Mở Cửa';
  } else if (src === 'future-ready-challenge') {
    headline = 'Đã nhận đăng ký Future Ready Challenge';
    leadPhrase = 'tham gia Cuộc thi AI Future Ready Challenge';
  } else if (src === 'dat-lich-tham-quan') {
    headline = 'Đã nhận đăng ký tham quan Trường Việt Anh';
    leadPhrase = 'tham quan Trường Việt Anh';
  } else if (src === 'brand-story') {
    headline = 'Cảm ơn Ba/Mẹ quan tâm Trường Việt Anh';
    leadPhrase = 'tìm hiểu Trường Việt Anh';
  } else {
    headline = `Đã nhận đăng ký tham quan ${level} ${loc}`.trim();
    leadPhrase = `tham quan ${level} ${loc}`.trim();
  }

  const subject = `✅ ${headline} — Trường Việt Anh sẽ liên hệ trong 24h`;

  // Logo theo cấp — cả 2 đều VÀNG hiển thị trực tiếp trên navy header (không cần khung trắng).
  const isMamNon = src.startsWith('mam-non') || sl === 'mam-non';
  const logoUrl = isMamNon
    ? 'https://truongvietanh.com/logo-mam-non-yellow.png'
    : 'https://truongvietanh.com/logo-th-thcs-thpt-yellow.png';
  const logoAlt = isMamNon ? 'Trường Mầm Non Việt Anh' : 'Trường TH-THCS-THPT Việt Anh';
  const logoBlock = `<img src="${logoUrl}" alt="${logoAlt}" style="max-width:160px;height:auto;margin:0 auto 18px;display:block;" />`;

  const body = `<!doctype html><html><head><meta charset="UTF-8"/></head><body style="font-family:Arial,Helvetica,sans-serif;background:#f4f6f9;margin:0;padding:32px 16px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.08);">
  <div style="background:linear-gradient(135deg,#26275D,#18193a);color:#fff;padding:36px 24px 32px;text-align:center;">
    ${logoBlock}
    <div style="display:inline-block;background:#f9dd0e;color:#26275D;font-size:12px;font-weight:800;letter-spacing:1.2px;padding:6px 14px;border-radius:20px;text-transform:uppercase;margin-bottom:14px;">✓ Đăng ký thành công</div>
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#f9dd0e;line-height:1.3;">${headline}</h1>
    <p style="margin:0;font-size:14px;color:rgba(255,255,255,.85);line-height:1.5;">Trường Việt Anh sẽ liên hệ Ba/Mẹ trong vòng 24 giờ</p>
  </div>
  <div style="padding:28px 24px;">
    <p style="font-size:15px;color:#333;margin:0 0 18px;line-height:1.6;">
      Kính gửi <strong>${firstName}</strong>,<br/><br/>
      Cảm ơn Ba/Mẹ đã đăng ký <strong>${leadPhrase}</strong>.
      Bộ phận tuyển sinh Trường Việt Anh sẽ <strong>gọi xác nhận lịch tham quan</strong> trong vòng <strong>24 giờ</strong>.
    </p>

    <div style="background:#fafbff;border-left:4px solid #f9dd0e;border-radius:8px;padding:16px 18px;margin-bottom:20px;">
      <div style="font-weight:800;color:#26275D;margin-bottom:10px;">📋 Các bước tiếp theo</div>
      <ol style="margin:0;padding-left:20px;font-size:14px;color:#333;line-height:1.8;">
        <li><strong>Tư vấn viên gọi xác nhận</strong> — chốt ngày & giờ tham quan phù hợp</li>
        <li>Đến tham quan trực tiếp: <strong>gặp giáo viên, xem lớp học, cơ sở vật chất</strong></li>
        <li>Nhận <strong>khảo sát tiến độ phát triển tự nhiên của con</strong> và hướng dẫn của chuyên gia</li>
      </ol>
    </div>

    ${addr ? `
    <div style="background:#fffde6;border:1px solid #f9dd0e;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
      <div style="font-weight:800;color:#26275D;margin-bottom:6px;">📍 Cơ sở ${loc}</div>
      <div style="font-size:14px;color:#333;line-height:1.6;">
        <strong>Địa chỉ:</strong> ${addr}<br/>
        <strong>Giờ làm việc:</strong> Thứ Hai – Thứ Bảy: 06:30 – 18:30<br/>
        <span style="margin-left:88px;">Chủ Nhật: 07:30 – 12:00 (hoặc theo hẹn trước)</span>
      </div>
    </div>` : ''}

    <div style="text-align:center;margin:24px 0 16px;">
      <a href="https://zalo.me/1678310120468101523" style="display:inline-block;background:#f9dd0e;color:#26275D;padding:14px 24px;border-radius:10px;font-weight:800;font-size:14px;text-decoration:none;margin:4px;">💬 Chat Zalo</a>
      <a href="https://m.me/truongvietanhhcm" style="display:inline-block;background:#0084ff;color:#fff;padding:14px 24px;border-radius:10px;font-weight:800;font-size:14px;text-decoration:none;margin:4px;">💬 Chat Facebook</a>
      <a href="tel:+84916961409" style="display:inline-block;background:#fff;color:#26275D;border:2px solid #26275D;padding:12px 22px;border-radius:10px;font-weight:800;font-size:14px;text-decoration:none;margin:4px;">📞 0916 961 409</a>
    </div>

    <div style="text-align:center;padding-top:18px;border-top:1px solid #eee;font-size:12px;color:#999;line-height:1.7;">
      <strong style="color:#26275D;font-size:13px;">Trường Việt Anh — since 2011</strong><br/>
      <em>Từ bình thường trở nên phi thường</em><br/>
      Mầm non · Tiểu học · THCS · THPT<br/>
      TP HCM · Tây Ninh · An Giang
    </div>
  </div>
</div>
</body></html>`.trim();

  // Primary: send via GHL Conversations API
  if (contactId) {
    try { await sendEmailViaGHL({ contactId, subject, html: body, ghlApiKey }); } catch(e) { console.error('landing confirm via GHL fail', e); }
  }
  // Fallback: MailChannels
  try {
    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: data.email, name: data.fullName }] }],
        from: { email: 'tailieu@truongvietanh.com', name: 'Trường Việt Anh' },
        reply_to: { email: 'tu@truongvietanh.com', name: 'Tư vấn Trường Việt Anh' },
        subject,
        content: [{ type: 'text/html', value: body }],
      }),
    });
  } catch(e) { console.error('landing confirm via MailChannels fail', e); }
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
  <div style="background:linear-gradient(135deg,#1a1a5e,#18193a);color:#fff;padding:28px 24px;text-align:center;">
    <img src="https://truongvietanh.com/logo-vietanh.webp" alt="Trường Việt Anh" style="max-width:200px;height:auto;background:#fff;padding:10px 20px;border-radius:10px;margin-bottom:16px;"/>
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
    <div style="background:#f8faff;border-left:4px solid #f9dd0e;padding:18px 20px;border-radius:10px;margin-bottom:20px;">
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
      <a href="https://zalo.me/1678310120468101523" style="display:inline-block;background:linear-gradient(135deg,#f9dd0e,#c09530);color:#18193a;padding:14px 28px;border-radius:12px;font-weight:800;font-size:15px;text-decoration:none;box-shadow:0 4px 14px rgba(249,221,14,.4);">
        📞 Chat Zalo tư vấn nhanh hơn
      </a>
    </div>

    <!-- Trust box -->
    <div style="background:#f0faf4;border:1px solid #c8e9d4;border-radius:10px;padding:14px 18px;margin:16px 0;">
      <p style="margin:0;font-size:14px;color:#1e8449;line-height:1.6;">
        🛡️ <strong>Tư vấn cá nhân hóa Lộ trình học tập, không cam kết.</strong> Ba/Mẹ chỉ quyết định sau khi trao đổi trực tiếp với tư vấn viên.
      </p>
    </div>

    <!-- Contact info -->
    <div style="text-align:center;padding-top:16px;border-top:1px solid #eee;margin-top:16px;">
      <p style="margin:0 0 6px;font-size:13px;color:#999;">Hotline / Zalo:</p>
      <a href="tel:+84916961409" style="color:#1a1a5e;font-size:15px;font-weight:700;text-decoration:none;">0916 961 409</a>
    </div>
  </div>

  <div style="background:#18193a;color:#ffd89a;padding:16px 20px;text-align:center;font-size:12px;">
    Lion Camp 2026 — Trường Việt Anh<br/>
    <a href="https://truongvietanh.com" style="color:#ffd89a;">truongvietanh.com</a>
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
        from: { email: 'results@truongvietanh.com', name: 'Lion Camp — Trường Việt Anh' },
        reply_to: { email: 'tu@truongvietanh.com', name: 'Ban Tuyển sinh Việt Anh' },
        subject,
        content: [{ type: 'text/html', value: body }],
      }),
    });
  } catch (_) {}
}

// === SQUEEZE PAGE RESOURCE DELIVERY EMAIL (gửi tài liệu cho người đăng ký) ===
const SQUEEZE_RESOURCES = {
  'squeeze-checklist': {
    title: 'Checklist Chọn Trường 2026',
    subject: '📋 Checklist chọn trường của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Checklist Chọn Trường 2026. Dưới đây là bộ tài liệu đầy đủ:',
    items: [
      { icon: '✅', label: 'Checklist 15 tiêu chí đánh giá trường (PDF)', url: 'https://media.truongvietanh.com/docs/checklist-chon-truong-2026.pdf' },
      { icon: '📊', label: 'Bảng so sánh trường (Google Sheets)', url: 'https://docs.google.com/spreadsheets/d/1_truongvietanh_checklist' },
      { icon: '💡', label: '7 câu hỏi phải hỏi khi tham quan trường', url: 'https://media.truongvietanh.com/docs/checklist-chon-truong-2026.pdf' },
      { icon: '📅', label: 'Timeline tuyển sinh 2026', url: 'https://media.truongvietanh.com/docs/checklist-chon-truong-2026.pdf' },
    ],
    cta: { text: '📥 Tải checklist ngay', url: 'https://media.truongvietanh.com/docs/checklist-chon-truong-2026.pdf' },
  },
  'squeeze-ebook-lo-trinh': {
    title: 'Ebook Lộ Trình Lớp 10',
    subject: '📚 Ebook lộ trình lớp 10 của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Ebook Lộ Trình Lớp 10. Đây là tài liệu:',
    items: [
      { icon: '📚', label: 'Ebook Lộ Trình Lớp 10 đầy đủ (PDF)', url: 'https://media.truongvietanh.com/docs/ebook-lo-trinh-lop-10.pdf' },
    ],
    cta: { text: '📥 Tải ebook ngay', url: 'https://media.truongvietanh.com/docs/ebook-lo-trinh-lop-10.pdf' },
  },
  'squeeze-hoc-thu': {
    title: 'Đăng Ký Học Thử Miễn Phí',
    subject: '✅ Đăng ký học thử thành công — Trường Việt Anh sẽ liên hệ trong 24h',
    intro: 'Cảm ơn Ba/Mẹ đã đăng ký học thử miễn phí. Tư vấn viên sẽ liên hệ trong 24 giờ để xếp lịch.',
    items: [],
    cta: { text: '💬 Chat Zalo để xếp lịch nhanh hơn', url: 'https://zalo.me/1678310120468101523' },
  },
  'squeeze-test-nang-luc': {
    title: 'Đăng Ký Test Năng Lực',
    subject: '✅ Đăng ký test năng lực thành công — Trường Việt Anh sẽ liên hệ trong 24h',
    intro: 'Cảm ơn Ba/Mẹ đã đăng ký test năng lực. Tư vấn viên sẽ liên hệ để đặt lịch test trong 24 giờ.',
    items: [],
    cta: { text: '💬 Chat Zalo để xếp lịch nhanh hơn', url: 'https://zalo.me/1678310120468101523' },
  },
  'squeeze-livestream': {
    title: 'Đăng Ký Livestream Phụ Huynh',
    subject: '✅ Đã đăng ký livestream — Link tham dự sẽ gửi trước 30 phút',
    intro: 'Cảm ơn Ba/Mẹ đã đăng ký tham dự Livestream. Link tham dự sẽ được gửi qua email trước buổi 30 phút.',
    items: [],
    cta: { text: '💬 Chat Zalo để biết thêm chi tiết', url: 'https://zalo.me/1678310120468101523' },
  },
  'squeeze-50-truong-ielts': {
    title: '50 Trường ĐH Xét IELTS',
    subject: '🎓 Danh sách 50 trường ĐH xét IELTS của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải danh sách 50 trường ĐH xét IELTS. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'🎓',label:'Danh sách 50 trường ĐH xét IELTS (PDF)',url:'https://drive.google.com/uc?export=download&id=1-YhgMCFXcm60agDkRFMzuRBKtJx8sfA8'}],
    cta: {text:'📥 Tải danh sách 50 trường ngay',url:'https://drive.google.com/uc?export=download&id=1-YhgMCFXcm60agDkRFMzuRBKtJx8sfA8'},
  },
  'squeeze-cam-nang-thpt': {
    title: 'Cẩm Nang Chọn Trường THPT',
    subject: '📚 Cẩm nang chọn trường THPT của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Cẩm Nang Chọn Trường THPT. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'📚',label:'Cẩm nang chọn trường THPT đầy đủ (PDF)',url:'https://drive.google.com/uc?export=download&id=1Fkd7mgPLLctihoVF3_3m77UnMi0edLV9'}],
    cta: {text:'📥 Tải cẩm nang ngay',url:'https://drive.google.com/uc?export=download&id=1Fkd7mgPLLctihoVF3_3m77UnMi0edLV9'},
  },
  'squeeze-ky-nang-lop1': {
    title: 'Checklist 10 Kỹ Năng Lớp 1',
    subject: '✅ Checklist kỹ năng lớp 1 của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Checklist 10 Kỹ Năng Lớp 1. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'✅',label:'Checklist 10 kỹ năng lớp 1 (PDF)',url:'https://drive.google.com/uc?export=download&id=1jUbiPr8VAiq5xtcmYuBICjFROo-H91KF'}],
    cta: {text:'📥 Tải checklist kỹ năng lớp 1 ngay',url:'https://drive.google.com/uc?export=download&id=1jUbiPr8VAiq5xtcmYuBICjFROo-H91KF'},
  },
  'squeeze-du-hoc-lop10': {
    title: 'Chuẩn Bị Du Học Từ Lớp 10',
    subject: '✈️ Tài liệu chuẩn bị du học từ lớp 10 của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải tài liệu Chuẩn Bị Du Học Từ Lớp 10. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'✈️',label:'Hướng dẫn chuẩn bị du học từ lớp 10 (PDF)',url:'https://drive.google.com/uc?export=download&id=1hhArZ88rxxF0cEAg1rB0n9zM_vEe19RV'}],
    cta: {text:'📥 Tải tài liệu du học lớp 10 ngay',url:'https://drive.google.com/uc?export=download&id=1hhArZ88rxxF0cEAg1rB0n9zM_vEe19RV'},
  },
  'squeeze-chuyen-truong-lop6': {
    title: 'Hướng Dẫn Chuyển Trường Lớp 6 2026',
    subject: '🏫 Hướng dẫn chuyển trường lớp 6 của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải hướng dẫn Chuyển Trường Lớp 6 2026. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'🏫',label:'Hướng dẫn chuyển trường lớp 6 2026 (PDF)',url:'https://drive.google.com/uc?export=download&id=1W-8Uy2GYtYNPiZ1J1E319xaCAJwba5Ne'}],
    cta: {text:'📥 Tải hướng dẫn chuyển trường lớp 6 ngay',url:'https://drive.google.com/uc?export=download&id=1W-8Uy2GYtYNPiZ1J1E319xaCAJwba5Ne'},
  },
  'squeeze-conversation-cards': {
    title: 'Conversation Cards Song Ngữ',
    subject: '🗣️ Bộ Conversation Cards song ngữ của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Bộ Conversation Cards Song Ngữ. In ra và thực hành cùng con ngay hôm nay!',
    items: [{icon:'🗣️',label:'Bộ Conversation Cards song ngữ (PDF)',url:'https://drive.google.com/uc?export=download&id=1l_E939CXaEbjKAclGANogitwHa5KTs48'}],
    cta: {text:'📥 Tải Conversation Cards ngay',url:'https://drive.google.com/uc?export=download&id=1l_E939CXaEbjKAclGANogitwHa5KTs48'},
  },
  'squeeze-ebook-9-linh-vuc': {
    title: 'Ebook 9 Lĩnh Vực Phát Triển Mầm Non',
    subject: '🌱 Ebook 9 lĩnh vực phát triển mầm non của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Ebook 9 Lĩnh Vực Phát Triển Mầm Non. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'🌱',label:'Ebook 9 lĩnh vực phát triển mầm non (PDF)',url:'https://drive.google.com/uc?export=download&id=1VNdgkDGd4wcKm4LRsAtK0auuVf2zUNH4'}],
    cta: {text:'📥 Tải ebook mầm non ngay',url:'https://drive.google.com/uc?export=download&id=1VNdgkDGd4wcKm4LRsAtK0auuVf2zUNH4'},
  },
  'squeeze-giai-doan-vang': {
    title: 'Giai Đoạn Vàng Ngôn Ngữ',
    subject: '✨ Tài liệu giai đoạn vàng ngôn ngữ của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải tài liệu Giai Đoạn Vàng Ngôn Ngữ. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'✨',label:'Tài liệu giai đoạn vàng ngôn ngữ (PDF)',url:'https://drive.google.com/uc?export=download&id=1t3NyOXes_NwUgP5VS_Pwx-BtMJJh53s3'}],
    cta: {text:'📥 Tải tài liệu giai đoạn vàng ngay',url:'https://drive.google.com/uc?export=download&id=1t3NyOXes_NwUgP5VS_Pwx-BtMJJh53s3'},
  },
  'squeeze-dang-ky-lop1': {
    title: 'Hướng Dẫn Đăng Ký Vào Lớp 1 2026',
    subject: '📝 Hướng dẫn đăng ký vào lớp 1 của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Hướng Dẫn Đăng Ký Vào Lớp 1 2026. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'📝',label:'Hướng dẫn đăng ký vào lớp 1 2026 (PDF)',url:'https://drive.google.com/uc?export=download&id=1NpfVN4CGXwwV-gDRtJWdcitENEXtg3yE'}],
    cta: {text:'📥 Tải hướng dẫn đăng ký lớp 1 ngay',url:'https://drive.google.com/uc?export=download&id=1NpfVN4CGXwwV-gDRtJWdcitENEXtg3yE'},
  },
  'squeeze-lo-trinh-ielts-thcs': {
    title: 'Lộ Trình IELTS Dành Cho THCS',
    subject: '🎯 Lộ trình IELTS THCS của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Lộ Trình IELTS Dành Cho THCS. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'🎯',label:'Lộ trình IELTS dành cho học sinh THCS (PDF)',url:'https://drive.google.com/uc?export=download&id=1Kk7jw0Syt3fp-K2b9HlcsxFkq7HK03xA'}],
    cta: {text:'📥 Tải lộ trình IELTS THCS ngay',url:'https://drive.google.com/uc?export=download&id=1Kk7jw0Syt3fp-K2b9HlcsxFkq7HK03xA'},
  },
  'squeeze-lo-trinh-tieng-anh': {
    title: 'Lộ Trình Tiếng Anh Tiểu Học',
    subject: '📖 Lộ trình tiếng Anh tiểu học của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Lộ Trình Tiếng Anh Tiểu Học. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'📖',label:'Lộ trình tiếng Anh dành cho học sinh tiểu học (PDF)',url:'https://drive.google.com/uc?export=download&id=1cl2-XHgMp0jwRYOMRy3502XoE1fHkitE'}],
    cta: {text:'📥 Tải lộ trình tiếng Anh tiểu học ngay',url:'https://drive.google.com/uc?export=download&id=1cl2-XHgMp0jwRYOMRy3502XoE1fHkitE'},
  },
  'squeeze-oxford-cambridge-ib': {
    title: 'So Sánh Oxford vs Cambridge vs IB',
    subject: '🌍 Bảng so sánh Oxford/Cambridge/IB của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải tài liệu So Sánh Oxford vs Cambridge vs IB. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'🌍',label:'Bảng so sánh chi tiết Oxford/Cambridge/IB (PDF)',url:'https://drive.google.com/uc?export=download&id=1d-DPkYeuZ62_zmC_Dzj74YpPhbt9GyB-'}],
    cta: {text:'📥 Tải so sánh Oxford/Cambridge/IB ngay',url:'https://drive.google.com/uc?export=download&id=1d-DPkYeuZ62_zmC_Dzj74YpPhbt9GyB-'},
  },
  'squeeze-phuong-phap-teen': {
    title: 'Phương Pháp Học Dành Cho Teen',
    subject: '🧠 Tài liệu phương pháp học teen của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải tài liệu Phương Pháp Học Dành Cho Teen. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'🧠',label:'Phương pháp học hiệu quả dành cho teen (PDF)',url:'https://drive.google.com/uc?export=download&id=1o8YozQmcSy6XbkauiQ595njr302eQzIp'}],
    cta: {text:'📥 Tải tài liệu phương pháp học teen ngay',url:'https://drive.google.com/uc?export=download&id=1o8YozQmcSy6XbkauiQ595njr302eQzIp'},
  },
  'squeeze-quiz-phuong-phap': {
    title: 'Quiz Phong Cách Giáo Dục',
    subject: '📝 Kết quả Quiz phong cách giáo dục của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã làm Quiz Phong Cách Giáo Dục. Dưới đây là tài liệu phân tích đầy đủ:',
    items: [{icon:'📝',label:'Quiz và phân tích 4 phong cách giáo dục (PDF)',url:'https://drive.google.com/uc?export=download&id=1i85ltMDeivjoTZ_xYsq2gFX2QuzCp3_F'}],
    cta: {text:'📥 Nhận kết quả quiz ngay',url:'https://drive.google.com/uc?export=download&id=1i85ltMDeivjoTZ_xYsq2gFX2QuzCp3_F'},
  },
  'squeeze-so-sanh-chi-phi': {
    title: 'Bảng So Sánh Chi Phí Học 2026',
    subject: '💰 Bảng so sánh chi phí học 2026 của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Bảng So Sánh Chi Phí Học 2026. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'💰',label:'Bảng so sánh chi phí học 2026 — Công lập/Tư thục/Quốc tế (PDF)',url:'https://drive.google.com/uc?export=download&id=1czcDpVi3pth3WUwLAPg3scHAqpKHUW5f'}],
    cta: {text:'📥 Tải bảng so sánh chi phí ngay',url:'https://drive.google.com/uc?export=download&id=1czcDpVi3pth3WUwLAPg3scHAqpKHUW5f'},
  },
  'squeeze-so-sanh-thcs': {
    title: 'So Sánh 4 Loại Trường THCS 2026',
    subject: '🏫 Bảng so sánh trường THCS 2026 của bạn đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải tài liệu So Sánh 4 Loại Trường THCS 2026. Dưới đây là tài liệu đầy đủ:',
    items: [{icon:'🏫',label:'So sánh 4 loại trường THCS theo 10 tiêu chí (PDF)',url:'https://drive.google.com/uc?export=download&id=1akQeb__XnQ70SPogfSzEuA7ySYnkKI8M'}],
    cta: {text:'📥 Tải so sánh trường THCS ngay',url:'https://drive.google.com/uc?export=download&id=1akQeb__XnQ70SPogfSzEuA7ySYnkKI8M'},
  },
  'squeeze-reading-challenge': {
    title: 'Reading Challenge — 30 Ngày Đọc Sách Cùng Con',
    subject: '📚 Bộ Kit 30 Ngày Đọc Sách của Ba/Mẹ đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Bộ Kit Reading Challenge 30 Ngày. In ra dùng ngay tối nay!',
    items: [
      { icon: '📋', label: 'Poster Thử Thách 30 Ngày Đọc Sách (PDF)', url: 'https://media.truongvietanh.com/docs/reading-challenge-30-ngay.pdf' },
      { icon: '⭐', label: 'Bảng Dán Sticker 30 Ngôi Sao', url: 'https://media.truongvietanh.com/docs/reading-challenge-30-ngay.pdf' },
      { icon: '📓', label: 'Nhật Ký Đọc Sách — Tiếng Anh + Tiếng Việt', url: 'https://media.truongvietanh.com/docs/reading-challenge-30-ngay.pdf' },
      { icon: '🏆', label: 'Hướng dẫn nhận Chứng Nhận sau 30 ngày', url: 'https://media.truongvietanh.com/docs/reading-challenge-30-ngay.pdf' },
    ],
    cta: { text: '📥 Tải Bộ Kit Reading Challenge ngay', url: 'https://media.truongvietanh.com/docs/reading-challenge-30-ngay.pdf' },
  },
  'squeeze-checklist-mam-non': {
    title: 'Checklist Chuẩn Bị Vào Mầm Non 2026',
    subject: '🌱 Checklist mầm non của Ba/Mẹ đã sẵn sàng — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã tải Checklist Chuẩn Bị Vào Mầm Non 2026. Dưới đây là tài liệu đầy đủ:',
    items: [
      { icon: '✅', label: 'Checklist 25 tiêu chí chọn trường mầm non (PDF)', url: 'https://media.truongvietanh.com/docs/checklist-chon-truong-mam-non-2026.pdf' },
      { icon: '📋', label: '10 câu hỏi bắt buộc khi tham quan trường mầm non', url: 'https://media.truongvietanh.com/docs/checklist-chon-truong-mam-non-2026.pdf' },
      { icon: '🎒', label: 'Danh sách đồ dùng cần chuẩn bị cho bé vào lớp', url: 'https://media.truongvietanh.com/docs/checklist-chon-truong-mam-non-2026.pdf' },
      { icon: '📅', label: 'Timeline nhập học mầm non 2026–2027', url: 'https://media.truongvietanh.com/docs/checklist-chon-truong-mam-non-2026.pdf' },
    ],
    cta: { text: '📥 Tải checklist mầm non ngay', url: 'https://media.truongvietanh.com/docs/checklist-chon-truong-mam-non-2026.pdf' },
  },
};

async function sendSqueezeResourceEmail(data, env, contactId, ghlApiKey) {
  const source = data.source || data.funnelCode || '';
  const res = SQUEEZE_RESOURCES[source] || {
    title: 'Tài liệu từ Trường Việt Anh',
    subject: '✅ Đăng ký thành công — Trường Việt Anh',
    intro: 'Cảm ơn Ba/Mẹ đã đăng ký. Tư vấn viên sẽ liên hệ trong 24 giờ.',
    items: [],
    cta: { text: '💬 Chat Zalo ngay', url: 'https://zalo.me/1678310120468101523' },
  };

  const nameParts = (data.fullName || '').trim().split(/\s+/);
  const firstName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0] || 'Ba/Mẹ';

  const html = `<!doctype html><html><head><meta charset="UTF-8"/></head><body style="font-family:Arial,Helvetica,sans-serif;background:#f4f6f9;margin:0;padding:32px 16px;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
  <tr>
    <td style="background:#26275D;padding:24px;text-align:center;border-bottom:3px solid #f9dd0e;">
      <img src="https://truongvietanh.com/logo-th-thcs-thpt.png" alt="Trường Việt Anh" height="60" style="background:#fff;padding:6px 16px;border-radius:8px;display:block;margin:0 auto 12px;"/>
    </td>
  </tr>
  <tr>
    <td style="padding:36px 36px 28px;text-align:center;">
      <p style="font-size:36px;margin:0 0 12px;">🎉</p>
      <h2 style="color:#26275D;font-size:20px;font-family:Arial,sans-serif;margin:0 0 16px;">Cảm ơn bạn đã đăng ký!</h2>
      <p style="color:#444;font-size:15px;line-height:1.8;margin:0 0 12px;">
        Chúng tôi đã nhận được thông tin của bạn.
      </p>
      <p style="color:#444;font-size:15px;line-height:1.8;margin:0 0 20px;">
        Vui lòng <strong style="color:#26275D;">đợi vài phút</strong>, tài liệu sẽ được gửi đến email của bạn ngay sau đây.
      </p>
      <p style="color:#999;font-size:13px;margin:0;">
        Nếu không thấy email, hãy kiểm tra thư mục <strong>Spam</strong> hoặc <strong>Promotions</strong>.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding:0 36px 28px;text-align:center;">
      <a href="https://zalo.me/0916961409" style="display:inline-block;background:#0068FF;color:#fff;padding:13px 28px;border-radius:10px;font-family:Arial,sans-serif;font-weight:700;font-size:14px;text-decoration:none;">
        💬 Chat Zalo để được hỗ trợ nhanh hơn
      </a>
    </td>
  </tr>
  <tr>
    <td style="background:#26275D;padding:16px;text-align:center;">
      <p style="color:rgba(255,255,255,.6);font-size:12px;font-family:Arial,sans-serif;margin:0;">
        Trường Việt Anh — <a href="https://truongvietanh.com" style="color:#f9dd0e;text-decoration:none;">truongvietanh.com</a> — Hotline: 0916 961 409
      </p>
    </td>
  </tr>
</table>
</td></tr></table>
</body></html>`;

  // NOTE: GHL workflow (addContactToWorkflow) đã tự gửi email welcome/resource ở bước 1.
  // Không gọi sendEmailViaGHL ở đây để tránh user nhận 2 email trùng từ cùng sender (duong@reply.truongvietanh.com).
  // MailChannels bên dưới gửi email xác nhận tức thì từ sender khác (tailieu@truongvietanh.com).
  try {
    await fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: data.email, name: data.fullName || firstName }] }],
        from: { email: 'tailieu@truongvietanh.com', name: 'Trường Việt Anh — Tài liệu' },
        reply_to: { email: 'tu@truongvietanh.com', name: 'Ban Tuyển sinh Việt Anh' },
        subject: res.subject,
        content: [{ type: 'text/html', value: html }],
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

// ============================================================
// === KHIẾU NẠI — endpoint riêng, KHÔNG fan-out GHL/Pancake ===
// ============================================================

const KHIEU_NAI_DPO_EMAIL = 'tu@truongvietanh.com';
const KHIEU_NAI_CHU_TICH_EMAIL = 'duong@truongvietanh.com';

// Cơ sở → email hiệu trưởng (đầu mối tiếp nhận theo Quy trình Khiếu nại v1.0)
const KHIEU_NAI_DAU_MOI = {
  'vietanh-govap':   { ten: 'Ông Phạm Nguyễn Phương Duy', email: 'phuongduy@truongvietanh.com', coSo: 'Việt Anh Gò Vấp' },
  'vietanh-binhtan': { ten: 'Bà Trần Thị Ngọc Tuyền',     email: 'tuyen@truongvietanh.com',     coSo: 'Việt Anh Bình Tân' },
  'mgis':            { ten: 'Ông Phạm Nhựt',              email: 'nhut.pham@mgis.edu.vn',       coSo: 'MGIS (Mekong Xanh)' },
  'vietanh-nhanle':  { ten: 'Ông Nguyễn Duy Khải',        email: 'khai.nguyen@truongvietanh.com', coSo: 'Việt Anh Nhân Lễ' },
  'vietanh-thaison': { ten: 'Ông Nguyễn Duy Khải',        email: 'khai.nguyen@truongvietanh.com', coSo: 'Việt Anh Thái Sơn' },
  'he-thong':        { ten: 'Bà Phạm Thị Cẩm Tú (Phó CT)', email: 'tu@truongvietanh.com',        coSo: 'Liên quan nhiều cơ sở / Toàn hệ thống' },
  'khac':            { ten: 'Bà Phạm Thị Cẩm Tú (Phó CT)', email: 'tu@truongvietanh.com',        coSo: 'Khác / Chưa rõ' },
};

async function handleKhieuNaiSubmission(request, env) {
  let data;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
  }

  // === Validation: required fields ===
  const required = ['name', 'phone', 'email', 'co_so', 'noi_dung'];
  for (const field of required) {
    if (!data[field] || !String(data[field]).trim()) {
      return jsonResponse({ ok: false, error: 'missing_field', field }, 400);
    }
  }
  // 3 checkbox cam kết bắt buộc
  if (!data.cam_doan || !data.cam_ket_bao_mat || !data.dong_y_dieu_khoan) {
    return jsonResponse({ ok: false, error: 'missing_consent' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return jsonResponse({ ok: false, error: 'invalid_email' }, 400);
  }

  const phone = normalizePhone(data.phone);
  const name = String(data.name).trim();
  const email = String(data.email).trim().toLowerCase();
  const coSoKey = String(data.co_so).trim();
  const dauMoi = KHIEU_NAI_DAU_MOI[coSoKey] || KHIEU_NAI_DAU_MOI['khac'];

  // === Idempotency: cùng email + cùng noi_dung snippet trong vòng 1 giờ → reject ===
  if (env.LEAD_DEDUPE) {
    try {
      const snippet = String(data.noi_dung).slice(0, 80).toLowerCase().replace(/\s+/g, ' ');
      const hourBucket = Math.floor(Date.now() / 3600000);
      const raw = `kn:${email}|${snippet}|${hourBucket}`;
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
      const dupeKey = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
      const existing = await env.LEAD_DEDUPE.get(`kn:${dupeKey}`);
      if (existing) {
        return jsonResponse({ ok: false, error: 'duplicate', ma_khieu_nai: existing }, 409);
      }
      // Sẽ put sau khi cấp mã
      var _dedupeKey = `kn:${dupeKey}`;
    } catch {}
  }

  // === Cấp mã khiếu nại: KN-YYYYMMDD-XXXX ===
  const now = new Date();
  const ymd = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(3)))
    .map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase().slice(0, 5);
  const maKhieuNai = `KN-${ymd}-${rand}`;

  if (env.LEAD_DEDUPE && typeof _dedupeKey === 'string') {
    try {
      await env.LEAD_DEDUPE.put(_dedupeKey, maKhieuNai, { expirationTtl: 3600 });
    } catch {}
  }

  // === Email payload chung ===
  const relationLabel = {
    'phu-huynh': 'Phụ huynh',
    'nguoi-giam-ho': 'Người giám hộ hợp pháp',
    'hoc-sinh': 'Học sinh',
    'cuu-hoc-sinh': 'Cựu học sinh',
    'nhan-vien': 'Nhân viên / Cựu nhân viên',
    'khac': 'Khác',
  }[data.relation] || '—';

  const ipAddr = request.headers.get('CF-Connecting-IP') || '—';
  const userAgent = data.user_agent || '—';
  const submittedAt = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  // === Email cho NỘI BỘ (DPO + hiệu trưởng cơ sở) ===
  const internalSubject = `[KHIẾU NẠI ${maKhieuNai}] ${dauMoi.coSo} — ${escHtml(name)}`;
  const internalBody = `
<div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:20px;background:#f5f7fa;">
  <div style="background:#26275D;color:#fff;padding:18px 20px;border-radius:8px 8px 0 0;">
    <h2 style="margin:0;font-size:18px;">🔔 Đơn khiếu nại mới — ${escHtml(maKhieuNai)}</h2>
    <p style="margin:6px 0 0;font-size:13px;opacity:0.9;">Theo Quy trình Giải quyết Khiếu nại v1.0 · SLA xác nhận: 3 ngày làm việc</p>
  </div>
  <div style="background:#fff;padding:20px;border-radius:0 0 8px 8px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:700;width:38%;">Mã khiếu nại</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-family:monospace;font-size:15px;color:#26275D;">${escHtml(maKhieuNai)}</td></tr>
      <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:700;">Cơ sở liên quan</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;"><strong>${escHtml(dauMoi.coSo)}</strong></td></tr>
      <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:700;">Đầu mối xử lý</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${escHtml(dauMoi.ten)} — <a href="mailto:${escHtml(dauMoi.email)}">${escHtml(dauMoi.email)}</a></td></tr>
      <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:700;">Họ tên người khiếu nại</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${escHtml(name)}</td></tr>
      <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:700;">Mối quan hệ với HS</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${escHtml(relationLabel)}</td></tr>
      <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:700;">Số điện thoại</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;"><a href="tel:${escHtml(phone)}">${escHtml(phone)}</a></td></tr>
      <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:700;">Email</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;"><a href="mailto:${escHtml(email)}">${escHtml(email)}</a></td></tr>
      <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:700;">Nhân sự liên quan</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${escHtml(data.nhan_su || '—')}</td></tr>
      <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:700;">Thời gian / địa điểm</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${escHtml(data.thoi_gian || '—')}</td></tr>
    </table>

    <h3 style="margin:18px 0 8px;color:#26275D;font-size:15px;">📝 Mô tả vụ việc</h3>
    <div style="background:#f8fafc;padding:12px 14px;border-left:4px solid #26275D;border-radius:4px;white-space:pre-wrap;font-size:14px;line-height:1.6;">${escHtml(data.noi_dung)}</div>

    <h3 style="margin:18px 0 8px;color:#26275D;font-size:15px;">🎯 Mong muốn giải quyết</h3>
    <div style="background:#f8fafc;padding:12px 14px;border-left:4px solid #f59e0b;border-radius:4px;white-space:pre-wrap;font-size:14px;line-height:1.6;">${escHtml(data.mong_muon || '(Không nêu)')}</div>

    <div style="background:#fef3c7;border:1px solid #fbbf24;border-radius:6px;padding:12px;margin-top:18px;font-size:13px;color:#78350f;">
      <strong>⚠️ Hành động cần thực hiện (theo SLA):</strong><br>
      • <strong>Trong 3 ngày làm việc</strong>: gửi xác nhận tiếp nhận đến người khiếu nại (đã tự động gửi email xác nhận kèm mã ${escHtml(maKhieuNai)}).<br>
      • <strong>Trong 5 ngày tiếp theo</strong>: phân loại mức độ và phân công điều tra viên.<br>
      • <strong>Trong 30 ngày làm việc</strong>: gửi văn bản trả lời chính thức (có thể gia hạn lên 60 ngày nếu phức tạp).<br>
      • Nếu liên quan <strong>an toàn học sinh</strong>: báo CT HĐT trong 2 giờ, phản hồi sơ bộ trong 24 giờ.<br>
      • Nếu là <strong>yêu cầu dữ liệu cá nhân</strong> (NĐ 13/2023): phản hồi cứng 72 giờ.
    </div>

    <table style="width:100%;border-collapse:collapse;font-size:12px;color:#64748b;margin-top:18px;">
      <tr><td style="padding:4px 8px;">Gửi lúc</td><td style="padding:4px 8px;">${escHtml(submittedAt)} (giờ VN)</td></tr>
      <tr><td style="padding:4px 8px;">IP</td><td style="padding:4px 8px;font-family:monospace;">${escHtml(ipAddr)}</td></tr>
      <tr><td style="padding:4px 8px;">User-Agent</td><td style="padding:4px 8px;font-family:monospace;font-size:11px;">${escHtml(userAgent.slice(0, 200))}</td></tr>
      <tr><td style="padding:4px 8px;">Trang gửi</td><td style="padding:4px 8px;"><a href="${escHtml(data.page || '')}">${escHtml(data.page || '—')}</a></td></tr>
    </table>
  </div>
</div>`.trim();

  // === Email xác nhận cho NGƯỜI KHIẾU NẠI ===
  const userSubject = `[Trường Việt Anh] Đã tiếp nhận đơn khiếu nại của bạn — Mã ${maKhieuNai}`;
  const userBody = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
  <div style="background:linear-gradient(135deg,#26275D,#1e3a8a);color:#fff;padding:24px 20px;border-radius:8px 8px 0 0;text-align:center;">
    <h2 style="margin:0;font-size:20px;">✓ Đã tiếp nhận đơn khiếu nại</h2>
    <p style="margin:10px 0 0;font-size:14px;opacity:0.9;">Hệ thống Trường Việt Anh</p>
  </div>
  <div style="background:#fff;padding:24px 20px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">
    <p style="font-size:15px;color:#0f172a;margin:0 0 16px;">Kính gửi <strong>${escHtml(name)}</strong>,</p>
    <p style="font-size:14px;color:#334155;line-height:1.6;margin:0 0 16px;">Trường Việt Anh đã nhận được đơn khiếu nại của quý vị. Mã khiếu nại để tra cứu và bổ sung tài liệu:</p>

    <div style="background:#f0fdf4;border:2px dashed #10b981;border-radius:8px;padding:18px;text-align:center;margin:16px 0;">
      <p style="margin:0 0 6px;font-size:13px;color:#065f46;">MÃ KHIẾU NẠI</p>
      <p style="margin:0;font-family:'Courier New',monospace;font-size:22px;font-weight:800;color:#065f46;letter-spacing:0.05em;">${escHtml(maKhieuNai)}</p>
    </div>

    <h3 style="color:#26275D;font-size:15px;margin:20px 0 10px;">⏱ Thời hạn cam kết</h3>
    <ul style="font-size:14px;color:#334155;line-height:1.7;padding-left:20px;margin:0;">
      <li>Xác nhận tiếp nhận & phân công đầu mối: <strong>03 ngày làm việc</strong></li>
      <li>Văn bản trả lời chính thức: tối đa <strong>30 ngày làm việc</strong> (có thể gia hạn 60 ngày với vụ phức tạp — sẽ thông báo trước)</li>
      <li>Yêu cầu liên quan dữ liệu cá nhân (NĐ 13/2023): <strong>72 giờ</strong> (không gia hạn)</li>
      <li>Khẩn cấp an toàn học sinh: phản hồi sơ bộ trong <strong>24 giờ</strong></li>
    </ul>

    <h3 style="color:#26275D;font-size:15px;margin:20px 0 10px;">📎 Gửi tài liệu bổ sung</h3>
    <p style="font-size:14px;color:#334155;line-height:1.6;margin:0;">Nếu quý vị có tài liệu, hình ảnh, video chứng cứ, vui lòng gửi qua email <a href="mailto:${KHIEU_NAI_DPO_EMAIL}" style="color:#26275D;font-weight:600;">${KHIEU_NAI_DPO_EMAIL}</a> và <strong>ghi rõ mã ${escHtml(maKhieuNai)}</strong> trong tiêu đề email.</p>

    <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:12px 16px;margin:20px 0;border-radius:4px;">
      <p style="margin:0;font-size:14px;color:#78350f;line-height:1.5;">
        <strong>⚠️ Nếu khẩn cấp về an toàn học sinh</strong>, vui lòng gọi ngay Hotline <a href="tel:0916961409" style="color:#b45309;font-weight:800;">0916&nbsp;961&nbsp;409</a> để được hỗ trợ ngay.
      </p>
    </div>

    <h3 style="color:#26275D;font-size:15px;margin:20px 0 10px;">🤝 Cam kết của Trường</h3>
    <ul style="font-size:14px;color:#334155;line-height:1.7;padding-left:20px;margin:0;">
      <li><strong>Bảo mật</strong> danh tính người khiếu nại theo Quy trình v1.0</li>
      <li><strong>Không trả thù</strong> dưới bất kỳ hình thức nào với người khiếu nại có thiện chí</li>
      <li><strong>Miễn phí</strong> hoàn toàn quá trình tiếp nhận và giải quyết</li>
    </ul>

    <p style="font-size:14px;color:#334155;margin:20px 0 0;line-height:1.6;">Trân trọng,<br><strong>Ban Pháp chế — Hệ thống Trường Việt Anh</strong><br>Email: <a href="mailto:${KHIEU_NAI_DPO_EMAIL}" style="color:#26275D;">${KHIEU_NAI_DPO_EMAIL}</a> · Hotline: <a href="tel:0916961409" style="color:#26275D;">0916 961 409</a></p>

    <p style="font-size:12px;color:#94a3b8;margin-top:20px;text-align:center;border-top:1px solid #e2e8f0;padding-top:14px;">Email tự động xác nhận từ <a href="https://truongvietanh.com/khieu-nai" style="color:#94a3b8;">truongvietanh.com/khieu-nai</a> · Vui lòng không reply email này.</p>
  </div>
</div>`.trim();

  // === Gửi 2 email song song ===
  // Email 1: nội bộ (DPO + hiệu trưởng cơ sở + CC chủ tịch)
  // Email 2: xác nhận cho người khiếu nại
  const internalTo = [{ email: KHIEU_NAI_DPO_EMAIL, name: 'Ban Pháp chế Việt Anh' }];
  if (dauMoi.email && dauMoi.email !== KHIEU_NAI_DPO_EMAIL) {
    internalTo.push({ email: dauMoi.email, name: dauMoi.ten });
  }

  const sendInternal = fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{
        to: internalTo,
        cc: [{ email: KHIEU_NAI_CHU_TICH_EMAIL, name: 'Chủ tịch HĐT' }],
      }],
      from: { email: 'phap-che@truongvietanh.com', name: 'Hệ thống Khiếu nại Việt Anh' },
      reply_to: { email: email, name: name },
      subject: internalSubject,
      content: [{ type: 'text/html', value: internalBody }],
    }),
  }).catch(() => null);

  const sendUser = fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: email, name: name }] }],
      from: { email: 'phap-che@truongvietanh.com', name: 'Trường Việt Anh - Ban Pháp chế' },
      reply_to: { email: KHIEU_NAI_DPO_EMAIL, name: 'DPO Trường Việt Anh' },
      subject: userSubject,
      content: [{ type: 'text/html', value: userBody }],
    }),
  }).catch(() => null);

  await Promise.allSettled([sendInternal, sendUser]);

  return jsonResponse({
    ok: true,
    ma_khieu_nai: maKhieuNai,
    co_so: dauMoi.coSo,
    dau_moi: dauMoi.ten,
    sla: {
      xac_nhan: '3 ngày làm việc',
      phan_hoi: '30 ngày làm việc (tối đa 60 nếu phức tạp)',
      khan_cap: '24 giờ',
      du_lieu_ca_nhan: '72 giờ',
    },
  });
}

function escHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}
