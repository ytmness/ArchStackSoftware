#!/usr/bin/env bash
# Ejecutar en el VPS: bash /var/www/archstacksoftware/deploy/deploy.sh
set -euo pipefail

APP_DIR="/var/www/archstacksoftware"
BRANCH="${DEPLOY_BRANCH:-master}"

cd "$APP_DIR"

if [ ! -d .git ]; then
  echo "ERROR: $APP_DIR no es un repositorio git."
  exit 1
fi

if [ -f .env ]; then
  cp .env /tmp/archstack.env.backup
fi

echo "==> git pull origin $BRANCH"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

if [ -f /tmp/archstack.env.backup ]; then
  cp /tmp/archstack.env.backup .env
fi

echo "==> Instalando dependencias..."
npm install

echo "==> Build de producción..."
npm run build

echo "==> Reiniciando PM2..."
pm2 reload deploy/ecosystem.config.cjs --update-env || pm2 start deploy/ecosystem.config.cjs
pm2 save

echo "==> Deploy listo."
pm2 status | grep archstack || true
