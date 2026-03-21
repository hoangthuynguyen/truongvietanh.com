import type { APIRoute } from 'astro';
import { getHomepageState } from '../../lib/directus';

export const GET: APIRoute = async () => {
  const state = await getHomepageState();

  return new Response(
    JSON.stringify(
      {
        ok: state.configured && !state.error,
        directus: {
          configured: state.configured,
          url: state.url,
          usingToken: state.usingToken,
          postsLoaded: state.posts.length,
          error: state.error,
        },
      },
      null,
      2,
    ),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    },
  );
};
