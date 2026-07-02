#!/usr/bin/env bash
# Corrige ownership del repo antes de git pull / npm build en el VPS.
set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
DEPLOY_USER="${DEPLOY_USER:-$(whoami)}"
DEPLOY_GROUP="${DEPLOY_GROUP:-$(id -gn)}"

cd "$APP_DIR"

echo "==> Permisos: usuario de deploy = $DEPLOY_USER"

# Archivo/directorio suelto "git" en la raíz (no es .git/) — bloquea deploys limpios.
if [ -e "$APP_DIR/git" ]; then
  echo "==> Permisos: eliminando entrada suelta 'git' en la raíz..."
  rm -rf "$APP_DIR/git" 2>/dev/null || sudo rm -rf "$APP_DIR/git"
fi

chown_repo() {
  if command -v sudo >/dev/null 2>&1; then
    sudo -n chown -R "$DEPLOY_USER:$DEPLOY_GROUP" "$APP_DIR" 2>/dev/null && return 0
  fi
  return 1
}

chmod_git() {
  [ -d "$APP_DIR/.git" ] || return 0
  chmod -R u+rwX "$APP_DIR/.git" 2>/dev/null || \
    sudo -n chmod -R u+rwX "$APP_DIR/.git" 2>/dev/null || true
}

if [ -d "$APP_DIR/.git/objects" ] && [ ! -w "$APP_DIR/.git/objects" ]; then
  echo "==> Permisos: .git/objects no es escribible, corrigiendo..."
  chown_repo || true
  chmod_git
fi

# Asegurar ownership completo del proyecto (node_modules, dist, .git).
if chown_repo; then
  echo "==> Permisos: ownership actualizado con sudo."
else
  echo "==> Permisos: sudo sin passwordless chown; aplicando chmod en .git..."
  chmod_git
fi

if [ -d "$APP_DIR/.git/objects" ] && [ ! -w "$APP_DIR/.git/objects" ]; then
  echo "ERROR: .git/objects sigue sin permisos de escritura para $DEPLOY_USER."
  echo "       Ejecuta una vez en el VPS:"
  echo "       sudo chown -R $DEPLOY_USER:$DEPLOY_GROUP $APP_DIR"
  exit 1
fi

echo "==> Permisos: OK."
