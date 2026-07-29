/*!
 * phone-vn.js — Hiển thị prefix quốc gia "🇻🇳 +84" cho mọi ô điện thoại,
 * bật bàn phím số trên mobile. KHÔNG đổi dữ liệu gửi đi (giá trị submit giữ nguyên),
 * KHÔNG reparent input (không phá validation .form-error / CSS child-combinator).
 * Tắt toàn site: chỉ cần làm rỗng file này.
 */
(function () {
  var SEL = 'input[type="tel"], input[name="phone"], input[name="parent_phone"], input[name="sdt"]';
  var PREFIX = '🇻🇳 +84';
  // Đệm trái tạm cho tới khi đo được prefix thật. Ô điện thoại thường bị ẨN lúc
  // script chạy lần đầu (form 2 bước, modal, tab) → không đo được offsetWidth.
  // Đệm sẵn để placeholder KHÔNG BAO GIỜ nằm đè lên prefix trong lúc chờ đo.
  var FALLBACK_PAD = 68;

  function ensurePrefix(input) {
    if (input.__vnPhone) return input.__vnPhonePfx;
    input.__vnPhone = true;
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('autocomplete', 'tel');
    var ph = input.getAttribute('placeholder') || '';
    if (!ph || /^s[ốo]\s*đi[eê]?n\s*tho[ạa]i$/i.test(ph.trim()) || /điện thoại/i.test(ph)) {
      input.setAttribute('placeholder', '0912 345 678');
    }
    var parent = input.parentElement;
    if (!parent) return null;
    var cs = window.getComputedStyle(parent);
    if (cs.position === 'static') parent.style.position = 'relative';

    var pfx = document.createElement('span');
    pfx.className = 'vn-phone-cc';
    pfx.textContent = PREFIX;
    pfx.setAttribute('aria-hidden', 'true');
    pfx.style.cssText = [
      'position:absolute', 'display:flex', 'align-items:center',
      'pointer-events:none', 'white-space:nowrap', 'z-index:3',
      'font-family:inherit', 'font-size:inherit', 'line-height:normal',
      'color:#475569',
      // Vị trí mặc định: ô input gần như luôn là con đầu của .form-group nên
      // (12, 0) đã đúng. place() sẽ chỉnh lại chính xác khi ô hiện ra.
      // KHÔNG để trống left/top — nếu không prefix rơi về vị trí tĩnh (dưới ô input).
      'left:12px', 'top:0'
    ].join(';');
    parent.appendChild(pfx);
    input.__vnPhonePfx = pfx;

    // Đệm NGAY, không chờ đo — đây là thứ chặn lỗi chữ đè chữ.
    padAtLeast(input, FALLBACK_PAD);
    return pfx;
  }

  function padAtLeast(input, need) {
    var basePad = parseFloat(window.getComputedStyle(input).paddingLeft) || 0;
    if (basePad < need) input.style.paddingLeft = need + 'px';
  }

  function place(input) {
    var pfx = input.__vnPhonePfx;
    if (!pfx) return;
    // chỉ định vị khi input đang hiển thị
    if (input.offsetParent === null && input.offsetWidth === 0) return;
    var left = input.offsetLeft;
    var top = input.offsetTop;
    var h = input.offsetHeight;
    pfx.style.left = (left + 12) + 'px';
    pfx.style.top = top + 'px';
    pfx.style.height = h + 'px';
    var w = pfx.offsetWidth;
    // pad input để chữ người dùng gõ không đè lên prefix (chỉ tăng, không phá padding gốc nếu đã lớn hơn)
    if (w) padAtLeast(input, w + 18);
  }

  function enhanceAll() {
    var list = document.querySelectorAll(SEL);
    for (var i = 0; i < list.length; i++) {
      var input = list[i];
      ensurePrefix(input);
      place(input);
    }
  }

  function injectFormCss() {
    if (document.getElementById('vn-forms-square')) return;
    var l = document.createElement('link');
    l.id = 'vn-forms-square';
    l.rel = 'stylesheet';
    l.href = '/css/forms-square.css';
    (document.head || document.documentElement).appendChild(l);
  }

  // Nội dung động (form 2 bước hé lộ bước sau, modal, tab, accordion) có thể hiện ô
  // điện thoại BẤT KỲ LÚC NÀO — sau khi loạt quét mở màn đã dừng. Theo dõi DOM để
  // định vị lại, thay vì trông chờ đúng thời điểm.
  function watchDom() {
    if (!window.MutationObserver) return;
    var pending = false;
    var mo = new MutationObserver(function (records) {
      // Bỏ qua chính thay đổi do script này gây ra, tránh vòng lặp vô tận.
      var relevant = false;
      for (var i = 0; i < records.length; i++) {
        var t = records[i].target;
        if (t && t.classList && t.classList.contains('vn-phone-cc')) continue;
        if (t && t.__vnPhone && records[i].attributeName === 'style') continue;
        relevant = true;
        break;
      }
      if (!relevant || pending) return;
      pending = true;
      setTimeout(function () { pending = false; enhanceAll(); }, 50);
    });
    mo.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden']
    });
  }

  function init() {
    injectFormCss();
    enhanceAll();
    watchDom();
    // form 2 bước hé lộ step sau → định vị lại khi click / focus / resize
    document.addEventListener('focusin', function (e) {
      if (e.target && e.target.matches && e.target.matches(SEL)) { ensurePrefix(e.target); place(e.target); }
    });
    document.addEventListener('click', function () { setTimeout(enhanceAll, 60); }, true);
    window.addEventListener('resize', function () {
      var list = document.querySelectorAll(SEL);
      for (var i = 0; i < list.length; i++) place(list[i]);
    });
    // quét lại vài lần cho nội dung động
    var n = 0; var t = setInterval(function () { enhanceAll(); if (++n >= 6) clearInterval(t); }, 400);
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
