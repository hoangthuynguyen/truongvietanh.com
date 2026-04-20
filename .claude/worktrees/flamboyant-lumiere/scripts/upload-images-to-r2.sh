#!/bin/bash
# Upload tat ca hinh anh da download len Cloudflare R2
#
# Truoc khi chay:
# 1. Tao R2 bucket "truongvietanh-media" tren Cloudflare Dashboard
# 2. Chay: wrangler login (neu chua login)
#
# Chay: bash scripts/upload-images-to-r2.sh

BUCKET="truongvietanh-media"
WEBP_DIR="images/webp"
SVG_DIR="images/svg"

echo "========================================"
echo "Upload Images to Cloudflare R2"
echo "Bucket: $BUCKET"
echo "========================================"

# Check wrangler
if ! command -v wrangler &> /dev/null; then
    echo "ERROR: wrangler not found. Run: npm install -g wrangler"
    exit 1
fi

# Counters
uploaded=0
skipped=0
failed=0

# Upload WebP files
echo ""
echo "--- Uploading WebP images ---"
if [ -d "$WEBP_DIR" ]; then
    total_webp=$(ls "$WEBP_DIR"/*.webp 2>/dev/null | wc -l | tr -d ' ')
    echo "Found $total_webp WebP files"

    for file in "$WEBP_DIR"/*.webp; do
        [ -f "$file" ] || continue
        filename=$(basename "$file")
        echo "  [$((uploaded + skipped + failed + 1))/$total_webp] $filename"

        wrangler r2 object put "$BUCKET/images/$filename" \
            --file="$file" \
            --content-type="image/webp" \
            2>/dev/null

        if [ $? -eq 0 ]; then
            ((uploaded++))
        else
            echo "    FAILED: $filename"
            ((failed++))
        fi
    done
else
    echo "WARNING: $WEBP_DIR directory not found"
fi

# Upload SVG files
echo ""
echo "--- Uploading SVG images ---"
if [ -d "$SVG_DIR" ]; then
    total_svg=$(ls "$SVG_DIR"/*.svg 2>/dev/null | wc -l | tr -d ' ')
    echo "Found $total_svg SVG files"

    for file in "$SVG_DIR"/*.svg; do
        [ -f "$file" ] || continue
        filename=$(basename "$file")
        echo "  $filename"

        wrangler r2 object put "$BUCKET/images/svg/$filename" \
            --file="$file" \
            --content-type="image/svg+xml" \
            2>/dev/null

        if [ $? -eq 0 ]; then
            ((uploaded++))
        else
            echo "    FAILED: $filename"
            ((failed++))
        fi
    done
else
    echo "WARNING: $SVG_DIR directory not found"
fi

echo ""
echo "========================================"
echo "DONE!"
echo "Uploaded: $uploaded"
echo "Failed:   $failed"
echo "========================================"
echo ""
echo "Next step: Verify by visiting"
echo "  https://media.truongvietanh.com/images/<filename>"
