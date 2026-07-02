#!/usr/bin/env bash
# Primera vez en el VPS: bash deploy/bootstrap-vps.sh
set -euo pipefail

APP_DIR="/var/www/archstacksoftware"
REPO="https://github.com/ytmness/ArchStackSoftware.git"
BRANCH="master"

if [ -f "$APP_DIR/.env" ]; then
  cp "$APP_DIR/.env" /tmp/archstack.env.backup
  echo "==> .env respaldado en /tmp/archstack.env.backup"
fi

if [ -d "$APP_DIR" ] && [ ! -d "$APP_DIR/.git" ]; then
  echo "==> Reemplazando instalación sin git..."
  rm -rf "$APP_DIR"
fi

if [ ! -d "$APP_DIR" ]; then
  echo "==> Clonando $REPO"
  git clone --branch "$BRANCH" "$REPO" "$APP_DIR"
fi

cd "$APP_DIR"

if [ -f /tmp/archstack.env.backup ]; then
  cp /tmp/archstack.env.backup .env
elif [ ! -f .env ]; then
  cp .env.example .env
  echo "AVISO: edita $APP_DIR/.env con tus credenciales de Supabase."
fi

chmod +x deploy/deploy.sh deploy/prebuild.sh deploy/postbuild.sh
bash deploy/deploy.sh
