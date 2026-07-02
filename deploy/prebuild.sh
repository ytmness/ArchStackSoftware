#!/usr/bin/env bash
# Limpia artefactos del build anterior antes de `npm run build`.
set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$APP_DIR"

echo "==> Prebuild: deteniendo PM2 si está activo..."
pm2 stop archstack 2>/dev/null || true

if [ -d .next ]; then
  echo "==> Prebuild: eliminando .next anterior..."
  if ! rm -rf .next 2>/dev/null; then
    echo "==> Prebuild: .next requiere permisos elevados, usando sudo..."
    sudo rm -rf .next
  fi
fi
