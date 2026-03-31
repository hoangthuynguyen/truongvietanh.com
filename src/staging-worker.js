/**
 * Minimal Worker script cho staging environment.
 *
 * Mục đích: cho phép dùng Workers Routes (thay vì Custom Domain bị lỗi DNS).
 * Static-assets-only Workers không có FetchEvent handler nên không dùng được Routes.
 * Script này đơn giản proxy mọi request đến static assets.
 */
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
