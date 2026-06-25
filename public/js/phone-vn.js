/*!
 * phone-vn.js — Hiển thị prefix quốc gia "🇻🇳 +84" cho mọi ô điện thoại,
 * bật bàn phím số trên mobile. KHÔNG đổi dữ liệu gửi đi (giá trị submit giữ nguyên),
 * KHÔNG reparent input (không phá validation .form-error / CSS child-combinator).
 * Tắt toàn site: chỉ cần làm rỗng file này.
 */
(function () {
  var SEL = 'input[type="tel"], input[name="phone"], input[name="parent_phone"], input[name="sdt"]';
  var PREFIX = '🇻🇳 +84';

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
      'color:#475569'
    ].join(';');
    parent.appendChild(pfx);
    input.__vnPhonePfx = pfx;
    return pfx;
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
    var basePad = parseFloat(window.getComputedStyle(input).paddingLeft) || 0;
    var need = w + 18;
    if (basePad < need) input.style.paddingLeft = need + 'px';
  }

  function enhanceAll() {
    var list = document.querySelectorAll(SEL);
    for (var i = 0; i < list.length; i++) {
      var input = list[i];
      ensurePrefix(input);
      place(input);
    }
  }

  function init() {
    enhanceAll();
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
