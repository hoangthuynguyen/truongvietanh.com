# Cloudflare Infrastructure Setup — v2 Worker

> One-time setup for Cloudflare Worker (`hoc.truongvietanh.com`) with lead scoring,
> idempotency, Turnstile. Run these **once per environment** (staging + prod).

---

## 1. Cloudflare Account Prerequisites

- [x] Cloudflare account with Workers paid plan (Bundled, $5/month) — required for KV
- [x] Domain `truongvietanh.com` on Cloudflare (already configured)
- [x] `wrangler` CLI: `npm i -g wrangler` (or use `npx wrangler`)

---

## 2. Create KV Namespace for idempotency

The v2 Worker uses a KV namespace `LEAD_DEDUPE` to deduplicate form submissions
within a 1-hour window (SHA-256 of email+phone+page+hour).

```bash
# Create staging namespace
npx wrangler kv:namespace create LEAD_DEDUPE --preview

# Create production namespace (separate from staging)
npx wrangler kv:namespace create LEAD_DEDUPE
```

**Output example:**
```
🌀 Creating namespace with title "truongvietanh-hoc-LEAD_DEDUPE_preview"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "LEAD_DEDUPE", preview_id = "abc123..." }
```

Copy both IDs. Update `wrangler.staging.jsonc`:

```jsonc
{
  "name": "truongvietanh-hoc",
  "main": "./src/lead-worker-v2.js",
  "compatibility_date": "2026-03-17",
  "routes": [
    { "pattern": "hoc.truongvietanh.com/*", "zone_name": "truongvietanh.com" }
  ],
  "assets": { "directory": "./dist", "binding": "ASSETS" },
  "observability": { "enabled": true },
  "kv_namespaces": [
    { "binding": "LEAD_DEDUPE", "id": "<production-id>", "preview_id": "<preview-id>" }
  ]
}
```

---

## 3. Cloudflare Turnstile (anti-bot)

Turnstile protects forms from bots without CAPTCHAs. Free tier: unlimited requests.

1. Go to https://dash.cloudflare.com/?to=/:account/turnstile
2. **Add site** → `truongvietanh.com` → select **Managed** widget mode
3. Copy both:
   - **Site key** (public, goes in HTML)
   - **Secret key** (server-side validation)

Add to env:

```bash
# Secret (Worker env)
npx wrangler secret put TURNSTILE_SECRET -c wrangler.staging.jsonc
# (paste secret key when prompted)

# Public site key (build-time env for <DynamicForm /> to embed)
# Add to .env and CI secrets:
PUBLIC_TURNSTILE_SITEKEY=0x4AAAAAAA...
```

---

## 4. Worker Secrets (one-time per env)

Run each and paste the value when prompted. For staging use `-c wrangler.staging.jsonc`,
for prod omit to use default `wrangler.jsonc`.

### 4a. GoHighLevel (GHL) integration

```bash
npx wrangler secret put GHL_API_KEY -c wrangler.staging.jsonc
# Get from: GHL → Settings → API Keys → "Integrations API" v2
```

### 4b. Pancake CRM integration

```bash
npx wrangler secret put PANCAKE_API_KEY -c wrangler.staging.jsonc
npx wrangler secret put PANCAKE_WORKSPACE_ID -c wrangler.staging.jsonc
# Workspace ID from Pancake URL: /workspaces/<id>/
```

### 4c. Zalo OA notification

```bash
npx wrangler secret put ZALO_OA_TOKEN -c wrangler.staging.jsonc
npx wrangler secret put ZALO_SALES_USER_ID -c wrangler.staging.jsonc
# Get from: https://business.zalo.me/manage → Access Token
```

### 4d. Email notification (recipient)

```bash
npx wrangler secret put SALES_EMAIL -c wrangler.staging.jsonc
# e.g. sales@truongvietanh.com
npx wrangler secret put CC_EMAIL -c wrangler.staging.jsonc
# e.g. management@truongvietanh.com
```

### 4e. Slack webhook for hot leads

Create an incoming webhook: https://api.slack.com/apps → Create New App → Incoming Webhooks → Add to workspace (`#sales-alerts`)

```bash
npx wrangler secret put SLACK_HOT_LEAD_WEBHOOK -c wrangler.staging.jsonc
# Paste URL starting with https://hooks.slack.com/services/...
```

### 4f. Turnstile secret (from step 3)

```bash
npx wrangler secret put TURNSTILE_SECRET -c wrangler.staging.jsonc
```

### 4g. Directus read token (for CMS lookups from Worker)

```bash
# In Directus admin: Settings → Access Tokens → Create
# Scope: read-only for pages, forms, funnels
npx wrangler secret put DIRECTUS_URL -c wrangler.staging.jsonc
# Value: https://cms.truongvietanh.com

npx wrangler secret put DIRECTUS_READ_TOKEN -c wrangler.staging.jsonc
```

---

## 5. Verify secrets

```bash
npx wrangler secret list -c wrangler.staging.jsonc
```

Should show **9 secrets**:
```
GHL_API_KEY
PANCAKE_API_KEY
PANCAKE_WORKSPACE_ID
ZALO_OA_TOKEN
ZALO_SALES_USER_ID
SALES_EMAIL
CC_EMAIL
SLACK_HOT_LEAD_WEBHOOK
TURNSTILE_SECRET
DIRECTUS_URL
DIRECTUS_READ_TOKEN
```

---

## 6. Deploy Worker

```bash
# Staging
npm run deploy:v2:staging

# Production (requires clean git + main branch)
npm run deploy:v2:prod
```

The deploy script will:
1. Preflight git checks
2. Run tests (must pass)
3. Build Astro → 1355+ pages in `dist/`
4. Apply Directus schema (if `DIRECTUS_ADMIN_TOKEN` set)
5. Seed data (if not `SKIP_SEED=1`)
6. `wrangler deploy` Worker + static assets
7. Smoke test 11 endpoints
8. Log deploy to `reports/deploys.log`

---

## 7. Verify live

```bash
# Smoke test
BASE_URL=https://hoc.truongvietanh.com npm run smoke

# Manually test lead capture with real email
curl -X POST https://hoc.truongvietanh.com/api/lead \
  -H "Content-Type: application/json" \
  -d '{"step":"full_submit","email":"test@example.com","phone":"0900000000","full_name":"Test","funnel_code":"smoke"}'
```

Check:
- [ ] GHL contact created with tags `funnel:smoke`, `score:N`
- [ ] Pancake lead record visible in dashboard
- [ ] Email received at `SALES_EMAIL`
- [ ] Zalo notification in sales user inbox (if score ≥ 50)
- [ ] Slack ping in #sales-alerts (if score ≥ 70 — won't fire for test with phone 0900000000 which is low quality)

---

## 8. Monitoring

### Cloudflare dashboard
- **Workers & Pages → truongvietanh-hoc → Logs** (tail real-time)
- **Metrics**: requests/sec, error rate, CPU time p50/p99
- **KV → LEAD_DEDUPE**: see recent idempotency keys

### Alerts
Create in dashboard → Notifications:
- **Worker errors > 1%** for 5 min → email
- **KV read/write > 10k/day** → email (budget alert)

### Cost
Cloudflare Workers: $5/month bundled plan + ~$0.30/day for 100k KV ops. Expect total **$6-8/month**.

---

## 9. Rollback procedure

```bash
# List recent deployments
npx wrangler deployments list -c wrangler.staging.jsonc

# Rollback to previous
npx wrangler rollback <DEPLOYMENT_ID> -c wrangler.staging.jsonc
```

Directus data is persistent — rollback only rolls back the Worker code, not CMS content.

---

## 10. Common issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| `TurnstileError: invalid-input-secret` | Secret not set | `wrangler secret put TURNSTILE_SECRET` |
| `GHL: 401 unauthorized` | API key expired | Regenerate in GHL → Settings |
| `Pancake: 500 error` | Workspace ID wrong | Check `PANCAKE_WORKSPACE_ID` |
| All leads marked duplicate | KV binding missing | Verify `kv_namespaces` in wrangler.*.jsonc |
| `/api/lead` 404 | Worker not deployed or route wrong | `wrangler deployments list` |
| No email arriving | MailChannels DNS missing | Add SPF + DKIM records (see `dns-ses-records-FIXED.txt`) |
