#!/usr/bin/env bash
# Ejecutar EN EL VPS dentro de /var/www/archstacksoftware después del primer clone.
set -euo pipefail

echo "==> Instalando dependencias..."
npm ci

echo "==> Build de producción..."
npm run build

echo "==> Reiniciando PM2..."
pm2 reload deploy/ecosystem.config.cjs --update-env || pm2 start deploy/ecosystem.config.cjs
pm2 save

echo "==> Listo. Revisa: pm2 status && pm2 logs archstack --lines 50"
