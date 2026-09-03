#!/usr/bin/env bash
# Đưa 15 ảnh chân dung đã chuẩn hoá lên R2, key mới: images/vinh-danh-2025-2026/std/
# Ảnh gốc ở images/vinh-danh-2025-2026/ trên R2 KHÔNG bị đụng vào — muốn quay lại chỉ cần
# đổi đường dẫn trong src/pages/thanh-tich-hoc-tap.astro.
set -euo pipefail
cd "$(dirname "$0")/.."

CLOUDFLARE_API_TOKEN="$(grep -oP '(?<=^CLOUDFLARE_API_TOKEN=).*' .env | tr -d '\r"')"
export CLOUDFLARE_API_TOKEN
export CLOUDFLARE_ACCOUNT_ID=5c36125247db8f99a7c08798c3a75475

SRC=images/vinh-danh-2025-2026/std
BUCKET=truongvietanh-media
PREFIX=images/vinh-danh-2025-2026/std

for f in "$SRC"/*.webp; do
  name="$(basename "$f")"
  echo "→ $PREFIX/$name"
  npx wrangler r2 object put "$BUCKET/$PREFIX/$name" \
    --file "$f" \
    --content-type image/webp \
    --cache-control "public, max-age=31536000, immutable" \
    --remote
done

echo
echo "Xong. Kiểm tra:"
echo "  curl -I https://media.truongvietanh.com/$PREFIX/nguyen-tri-dung.webp"
