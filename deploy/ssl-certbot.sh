#!/usr/bin/env bash
# SSL con Let's Encrypt. Requiere que archstacksoftware.com apunte SOLO a 144.202.72.150
set -euo pipefail

VPS_IP="144.202.72.150"
APP_DIR="/var/www/archstacksoftware"

echo "==> Comprobando DNS..."
IPS=$(dig +short archstacksoftware.com A @8.8.8.8 | sort -u | tr '\n' ' ')
echo "    Registros A actuales: $IPS"

if echo "$IPS" | grep -qv "$VPS_IP" || [ "$(echo "$IPS" | wc -w)" -gt 1 ]; then
  echo ""
  echo "ERROR: El dominio tiene varias IPs o no apunta solo al VPS."
  echo "En GoDaddy DNS, deja UN solo registro A para @ → $VPS_IP"
  echo "Elimina las IPs de Website Builder (13.248.x, 76.223.x)."
  exit 1
fi

mkdir -p /var/www/certbot/.well-known/acme-challenge
cp "$APP_DIR/deploy/nginx-archstacksoftware.conf" /etc/nginx/sites-available/archstacksoftware.com
nginx -t && systemctl reload nginx

echo "==> Solicitando certificado..."
certbot --nginx \
  -d archstacksoftware.com \
  -d www.archstacksoftware.com \
  --non-interactive \
  --agree-tos \
  --register-unsafely-without-email \
  --redirect

echo "==> Certificado instalado."
certbot certificates | grep -A2 archstacksoftware || true
