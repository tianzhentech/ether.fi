#!/usr/bin/env bash
# ether.fi Cash Dashboard — 初始化安装脚本
# 用法: sudo bash init.sh
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

# ─── 检测项目目录和运行用户 ─────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

# 确定实际运行用户（非 root）
if [[ -n "${SUDO_USER:-}" ]]; then
    RUN_USER="$SUDO_USER"
else
    RUN_USER="$(stat -c '%U' "$PROJECT_DIR" 2>/dev/null || stat -f '%Su' "$PROJECT_DIR")"
fi
RUN_GROUP="$(id -gn "$RUN_USER")"

info "项目目录: $PROJECT_DIR"
info "运行用户: $RUN_USER:$RUN_GROUP"

# ─── 安装 uv (如果不存在) ──────────────────────────────
if ! command -v uv &>/dev/null; then
    warn "uv 未安装，正在安装..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.local/bin:$PATH"
    # 也为运行用户安装
    sudo -u "$RUN_USER" bash -c 'curl -LsSf https://astral.sh/uv/install.sh | sh' || true
fi

UV_BIN="$(command -v uv || echo "/home/$RUN_USER/.local/bin/uv")"
info "uv 路径: $UV_BIN"

# ─── 安装项目依赖 ──────────────────────────────────────
info "安装项目依赖..."
sudo -u "$RUN_USER" bash -c "cd '$PROJECT_DIR' && '$UV_BIN' sync"

# ─── 创建 .env (如果不存在) ────────────────────────────
if [[ ! -f "$PROJECT_DIR/.env" ]]; then
    warn ".env 不存在，从模板创建..."
    cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env"
    chown "$RUN_USER:$RUN_GROUP" "$PROJECT_DIR/.env"
    warn "请编辑 $PROJECT_DIR/.env 配置 JWT_SECRET 等参数"
fi

# ─── 获取端口配置 ──────────────────────────────────────
PORT="$(grep -E '^PORT=' "$PROJECT_DIR/.env" 2>/dev/null | cut -d= -f2 || echo 8788)"
PORT="${PORT:-8788}"

# ─── 创建 systemd 服务 ─────────────────────────────────
SERVICE_NAME="etherfi-dashboard"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"

VENV_PYTHON="$PROJECT_DIR/.venv/bin/python"

cat > "$SERVICE_FILE" << EOF
[Unit]
Description=ether.fi Cash Dashboard
After=network.target
Wants=network-online.target

[Service]
Type=simple
User=$RUN_USER
Group=$RUN_GROUP
WorkingDirectory=$PROJECT_DIR
ExecStart=$VENV_PYTHON $PROJECT_DIR/main.py
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal
SyslogIdentifier=$SERVICE_NAME

# 环境
EnvironmentFile=$PROJECT_DIR/.env

# 安全加固
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=read-only
ReadWritePaths=$PROJECT_DIR
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

info "systemd 服务文件已创建: $SERVICE_FILE"

# ─── 启用并启动服务 ────────────────────────────────────
systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
systemctl restart "$SERVICE_NAME"

# ─── 等待启动 ──────────────────────────────────────────
sleep 2
if systemctl is-active --quiet "$SERVICE_NAME"; then
    info "服务已启动 ✅"
    info "访问地址: http://$(hostname -I 2>/dev/null | awk '{print $1}' || echo 'localhost'):$PORT"
    echo ""
    info "常用命令:"
    echo "  查看状态:  systemctl status $SERVICE_NAME"
    echo "  查看日志:  journalctl -u $SERVICE_NAME -f"
    echo "  重启服务:  systemctl restart $SERVICE_NAME"
    echo "  停止服务:  systemctl stop $SERVICE_NAME"
else
    err "服务启动失败，请检查日志: journalctl -u $SERVICE_NAME -n 50"
fi
