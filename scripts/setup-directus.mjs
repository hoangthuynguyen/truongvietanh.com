import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://127.0.0.1:8055';
const DIRECTUS_CONTAINER = process.env.DIRECTUS_CONTAINER || 'directus-directus-1';
const directusEnvPath = new URL('../directus/.env', import.meta.url);
const frontendEnvPath = new URL('../.env', import.meta.url);
const execFileAsync = promisify(execFile);

async function readEnvFile(fileUrl) {
  const text = await readFile(fileUrl, 'utf8');
  const entries = {};

  for (const line of text.split('\n')) {
    if (!line || line.trim().startsWith('#') || !line.includes('=')) continue;
    const [key, ...rest] = line.split('=');
    entries[key.trim()] = rest.join('=').trim();
  }

  return entries;
}

async function waitForHealth() {
  for (let attempt = 1; attempt <= 90; attempt += 1) {
    try {
      const response = await fetch(`${DIRECTUS_URL}/server/health`);

      if (response.ok) {
        return;
      }
    } catch {}

    process.stdout.write(`Waiting for Directus (${attempt}/90)\n`);
    await delay(2000);
  }

  throw new Error(`Directus did not become healthy at ${DIRECTUS_URL}`);
}

async function directusFetch(path, init = {}, accessToken) {
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`${DIRECTUS_URL}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${init.method || 'GET'} ${path} failed: ${response.status} ${text}`);
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
}

async function login(adminEmail, adminPassword) {
  const response = await directusFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: adminEmail,
      password: adminPassword,
    }),
  });

  return response.data.access_token;
}

async function getSchemaSnapshot(accessToken) {
  const response = await directusFetch('/schema/snapshot', {}, accessToken);
  return response.data;
}

async function setStaticToken(accessToken) {
  const staticToken = `tva_${randomUUID().replace(/-/g, '')}`;

  await directusFetch(
    '/users/me',
    {
      method: 'PATCH',
      body: JSON.stringify({
        token: staticToken,
      }),
    },
    accessToken,
  );

  return staticToken;
}

async function ensureSchemaApplied(accessToken) {
  const snapshot = await getSchemaSnapshot(accessToken);
  const hasPostsCollection = Array.isArray(snapshot.collections)
    && snapshot.collections.some((collection) => collection.collection === 'posts');

  if (hasPostsCollection) {
    process.stdout.write('Posts schema already exists\n');
    return;
  }

  const { stdout, stderr } = await execFileAsync('docker', [
    'exec',
    DIRECTUS_CONTAINER,
    'node',
    '/directus/cli.js',
    'schema',
    'apply',
    '--yes',
    '/directus/templates/posts-schema.json',
  ]);

  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);

  process.stdout.write('Applied posts schema snapshot\n');
}

async function getPolicies(accessToken) {
  const response = await directusFetch('/policies?fields=id,name,admin_access', {}, accessToken);
  return response.data;
}

async function getPermissions(accessToken) {
  const response = await directusFetch('/permissions?fields=id,policy,collection,action', {}, accessToken);
  return response.data;
}

async function clearCache(accessToken) {
  await directusFetch(
    '/utils/cache/clear',
    {
      method: 'POST',
      body: JSON.stringify({}),
    },
    accessToken,
  );
}

async function ensurePermission(accessToken, permissions, payload) {
  const existing = permissions.find(
    (permission) =>
      permission.policy === payload.policy &&
      permission.collection === payload.collection &&
      permission.action === payload.action,
  );

  if (existing) {
    return;
  }

  await directusFetch(
    '/permissions',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    accessToken,
  );

  permissions.push({
    policy: payload.policy,
    collection: payload.collection,
    action: payload.action,
  });
  process.stdout.write(`Created permission ${payload.action} on ${payload.collection}\n`);
}

async function ensurePolicyPermissions(accessToken) {
  const policies = await getPolicies(accessToken);
  const adminPolicy = policies.find((policy) => policy.admin_access === true);
  const publicPolicy = policies.find((policy) => policy.name === '$t:public_label');

  if (!adminPolicy) {
    throw new Error('Could not find the admin policy in Directus.');
  }

  if (!publicPolicy) {
    throw new Error('Could not find the public policy in Directus.');
  }

  const permissions = await getPermissions(accessToken);
  const allFields = ['*'];
  const emptyFilter = {};
  const emptyPresets = {};
  const emptyValidation = {};

  for (const action of ['read', 'create', 'update', 'delete']) {
    await ensurePermission(accessToken, permissions, {
      policy: adminPolicy.id,
      collection: 'posts',
      action,
      permissions: emptyFilter,
      validation: emptyValidation,
      presets: emptyPresets,
      fields: allFields,
    });
  }

  await ensurePermission(accessToken, permissions, {
    policy: publicPolicy.id,
    collection: 'posts',
    action: 'read',
    permissions: emptyFilter,
    validation: emptyValidation,
    presets: emptyPresets,
    fields: allFields,
  });
}

async function refreshAdminPolicy(accessToken) {
  const policies = await getPolicies(accessToken);
  const adminPolicy = policies.find((policy) => policy.admin_access === true);

  if (!adminPolicy) {
    throw new Error('Could not find the admin policy in Directus.');
  }

  await directusFetch(
    `/policies/${adminPolicy.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        admin_access: true,
        app_access: true,
      }),
    },
    accessToken,
  );

  process.stdout.write('Refreshed admin policy cache\n');
}

async function ensureSeedPost(accessToken) {
  const response = await directusFetch('/items/posts?limit=1', {}, accessToken);

  if (Array.isArray(response.data) && response.data.length > 0) {
    process.stdout.write('Seed content already exists\n');
    return;
  }

  await directusFetch(
    '/items/posts',
    {
      method: 'POST',
      body: JSON.stringify({
        title: 'Astro, Directus, Cloudflare Pages',
        slug: 'astro-directus-cloudflare-pages',
        status: 'published',
        excerpt: 'Bo khung website da duoc ket noi voi CMS Directus va san sang deploy len Cloudflare Pages.',
        content:
          '<p>Website truongvietanh.com da co frontend Astro, backend Directus, va mot luong deploy phu hop cho Cloudflare Pages.</p>',
        published_at: new Date().toISOString(),
        sort: 1,
      }),
    },
    accessToken,
  );

  process.stdout.write('Created seed post\n');
}

async function writeFrontendEnv(staticToken) {
  const lines = [
    'PUBLIC_SITE_URL=http://127.0.0.1:4321',
    `PUBLIC_DIRECTUS_URL=${DIRECTUS_URL}`,
    `DIRECTUS_TOKEN=${staticToken}`,
    '',
  ];

  await writeFile(frontendEnvPath, lines.join('\n'), 'utf8');
  process.stdout.write('Updated root .env for Astro\n');
}

async function main() {
  if (!existsSync(directusEnvPath)) {
    throw new Error('Missing directus/.env. Copy directus/.env.example first.');
  }

  const directusEnv = await readEnvFile(directusEnvPath);
  const adminEmail = directusEnv.ADMIN_EMAIL;
  const adminPassword = directusEnv.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('directus/.env must include ADMIN_EMAIL and ADMIN_PASSWORD');
  }

  await waitForHealth();
  let accessToken = await login(adminEmail, adminPassword);
  await ensureSchemaApplied(accessToken);
  await clearCache(accessToken);
  await ensurePolicyPermissions(accessToken);
  await refreshAdminPolicy(accessToken);
  accessToken = await login(adminEmail, adminPassword);
  await clearCache(accessToken);
  const staticToken = await setStaticToken(accessToken);
  await ensureSeedPost(accessToken);
  await writeFrontendEnv(staticToken);

  process.stdout.write('\nDirectus setup complete.\n');
  process.stdout.write(`Directus URL: ${DIRECTUS_URL}\n`);
  process.stdout.write(`Static token written to ${frontendEnvPath.pathname}\n`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
