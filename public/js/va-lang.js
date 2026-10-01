/* =====================================================================
   va-lang.js — BỘ CHỌN NGÔN NGỮ DÙNG CHUNG (bản 1, 01/10/2026)

   8 ngôn ngữ: Việt (gốc), Anh, Hàn, Nhật, Trung, Pháp, Đức, Phần Lan.
   Nội dung gốc của site là tiếng Việt; 7 ngôn ngữ còn lại do Google
   Translate dịch NGAY TRÊN TRÌNH DUYỆT của người xem.

   CÁCH DÙNG
   - Chỗ nào muốn hiện nút chọn ngôn ngữ: đặt <div data-va-lang></div> rồi
     nạp <script src="/js/va-lang.js" is:inline defer></script>.
   - Trang không có nút (landing page quảng cáo) vẫn tự dịch theo ngôn ngữ
     khách đã chọn, nhờ đoạn nạp trong astro.config.mjs (integration "va-lang").
   - Mở thẳng một ngôn ngữ bằng link: ?lang=en | ko | ja | zh | fr | de | fi | vi

   GIỚI HẠN CỦA BẢN 1 — đọc trước khi "tinh chỉnh":
   - Bot tìm kiếm và mô hình AI KHÔNG thấy bản dịch (HTML gốc vẫn tiếng Việt,
     không có URL riêng /en/, không có hreflang). Muốn có SEO/AEO tiếng nước
     ngoài phải dựng trang dịch thật — đó là bước sau.
   - Chỗ nào KHÔNG được dịch (tên riêng, mã lớp…): thêm class="notranslate".
   - Người xem tiếng Việt KHÔNG tải gì của Google: script Google chỉ được nạp
     khi đã chọn ngôn ngữ khác.
   ===================================================================== */
(function () {
  if (window.__vaLang) return;

  var LANGS = [
    { code: 'vi', gt: 'vi',    label: 'Tiếng Việt' },
    { code: 'en', gt: 'en',    label: 'English' },
    { code: 'ko', gt: 'ko',    label: '한국어' },
    { code: 'ja', gt: 'ja',    label: '日本語' },
    { code: 'zh', gt: 'zh-CN', label: '中文' },
    { code: 'fr', gt: 'fr',    label: 'Français' },
    { code: 'de', gt: 'de',    label: 'Deutsch' },
    { code: 'fi', gt: 'fi',    label: 'Suomi' }
  ];

  function timLang(code) {
    code = String(code || '').toLowerCase();
    for (var i = 0; i < LANGS.length; i++) {
      if (LANGS[i].code === code || LANGS[i].gt.toLowerCase() === code) return LANGS[i];
    }
    return null;
  }

  /* ---- Lưu lựa chọn: cookie googtrans là thứ Google Translate tự đọc ---- */
  function tenMienGoc() {
    var h = location.hostname;
    if (h === 'localhost' || /^[\d.]+$/.test(h) || h.indexOf('.') < 0) return '';
    return '.' + h.split('.').slice(-2).join('.');
  }
  function ghiCookie(giaTri, hetHan) {
    var duoi = '; path=/' + (hetHan ? '; expires=' + hetHan : '; max-age=31536000') + '; SameSite=Lax';
    document.cookie = 'googtrans=' + giaTri + duoi;
    var goc = tenMienGoc();
    if (goc) document.cookie = 'googtrans=' + giaTri + duoi + '; domain=' + goc;
  }
  function docLang() {
    var m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]*\/([^;]+)/);
    return (m && timLang(decodeURIComponent(m[1]))) || LANGS[0];
  }
  function datLang(lang) {
    if (lang.code === 'vi') ghiCookie('', 'Thu, 01 Jan 1970 00:00:00 GMT');
    else ghiCookie('/vi/' + lang.gt);
  }

  /* ---- ?lang=xx trên URL: mở thẳng một ngôn ngữ ---- */
  var thamSo = (location.search.match(/[?&]lang=([A-Za-z-]+)/) || [])[1];
  var tuUrl = thamSo && timLang(thamSo);
  if (tuUrl) datLang(tuUrl);

  var hienTai = docLang();

  function chon(code) {
    var lang = timLang(code);
    if (!lang || lang.code === hienTai.code) return;
    datLang(lang);
    // Bỏ ?lang= cũ để nó không ghi đè lựa chọn mới sau khi tải lại
    try {
      var p = new URLSearchParams(location.search);
      if (p.has('lang')) {
        p.delete('lang');
        var s = p.toString();
        history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + location.hash);
      }
    } catch (e) { /* trình duyệt cũ: cứ tải lại */ }
    location.reload();
  }

  window.__vaLang = { langs: LANGS, current: function () { return hienTai.code; }, set: chon };

  /* ---- Kiểu dáng: tự mang theo để chạy được trên mọi layout ---- */
  var css =
    '.va-lang{position:relative;display:inline-block;font-family:Inter,system-ui,sans-serif;line-height:1}' +
    '.va-lang__nut{display:inline-flex;align-items:center;gap:.35rem;box-sizing:border-box;min-height:30px;padding:.2rem .6rem;' +
      'background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.35);border-radius:999px;' +
      'color:inherit;font:inherit;font-size:.85rem;font-weight:600;cursor:pointer;white-space:nowrap}' +
    '.va-lang__nut:hover{background:rgba(255,255,255,.22)}' +
    '.va-lang__nut:focus-visible{outline:2px solid #f9dd0e;outline-offset:2px}' +
    '.va-lang__nut svg{flex-shrink:0}' +
    '.va-lang[data-nen="sang"] .va-lang__nut{background:#f1f5f9;border-color:#cbd5e1;color:#26275D}' +
    '.va-lang[data-nen="sang"] .va-lang__nut:hover{background:#e2e8f0}' +
    '.va-lang__ds{position:absolute;top:calc(100% + 6px);right:0;z-index:10000;min-width:170px;margin:0;padding:.35rem;' +
      'list-style:none;background:#fff;border:1px solid #e2e8f0;border-radius:12px;' +
      'box-shadow:0 12px 32px rgba(15,23,42,.18)}' +
    '.va-lang[data-canh="trai"] .va-lang__ds{right:auto;left:0}' +
    '.va-lang[data-huong="len"] .va-lang__ds{top:auto;bottom:calc(100% + 6px)}' +
    '.va-lang__ds[hidden]{display:none}' +
    '.va-lang__muc{display:flex;align-items:center;justify-content:space-between;gap:.75rem;width:100%;' +
      'min-height:40px;padding:.5rem .7rem;background:none;border:0;border-radius:8px;' +
      'color:#26275D;font:inherit;font-size:.92rem;font-weight:500;text-align:left;cursor:pointer}' +
    '.va-lang__muc:hover,.va-lang__muc:focus-visible{background:#f1f5f9;outline:none}' +
    '.va-lang__muc[aria-current="true"]{font-weight:700;background:#fef9c3}' +
    '.va-lang__ma{font-size:.72rem;font-weight:700;color:#64748b;letter-spacing:.04em}' +
    /* Giấu thanh công cụ + bong bóng của Google Translate */
    '#va-gt{display:none!important}' +
    'body{top:0!important}' +
    '.goog-te-banner-frame,iframe.skiptranslate,body>.skiptranslate,#goog-gt-tt,.goog-te-balloon-frame,' +
      '.goog-tooltip,.VIpgJd-ZVi9od-ORHb-OEVmcd,.VIpgJd-ZVi9od-aZ2wEe-wOHMyf,.VIpgJd-ZVi9od-aZ2wEe-OiiCO{display:none!important}' +
    '.goog-text-highlight,.VIpgJd-yAWNEb-VIpgJd-fmcmS-sn54Q{background:none!important;box-shadow:none!important}';
  var the = document.createElement('style');
  the.id = 'va-lang-css';
  the.textContent = css;
  document.head.appendChild(the);

  /* ---- Dựng nút chọn ngôn ngữ vào mọi chỗ có data-va-lang ---- */
  var ICON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/>' +
    '<path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
  var soThuTu = 0;

  function dung(cho) {
    if (cho.getAttribute('data-va-lang-xong')) return;
    cho.setAttribute('data-va-lang-xong', '1');
    var id = 'va-lang-ds-' + (++soThuTu);

    var hop = document.createElement('div');
    hop.className = 'va-lang notranslate';
    hop.setAttribute('translate', 'no');
    if (cho.getAttribute('data-nen')) hop.setAttribute('data-nen', cho.getAttribute('data-nen'));
    if (cho.getAttribute('data-canh')) hop.setAttribute('data-canh', cho.getAttribute('data-canh'));
    if (cho.getAttribute('data-huong')) hop.setAttribute('data-huong', cho.getAttribute('data-huong'));

    var nut = document.createElement('button');
    nut.type = 'button';
    nut.className = 'va-lang__nut';
    nut.setAttribute('aria-haspopup', 'true');
    nut.setAttribute('aria-expanded', 'false');
    nut.setAttribute('aria-controls', id);
    nut.setAttribute('aria-label', 'Ngôn ngữ / Language: ' + hienTai.label);
    nut.innerHTML = ICON + '<span>' + hienTai.code.toUpperCase() + '</span>' +
      '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

    var ds = document.createElement('ul');
    ds.className = 'va-lang__ds';
    ds.id = id;
    ds.hidden = true;
    LANGS.forEach(function (l) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'va-lang__muc';
      b.setAttribute('lang', l.gt);
      if (l.code === hienTai.code) b.setAttribute('aria-current', 'true');
      b.innerHTML = '<span>' + l.label + '</span><span class="va-lang__ma">' + l.code.toUpperCase() + '</span>';
      b.addEventListener('click', function () { dong(); chon(l.code); });
      li.appendChild(b);
      ds.appendChild(li);
    });

    function mo() { ds.hidden = false; nut.setAttribute('aria-expanded', 'true'); }
    function dong() { ds.hidden = true; nut.setAttribute('aria-expanded', 'false'); }
    nut.addEventListener('click', function (e) {
      e.stopPropagation();
      if (ds.hidden) mo(); else dong();
    });
    document.addEventListener('click', function (e) { if (!hop.contains(e.target)) dong(); });
    hop.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !ds.hidden) { dong(); nut.focus(); }
    });

    hop.appendChild(nut);
    hop.appendChild(ds);
    cho.appendChild(hop);
  }

  function dungTatCa() {
    var ds = document.querySelectorAll('[data-va-lang]');
    for (var i = 0; i < ds.length; i++) dung(ds[i]);
  }

  /* ---- Giữ nguyên giá trị form gửi đi ----
     Google Translate dịch cả chữ trong <option>. Option nào không có thuộc tính
     value thì giá trị gửi đi chính là chữ hiển thị -> sẽ thành tiếng nước ngoài,
     CRM (dropdown Pancake) không nhận và loại cả lead. Chốt value = chữ tiếng
     Việt gốc TRƯỚC khi dịch. */
  function chotGiaTriOption(goc) {
    var ds = (goc || document).querySelectorAll('option:not([value])');
    for (var i = 0; i < ds.length; i++) ds[i].setAttribute('value', ds[i].textContent.trim());
  }

  /* ---- Giữ nguyên tên riêng ----
     Máy dịch làm hỏng tên riêng tiếng Việt: khi thử 01/10/2026, "Gò Vấp" bị dịch
     sang tiếng Hàn thành "người dùng thuốc lá điện tử" (Vấp ~ vape), "Trường Việt
     Anh" thành "Trường Việt Nam". Vì vậy TRƯỚC khi dịch, bọc các tên dưới đây
     trong thẻ <va-ten class="notranslate"> để Google để nguyên. (Dùng thẻ riêng
     chứ không dùng <span>: nhiều trang có CSS kiểu "h2 span{...}" sẽ làm tên bị
     đổi cỡ chữ.)

     THÊM TÊN MỚI VÀO ĐÂY (tên trường, cơ sở, đường, chương trình riêng). Mỗi dòng:
     [tên tiếng Việt]  hoặc  [tên tiếng Việt, chữ hiện thay cho mọi ngôn ngữ khác].
     Tên dài đặt TRƯỚC tên ngắn. Tên người thì gắn class="notranslate" ngay trong trang.

     TÊN_QUỐC_TẾ: tên trường hiện ra ở 7 ngôn ngữ nước ngoài. Chưa ai chốt tên tiếng
     Anh chính thức — đang để "Viet Anh School". Có tên chính thức thì sửa đúng 1 dòng này. */
  var TEN_QUOC_TE = 'Viet Anh School';
  var GIU_NGUYEN = [
    ['Trường Việt Anh', TEN_QUOC_TE],
    ['Việt Anh'], ['Viet Anh'],
    ['Gò Vấp'], ['Bình Tân'], ['Cần Giuộc'], ['Rạch Giá'], ['Thái Sơn'],
    ['Phan Huy Ích'], ['Lê Đức Thọ'], ['Tân Tạo']
  ];
  function chuanHoa(t) { return t.replace(/\s+/g, ' ').toLowerCase(); }
  var THAY = {};
  var RE_GIU = new RegExp('(' + GIU_NGUYEN.map(function (m) {
    if (m[1]) THAY[chuanHoa(m[0])] = m[1];
    return m[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+');
  }).join('|') + ')', 'i');
  var KHONG_BOC = /^(SCRIPT|STYLE|TEXTAREA|OPTION|TITLE|NOSCRIPT|FONT|SELECT|IFRAME)$/;

  function bocTenRieng(goc) {
    if (!goc || !document.createTreeWalker) return;
    var w = document.createTreeWalker(goc, NodeFilter.SHOW_TEXT, null);
    var ds = [], n;
    while ((n = w.nextNode())) {
      var cha = n.parentNode;
      if (!cha || KHONG_BOC.test(cha.nodeName) || !RE_GIU.test(n.nodeValue)) continue;
      // Bỏ qua chỗ đã được bảo vệ và chữ Google đã dịch xong (nằm trong <font>)
      if (cha.closest && cha.closest('.notranslate,[translate="no"],font,va-ten')) continue;
      ds.push(n);
    }
    ds.forEach(function (nut) {
      var manh = nut.nodeValue.split(RE_GIU); // phần tử lẻ = tên riêng
      if (manh.length < 3) return;
      // Google cắt khoảng trắng (và đôi khi cả dấu "·") ở mép đoạn nó dịch, làm chữ
      // dính vào tên: "Science TeacherBình Tân". Nên kéo khoảng trắng + dấu ngăn
      // + dấu câu đứng sát tên vào chung trong thẻ được giữ nguyên.
      for (var k = 1; k < manh.length; k += 2) {
        var dau = manh[k - 1].match(/(?:\s*[·•|–—])?\s*$/)[0];
        var cuoi = manh[k + 1].match(/^[,.;:!?)]*\s*/)[0];
        manh[k - 1] = manh[k - 1].slice(0, manh[k - 1].length - dau.length);
        manh[k + 1] = manh[k + 1].slice(cuoi.length);
        manh[k] = dau + (THAY[chuanHoa(manh[k])] || manh[k]) + cuoi;
      }
      var khung = document.createDocumentFragment();
      for (var i = 0; i < manh.length; i++) {
        if (!manh[i]) continue;
        if (i % 2) {
          var sp = document.createElement('va-ten');
          sp.className = 'notranslate';
          sp.setAttribute('translate', 'no');
          sp.textContent = manh[i];
          khung.appendChild(sp);
        } else khung.appendChild(document.createTextNode(manh[i]));
      }
      nut.parentNode.replaceChild(khung, nut);
    });
  }

  function canhNoiDungMoi() {
    if (!window.MutationObserver) return;
    new MutationObserver(function (ds) {
      for (var i = 0; i < ds.length; i++) {
        var them = ds[i].addedNodes;
        for (var j = 0; j < them.length; j++) {
          var x = them[j];
          if (x.nodeType === 1 && x.nodeName !== 'FONT' && !(x.closest && x.closest('.notranslate,font'))) {
            chotGiaTriOption(x);
            bocTenRieng(x);
          }
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* ---- Nạp Google Translate — CHỈ khi đã chọn ngôn ngữ khác tiếng Việt ---- */
  function napGoogle() {
    if (document.getElementById('va-gt')) return;
    chotGiaTriOption();
    bocTenRieng(document.body);
    canhNoiDungMoi();
    var o = document.createElement('div');
    o.id = 'va-gt';
    o.className = 'notranslate';
    document.body.appendChild(o);
    window.__vaLangGoogleSanSang = function () {
      try {
        new window.google.translate.TranslateElement({
          pageLanguage: 'vi',
          includedLanguages: LANGS.slice(1).map(function (l) { return l.gt; }).join(','),
          autoDisplay: false
        }, 'va-gt');
      } catch (e) { /* Google đổi API hoặc bị chặn: trang vẫn chạy bình thường bằng tiếng Việt */ }
    };
    var s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=__vaLangGoogleSanSang';
    s.async = true;
    document.head.appendChild(s);
  }

  function khoiDong() {
    dungTatCa();
    if (hienTai.code !== 'vi') {
      // Tên khác data-va-lang để không bị nhầm là chỗ đặt nút
      document.documentElement.setAttribute('data-va-ngon-ngu', hienTai.code);
      napGoogle();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', khoiDong);
  else khoiDong();
})();
