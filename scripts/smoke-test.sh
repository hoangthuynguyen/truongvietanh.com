#!/usr/bin/env bash
# Smoke test cho production sau khi deploy.
# Curl 1 list URL quan trọng, fail nếu URL nào trả !=200.
# Tự discover top-level squeeze landing pages từ src/pages/*.astro.

set -uo pipefail

BASE="${BASE:-https://truongvietanh.com}"
RETRIES="${RETRIES:-3}"
SLEEP_BETWEEN_RETRIES="${SLEEP_BETWEEN_RETRIES:-15}"

# Critical paths — phải luôn 200, gồm:
#  - Top-level slugs (squeeze landing pages)
#  - Trang chủ + tài nguyên dùng nhiều
CRITICAL_PATHS=(
  "/"
  "/cha-me-hai-dang/"
  "/100-cau-noi-cha-me-hai-dang/"
  "/cover-photo-hai-dang.png"
  "/mockup-100-cau-noi-cha-me-hai-dang.png"
  "/mockup-cha-me-hai-dang.png"
  "/chon-truong-mam-non/"
  "/chon-truong-tieu-hoc/"
  "/chon-truong-thcs/"
  "/chon-truong-thpt/"
  "/hoc-phi/"
  "/cam-on/"
  "/blog/"
  "/sitemap-0.xml"
  "/tuyen-sinh-lop-10/"
  # JS dùng chung của MỌI form lead — mất file này thì UTM/validate SĐT chết âm thầm,
  # trang vẫn 200 nên không cách nào phát hiện qua URL trang.
  "/js/va-utm.js"
  "/js/phone-vn.js"
)

# Auto-discover top-level .astro pages → thêm vào danh sách check
# Bỏ qua: index, các trang cảm ơn, error pages, và các route động (filename có '[')
if [ -d "src/pages" ]; then
  while IFS= read -r f; do
    name=$(basename "$f" .astro)
    case "$name" in
      index|cam-on|404|500|leadership-day-cam-on) continue ;;
      *\[*) continue ;;   # skip dynamic routes như [...slug].astro
      *) CRITICAL_PATHS+=("/$name/") ;;
    esac
  done < <(find src/pages -maxdepth 1 -name "*.astro" -type f)
fi

# Landing page chiến dịch nằm trong THƯ MỤC CON (vd src/pages/tuyen-sinh/lop-1-uu-dai-vang/
# index.astro) nên vòng maxdepth-1 ở trên KHÔNG thấy. Đây chính là lỗ hổng khiến 4 trang
# "4 Tuần Vàng" nằm 404 hai ngày (27→29/07/2026) mà health-check vẫn báo khoẻ.
# Chỉ auto-discover các trang có hậu tố -uu-dai-vang: đó là trang đích của quảng cáo đang
# chạy, bắt buộc phải sống. KHÔNG quét cả tuyen-sinh/** để tránh một trang cũ đã gỡ làm
# smoke test fail vĩnh viễn → dispatch deploy lặp vô hạn mỗi 30 phút.
if [ -d "src/pages" ]; then
  while IFS= read -r f; do
    dir=$(dirname "$f")
    CRITICAL_PATHS+=("${dir#src/pages}/")
  done < <(find src/pages -mindepth 2 -name "index.astro" -type f -path "*-uu-dai-vang/*")
fi

# Dedupe
mapfile -t CRITICAL_PATHS < <(printf '%s\n' "${CRITICAL_PATHS[@]}" | sort -u)

echo "🔥 Smoke test ${BASE} — ${#CRITICAL_PATHS[@]} URLs"
echo

failed=()

check_url() {
  local path="$1"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "${BASE}${path}" || echo "000")
  echo "$code"
}

# 301/302 = success (redirect cố ý từ astro.config.mjs / _redirects)
is_ok() {
  case "$1" in
    200|301|302|308) return 0 ;;
    *) return 1 ;;
  esac
}

for path in "${CRITICAL_PATHS[@]}"; do
  code=""
  for i in $(seq 1 "$RETRIES"); do
    code=$(check_url "$path")
    if is_ok "$code"; then
      break
    fi
    if [ "$i" -lt "$RETRIES" ]; then
      sleep "$SLEEP_BETWEEN_RETRIES"
    fi
  done

  if is_ok "$code"; then
    printf "  ✅ %s  %s\n" "$code" "$path"
  else
    printf "  ❌ %s  %s\n" "$code" "$path"
    failed+=("$code $path")
  fi
done

echo
if [ ${#failed[@]} -eq 0 ]; then
  echo "✅ Tất cả ${#CRITICAL_PATHS[@]} URL trả 200."
  exit 0
else
  echo "❌ ${#failed[@]} URL fail:"
  for f in "${failed[@]}"; do
    echo "    $f"
  done
  echo
  echo "Có thể do Cloudflare Workers ASSETS bị stale — re-trigger deploy để heal."
  exit 1
fi
