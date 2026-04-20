#!/bin/bash
# Deploy khoahoc landing page lên Contabo VPS
# Chạy: bash deploy-khoahoc.sh

SERVER="root@45.88.188.169"
REMOTE_DIR="/var/www/khoahoc.truongvietanh.com"
LOCAL_FILE="$(dirname "$0")/khoahoc/index.html"

echo "🚀 Deploying khoahoc.truongvietanh.com..."
echo "📁 File: $LOCAL_FILE"
echo "🖥️  Server: $SERVER"
echo ""

# Tạo thư mục trên server
echo "📂 Tạo thư mục trên server..."
ssh $SERVER "mkdir -p $REMOTE_DIR"

# Upload file
echo "📤 Upload index.html..."
scp "$LOCAL_FILE" "$SERVER:$REMOTE_DIR/index.html"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Upload thành công!"
    echo ""
    # Tạo Nginx config nếu chưa có
    echo "⚙️  Kiểm tra & tạo Nginx config..."
    ssh $SERVER "cat > /etc/nginx/sites-available/khoahoc.truongvietanh.com << 'NGINX'
server {
    listen 80;
    server_name khoahoc.truongvietanh.com;
    root $REMOTE_DIR;
    index index.html;

    location / {
        try_files \\\$uri \\\$uri/ =404;
    }
}
NGINX
ln -sf /etc/nginx/sites-available/khoahoc.truongvietanh.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx"

    echo ""
    echo "🎉 Deploy hoàn tất! Truy cập: https://khoahoc.truongvietanh.com"
else
    echo ""
    echo "❌ Upload thất bại. Kiểm tra kết nối SSH."
fi
