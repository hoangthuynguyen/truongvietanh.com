/**
 * Gỡ dữ liệu cá nhân (tên / email / SĐT phụ huynh, tên bé) khỏi URL TRƯỚC khi GTM chạy.
 *
 * Vì sao: GTM-TMPPWX29 đọc cả URL (page_location của GA4/Google Ads; pixel Meta/TikTok/Zalo
 * đọc document.location) → `?name=…&email=…` trên trang cảm ơn bị gửi thẳng cho bên thứ ba.
 *
 * Cách dùng: đặt `<script is:inline set:html={stripUrlPiiScript(['name'])} />` làm thẻ ĐẦU TIÊN
 * trong <head> (trước mọi snippet GTM/gtag/pixel). Script:
 *  1. chỉ giữ lại trong bộ nhớ các khoá trang thật sự cần hiển thị (`keep`, mặc định `name`)
 *     → `window.__vaQS` (chuỗi dạng "?name=…", đọc bằng `new URLSearchParams(window.__vaQS)`),
 *     kèm sessionStorage để tải lại trang vẫn chào đúng tên;
 *  2. xoá mọi khoá cá nhân khỏi URL bằng history.replaceState — GIỮ utm_*, funnel, source,
 *     campus, score… (không phải dữ liệu cá nhân).
 * Email / SĐT KHÔNG được cất ở đâu cả (trừ khi trang tự khai trong `keep`).
 *
 * Cùng cơ chế với script `window.__vaQS` trên các trang cảm ơn riêng (commit 095282fe)
 * và public/school-tour (?id=).
 */
export const URL_PII_KEYS = [
  'name', 'ten', 'ho_ten', 'hoten', 'ho_va_ten', 'fullname', 'full_name',
  'parent_name', 'ten_phu_huynh', 'ten_ph',
  'email', 'mail', 'parent_email',
  'phone', 'parent_phone', 'sdt', 'so_dien_thoai', 'dien_thoai', 'tel', 'mobile',
  'ten_be', 'ten_hs', 'child', 'child_name', 'student_name',
];

export function stripUrlPiiScript(keep: string[] = ['name']): string {
  const K = JSON.stringify(URL_PII_KEYS);
  const KEEP = JSON.stringify(keep.map((k) => k.toLowerCase()));
  return `/* strip parent name/email/phone from the URL before GTM runs - see src/lib/strip-url-pii.ts */
(function(){try{var K=${K},KEEP=${KEEP},u=new URL(location.href),q=u.searchParams,k='va_qs:'+u.pathname.replace(/\\/+$/,''),m=new URLSearchParams(),d=[];q.forEach(function(v,x){var l=x.toLowerCase();if(K.indexOf(l)>-1||KEEP.indexOf(l)>-1){d.push(x);if(KEEP.indexOf(l)>-1&&v&&!m.has(l))m.set(l,v)}});var s=m.toString();s=s?'?'+s:'';if(d.length){d.forEach(function(x){q.delete(x)});try{if(s)sessionStorage.setItem(k,s);else sessionStorage.removeItem(k)}catch(e){}history.replaceState(history.state,'',u.pathname+u.search+u.hash)}else{try{s=sessionStorage.getItem(k)||''}catch(e){}}window.__vaQS=s}catch(e){}})();`;
}
