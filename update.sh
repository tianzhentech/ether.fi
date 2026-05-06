#!/usr/bin/env bash
# ether.fi Cash Dashboard — 更新脚本
# 用法: sudo bash update.sh
set -euo pipefail

# ─── 颜色 ──────────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()  { echo -e "${GREEN}[✓]${NC} $*"; }
warn()  { echo -e "${YELLOW}[!]${NC} $*"; }
err()   { echo -e "${RED}[✗]${NC} $*"; exit 1; }

# ─── 检查 root ─────────────────────────────────────────
[[ $EUID -eq 0 ]] || err "请使用 sudo 运行此脚本"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"
SERVICE_NAME="etherfi-dashboard"

if [[ -n "${SUDO_USER:-}" ]]; then
    RUN_USER="$SUDO_USER"
else
    RUN_USER="$(stat -c '%U' "$PROJECT_DIR" 2>/dev/null || stat -f '%Su' "$PROJECT_DIR")"
fi

UV_BIN="$(command -v uv || echo "/home/$RUN_USER/.local/bin/uv")"

echo "═══════════════════════════════════════"
echo "  ether.fi Dashboard 更新"
echo "═══════════════════════════════════════"
echo ""

# ─── 1. 拉取最新代码 ──────────────────────────────────
info "拉取最新代码..."
sudo -u "$RUN_USER" bash -c "cd '$PROJECT_DIR' && git pull --ff-only" || {
    warn "git pull 失败，尝试 git pull --rebase..."
    sudo -u "$RUN_USER" bash -c "cd '$PROJECT_DIR' && git pull --rebase"
}

# ─── 2. 同步依赖 ──────────────────────────────────────
info "同步依赖..."
sudo -u "$RUN_USER" bash -c "cd '$PROJECT_DIR' && '$UV_BIN' sync"

# ─── 3. 重启服务 ──────────────────────────────────────
info "重启服务..."
systemctl daemon-reload
systemctl restart "$SERVICE_NAME"

# ─── 4. 检查状态 ──────────────────────────────────────
sleep 2
if systemctl is-active --quiet "$SERVICE_NAME"; then
    info "更新完成，服务运行正常 ✅"
    # 显示最新几行日志
    echo ""
    info "最新日志:"
    journalctl -u "$SERVICE_NAME" -n 5 --no-pager
else
    err "服务启动失败！查看日志: journalctl -u $SERVICE_NAME -n 50"
fi
