#!/bin/bash
# scripts/safe-deploy.sh
# Safe deploy guard for truongvietanh.com
# Refuses to deploy unless all preflight checks pass.
# Usage: bash scripts/safe-deploy.sh

set -euo pipefail

# ─── Colors ─────────────────────────────────────────────────────
if [ -t 1 ]; then
  R=$'\033[31m'; G=$'\033[32m'; Y=$'\033[33m'; B=$'\033[34m'; D=$'\033[2m'; X=$'\033[0m'
else
  R=''; G=''; Y=''; B=''; D=''; X=''
fi
ok()    { echo "${G}✓${X} $*"; }
fail()  { echo "${R}✗${X} $*" >&2; exit 1; }
info()  { echo "${B}ℹ${X} $*"; }
step()  { echo ""; echo "${Y}▸${X} $*"; }

echo "${B}═══ SAFE DEPLOY — truongvietanh.com ═══${X}"
echo ""

# ─── 1. Must be in a git repo ───────────────────────────────────
step "1/8 Check: in git repo"
REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "Không phải git repo. Hãy cd vào D:/truongvietanh.com"
cd "$REPO_ROOT"
ok "repo: $REPO_ROOT"

# ─── 2. Must NOT be a worktree (must be main checkout) ──────────
step "2/8 Check: main repo (not a worktree)"
GIT_COMMON_DIR="$(git rev-parse --git-common-dir)"
GIT_DIR="$(git rev-parse --git-dir)"
# Resolve to absolute paths for comparison
GIT_COMMON_ABS="$(cd "$GIT_COMMON_DIR" && pwd)"
GIT_DIR_ABS="$(cd "$GIT_DIR" && pwd)"
if [ "$GIT_DIR_ABS" != "$GIT_COMMON_ABS" ]; then
  fail "Đang đứng trong git worktree. Phải deploy từ main repo D:/truongvietanh.com"
fi
ok "main repo (not worktree)"

# ─── 3. Must be on branch main ─────────────────────────────────
step "3/8 Check: branch is 'main'"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
[ "$BRANCH" = "main" ] || fail "Đang ở branch '$BRANCH'. Chạy: git checkout main"
ok "branch: main"

# ─── 4. Working tree must be clean ──────────────────────────────
step "4/8 Check: working tree clean"
DIRTY="$(git status --porcelain | grep -v '^?? .claude/worktrees/' || true)"
if [ -n "$DIRTY" ]; then
  echo "$DIRTY" | head -10
  fail "Working tree có file uncommitted. Commit hoặc stash trước khi deploy."
fi
ok "working tree sạch"

# ─── 5. Local main must equal origin/main ──────────────────────
step "5/8 Check: local main = origin/main"
info "fetching origin..."
git fetch origin --quiet
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)
if [ "$LOCAL" != "$REMOTE" ]; then
  AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "?")
  BEHIND=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo "?")
  fail "Local main lệch origin/main (ahead=$AHEAD, behind=$BEHIND). Chạy: git pull origin main"
fi
ok "local = origin/main @ ${LOCAL:0:8}"

# ─── 6. Required files exist ───────────────────────────────────
step "6/8 Check: required files"
[ -f wrangler.jsonc ] || fail "Thiếu wrangler.jsonc"
[ -f package.json ]   || fail "Thiếu package.json"
[ -d node_modules ]   || fail "Thiếu node_modules. Chạy: npm install"
ok "wrangler.jsonc, package.json, node_modules đủ"

# ─── 7. CLOUDFLARE_API_TOKEN must be set ───────────────────────
step "7/8 Check: CLOUDFLARE_API_TOKEN"
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] && [ -f .env ]; then
  info "loading .env..."
  set -a; . ./.env; set +a
fi
[ -n "${CLOUDFLARE_API_TOKEN:-}" ] || fail "CLOUDFLARE_API_TOKEN chưa set. Tạo .env với: CLOUDFLARE_API_TOKEN=cfat_xxx"
ok "token set (${#CLOUDFLARE_API_TOKEN} chars)"

# ─── 8. Show what will be deployed + confirm ──────────────────
step "8/8 Confirm deploy"
echo ""
echo "${D}Last commit:${X}"
git log -1 --pretty="  %h  %s%n  ${D}by %an, %ar${X}"
echo ""
read -r -p "Tiếp tục build + deploy? (y/N) " ans
case "$ans" in
  y|Y|yes|YES) ok "confirmed" ;;
  *) info "đã huỷ"; exit 0 ;;
esac

# ─── BUILD ─────────────────────────────────────────────────────
step "Building..."
ASTRO_TELEMETRY_DISABLED=1 npx astro build

# ─── DEPLOY ────────────────────────────────────────────────────
step "Deploying to Cloudflare..."
npx wrangler deploy -c wrangler.jsonc

echo ""
echo "${G}═══ DEPLOY THÀNH CÔNG ═══${X}"
echo "  Commit: ${LOCAL:0:8}"
echo "  Live:   https://truongvietanh.com/"
echo ""
