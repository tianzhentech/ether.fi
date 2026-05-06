#!/usr/bin/env python3
"""
ether.fi Cash 管理后台 (多用户版)

Usage:
    uv run main.py
    # Open http://localhost:8788
"""

import datetime
import hashlib
import json
import os
from pathlib import Path

import jwt
import uvicorn
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from etherfi.client import EtherFiClient

# ─── Config (.env) ─────────────────────────────────────────────────────

APP_DIR = Path(__file__).parent

# Simple .env loader (no extra dependency)
def _load_dotenv():
    env_file = APP_DIR / ".env"
    if not env_file.exists():
        return
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "=" in line:
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip()
            # Don't override existing env vars
            if key and key not in os.environ:
                os.environ[key] = value

_load_dotenv()

def env(key: str, default: str = "") -> str:
    return os.environ.get(key, default)

DATA_FILE = APP_DIR / "accounts.json"
USERS_FILE = APP_DIR / "users.json"
STATIC_DIR = APP_DIR / "static"

HOST = env("HOST", "0.0.0.0")
PORT = int(env("PORT", "8788"))
JWT_SECRET = env("JWT_SECRET", "change-me")
TOKEN_EXPIRE_HOURS = int(env("TOKEN_EXPIRE_HOURS", "24"))
DEFAULT_ADMIN_USER = env("DEFAULT_ADMIN_USER", "admin")
DEFAULT_ADMIN_PASS = env("DEFAULT_ADMIN_PASS", "admin123")


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


# ─── User Storage ─────────────────────────────────────────────────────

def load_users() -> list[dict]:
    if USERS_FILE.exists():
        return json.loads(USERS_FILE.read_text())
    # Bootstrap with default admin
    default = [{"username": DEFAULT_ADMIN_USER, "password_hash": hash_password(DEFAULT_ADMIN_PASS), "role": "admin"}]
    save_users(default)
    return default


def save_users(users: list[dict]):
    USERS_FILE.write_text(json.dumps(users, indent=2, ensure_ascii=False))


def find_user(username: str) -> dict | None:
    return next((u for u in load_users() if u["username"] == username), None)


# ─── Account Storage ──────────────────────────────────────────────────

def load_accounts() -> list[dict]:
    if DATA_FILE.exists():
        return json.loads(DATA_FILE.read_text())
    return []


def save_accounts(accounts: list[dict]):
    DATA_FILE.write_text(json.dumps(accounts, indent=2, ensure_ascii=False))


def get_visible_accounts(username: str, role: str) -> list[dict]:
    """Admin sees all accounts, regular users see only their own."""
    accounts = load_accounts()
    if role == "admin":
        return accounts
    return [a for a in accounts if a.get("owner") == username]


def get_client(account_id: str, username: str, role: str) -> EtherFiClient:
    """Get client, with access control check."""
    accounts = load_accounts()
    acct = next((a for a in accounts if a["id"] == account_id), None)
    if not acct:
        raise HTTPException(404, "Account not found")
    # Access control: non-admin can only access their own
    if role != "admin" and acct.get("owner") != username:
        raise HTTPException(403, "无权访问此账户")
    return EtherFiClient(acct["cookie_name"], acct["cookie_value"])


# ─── Auth ─────────────────────────────────────────────────────────────

def create_token(username: str, role: str) -> str:
    payload = {
        "sub": username,
        "role": role,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=TOKEN_EXPIRE_HOURS),
        "iat": datetime.datetime.now(datetime.timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid token")


def extract_token(request: Request) -> str:
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth[7:]
    return request.cookies.get("dashboard_token", "")


async def require_auth(request: Request) -> dict:
    """Returns decoded JWT payload with sub, role."""
    token = extract_token(request)
    if not token:
        raise HTTPException(401, "Not authenticated")
    return decode_token(token)


async def require_admin(request: Request) -> dict:
    """Only allow admin users."""
    payload = await require_auth(request)
    if payload.get("role") != "admin":
        raise HTTPException(403, "Admin access required")
    return payload


# ─── FastAPI App ──────────────────────────────────────────────────────

app = FastAPI(title="ether.fi Cash Dashboard")


# ─── Auth Routes ─────────────────────────────────────────────────────

@app.post("/api/login")
async def login(request: Request):
    body = await request.json()
    username = body.get("username", "").strip()
    password = body.get("password", "")

    if not username or not password:
        raise HTTPException(400, "用户名和密码不能为空")

    user = find_user(username)
    if not user or user["password_hash"] != hash_password(password):
        raise HTTPException(401, "用户名或密码错误")

    token = create_token(username, user["role"])
    return {"ok": True, "token": token, "username": username, "role": user["role"]}


@app.get("/api/auth/check")
async def check_auth(request: Request):
    token = extract_token(request)
    if not token:
        raise HTTPException(401, "Not authenticated")
    payload = decode_token(token)
    return {"ok": True, "username": payload["sub"], "role": payload.get("role", "user")}


# ─── User Management (admin only) ───────────────────────────────────

@app.get("/api/users", dependencies=[Depends(require_admin)])
async def list_users():
    users = load_users()
    return [{"username": u["username"], "role": u["role"]} for u in users]


@app.post("/api/users", dependencies=[Depends(require_admin)])
async def create_user(request: Request):
    body = await request.json()
    username = body.get("username", "").strip()
    password = body.get("password", "")
    role = body.get("role", "user")

    if not username or not password:
        raise HTTPException(400, "用户名和密码不能为空")
    if role not in ("admin", "user"):
        raise HTTPException(400, "角色必须是 admin 或 user")

    users = load_users()
    if any(u["username"] == username for u in users):
        raise HTTPException(400, f"用户 {username} 已存在")

    users.append({"username": username, "password_hash": hash_password(password), "role": role})
    save_users(users)
    return {"ok": True, "username": username, "role": role}


@app.delete("/api/users/{username}", dependencies=[Depends(require_admin)])
async def delete_user(username: str):
    if username == "admin":
        raise HTTPException(400, "不能删除 admin 用户")
    users = load_users()
    users = [u for u in users if u["username"] != username]
    save_users(users)
    return {"ok": True}


@app.put("/api/users/{username}/password", dependencies=[Depends(require_admin)])
async def reset_password(username: str, request: Request):
    body = await request.json()
    new_password = body.get("password", "")
    if not new_password:
        raise HTTPException(400, "密码不能为空")

    users = load_users()
    user = next((u for u in users if u["username"] == username), None)
    if not user:
        raise HTTPException(404, "用户不存在")
    user["password_hash"] = hash_password(new_password)
    save_users(users)
    return {"ok": True}


# ─── Protected API Routes ───────────────────────────────────────────

@app.get("/api/accounts")
async def list_accounts(auth: dict = Depends(require_auth)):
    accounts = get_visible_accounts(auth["sub"], auth.get("role", "user"))
    return [{
        "id": a["id"], "label": a.get("label", ""), "email": a.get("email", ""),
        "name": a.get("name", ""), "user_id": a.get("user_id", ""),
        "added_at": a.get("added_at", ""), "owner": a.get("owner", ""),
    } for a in accounts]


@app.post("/api/accounts")
async def add_account(request: Request, auth: dict = Depends(require_auth)):
    body = await request.json()
    cookie_input = body.get("session_cookie", "").strip()
    label = body.get("label", "")
    if not cookie_input:
        raise HTTPException(400, "session_cookie is required")

    if "=" in cookie_input and cookie_input.startswith("session_"):
        cookie_name, cookie_value = cookie_input.split("=", 1)
    else:
        user_id = body.get("user_id", "")
        if not user_id:
            raise HTTPException(400, "Provide cookie as 'session_USER_ID=VALUE' or include user_id field")
        cookie_name = f"session_{user_id}"
        cookie_value = cookie_input

    try:
        client = EtherFiClient(cookie_name, cookie_value)
        if not client.is_valid():
            raise HTTPException(400, "Session cookie is invalid or expired")
        summary = client.get_account_summary()
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(400, f"Failed to validate session: {e}")

    # Try to find cookie expiry from cookie.json
    cookie_expires = None
    cookie_json_path = APP_DIR / "cookie" / "cookie.json"
    if cookie_json_path.exists():
        try:
            all_cookies = json.loads(cookie_json_path.read_text())
            match = next((c for c in all_cookies if c.get("name") == cookie_name), None)
            if match and match.get("expirationDate"):
                cookie_expires = match["expirationDate"]
        except Exception:
            pass

    owner = auth["sub"]
    accounts = load_accounts()
    entry = {
        "id": summary["user_id"], "cookie_name": cookie_name, "cookie_value": cookie_value,
        "label": label or summary.get("email", ""), "email": summary.get("email", ""),
        "name": summary.get("name", ""), "user_id": summary.get("user_id", ""),
        "added_at": datetime.datetime.now().isoformat(), "owner": owner,
        "cookie_expires": cookie_expires,
    }
    # Check if same account already exists for this owner
    idx = next((i for i, a in enumerate(accounts) if a["id"] == summary["user_id"] and a.get("owner") == owner), None)
    if idx is not None:
        accounts[idx] = entry
    else:
        accounts.append(entry)
    save_accounts(accounts)
    return {"ok": True, "account": {k: v for k, v in entry.items() if k not in ("cookie_name", "cookie_value")}}


@app.delete("/api/accounts/{account_id}")
async def delete_account(account_id: str, auth: dict = Depends(require_auth)):
    accounts = load_accounts()
    username, role = auth["sub"], auth.get("role", "user")
    acct = next((a for a in accounts if a["id"] == account_id), None)
    if not acct:
        raise HTTPException(404, "Account not found")
    if role != "admin" and acct.get("owner") != username:
        raise HTTPException(403, "无权删除此账户")
    accounts = [a for a in accounts if a["id"] != account_id or (role != "admin" and a.get("owner") != username and a["id"] == account_id)]
    # Simpler: just remove the matching entry
    accounts = [a for a in load_accounts() if not (a["id"] == account_id and (role == "admin" or a.get("owner") == username))]
    save_accounts(accounts)
    return {"ok": True}


@app.patch("/api/accounts/{account_id}")
async def update_account(account_id: str, body: dict, auth: dict = Depends(require_auth)):
    """Update account metadata (label)."""
    username = auth["sub"]
    role = auth.get("role", "user")
    accounts = load_accounts()
    acct = next((a for a in accounts if a["id"] == account_id and (role == "admin" or a.get("owner") == username)), None)
    if not acct:
        raise HTTPException(404, "Account not found")
    if "label" in body:
        acct["label"] = body["label"].strip()
    save_accounts(accounts)
    return {"ok": True, "label": acct.get("label", "")}


@app.get("/api/accounts/{account_id}/session-status")
async def session_status(account_id: str, auth: dict = Depends(require_auth)):
    """Check session cookie validity and return expiry info."""
    accounts = load_accounts()
    acct = next((a for a in accounts if a["id"] == account_id), None)
    if not acct:
        raise HTTPException(404, "Account not found")

    # Check cookie_expires stored in account
    cookie_expires = acct.get("cookie_expires")

    # If not stored, try to find from cookie.json
    if not cookie_expires:
        cookie_json_path = APP_DIR / "cookie" / "cookie.json"
        if cookie_json_path.exists():
            try:
                all_cookies = json.loads(cookie_json_path.read_text())
                match = next((c for c in all_cookies if c.get("name") == acct["cookie_name"]), None)
                if match and match.get("expirationDate"):
                    cookie_expires = match["expirationDate"]
                    # Save it for future use
                    acct["cookie_expires"] = cookie_expires
                    save_accounts(accounts)
            except Exception:
                pass

    # Quick validity check via API
    alive = False
    try:
        client = EtherFiClient(acct["cookie_name"], acct["cookie_value"])
        alive = client.is_valid()
    except Exception:
        pass

    return {
        "alive": alive,
        "cookie_expires": cookie_expires,
        "now": datetime.datetime.now(datetime.timezone.utc).timestamp(),
    }


@app.get("/api/accounts/{account_id}/summary")
async def account_summary(account_id: str, auth: dict = Depends(require_auth)):
    client = get_client(account_id, auth["sub"], auth.get("role", "user"))
    try:
        return {**client.get_account_summary(), **client.get_balances()}
    except Exception as e:
        raise HTTPException(500, str(e))


_card_cache: dict = {}  # account_id -> {card_id: {pan, cvc, exp}}

@app.get("/api/accounts/{account_id}/cards")
async def account_cards(account_id: str, auth: dict = Depends(require_auth)):
    client = get_client(account_id, auth["sub"], auth.get("role", "user"))
    try:
        cards = client.get_cards()
        cache = _card_cache.setdefault(account_id, {})

        for card in cards:
            cid = card["id"]
            # Use cache if available
            if cid in cache:
                card.update(cache[cid])
                continue
            # Auto-decrypt: temporarily unfreeze if frozen
            was_frozen = card["status"] == "FROZEN"
            try:
                if was_frozen:
                    client.freeze_card(cid, freeze=False)
                revealed = client.reveal_card(cid)
                if revealed.get("pan"):
                    decrypted = {
                        "pan": revealed["pan"],
                        "cvc": revealed.get("cvc", ""),
                        "exp": revealed.get("exp", ""),
                    }
                    cache[cid] = decrypted
                    card.update(decrypted)
            except Exception as e:
                print(f"[Card Decrypt] {cid} failed: {e}")
            finally:
                if was_frozen:
                    try:
                        client.freeze_card(cid, freeze=True)
                    except Exception:
                        pass

        return cards
    except Exception as e:
        raise HTTPException(500, str(e))


@app.post("/api/accounts/{account_id}/cards/{card_id}/freeze")
async def freeze_card(account_id: str, card_id: str, auth: dict = Depends(require_auth)):
    try:
        return {"ok": True, "result": get_client(account_id, auth["sub"], auth.get("role", "user")).freeze_card(card_id, freeze=True)}
    except Exception as e:
        raise HTTPException(500, str(e))


@app.post("/api/accounts/{account_id}/cards/{card_id}/unfreeze")
async def unfreeze_card(account_id: str, card_id: str, auth: dict = Depends(require_auth)):
    try:
        return {"ok": True, "result": get_client(account_id, auth["sub"], auth.get("role", "user")).freeze_card(card_id, freeze=False)}
    except Exception as e:
        raise HTTPException(500, str(e))


@app.post("/api/accounts/{account_id}/cards/{card_id}/reveal")
async def reveal_card(account_id: str, card_id: str, auth: dict = Depends(require_auth)):
    client = get_client(account_id, auth["sub"], auth.get("role", "user"))
    try:
        cards = client.get_cards()
        card = next((c for c in cards if c["id"] == card_id), None)
        if not card:
            raise HTTPException(404, "Card not found")
        was_frozen = card["status"] == "FROZEN"
        if was_frozen:
            client.freeze_card(card_id, freeze=False)
        try:
            result = client.reveal_card(card_id)
        finally:
            if was_frozen:
                client.freeze_card(card_id, freeze=True)
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, str(e))


@app.get("/api/accounts/{account_id}/deposit")
async def deposit_info(account_id: str, auth: dict = Depends(require_auth)):
    try:
        return get_client(account_id, auth["sub"], auth.get("role", "user")).get_deposit_info()
    except Exception as e:
        raise HTTPException(500, str(e))


@app.get("/api/accounts/{account_id}/transactions")
async def transactions(account_id: str, page: int = 1, limit: int = 30, auth: dict = Depends(require_auth)):
    try:
        return get_client(account_id, auth["sub"], auth.get("role", "user")).get_transactions(page=page, limit=limit)
    except Exception as e:
        raise HTTPException(500, str(e))


@app.put("/api/accounts/{account_id}/cards/{card_id}/spending-limit")
async def update_spending_limit(account_id: str, card_id: str, request: Request, auth: dict = Depends(require_auth)):
    """Update the daily spending limit for a specific card."""
    body = await request.json()
    daily_limit = body.get("dailyLimit")
    if daily_limit is None:
        raise HTTPException(400, "dailyLimit is required and must be greater than 0")
    try:
        daily_limit = float(daily_limit)
    except (ValueError, TypeError):
        raise HTTPException(400, "dailyLimit must be a number")
    if daily_limit <= 0:
        raise HTTPException(400, "dailyLimit must be greater than 0")
    try:
        client = get_client(account_id, auth["sub"], auth.get("role", "user"))
        result = client.update_card_spending_limit(card_id, daily_limit)
        return {"ok": True, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

# ─── Vault Spending Limits (OTP-based Turnkey flow) ──────────────────

# In-memory store for pending vault limit operations
_vault_pending: dict[str, dict] = {}

@app.post("/api/accounts/{account_id}/vault/spending-limit-challenge")
async def vault_spending_limit_challenge(account_id: str, request: Request, auth: dict = Depends(require_auth)):
    """Step 1: Get the Turnkey challenge AND send email OTP in one call."""
    body = await request.json()
    daily = body.get("dailyLimit")
    monthly = body.get("monthlyLimit")
    if daily is None or monthly is None:
        raise HTTPException(400, "dailyLimit and monthlyLimit are required")
    try:
        daily_f = float(daily)
        monthly_f = float(monthly)
    except (ValueError, TypeError):
        raise HTTPException(400, "Limits must be numbers")
    if daily_f <= 0 or monthly_f <= 0:
        raise HTTPException(400, "Limits must be greater than 0")
    if daily_f > monthly_f:
        raise HTTPException(400, "Daily limit cannot exceed monthly limit")
    # Convert USD to USDC base units (6 decimals)
    daily_units = int(daily_f * 1_000_000)
    monthly_units = int(monthly_f * 1_000_000)
    try:
        client = get_client(account_id, auth["sub"], auth.get("role", "user"))
        # 1. Get the signing challenge
        challenge_data = client.get_spending_limit_challenge(daily_units, monthly_units)
        challenge = challenge_data.get("challenge", "")
        # 2. Send email OTP
        otp_id = client.send_email_otp()
        # Store pending state
        _vault_pending[account_id] = {
            "challenge": challenge,
            "otp_id": otp_id,
            "daily_units": daily_units,
            "monthly_units": monthly_units,
        }
        return {"ok": True, "challenge": challenge, "otpId": otp_id}
    except Exception as e:
        raise HTTPException(500, str(e))


@app.post("/api/accounts/{account_id}/vault/verify-otp-and-execute")
async def vault_verify_otp_and_execute(account_id: str, request: Request, auth: dict = Depends(require_auth)):
    """Step 2: Verify OTP code, sign with Turnkey, and execute the limit update — all in one call."""
    body = await request.json()
    otp_code = body.get("otpCode", "").strip()
    if not otp_code or len(otp_code) != 6:
        raise HTTPException(400, "请输入6位OTP验证码")

    pending = _vault_pending.get(account_id)
    if not pending:
        raise HTTPException(400, "没有待处理的限额修改请求，请重新发起")

    try:
        client = get_client(account_id, auth["sub"], auth.get("role", "user"))

        # Generate a P-256 target public key for the Turnkey session
        # Turnkey SDK uses compressed format (33 bytes)
        from cryptography.hazmat.primitives.asymmetric import ec
        from cryptography.hazmat.primitives import serialization
        private_key = ec.generate_private_key(ec.SECP256R1())
        public_key_bytes = private_key.public_key().public_bytes(
            serialization.Encoding.X962,
            serialization.PublicFormat.CompressedPoint,
        )
        target_public_key = public_key_bytes.hex()

        # 1. Verify OTP and get Turnkey session
        session_token = client.check_otp(
            otp_id=pending["otp_id"],
            otp_code=otp_code,
            target_public_key=target_public_key,
        )

        # 2. Sign the challenge with Turnkey using our private key
        sig = client.sign_with_turnkey(
            private_key=private_key,
            public_key_hex=target_public_key,
            challenge=pending["challenge"],
        )

        # 3. Execute the spending limit update
        result = client.execute_vault_spending_limit(
            daily_limit=pending["daily_units"],
            monthly_limit=pending["monthly_units"],
            r=sig["r"], s=sig["s"], v=sig["v"],
        )

        # Clean up pending state
        del _vault_pending[account_id]

        return {"ok": True, "result": result}
    except Exception as e:
        # Extract detailed error message from API responses
        import traceback
        error_msg = str(e)
        if hasattr(e, 'response'):
            try:
                body = e.response.json()
                error_msg = body.get("message", body.get("error", error_msg))
            except Exception:
                error_msg = e.response.text[:200] if hasattr(e.response, 'text') else error_msg
        print(f"[Vault OTP Error] {traceback.format_exc()}")
        raise HTTPException(400 if "400" in str(e) else 500, f"验证失败: {error_msg}")


# ─── Withdrawals ─────────────────────────────────────────────────────

_withdrawal_pending: dict = {}  # account_id -> {token, amount, recipient, challenge, otp_id}

@app.get("/api/accounts/{account_id}/withdrawal-fee")
async def withdrawal_fee(account_id: str, request: Request, auth: dict = Depends(require_auth)):
    """Get withdrawal fee for a token/amount."""
    client = get_client(account_id, auth["sub"], auth.get("role", "user"))
    token = request.query_params.get("token", "")
    amount = request.query_params.get("amount", "")
    if not token or not amount:
        raise HTTPException(400, "缺少 token 或 amount 参数")
    try:
        return client.get_withdrawal_fee(token, amount)
    except Exception as e:
        raise HTTPException(500, str(e))


@app.post("/api/accounts/{account_id}/withdrawal/challenge")
async def withdrawal_challenge(account_id: str, request: Request, auth: dict = Depends(require_auth)):
    """Step 1: Get withdrawal challenge and send OTP."""
    body = await request.json()
    token = body.get("token", "")
    amount = body.get("amount", "")
    recipient = body.get("recipient", "")

    if not token or not amount or not recipient:
        raise HTTPException(400, "缺少 token、amount 或 recipient")

    try:
        client = get_client(account_id, auth["sub"], auth.get("role", "user"))

        # Get the signing challenge
        challenge_data = client.request_withdrawal_challenge(token, amount, recipient)
        challenge = challenge_data.get("challenge", "")
        if not challenge:
            raise HTTPException(500, "未获取到签名 challenge")

        # Send OTP
        otp_id = client.send_email_otp()

        _withdrawal_pending[account_id] = {
            "token": token,
            "amount": amount,
            "recipient": recipient,
            "challenge": challenge,
            "otp_id": otp_id,
        }

        return {"ok": True, "otp_id": otp_id, "message": "OTP 已发送到邮箱"}
    except Exception as e:
        import traceback
        print(f"[Withdrawal Challenge Error] {traceback.format_exc()}")
        error_msg = str(e)
        if hasattr(e, 'response'):
            try:
                error_msg = e.response.json().get("message", error_msg)
            except Exception:
                pass
        raise HTTPException(500, f"提现请求失败: {error_msg}")


@app.post("/api/accounts/{account_id}/withdrawal/verify-and-execute")
async def withdrawal_verify_and_execute(account_id: str, request: Request, auth: dict = Depends(require_auth)):
    """Step 2: Verify OTP, sign with Turnkey, execute withdrawal request, then process it."""
    body = await request.json()
    otp_code = body.get("otpCode", "").strip()
    if not otp_code or len(otp_code) != 6:
        raise HTTPException(400, "请输入6位OTP验证码")

    pending = _withdrawal_pending.get(account_id)
    if not pending:
        raise HTTPException(400, "没有待处理的提现请求，请重新发起")

    try:
        client = get_client(account_id, auth["sub"], auth.get("role", "user"))

        from cryptography.hazmat.primitives.asymmetric import ec
        from cryptography.hazmat.primitives import serialization
        private_key = ec.generate_private_key(ec.SECP256R1())
        public_key_bytes = private_key.public_key().public_bytes(
            serialization.Encoding.X962,
            serialization.PublicFormat.CompressedPoint,
        )
        target_public_key = public_key_bytes.hex()

        # 1. Verify OTP
        client.check_otp(
            otp_id=pending["otp_id"],
            otp_code=otp_code,
            target_public_key=target_public_key,
        )

        # 2. Sign challenge with Turnkey
        sig = client.sign_with_turnkey(
            private_key=private_key,
            public_key_hex=target_public_key,
            challenge=pending["challenge"],
        )

        # 3. Execute withdrawal request
        result = client.execute_withdrawal_request(
            token=pending["token"],
            amount=pending["amount"],
            recipient=pending["recipient"],
            r=sig["r"], s=sig["s"], v=sig["v"],
        )

        # 4. Process/finalize the withdrawal
        try:
            process_result = client.process_withdrawal()
            result["process"] = process_result
        except Exception as pe:
            result["process_warning"] = f"提现请求已提交，但处理步骤失败: {pe}"

        del _withdrawal_pending[account_id]
        return {"ok": True, "result": result}

    except Exception as e:
        import traceback
        error_msg = str(e)
        if hasattr(e, 'response'):
            try:
                error_msg = e.response.json().get("message", error_msg)
            except Exception:
                pass
        print(f"[Withdrawal Execute Error] {traceback.format_exc()}")
        raise HTTPException(400 if "400" in str(e) else 500, f"提现执行失败: {error_msg}")


# ─── Icon Proxy ──────────────────────────────────────────────────────

import requests as req_lib

ICON_CACHE_DIR = APP_DIR / "icon_cache"
ICON_CACHE_DIR.mkdir(exist_ok=True)

# Chain ID → icon URL (public CDN sources)
CHAIN_ICON_URLS = {
    1: "https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg",
    10: "https://icons.llamao.fi/icons/chains/rsz_optimism.jpg",
    56: "https://icons.llamao.fi/icons/chains/rsz_binance.jpg",
    130: "https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg",  # Engram fallback
    324: "https://icons.llamao.fi/icons/chains/rsz_zksync%20era.jpg",
    999: "https://pbs.twimg.com/profile_images/1714208521997398016/TRg3YmhT_400x400.jpg",  # Hyperliquid
    8453: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
    34443: "https://icons.llamao.fi/icons/chains/rsz_mode.jpg",
    42161: "https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg",
    43114: "https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg",
    59144: "https://icons.llamao.fi/icons/chains/rsz_linea.jpg",
    534352: "https://icons.llamao.fi/icons/chains/rsz_scroll.jpg",
    80094: "https://icons.llamao.fi/icons/chains/rsz_berachain.jpg",
    # Solana uses a different address space, but include for completeness
    900: "https://icons.llamao.fi/icons/chains/rsz_solana.jpg",
}


@app.get("/api/icon/token/{filename:path}")
async def proxy_token_icon(filename: str):
    """Proxy token icons from ether.fi official CDN."""
    safe_name = filename.replace("..", "").replace("/", "_")
    cache_path = ICON_CACHE_DIR / f"token_{safe_name}"

    if not cache_path.exists():
        url = f"https://www.ether.fi/app/cash/images/tokens/{filename}"
        try:
            r = req_lib.get(url, timeout=10)
            r.raise_for_status()
            cache_path.write_bytes(r.content)
        except Exception:
            raise HTTPException(404, "Icon not found")

    content_type = "image/svg+xml" if filename.endswith(".svg") else \
                   "image/webp" if filename.endswith(".webp") else "image/png"
    return FileResponse(str(cache_path), media_type=content_type,
                        headers={"Cache-Control": "public, max-age=604800"})


@app.get("/api/icon/chain/{chain_id}")
async def proxy_chain_icon(chain_id: int):
    """Proxy chain/network icons from public CDN."""
    cache_path = ICON_CACHE_DIR / f"chain_{chain_id}.jpg"

    if not cache_path.exists():
        url = CHAIN_ICON_URLS.get(chain_id)
        if not url:
            raise HTTPException(404, "Unknown chain")
        try:
            r = req_lib.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
            r.raise_for_status()
            cache_path.write_bytes(r.content)
        except Exception:
            raise HTTPException(502, "Failed to fetch icon")

    return FileResponse(str(cache_path), media_type="image/jpeg",
                        headers={"Cache-Control": "public, max-age=604800"})


# ─── Static Files ────────────────────────────────────────────────────

@app.get("/")
async def index():
    return FileResponse(STATIC_DIR / "index.html")

app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


# ─── Run ─────────────────────────────────────────────────────────────

# Known token icon paths (from ether.fi CDN)
KNOWN_TOKEN_ICONS = [
    "svg/usdt.svg", "svg/usdc.svg", "svg/eth.svg", "svg/weth.svg", "svg/weeth.svg",
    "svg/liquideth.svg", "svg/liquidusd.svg", "svg/liquidbtc.svg",
    "svg/eurc.svg", "svg/eusd.svg", "svg/frxusd.svg",
    "svg/ethfi.svg", "svg/scr.svg", "svg/hype.svg", "svg/whype.svg", "svg/behype.svg",
    "svg/ebtc.svg",
    "png/usdt.png", "png/weth.png",
]


def prefetch_icons():
    """Pre-download all known icons to icon_cache/ so no external requests needed at runtime."""
    count = 0
    # Chain icons
    for chain_id, url in CHAIN_ICON_URLS.items():
        cache_path = ICON_CACHE_DIR / f"chain_{chain_id}.jpg"
        if not cache_path.exists():
            try:
                r = req_lib.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
                r.raise_for_status()
                cache_path.write_bytes(r.content)
                count += 1
            except Exception as e:
                print(f"  ⚠️ chain/{chain_id}: {e}")
    # Token icons
    for path in KNOWN_TOKEN_ICONS:
        safe_name = path.replace("/", "_")
        cache_path = ICON_CACHE_DIR / f"token_{safe_name}"
        if not cache_path.exists():
            url = f"https://www.ether.fi/app/cash/images/tokens/{path}"
            try:
                r = req_lib.get(url, timeout=10)
                r.raise_for_status()
                cache_path.write_bytes(r.content)
                count += 1
            except Exception as e:
                print(f"  ⚠️ token/{path}: {e}")
    if count > 0:
        print(f"📦 已预缓存 {count} 个图标")


if __name__ == "__main__":
    users = load_users()
    print(f"🚀 ether.fi Cash Dashboard → http://localhost:{PORT}")
    print(f"👤 已注册用户: {', '.join(u['username'] for u in users)}")
    prefetch_icons()
    uvicorn.run(app, host=HOST, port=PORT, log_level="info")
