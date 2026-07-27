/*!
 * va-utm.js — bộ thu UTM DÙNG CHUNG cho mọi form lead của truongvietanh.com.
 * Thay cho bản inline vốn được chép lại ở từng trang (bản inline vẫn giữ làm dự phòng:
 * các trang gọi `window.__vaUTM || (window.__vaUTM = function(){...})` nên nếu file này
 * tải được thì bản dùng chung thắng, không tải được thì bản inline vẫn chạy).
 *
 * Khác bản inline ở 2 điểm, đều là lỗi thật đã tái hiện được trên production 27/07/2026:
 *
 *  1. LẦN CHẠM MỚI GHI ĐÈ TRỌN BỘ. Bản cũ lưu từng khoá riêng lẻ nên quảng cáo sau chỉ
 *     ghi đè những khoá nó mang theo → utm_content/utm_term của quảng cáo A còn dính vào
 *     lead của quảng cáo B trong cùng phiên, tạo bản ghi lai giữa hai chiến dịch.
 *     Nay: URL có BẤT KỲ tham số UTM nào → xoá sạch bộ cũ rồi ghi bộ mới.
 *
 *  2. pke_mkter VÀ utm_pke_mkter LÀ MỘT. File UTM builder của team sinh ra `pke_mkter`
 *     (không tiền tố), nhưng link cũ còn dùng `utm_pke_mkter`. Bản cũ giữ cả hai và
 *     worker ưu tiên `utm_pke_mkter` → người chạy của quảng cáo CŨ ăn công của quảng cáo
 *     MỚI. Nay chỉ trả về đúng một khoá `pke_mkter`, giá trị mới luôn thắng.
 *
 * Interface KHÔNG đổi: window.__vaUTM() trả object để merge vào body POST /api/lead.
 */
(function () {
  'use strict';

  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var PKE = 'pke_mkter';                              // khoá chuẩn cho "Người chạy"
  var PKE_ALIASES = ['pke_mkter', 'utm_pke_mkter'];   // link ngoài đời viết cả 2 kiểu
  var P = 'va_';

  function get(k) { try { return sessionStorage.getItem(P + k) || ''; } catch (e) { return ''; } }
  function set(k, v) { try { sessionStorage.setItem(P + k, v); } catch (e) {} }
  function del(k) { try { sessionStorage.removeItem(P + k); } catch (e) {} }

  window.__vaUTM = function () {
    var out = {};
    var fresh = {};
    var hasFresh = false;

    try {
      var q = new URLSearchParams(location.search);
      KEYS.forEach(function (k) {
        var v = q.get(k);
        if (v) { fresh[k] = v; hasFresh = true; }
      });
      for (var i = 0; i < PKE_ALIASES.length; i++) {
        var p = q.get(PKE_ALIASES[i]);
        if (p) { fresh[PKE] = p; hasFresh = true; break; }
      }
    } catch (e) {}

    if (hasFresh) {
      // Chiến dịch mới → dọn sạch dấu vết chiến dịch cũ trước khi lưu
      KEYS.forEach(del);
      PKE_ALIASES.forEach(del);
      Object.keys(fresh).forEach(function (k) { set(k, fresh[k]); });
      // Ghi kèm khoá alias để trang CHƯA migrate (còn dùng bản inline) vẫn đọc được người chạy
      if (fresh[PKE]) set('utm_pke_mkter', fresh[PKE]);
    }

    KEYS.concat([PKE]).forEach(function (k) {
      var v = fresh[k] || get(k);
      if (v) out[k] = v;
    });

    if (!out.utm_source) { out.utm_source = 'direct'; out.utm_medium = 'none'; }
    out.page_url = location.href;   // để worker bắt fbclid/gclid khi ads quên gắn UTM
    return out;
  };
})();
