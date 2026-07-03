import type { APIRoute } from 'astro';
import { readItems } from '@directus/sdk';
import { createCmsClient } from '../lib/directus';

export const GET: APIRoute = async () => {
  const client = createCmsClient();

  let posts: any[] = [];
  try {
    if (!client) throw new Error('CMS chưa cấu hình');
    posts = await client.request(
      readItems('posts', {
        fields: ['title', 'slug', 'excerpt', 'published_at'],
        filter: { status: { _eq: 'published' } },
        sort: ['-published_at'],
        limit: 50,
      })
    );
  } catch {}

  const siteUrl = 'https://truongvietanh.com';
  const items = posts.map(p => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <description><![CDATA[${p.excerpt || p.title}]]></description>
      <pubDate>${new Date(p.published_at || Date.now()).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/blog/${p.slug}</guid>
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Trường Việt Anh</title>
    <description>Tin tức, sự kiện và kiến thức giáo dục từ Trường Liên Cấp Việt Anh</description>
    <link>${siteUrl}/tin-tuc</link>
    <language>vi</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/logo-crest-80.webp</url>
      <title>Trường Việt Anh</title>
      <link>${siteUrl}</link>
    </image>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
};
