#!/usr/bin/env bash
# Reinicia PM2 tras un build exitoso para servir el nuevo dist/.
set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$APP_DIR"

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Postbuild: pm2 no disponible, omitiendo reinicio."
  exit 0
fi

if [ ! -d dist ]; then
  echo "ERROR: no existe dist/ tras el build."
  exit 1
fi

if ! grep -rq "facc15" dist/static 2>/dev/null; then
  echo "WARN: no se detectó el color de acento amarillo en dist/static."
fi

echo "==> Postbuild: reinicio completo de PM2 (delete + start)..."
pm2 delete archstack 2>/dev/null || true
pm2 start deploy/ecosystem.config.cjs
pm2 save 2>/dev/null || true
pm2 status | grep archstack || true
