#!/bin/bash
# Fast Pipeline: Google Drive → Convert → R2 (parallel uploads)
# Usage: bash scripts/gdrive-to-r2-fast.sh 2>&1 | tee /tmp/gdrive-r2-fast.log

FOLDER_ID="1NSrayCA2lgeQx3HTKW-5KJSu8SrWAM_B"
BUCKET="truongvietanh-media"
WORK_DIR="/Users/nguyenhoang/Downloads/truongvietanh.com/images/gdrive-full"
MAX_WIDTH=1200
WEBP_QUALITY=82
VIDEO_MAX_HEIGHT=720
PARALLEL_UPLOAD=12   # concurrent wrangler jobs
PARALLEL_CONVERT=8   # concurrent cwebp jobs

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
import sys,unicodedata,re
s=sys.argv[1]
s=unicodedata.normalize('NFD',s)
s=''.join(c for c in s if unicodedata.category(c)!='Mn')
s=s.replace('đ','d').replace('Đ','D').lower()
s=re.sub(r'[^a-z0-9]+',' ',s).strip()
s=re.sub(r'\s+','-',s)[:80]
print(s)
" "$1"
}

# Parallel upload function using background jobs
upload_batch() {
  local files_dir="$1"
  local r2_prefix="$2"
  local ctype="$3"
  local ext="$4"
  local total=0 uploaded=0 failed=0
  local pids=()

  for f in "${files_dir}"/*.${ext}; do
    [ -f "$f" ] || continue
    ((total++))
  done

  echo "  → Uploading ${total} ${ext} files (${PARALLEL_UPLOAD} parallel)..."

  for f in "${files_dir}"/*.${ext}; do
    [ -f "$f" ] || continue
    fname=$(basename "$f")
    r2_key="${r2_prefix}/${fname}"

    # Launch background upload
    (
      npx wrangler r2 object put "${BUCKET}/${r2_key}" \
        --file="$f" --content-type="$ctype" --remote 2>/dev/null \
        && echo "✓ ${r2_key}" \
        || echo "✗ FAIL: ${r2_key}"
    ) &
    pids+=($!)

    # Throttle to PARALLEL_UPLOAD concurrent jobs
    while [ ${#pids[@]} -ge $PARALLEL_UPLOAD ]; do
      new_pids=()
      for pid in "${pids[@]}"; do
        if kill -0 "$pid" 2>/dev/null; then
          new_pids+=("$pid")
        else
          wait "$pid" 2>/dev/null
        fi
      done
      pids=("${new_pids[@]}")
      [ ${#pids[@]} -ge $PARALLEL_UPLOAD ] && sleep 0.3
    done
  done

  # Wait for remaining
  for pid in "${pids[@]}"; do
    wait "$pid" 2>/dev/null
  done
}

# Parallel convert images
convert_images_parallel() {
  local raw_dir="$1"
  local out_dir="$2"
  local total=0 pids=()

  while IFS= read -r -d '' img; do
    ((total++))
  done < <(find "$raw_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)

  echo "  → Converting ${total} images (${PARALLEL_CONVERT} parallel)..."
  local done=0

  while IFS= read -r -d '' img; do
    base=$(basename "$img"); name="${base%.*}"
    slug=$(slugify "$name")
    out="${out_dir}/${slug}.webp"

    [ -f "$out" ] && { ((done++)); continue; }

    (cwebp -q "$WEBP_QUALITY" -resize "$MAX_WIDTH" 0 "$img" -o "$out" 2>/dev/null) &
    pids+=($!)

    while [ ${#pids[@]} -ge $PARALLEL_CONVERT ]; do
      new_pids=()
      for pid in "${pids[@]}"; do
        if kill -0 "$pid" 2>/dev/null; then
          new_pids+=("$pid")
        else
          wait "$pid" 2>/dev/null && ((done++)) || true
        fi
      done
      pids=("${new_pids[@]}")
      [ ${#pids[@]} -ge $PARALLEL_CONVERT ] && sleep 0.1
    done
  done < <(find "$raw_dir" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)

  for pid in "${pids[@]}"; do
    wait "$pid" 2>/dev/null && ((done++)) || true
  done
  echo "  → Done: $(ls "$out_dir"/*.webp 2>/dev/null | wc -l | tr -d ' ') WebP files"
}

compress_videos() {
  local raw_dir="$1"
  local out_dir="$2"
  local count=0

  while IFS= read -r -d '' vid; do
    base=$(basename "$vid"); name="${base%.*}"
    slug=$(slugify "$name")
    out="${out_dir}/${slug}.mp4"
    [ -f "$out" ] && continue
    echo "    🎬 $base"
    ffmpeg -i "$vid" \
      -vf "scale=-2:'min(${VIDEO_MAX_HEIGHT},ih)'" \
      -c:v libx264 -crf 26 -preset fast \
      -c:a aac -b:a 96k -movflags +faststart \
      -y "$out" 2>/dev/null && ((count++)) || echo "    ✗ failed: $base"
  done < <(find "$raw_dir" -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.avi" -o -iname "*.mkv" \) -print0)
  echo "  → Compressed: ${count} videos"
}

process_folder() {
  local drive_folder="$1" category="$2"
  local raw="${WORK_DIR}/${category}/raw"
  local webp="${WORK_DIR}/${category}/webp"
  local vids="${WORK_DIR}/${category}/videos"
  local t_start=$(date +%s)

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  📁 ${drive_folder} → ${category}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # Skip if already fully processed
  if [ -f "${WORK_DIR}/${category}/.done" ]; then
    echo "  ✅ Already done, skipping"
    return
  fi

  mkdir -p "$raw" "$webp" "$vids"

  # 1. Download
  echo "[1/4] Downloading..."
  rclone copy "gdrive-tva:${drive_folder}" "$raw" \
    --drive-root-folder-id "$FOLDER_ID" \
    --transfers 8 --checkers 16 \
    --include "*.jpg" --include "*.JPG" \
    --include "*.jpeg" --include "*.JPEG" \
    --include "*.png" --include "*.PNG" \
    --include "*.mp4" --include "*.MP4" \
    --include "*.mov" --include "*.MOV" \
    --include "*.avi" --include "*.AVI" \
    --progress 2>&1 | grep -E "Transferred:|ETA" | tail -2

  img_n=$(find "$raw" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | wc -l | tr -d ' ')
  vid_n=$(find "$raw" -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.avi" -o -iname "*.mkv" \) | wc -l | tr -d ' ')
  echo "  Downloaded: ${img_n} images, ${vid_n} videos"

  # 2. Convert images
  echo "[2/4] Converting images..."
  convert_images_parallel "$raw" "$webp"

  # 3. Compress videos
  if [ "$vid_n" -gt 0 ]; then
    echo "[3/4] Compressing videos..."
    compress_videos "$raw" "$vids"
  fi

  # 4. Upload in parallel
  echo "[4/4] Uploading to R2..."
  upload_batch "$webp" "images/${category}" "image/webp" "webp"
  [ "$(ls "$vids"/*.mp4 2>/dev/null | wc -l)" -gt 0 ] && \
    upload_batch "$vids" "videos/${category}" "video/mp4" "mp4"

  # Cleanup raw, mark done
  rm -rf "$raw"
  touch "${WORK_DIR}/${category}/.done"

  local elapsed=$(( $(date +%s) - t_start ))
  echo "  ✅ Done in ${elapsed}s"
}

# ── Main ─────────────────────────────────────────
echo "═══════════════════════════════════════════"
echo "  🚀 FAST PIPELINE: Google Drive → R2"
echo "  $(date)"
echo "═══════════════════════════════════════════"
mkdir -p "$WORK_DIR"

# Root-level images
echo ""
echo "📄 Root files..."
root_raw="${WORK_DIR}/_root/raw"; root_out="${WORK_DIR}/_root/webp"
mkdir -p "$root_raw" "$root_out"
rclone copy "gdrive-tva:" "$root_raw" \
  --drive-root-folder-id "$FOLDER_ID" --max-depth 1 \
  --include "*.jpg" --include "*.JPG" --include "*.jpeg" --include "*.png" \
  --transfers 4 2>/dev/null
root_n=$(find "$root_raw" -maxdepth 1 -type f | wc -l | tr -d ' ')
echo "  Root: $root_n files"
if [ "$root_n" -gt 0 ]; then
  for img in "$root_raw"/*; do
    [ -f "$img" ] || continue
    slug=$(slugify "$(basename "${img%.*}")")
    out="${root_out}/${slug}.webp"
    cwebp -q "$WEBP_QUALITY" -resize "$MAX_WIDTH" 0 "$img" -o "$out" 2>/dev/null
  done
  upload_batch "$root_out" "images/root" "image/webp" "webp"
fi
rm -rf "$root_raw"

# Process each subfolder
for entry in "${FOLDERS[@]}"; do
  drive_folder="${entry%%|*}"
  category="${entry##*|}"
  process_folder "$drive_folder" "$category"
done

echo ""
echo "═══════════════════════════════════════════"
echo "  ✅ ALL DONE! $(date)"
echo "═══════════════════════════════════════════"
echo "  Image URL: https://media.truongvietanh.com/images/[category]/[name].webp"
echo "  Video URL: https://media.truongvietanh.com/videos/[category]/[name].mp4"
