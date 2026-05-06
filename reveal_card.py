#!/usr/bin/env python3
"""
ether.fi Cash — 协议化卡号获取 (reveal-rain)

完整复现前端 JS 的 encryptSessionId + reveal-rain + decryptSecret 流程。

认证机制:
  - withCredentials:true → 浏览器 cookie（httpOnly，Next.js SSR 层自动管理）
  - X-Active-User: 用户 UUID（localStorage "active_user"）
  - X-Sardine-Session: 风控会话 UUID（sessionStorage "sardine_session_key"）

加密流程:
  1. 生成随机 32 字节 hex string (secretKey)
  2. 将 secretKey 转为 bytes → base64 → 用 Rain RSA 公钥 RSA-OAEP(SHA-1) 加密
  3. 加密结果 base64 编码 → 作为 publicKey POST 到 reveal-rain
  4. 服务端返回 AES-GCM 加密的 PAN/CVC（用 secretKey 加密）
  5. 本地用 secretKey + iv 解密 AES-GCM → 得到明文卡号/CVC

Usage:
  python3 reveal_card.py --cookie-file cookies.txt
  python3 reveal_card.py --cookie "privy-token=xxx; privy-session=yyy; ..."
"""

import argparse
import base64
import json
import os
import secrets
import sys

import requests
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding as asym_padding
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

# ─── Rain RSA Public Key (从前端 JS bundle 提取) ───────────────────────────
RAIN_RSA_PUBLIC_KEY_PEM = """-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCeZ9uCoxi2XvOw1VmvVLo88TLk
GE+OO1j3fa8HhYlJZZ7CCIAsaCorrU+ZpD5PUTnmME3DJk+JyY1BB3p8XI+C5uno
QucrbxFbkM1lgR10ewz/LcuhleG0mrXL/bzUZbeJqI6v3c9bXvLPKlsordPanYBG
FZkmBPxc8QEdRgH4awIDAQAB
-----END PUBLIC KEY-----"""

BASE_URL = "https://www.ether.fi/app/cash/api"


def encrypt_session_id() -> tuple[str, str]:
    """
    复现前端 encryptSessionId():
    1. 生成 32 字符 hex string (16 bytes) 作为 secretKey
    2. 将 secretKey 的 hex bytes 转为 base64
    3. 用 Rain RSA 公钥 RSA-OAEP(SHA-1) 加密该 base64 string
    4. 返回 (secretKey_hex, encrypted_base64)
    """
    # 1. Generate random hex string (32 hex chars = 16 bytes, like crypto.randomUUID without dashes)
    secret_hex = secrets.token_hex(16)  # 32 hex chars

    # 2. Convert hex string to bytes, then base64
    secret_bytes = bytes.fromhex(secret_hex)
    secret_b64 = base64.b64encode(secret_bytes).decode("ascii")

    # 3. Load Rain RSA public key
    rain_pubkey = serialization.load_pem_public_key(RAIN_RSA_PUBLIC_KEY_PEM.encode())

    # 4. RSA-OAEP encrypt the base64-encoded secret
    encrypted = rain_pubkey.encrypt(
        secret_b64.encode("utf-8"),
        asym_padding.OAEP(
            mgf=asym_padding.MGF1(algorithm=hashes.SHA1()),
            algorithm=hashes.SHA1(),
            label=None,
        ),
    )

    # 5. Base64 encode the ciphertext
    encrypted_b64 = base64.b64encode(encrypted).decode("ascii")

    return secret_hex, encrypted_b64


def decrypt_secret(encrypted_data_b64: str, iv_b64: str, secret_key_hex: str) -> str:
    """
    复现前端 decryptSecret():
    AES-GCM 解密，key 是 secretKey 的 hex bytes，iv 是 base64 解码的 iv。
    """
    ciphertext = base64.b64decode(encrypted_data_b64)
    iv = base64.b64decode(iv_b64)
    key = bytes.fromhex(secret_key_hex)

    aesgcm = AESGCM(key)
    plaintext = aesgcm.decrypt(iv, ciphertext, None)
    return plaintext.decode("utf-8")


def encrypt_pin(pin: str, secret_key_hex: str) -> dict:
    """
    复现前端 encryptPin():
    将 PIN 编码为 ISO 9564 Format 2 block，然后用 AES-GCM 加密。
    """
    # ISO 9564 Format 2: "2" + length_hex + pin + "F" padding to 14 chars
    pin_block = f"2{len(pin):x}{pin}{'F' * (14 - len(pin))}"

    key = bytes.fromhex(secret_key_hex)
    iv = os.urandom(16)

    aesgcm = AESGCM(key)
    ciphertext = aesgcm.encrypt(iv, pin_block.encode("utf-8"), None)

    return {
        "iv": base64.b64encode(iv).decode("ascii"),
        "data": base64.b64encode(ciphertext).decode("ascii"),
    }


def build_session(cookie_str: str = None, cookie_file: str = None) -> tuple[requests.Session, str | None]:
    """
    构建带认证的 requests.Session。
    支持两种 cookie 格式：
    1. EditThisCookie JSON 导出（数组格式）
    2. 普通 "name=value; name2=value2" 字符串
    
    Returns: (session, auto_detected_active_user)
    """
    session = requests.Session()
    session.headers.update(
        {
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain, */*",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
            "Origin": "https://www.ether.fi",
            "Referer": "https://www.ether.fi/app/cash/card",
        }
    )

    detected_user = None

    # Load cookies from file
    if cookie_file:
        with open(cookie_file, "r") as f:
            raw = f.read().strip()
        # Try JSON format first (EditThisCookie export)
        if raw.startswith("["):
            cookies_json = json.loads(raw)
            for c in cookies_json:
                name = c["name"]
                value = c["value"]
                domain = c.get("domain", "www.ether.fi")
                # Normalize domain for requests
                cookie_domain = domain.lstrip(".")
                session.cookies.set(
                    name, value,
                    domain=cookie_domain,
                    path=c.get("path", "/"),
                )
                # Auto-detect active user from session cookie name
                if name.startswith("session_"):
                    detected_user = name[len("session_"):]
                    print(f"🔍 从 cookie 名自动检测到 active_user: {detected_user}")
            print(f"🍪 已加载 {len(cookies_json)} 个 cookie (JSON 格式)")
        else:
            cookie_str = raw

    if cookie_str:
        # Parse "name=value; name2=value2" format
        for pair in cookie_str.split(";"):
            pair = pair.strip()
            if "=" in pair:
                name, value = pair.split("=", 1)
                session.cookies.set(name.strip(), value.strip(), domain="www.ether.fi")

    return session, detected_user


def get_user_info(session: requests.Session, active_user: str, sardine_session: str = ""):
    """获取用户信息和可用账户"""
    headers = {"X-Active-User": active_user}
    if sardine_session:
        headers["X-Sardine-Session"] = sardine_session

    # Get available accounts
    resp = session.get(f"{BASE_URL}/account/available-accounts", headers=headers)
    resp.raise_for_status()
    accounts = resp.json()
    print(f"📋 可用账户: {json.dumps(accounts, indent=2)}")
    return accounts


def get_user_cards(session: requests.Session, account_id: str, active_user: str, sardine_session: str = ""):
    """获取用户的卡列表"""
    headers = {"X-Active-User": active_user}
    if sardine_session:
        headers["X-Sardine-Session"] = sardine_session

    resp = session.get(f"{BASE_URL}/v2/cards/{account_id}/user-cards", headers=headers)
    resp.raise_for_status()
    data = resp.json()
    cards = data.get("data", {}).get("accountUserCards", [])
    return cards


def get_bin_sponsor(session: requests.Session, account_id: str, card_id: str, active_user: str, sardine_session: str = ""):
    """查询卡的 BIN Sponsor"""
    headers = {"X-Active-User": active_user}
    if sardine_session:
        headers["X-Sardine-Session"] = sardine_session

    resp = session.get(f"{BASE_URL}/v2/cards/{account_id}/card/{card_id}/bin-sponsor", headers=headers)
    resp.raise_for_status()
    return resp.json().get("data", {}).get("binSponsor", "")


def freeze_card(session: requests.Session, account_id: str, card_id: str, freeze: bool, active_user: str, sardine_session: str = ""):
    """
    冻结/解冻卡片。
    PUT /v2/cards/{accountId}/card/{cardId}/freeze
    Body: {"freeze": true/false}
    """
    headers = {"X-Active-User": active_user}
    if sardine_session:
        headers["X-Sardine-Session"] = sardine_session

    resp = session.put(
        f"{BASE_URL}/v2/cards/{account_id}/card/{card_id}/freeze",
        json={"freeze": freeze},
        headers=headers,
    )
    resp.raise_for_status()
    return resp.json()

def reveal_rain_card(session: requests.Session, account_id: str, card_id: str, active_user: str, sardine_session: str = ""):
    """
    核心: 调用 reveal-rain 获取加密的卡号/CVC，然后本地解密。
    """
    headers = {"X-Active-User": active_user}
    if sardine_session:
        headers["X-Sardine-Session"] = sardine_session

    # Step 1: Generate encrypted session ID
    secret_key_hex, encrypted_session_id = encrypt_session_id()
    print(f"🔑 Secret Key (hex): {secret_key_hex}")
    print(f"🔐 Encrypted Session ID (first 40 chars): {encrypted_session_id[:40]}...")

    # Step 2: POST to reveal-rain
    payload = {"publicKey": encrypted_session_id}
    resp = session.post(
        f"{BASE_URL}/v2/cards/{account_id}/card/{card_id}/reveal-rain",
        json=payload,
        headers=headers,
    )
    resp.raise_for_status()
    result = resp.json()

    card_data = result.get("data", {}).get("data", {})
    if not card_data:
        print(f"❌ 响应中没有卡数据: {json.dumps(result, indent=2)}")
        return None

    # Step 3: Decrypt PAN
    encrypted_pan = card_data["encryptedPan"]
    pan = decrypt_secret(encrypted_pan["data"], encrypted_pan["iv"], secret_key_hex)

    # Step 4: Decrypt CVC
    encrypted_cvc = card_data["encryptedCvc"]
    cvc = decrypt_secret(encrypted_cvc["data"], encrypted_cvc["iv"], secret_key_hex)

    # Step 5: Expiry is plaintext
    exp = card_data.get("exp", "")

    return {"pan": pan, "cvc": cvc, "exp": exp}


# ─── 消费记录 ──────────────────────────────────────────────────────────

def get_safe_id(session: requests.Session, active_user: str, sardine_session: str = "") -> str:
    """从用户信息中获取 safeId（Vault ID），用于查询消费记录。"""
    headers = {"X-Active-User": active_user}
    if sardine_session:
        headers["X-Sardine-Session"] = sardine_session

    resp = session.get(f"{BASE_URL}/v2/users/me", headers=headers)
    resp.raise_for_status()
    data = resp.json()
    user_data = data.get("data", data)
    accounts = user_data.get("personalAccounts", [])
    if accounts:
        safe = accounts[0].get("safe", {})
        if safe and safe.get("id"):
            return safe["id"]
    raise ValueError("无法获取 safeId，请手动指定 --safe-id")


def get_transactions(
    session: requests.Session,
    safe_id: str,
    active_user: str,
    sardine_session: str = "",
    page: int = 1,
    limit: int = 50,
    card_ids: list[str] | None = None,
    date_from: str | None = None,
    date_to: str | None = None,
) -> list[dict]:
    """
    获取消费记录。
    GET /v3/account-safe/{safeId}/transaction-history
    """
    headers = {"X-Active-User": active_user}
    if sardine_session:
        headers["X-Sardine-Session"] = sardine_session

    params = {
        "page": str(page),
        "limit": str(limit),
        "withPendingCancellation": "true",
        "withPendingManualReview": "true",
        "withGranularRefundStatus": "true",
        "withDisputeStatus": "true",
    }
    if date_from:
        params["from"] = date_from
    if date_to:
        params["to"] = date_to

    url = f"{BASE_URL}/v3/account-safe/{safe_id}/transaction-history"

    # card_ids need to be appended as repeated params
    if card_ids:
        param_str = "&".join(f"cardIds[]={cid}" for cid in card_ids)
        url = f"{url}?{param_str}"
        resp = session.get(url, params=params, headers=headers)
    else:
        resp = session.get(url, params=params, headers=headers)

    resp.raise_for_status()
    data = resp.json()
    return data.get("data", [])


def print_transactions(transactions: list[dict]):
    """格式化打印消费记录。"""
    if not transactions:
        print("  (无记录)")
        return

    total_spend = 0.0
    for i, tx in enumerate(transactions):
        et = tx.get("eventType", "")
        ts = tx.get("timestamp", "")[:19]

        if et == "rain_transaction":
            merchant = tx.get("merchantData", {}).get("merchant_name", "Unknown").strip()
            bill_amount = tx.get("billAmount", 0) or 0
            bill_currency = tx.get("billCurrency", "")
            tx_amount = tx.get("transactionAmount", 0) or 0
            tx_currency = tx.get("transactionCurrency", "")
            status = tx.get("status", "")
            card_last4 = tx.get("cardLast4", "")
            cashback = tx.get("cashbackAmountUsd", 0) or 0

            status_map = {
                "CLEARED": "✅", "PENDING": "⏳", "DECLINED": "❌",
                "REFUNDED": "↩️", "REVERSED": "↩️",
            }
            s_emoji = status_map.get(status, "❓")

            line = f"  [{i:2d}] {ts}  {s_emoji} {status:10s}"
            line += f"  {bill_amount:>10.2f} {bill_currency:4s}"
            if tx_currency != bill_currency:
                line += f" ({tx_amount:.2f} {tx_currency})"
            line += f"  {merchant:35s}"
            if card_last4:
                line += f"  ****{card_last4}"
            if cashback > 0:
                line += f"  💰{cashback:.3f}"
            print(line)

            if status in ("CLEARED", "PENDING"):
                total_spend += bill_amount

        elif "withdrawal" in et:
            tokens = tx.get("sourceTokens", [{}])
            amount_usd = float(tokens[0].get("amountUSD", "0")) if tokens else 0
            symbol = tokens[0].get("symbol", "") if tokens else ""
            recipient = tx.get("recipient", "")[:10] + "..."
            print(f"  [{i:2d}] {ts}  📤 Withdrawal   {amount_usd:>10.2f} USD  ({symbol})  → {recipient}")

        elif "topup" in et.lower() or "deposit" in et.lower():
            tokens = tx.get("sourceTokens", [{}])
            if tokens and tokens[0].get("amountUSD"):
                amount_usd = float(tokens[0].get("amountUSD", "0"))
                symbol = tokens[0].get("symbol", "")
                print(f"  [{i:2d}] {ts}  📥 Top-up       {amount_usd:>10.2f} USD  ({symbol})")
            else:
                print(f"  [{i:2d}] {ts}  📥 {et}")
        else:
            print(f"  [{i:2d}] {ts}  📋 {et}")

    print(f"\n  📊 消费合计 (CLEARED + PENDING): ${total_spend:.2f} USD")


# ─── 充值入金 ──────────────────────────────────────────────────────────

CHAIN_NAMES = {
    1: "Ethereum", 10: "Optimism", 56: "BNB Chain", 130: "Engram",
    324: "zkSync", 999: "Hyperliquid", 8453: "Base", 34443: "Mode",
    42161: "Arbitrum", 43114: "Avalanche", 59144: "Linea",
    534352: "Scroll", 80094: "Berachain",
}


def get_deposit_info(session: requests.Session, active_user: str, sardine_session: str = "") -> dict:
    """
    获取充值信息：Safe 地址、链、余额、支持的 token。
    """
    headers = {"X-Active-User": active_user}
    if sardine_session:
        headers["X-Sardine-Session"] = sardine_session

    # 1. Get user info for safe address
    r_me = session.get(f"{BASE_URL}/v2/users/me", headers=headers)
    r_me.raise_for_status()
    me = r_me.json().get("data", {})
    acct = me.get("personalAccounts", [{}])[0]
    safe = acct.get("safe", {})
    safe_address = safe.get("userSafeAddress", "")
    safe_id = safe.get("id", "")
    chain_id = safe.get("chainId", 0)

    # 2. Get safe balances
    r_details = session.get(f"{BASE_URL}/v2/account-safe/{safe_id}/details", headers=headers)
    r_details.raise_for_status()
    details = r_details.json().get("data", {})
    balances = details.get("balances", [])
    spending_limits = details.get("spendingLimitData", {})

    # 3. Get supported assets
    r_assets = session.get(f"{BASE_URL}/assets", headers=headers)
    r_assets.raise_for_status()
    assets = r_assets.json().get("data", {})

    # Build token address -> symbol map for current chain
    token_map = {}
    topup_tokens = []
    for symbol, info in assets.items():
        topup_networks = info.get("topUpNetworks") or []
        addr_map = info.get("address", {})
        chain_addr = addr_map.get(str(chain_id))
        if chain_addr:
            token_map[chain_addr.lower()] = symbol
        if chain_id in topup_networks and chain_addr:
            topup_tokens.append({
                "symbol": symbol,
                "address": chain_addr,
                "decimals": info.get("decimals", 18),
                "networks": topup_networks,
            })

    # Resolve balances
    resolved_balances = []
    for b in balances:
        addr = b["token"]
        amt = float(b["amount"])
        symbol = token_map.get(addr.lower(), addr[:10] + "...")
        resolved_balances.append({"symbol": symbol, "address": addr, "amount": amt})

    return {
        "safe_address": safe_address,
        "safe_id": safe_id,
        "chain_id": chain_id,
        "chain_name": CHAIN_NAMES.get(chain_id, f"Chain {chain_id}"),
        "balances": resolved_balances,
        "topup_tokens": topup_tokens,
        "spending_limits": spending_limits,
    }


def print_deposit_info(info: dict):
    """格式化打印充值信息。"""
    print(f"\n  🏦 Safe 钱包地址: {info['safe_address']}")
    print(f"  ⛓️  链:          {info['chain_name']} (chainId={info['chain_id']})")
    print(f"  🆔 Safe ID:     {info['safe_id']}")

    # Balances
    print(f"\n  💰 当前余额:")
    has_balance = False
    for b in info["balances"]:
        if b["amount"] > 0.001:
            has_balance = True
            print(f"     {b['symbol']:15s}  {b['amount']:>15.6f}  ({b['address']})")
    if not has_balance:
        print(f"     (无余额)")

    # Spending limits
    limits = info.get("spending_limits", {})
    daily = limits.get("daily", {})
    monthly = limits.get("monthly", {})
    if daily or monthly:
        print(f"\n  📏 消费限额:")
        if daily:
            print(f"     日限额: ${daily.get('limit', 0):>10,.0f}  已用: ${daily.get('used', 0):>10,.2f}")
        if monthly:
            print(f"     月限额: ${monthly.get('limit', 0):>10,.0f}  已用: ${monthly.get('used', 0):>10,.2f}")

    # Supported topup tokens
    print(f"\n  🪙 支持充值的 Token ({info['chain_name']}):")
    for t in sorted(info["topup_tokens"], key=lambda x: x["symbol"]):
        other_chains = [CHAIN_NAMES.get(n, str(n)) for n in t["networks"] if n != info["chain_id"]]
        extra = f"  (也支持: {', '.join(other_chains)})" if other_chains else ""
        print(f"     {t['symbol']:15s}  {t['address']}{extra}")

    print(f"\n  ℹ️  充值方式: 将支持的 Token 转账到 Safe 地址即可自动入账")


def main():
    parser = argparse.ArgumentParser(description="ether.fi Cash - Reveal Card Details")
    parser.add_argument("--cookie", type=str, help="Cookie string from browser")
    parser.add_argument("--cookie-file", type=str, default="cookie/cookie.json", help="File containing cookies (JSON or string)")
    parser.add_argument("--active-user", type=str, help="X-Active-User UUID (auto-detected from session cookie)")
    parser.add_argument("--sardine-session", type=str, default="", help="X-Sardine-Session UUID")
    parser.add_argument("--account-id", type=str, help="Account UUID (auto-detected if not provided)")
    parser.add_argument("--card-id", type=str, help="Card UUID (auto-detected if not provided)")
    parser.add_argument("--list-only", action="store_true", help="Only list cards, don't reveal")
    parser.add_argument("--unfreeze", action="store_true", help="Auto-unfreeze frozen cards before reveal, re-freeze after")
    parser.add_argument("--freeze-card", type=str, metavar="CARD_ID", help="Freeze a specific card")
    parser.add_argument("--unfreeze-card", type=str, metavar="CARD_ID", help="Unfreeze a specific card")
    # Transaction history
    parser.add_argument("--transactions", action="store_true", help="Show transaction history")
    parser.add_argument("--safe-id", type=str, help="Safe/Vault UUID (auto-detected if not provided)")
    parser.add_argument("--tx-limit", type=int, default=50, help="Number of transactions to fetch (default: 50)")
    parser.add_argument("--tx-page", type=int, default=1, help="Transaction page number (default: 1)")
    parser.add_argument("--tx-from", type=str, help="Transaction date range start (ISO format)")
    parser.add_argument("--tx-to", type=str, help="Transaction date range end (ISO format)")
    # Deposit info
    parser.add_argument("--deposit", action="store_true", help="Show deposit address, balances and supported tokens")
    args = parser.parse_args()

    if not args.cookie and not args.cookie_file:
        print("⚠️  未提供 Cookie，API 请求可能因未认证而失败")
        print("   提示: 从浏览器 DevTools → Application → Cookies 复制 cookie 字符串")

    # Build session
    session, detected_user = build_session(cookie_str=args.cookie, cookie_file=args.cookie_file)
    
    # Auto-detect active user if not provided
    if not args.active_user:
        if detected_user:
            args.active_user = detected_user
        else:
            print("❌ 未提供 --active-user 且无法从 cookie 自动检测")
            sys.exit(1)

    # Get accounts if not specified
    if not args.account_id:
        accounts = get_user_info(session, args.active_user, args.sardine_session)
        if not accounts:
            print("❌ 没有找到可用账户")
            sys.exit(1)
        args.account_id = accounts[0]["accounts"][0]["id"]
        print(f"✅ 使用账户: {args.account_id}")

    # Get cards
    cards = get_user_cards(session, args.account_id, args.active_user, args.sardine_session)
    if not cards:
        print("❌ 没有找到任何卡")
        sys.exit(1)

    print(f"\n🃏 找到 {len(cards)} 张卡:")
    for i, card in enumerate(cards):
        status_emoji = "✅" if card["status"] == "ACTIVE" else "❌"
        print(
            f"  [{i}] {status_emoji} {card['cardName']} | "
            f"****{card['last4']} | {card['cardType']} | {card['status']} | "
            f"ID: {card['id']}"
        )

    # ── Deposit info mode ──
    if args.deposit:
        print(f"\n💵 充值入金信息:")
        print(f"{'='*80}")
        deposit_info = get_deposit_info(session, args.active_user, args.sardine_session)
        print_deposit_info(deposit_info)
        print(f"{'='*80}")
        return

    # ── Transaction history mode ──
    if args.transactions:
        if not args.safe_id:
            try:
                args.safe_id = get_safe_id(session, args.active_user, args.sardine_session)
                print(f"🔐 Safe ID: {args.safe_id}")
            except Exception as e:
                print(f"❌ 获取 Safe ID 失败: {e}")
                sys.exit(1)

        print(f"\n📜 消费记录 (page={args.tx_page}, limit={args.tx_limit}):")
        print(f"{'─'*120}")
        txs = get_transactions(
            session, args.safe_id, args.active_user, args.sardine_session,
            page=args.tx_page, limit=args.tx_limit,
            date_from=args.tx_from, date_to=args.tx_to,
        )
        print_transactions(txs)
        print(f"{'─'*120}")
        return

    # Standalone freeze/unfreeze commands
    if args.freeze_card:
        print(f"❄️  正在冻结卡 {args.freeze_card}...")
        result = freeze_card(session, args.account_id, args.freeze_card, True, args.active_user, args.sardine_session)
        print(f"✅ 冻结成功: {json.dumps(result, indent=2)}")
        return

    if args.unfreeze_card:
        print(f"🔥 正在解冻卡 {args.unfreeze_card}...")
        result = freeze_card(session, args.account_id, args.unfreeze_card, False, args.active_user, args.sardine_session)
        print(f"✅ 解冻成功: {json.dumps(result, indent=2)}")
        return

    if args.list_only:
        return

    # Determine which cards to reveal
    if args.card_id:
        targets = [c for c in cards if c["id"] == args.card_id]
        if not targets:
            print(f"❌ 未找到 Card ID: {args.card_id}")
            sys.exit(1)
    else:
        targets = cards  # Reveal all cards

    print(f"\n{'='*60}")
    for idx, card in enumerate(targets):
        card_id = card["id"]
        card_status = card["status"]
        status_emoji = "✅" if card_status == "ACTIVE" else "❄️"
        print(f"\n🎯 [{idx+1}/{len(targets)}] {status_emoji} {card['cardName']} ****{card['last4']} ({card_status})")

        # Auto-unfreeze if needed
        need_refreeze = False
        if card_status == "FROZEN" and args.unfreeze:
            try:
                print(f"   🔥 自动解冻中...")
                freeze_card(session, args.account_id, card_id, False, args.active_user, args.sardine_session)
                print(f"   ✅ 解冻成功")
                need_refreeze = True
            except Exception as e:
                print(f"   ❌ 解冻失败: {e}")
                continue
        elif card_status == "FROZEN" and not args.unfreeze:
            print(f"   ⏭️  卡已冻结，跳过 (使用 --unfreeze 自动解冻)")
            continue

        # Check BIN sponsor
        try:
            sponsor = get_bin_sponsor(session, args.account_id, card_id, args.active_user, args.sardine_session)
            print(f"   🏦 BIN Sponsor: {sponsor}")
        except Exception as e:
            print(f"   ⚠️  获取 BIN Sponsor 失败: {e}")
            if need_refreeze:
                freeze_card(session, args.account_id, card_id, True, args.active_user, args.sardine_session)
                print(f"   ❄️  已重新冻结")
            continue

        if sponsor != "rain":
            print(f"   ⚠️  不支持的 BIN Sponsor: {sponsor}，跳过")
            if need_refreeze:
                freeze_card(session, args.account_id, card_id, True, args.active_user, args.sardine_session)
                print(f"   ❄️  已重新冻结")
            continue

        # Reveal card
        try:
            result = reveal_rain_card(session, args.account_id, card_id, args.active_user, args.sardine_session)
            if result:
                print(f"   💳 卡号 (PAN): {result['pan']}")
                print(f"   🔒 CVV/CVC:    {result['cvc']}")
                print(f"   📅 有效期:     {result['exp']}")
            else:
                print(f"   ❌ 获取卡号失败（空响应）")
        except Exception as e:
            print(f"   ❌ 获取卡号失败: {e}")
        finally:
            # Re-freeze if we unfroze it
            if need_refreeze:
                try:
                    freeze_card(session, args.account_id, card_id, True, args.active_user, args.sardine_session)
                    print(f"   ❄️  已重新冻结")
                except Exception as e:
                    print(f"   ⚠️  重新冻结失败: {e}")

    print(f"\n{'='*60}")


if __name__ == "__main__":
    main()
