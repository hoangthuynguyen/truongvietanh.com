/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_DIRECTUS_URL?: string;
  readonly DIRECTUS_TOKEN?: string;
  readonly DIRECTUS_URL?: string;
  readonly DIRECTUS_READ_TOKEN?: string;
  readonly PUBLIC_TURNSTILE_SITEKEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Global window augmentations — used by inline <script> blocks across the site.
 * GTM's dataLayer is populated dynamically; Turnstile is lazy-loaded.
 */
interface Window {
  dataLayer: Array<Record<string, unknown>>;
  turnstile?: {
    getResponse: (element: string | HTMLElement) => string;
    render: (element: string | HTMLElement, opts: Record<string, unknown>) => string;
    reset: (element?: string | HTMLElement) => void;
  };
  __TVA_FORMS__?: Array<{
    formId: string;
    variant: string;
    funnelCode: string;
    thankYouPage?: string;
    successMode: string;
    turnstile?: boolean;
  }>;
}
