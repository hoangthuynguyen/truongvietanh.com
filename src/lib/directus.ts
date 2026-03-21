import { createDirectus, readItems, rest, staticToken } from '@directus/sdk';

export type Post = {
  id: number | string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  status?: string | null;
  published_at?: string | null;
};

type DirectusSchema = {
  posts: Post[];
};

export type HomepageState = {
  configured: boolean;
  url: string | null;
  usingToken: boolean;
  posts: Post[];
  error: string | null;
};

function getDirectusUrl() {
  return import.meta.env.PUBLIC_DIRECTUS_URL?.trim() || null;
}

function getServerToken() {
  return import.meta.env.DIRECTUS_TOKEN?.trim() || '';
}

export async function getHomepageState(): Promise<HomepageState> {
  const url = getDirectusUrl();

  if (!url) {
    return {
      configured: false,
      url: null,
      usingToken: false,
      posts: [],
      error: 'Chua co PUBLIC_DIRECTUS_URL, frontend chua biet can goi den Directus nao.',
    };
  }

  const token = getServerToken();
  const client = token
    ? createDirectus<DirectusSchema>(url).with(staticToken(token)).with(rest())
    : createDirectus<DirectusSchema>(url).with(rest());

  try {
    const posts = await client.request(
      readItems('posts', {
        fields: ['id', 'slug', 'title', 'excerpt', 'content', 'status', 'published_at'],
        filter: {
          status: {
            _neq: 'archived',
          },
        },
        sort: ['-published_at', '-id'],
        limit: 6,
      }),
    );

    return {
      configured: true,
      url,
      usingToken: Boolean(token),
      posts,
      error: null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Khong the doc du lieu tu Directus.';

    return {
      configured: true,
      url,
      usingToken: Boolean(token),
      posts: [],
      error: message,
    };
  }
}
