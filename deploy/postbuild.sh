#!/usr/bin/env bash
# Reinicia PM2 tras un build exitoso para servir el nuevo dist/.
set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$APP_DIR"

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Postbuild: pm2 no disponible, omitiendo reinicio."
  exit 0
fi

echo "==> Postbuild: reiniciando PM2..."
pm2 reload deploy/ecosystem.config.cjs --update-env || pm2 start deploy/ecosystem.config.cjs
pm2 save 2>/dev/null || true
