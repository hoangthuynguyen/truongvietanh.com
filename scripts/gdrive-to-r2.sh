#!/bin/bash
# Pipeline: Google Drive (ai@truongvietanh.com) → Convert → Cloudflare R2
# Folder ID: 1NSrayCA2lgeQx3HTKW-5KJSu8SrWAM_B
# Usage: bash scripts/gdrive-to-r2.sh 2>&1 | tee /tmp/gdrive-r2-pipeline.log

DRIVE_ROOT="gdrive-tva:"
FOLDER_ID="1NSrayCA2lgeQx3HTKW-5KJSu8SrWAM_B"
BUCKET="truongvietanh-media"
WORK_DIR="/Users/nguyenhoang/Downloads/truongvietanh.com/images/gdrive-full"
MAX_WIDTH=1200
WEBP_QUALITY=82
VIDEO_MAX_HEIGHT=720
WRANGLER="npx wrangler"

# Folder name → R2 category slug
FOLDERS=(
  "1. Không gian, học sinh chơi thể thao|khong-gian-the-thao"
  "2. Học sinh đang thuyết trình|thuyet-trinh"
  "3. Học sinh đang chơi vui vẻ |vui-ve"
  "4. Học sinh làm dự án|du-an"
  "5. Học sinh và giáo viên|giao-vien"
  "6. Học sinh và phụ huynh|phu-huynh"
  "7. Dã ngoại|da-ngoai"
  "9. Hình thể thao - Olympic|olympic"
)

slugify() {
  python3 -c "
import sys, unicodedata, re
s = sys.argv[1]
s = unicodedata.normalize('NFD', s)
s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
s = s.replace('đ','d').replace('Đ','D')
s = s.lower()
s = re.sub(r'[^a-z0-9]+', '-', s)
s = s.strip('-')[:80]
print(s)
" "$1"
}

upload_to_r2() {
  local file="$1" r2_key="$2" ctype="$3"
  $WRANGLER r2 object put "${BUCKET}/${r2_key}" \
    --file="$file" --content-type="$ctype" --remote 2>/dev/null \
    && echo "  ✓ ${r2_key}" \
    || echo "  ✗ FAILED: ${r2_key}"
}

process_folder() {
  local drive_folder="$1" category="$2"
  local raw_dir="${WORK_DIR}/${category}/raw"
  local out_img="${WORK_DIR}/${category}/webp"
  local out_vid="${WORK_DIR}/${category}/videos"

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  📁 ${drive_folder}"
  echo "  → R2 category: ${category}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  mkdir -p "$raw_dir" "$out_img" "$out_vid"

  # ── Download ──────────────────────────────
  echo "[1/4] Downloading from Google Drive..."
  rclone copy "${DRIVE_ROOT}${drive_folder}" "$raw_dir" \
    --drive-root-folder-id "$FOLDER_ID" \
    --transfers 6 --checkers 8 \
    --include "*.{jpg,JPG,jpeg,JPEG,png,PNG,mp4,MP4,mov,MOV,avi,AVI,mkv,MKV,webm}" \
    --progress 2>&1 | grep -E 'Transferred|ERROR' | tail -3

  img_count=$(find "$raw_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | wc -l | tr -d ' ')
  vid_count=$(find "$raw_dir" -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.avi" -o -iname "*.mkv" -o -iname "*.webm" \) | wc -l | tr -d ' ')
  echo "  Downloaded: ${img_count} images, ${vid_count} videos"

  # ── Convert Images → WebP ─────────────────
  echo "[2/4] Converting images to WebP (max ${MAX_WIDTH}px, q${WEBP_QUALITY})..."
  converted=0; skipped=0
  while IFS= read -r -d '' img; do
    base=$(basename "$img"); name="${base%.*}"
    slug=$(slugify "$name")
    out="${out_img}/${slug}.webp"
    if [ -f "$out" ]; then ((skipped++)); continue; fi
    orig_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
    if cwebp -q "$WEBP_QUALITY" -resize "$MAX_WIDTH" 0 "$img" -o "$out" 2>/dev/null; then
      new_size=$(stat -f%z "$out" 2>/dev/null || stat -c%s "$out" 2>/dev/null)
      savings=$(python3 -c "print(f'{(1-${new_size}/${orig_size})*100:.0f}')" 2>/dev/null || echo "?")
      ((converted++))
      [ $((converted % 50)) -eq 0 ] && echo "  ... ${converted}/${img_count} converted"
    fi
  done < <(find "$raw_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)
  echo "  Converted: ${converted}, Skipped: ${skipped}"

  # ── Compress Videos ───────────────────────
  if [ "$vid_count" -gt 0 ]; then
    echo "[3/4] Compressing videos (max ${VIDEO_MAX_HEIGHT}p H.264)..."
    vconverted=0
    while IFS= read -r -d '' vid; do
      base=$(basename "$vid"); name="${base%.*}"
      slug=$(slugify "$name")
      out="${out_vid}/${slug}.mp4"
      if [ -f "$out" ]; then continue; fi
      ffmpeg -i "$vid" \
        -vf "scale=-2:'min(${VIDEO_MAX_HEIGHT},ih)'" \
        -c:v libx264 -crf 26 -preset fast \
        -c:a aac -b:a 96k -movflags +faststart \
        -y "$out" 2>/dev/null \
        && ((vconverted++)) \
        || echo "  ✗ video failed: $base"
    done < <(find "$raw_dir" -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.avi" -o -iname "*.mkv" -o -iname "*.webm" \) -print0)
    echo "  Compressed: ${vconverted} videos"
  fi

  # ── Upload to R2 ──────────────────────────
  echo "[4/4] Uploading to R2..."
  up_img=0; up_vid=0

  for webp in "${out_img}"/*.webp; do
    [ -f "$webp" ] || continue
    fname=$(basename "$webp")
    upload_to_r2 "$webp" "images/${category}/${fname}" "image/webp"
    ((up_img++))
  done

  for mp4 in "${out_vid}"/*.mp4; do
    [ -f "$mp4" ] || continue
    fname=$(basename "$mp4")
    upload_to_r2 "$mp4" "videos/${category}/${fname}" "video/mp4"
    ((up_vid++))
  done

  echo "  Uploaded: ${up_img} images, ${up_vid} videos"

  # ── Cleanup raw ───────────────────────────
  rm -rf "$raw_dir"
  echo "  ✓ Raw files cleaned"
}

# ── Main ──────────────────────────────────────
echo "═══════════════════════════════════════════"
echo "  PIPELINE: Google Drive → R2"
echo "  $(date)"
echo "═══════════════════════════════════════════"

mkdir -p "$WORK_DIR"

# Root-level loose images
echo ""
echo "📄 Processing root-level files..."
root_raw="${WORK_DIR}/_root/raw"
root_out="${WORK_DIR}/_root/webp"
mkdir -p "$root_raw" "$root_out"
rclone copy "${DRIVE_ROOT}" "$root_raw" \
  --drive-root-folder-id "$FOLDER_ID" \
  --max-depth 1 \
  --include "*.{jpg,JPG,jpeg,png,PNG}" \
  --transfers 4 2>/dev/null
root_count=$(find "$root_raw" -maxdepth 1 -type f | wc -l | tr -d ' ')
echo "  Root files: $root_count"
if [ "$root_count" -gt 0 ]; then
  for img in "$root_raw"/*; do
    [ -f "$img" ] || continue
    base=$(basename "$img"); name="${base%.*}"
    slug=$(slugify "$name"); out="${root_out}/${slug}.webp"
    cwebp -q "$WEBP_QUALITY" -resize "$MAX_WIDTH" 0 "$img" -o "$out" 2>/dev/null
    upload_to_r2 "$out" "images/root/${slug}.webp" "image/webp"
  done
fi
rm -rf "$root_raw"

# Process all subfolders
for entry in "${FOLDERS[@]}"; do
  drive_folder="${entry%%|*}"
  category="${entry##*|}"
  process_folder "$drive_folder" "$category"
done

echo ""
echo "═══════════════════════════════════════════"
echo "  ✅ DONE! $(date)"
echo "═══════════════════════════════════════════"
echo ""
echo "  Image URL: https://media.truongvietanh.com/images/[category]/[name].webp"
echo "  Video URL: https://media.truongvietanh.com/videos/[category]/[name].mp4"
echo ""
