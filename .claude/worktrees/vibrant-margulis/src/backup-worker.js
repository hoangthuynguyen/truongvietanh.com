/**
 * backup-worker.js
 * Proxy backup.truongvietanh.com → truongvietanh.com (WordPress origin)
 * Giữ nguyên Host header để WordPress không redirect.
 */
export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = 'truongvietanh.com';

    const proxyRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    });

    const response = await fetch(proxyRequest);

    // Rewrite Location header nếu WP redirect về truongvietanh.com → backup.truongvietanh.com
    const location = response.headers.get('location');
    if (location && location.includes('truongvietanh.com')) {
      const newLocation = location.replace(
        /https?:\/\/truongvietanh\.com/g,
        'https://backup.truongvietanh.com'
      );
      const newHeaders = new Headers(response.headers);
      newHeaders.set('location', newLocation);
      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    }

    return response;
  },
};
