#!/usr/bin/env bash
# Limpia artefactos del build anterior antes de `npm run build`.
set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$APP_DIR"

echo "==> Prebuild: deteniendo PM2 si está activo..."
pm2 stop archstack 2>/dev/null || true

echo "==> Prebuild: eliminando dist anterior..."
rm -rf dist

# Legacy: .next viejo con permisos incorrectos; no debe bloquear el deploy.
rm -rf .next 2>/dev/null || true
