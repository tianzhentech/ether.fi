"""
ether.fi Cash API client.

Encapsulates all API interactions with a single authenticated session.
Auth requires only: session_{userId} cookie + X-Active-User header + Origin/Referer.
"""

from __future__ import annotations

import json
import requests
from .crypto import encrypt_session_id, decrypt_secret

BASE_URL = "https://www.ether.fi/app/cash/api"

CHAIN_NAMES = {
    1: "Ethereum", 10: "Optimism", 56: "BNB Chain", 130: "Engram",
    324: "zkSync", 999: "Hyperliquid", 8453: "Base", 34443: "Mode",
    42161: "Arbitrum", 43114: "Avalanche", 59144: "Linea",
    534352: "Scroll", 80094: "Berachain",
}


class EtherFiClient:
    """Authenticated client for a single ether.fi Cash account."""

    def __init__(self, session_cookie_name: str, session_cookie_value: str, proxy: str = ""):
        """
        Initialize with the critical session cookie.
        session_cookie_name: e.g. "session_b075400a-..."
        session_cookie_value: e.g. "cc0bbadd-..."
        proxy: e.g. "socks5://127.0.0.1:1080" or "http://user:pass@host:port"
        """
        self.session = requests.Session()
        self.session.headers.update({
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain, */*",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
            "Origin": "https://www.ether.fi",
            "Referer": "https://www.ether.fi/app/cash/card",
        })
        self.session.cookies.set(session_cookie_name, session_cookie_value, domain="www.ether.fi", path="/")

        if proxy:
            self.session.proxies = {"http": proxy, "https": proxy}

        # Extract active_user from cookie name
        if session_cookie_name.startswith("session_"):
            self.active_user = session_cookie_name[len("session_"):]
        else:
            self.active_user = ""

        self._account_id: str | None = None
        self._safe_id: str | None = None
        self._user_info: dict | None = None

    @classmethod
    def from_cookie_json(cls, cookies: list[dict]) -> "EtherFiClient":
        """Create client from EditThisCookie JSON export."""
        session_cookie = None
        other_cookies = []
        for c in cookies:
            if c["name"].startswith("session_"):
                session_cookie = c
            else:
                other_cookies.append(c)

        if not session_cookie:
            raise ValueError("No session_* cookie found in cookie list")

        client = cls(session_cookie["name"], session_cookie["value"])
        # Add other cookies too
        for c in other_cookies:
            domain = c.get("domain", "www.ether.fi").lstrip(".")
            client.session.cookies.set(c["name"], c["value"], domain=domain, path=c.get("path", "/"))
        return client

    def _headers(self) -> dict:
        return {"X-Active-User": self.active_user}

    # ─── Account ────────────────────────────────────────────────────────

    def get_accounts(self) -> list[dict]:
        resp = self.session.get(f"{BASE_URL}/account/available-accounts", headers=self._headers())
        resp.raise_for_status()
        return resp.json()

    def get_user_info(self) -> dict:
        if self._user_info:
            return self._user_info
        resp = self.session.get(f"{BASE_URL}/v2/users/me", headers=self._headers())
        resp.raise_for_status()
        self._user_info = resp.json().get("data", {})
        return self._user_info

    @property
    def account_id(self) -> str:
        if not self._account_id:
            accounts = self.get_accounts()
            if accounts:
                self._account_id = accounts[0]["accounts"][0]["id"]
        return self._account_id or ""

    @property
    def safe_id(self) -> str:
        if not self._safe_id:
            me = self.get_user_info()
            acct = me.get("personalAccounts", [{}])[0]
            self._safe_id = acct.get("safe", {}).get("id", "")
        return self._safe_id or ""

    def get_account_summary(self) -> dict:
        """Get a comprehensive account summary."""
        me = self.get_user_info()
        acct = me.get("personalAccounts", [{}])[0]
        safe = acct.get("safe", {})

        # Build billing address in 3 lines (matching official layout)
        line1 = me.get("addressLine1", "")
        line2 = me.get("addressLine2", "")
        city = me.get("city", "")
        region = me.get("region", "")
        zipcode = me.get("zipCode", "")
        country = me.get("country", "")

        # Country code -> name
        country_names = {"BR": "Brazil", "US": "United States", "GB": "United Kingdom",
                         "CA": "Canada", "AU": "Australia", "DE": "Germany", "FR": "France",
                         "JP": "Japan", "KR": "South Korea", "SG": "Singapore", "HK": "Hong Kong",
                         "TW": "Taiwan", "CN": "China", "IN": "India", "AE": "UAE"}
        country_name = country_names.get(country, country)

        addr_line1 = f"{line1} {line2}".strip() if line1 else ""
        addr_line2 = ", ".join(filter(None, [city, country_name]))
        addr_line3 = zipcode

        return {
            "user_id": me.get("id", ""),
            "email": me.get("email", ""),
            "name": f"{me.get('firstNameEn', '')} {me.get('lastNameEn', '')}".strip(),
            "country": country,
            "kyc_status": me.get("kycStatus", ""),
            "account_id": acct.get("id", ""),
            "tier": acct.get("tier", ""),
            "safe_address": safe.get("userSafeAddress", ""),
            "safe_id": safe.get("id", ""),
            "chain_id": safe.get("chainId", 0),
            "chain_name": CHAIN_NAMES.get(safe.get("chainId", 0), "Unknown"),
            "turnkey_address": acct.get("turnkeyAddress", ""),
            "billing_line1": addr_line1,
            "billing_line2": addr_line2,
            "billing_line3": addr_line3,
        }

    # ─── Cards ──────────────────────────────────────────────────────────

    def get_cards(self) -> list[dict]:
        resp = self.session.get(
            f"{BASE_URL}/v2/cards/{self.account_id}/user-cards",
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json().get("data", {}).get("accountUserCards", [])

    def get_bin_sponsor(self, card_id: str) -> str:
        resp = self.session.get(
            f"{BASE_URL}/v2/cards/{self.account_id}/card/{card_id}/bin-sponsor",
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json().get("data", {}).get("binSponsor", "")

    def freeze_card(self, card_id: str, freeze: bool) -> dict:
        resp = self.session.put(
            f"{BASE_URL}/v2/cards/{self.account_id}/card/{card_id}/freeze",
            json={"freeze": freeze},
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json()

    def update_card_spending_limit(self, card_id: str, daily_limit: float | None) -> dict:
        """Update the daily spending limit for a specific card.
        
        daily_limit: New daily limit in USD, or None to remove limit.
        """
        resp = self.session.put(
            f"{BASE_URL}/v2/cards/{self.account_id}/card/{card_id}/spending-limit",
            json={"dailyLimit": daily_limit},
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json()

    # ─── Vault Spending Limits (V3 Crypto) ───────────────────────────────

    def get_spending_limit_challenge(self, daily_limit: int, monthly_limit: int) -> dict:
        """Get the Turnkey signing challenge for updating vault spending limits.
        
        daily_limit / monthly_limit: amounts in USDC base units (6 decimals).
        e.g. $5000 → 5000000000
        """
        resp = self.session.get(
            f"{BASE_URL}/v3/crypto/{self.safe_id}/update-spending-limit-challenge",
            params={
                "dailySpendingLimit": str(daily_limit),
                "monthlySpendingLimit": str(monthly_limit),
            },
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json().get("data", {})

    def execute_vault_spending_limit(
        self,
        daily_limit: int,
        monthly_limit: int,
        r: str,
        s: str,
        v: str,
    ) -> dict:
        """Execute the vault spending limit update with a Turnkey signature."""
        resp = self.session.post(
            f"{BASE_URL}/v3/crypto/{self.safe_id}/execute-update-spending-limit",
            json={
                "dailySpendingLimit": str(daily_limit),
                "monthlySpendingLimit": str(monthly_limit),
                "r": r,
                "s": s,
                "v": v,
            },
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json()

    def get_turnkey_auth_methods(self) -> dict:
        """Get available Turnkey authorization methods for this account."""
        resp = self.session.get(
            f"{BASE_URL}/turnkey/auth-methods",
            params={"accountId": self.account_id},
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json().get("data", {})

    def send_email_otp(self) -> str:
        """Send Turnkey email OTP to the account owner. Returns otpId."""
        resp = self.session.post(
            f"{BASE_URL}/turnkey/send-email-otp-new/{self.account_id}",
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json().get("data", {}).get("otpId", "")

    def check_otp(self, otp_id: str, otp_code: str, target_public_key: str) -> str:
        """Verify OTP code and return Turnkey session token."""
        resp = self.session.post(
            f"{BASE_URL}/turnkey/check-otp-new/{self.account_id}",
            json={
                "otpId": otp_id,
                "otpCode": otp_code,
                "targetPublicKey": target_public_key,
            },
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json().get("data", {}).get("session", "")

    def sign_with_turnkey(self, private_key, public_key_hex: str, challenge: str) -> dict:
        """Sign a challenge using Turnkey API with proper API key stamp.
        
        private_key: cryptography P-256 private key (used to stamp the request)
        public_key_hex: compressed public key hex (registered via checkOTP)
        challenge: the hex challenge to sign
        
        Returns dict with r, s, v signature components.
        """
        import json, time, base64
        from cryptography.hazmat.primitives.asymmetric import ec
        from cryptography.hazmat.primitives import hashes

        me = self.get_user_info()
        acct = me.get("personalAccounts", [{}])[0]
        turnkey_address = acct.get("turnkeyAddress", "")
        turnkey_sub_org = acct.get("turnkeySubOrg", "")

        if not turnkey_address or not turnkey_sub_org:
            raise ValueError("Missing Turnkey address or sub-organization ID")

        # Build the Turnkey API request body
        body = {
            "type": "ACTIVITY_TYPE_SIGN_RAW_PAYLOAD_V2",
            "timestampMs": str(int(time.time() * 1000)),
            "organizationId": turnkey_sub_org,
            "parameters": {
                "signWith": turnkey_address,
                "payload": challenge,
                "encoding": "PAYLOAD_ENCODING_HEXADECIMAL",
                "hashFunction": "HASH_FUNCTION_NO_OP",
            },
        }
        body_json = json.dumps(body, separators=(",", ":"))

        # Create the API key stamp:
        # 1. Sign the request body with our P-256 private key (ECDSA + SHA-256)
        signature_der = private_key.sign(
            body_json.encode("utf-8"),
            ec.ECDSA(hashes.SHA256()),
        )
        # 2. Build stamp JSON with public key, scheme, and DER signature
        stamp = {
            "publicKey": public_key_hex,
            "scheme": "SIGNATURE_SCHEME_TK_API_P256",
            "signature": signature_der.hex(),
        }
        # 3. Base64 encode (standard base64, matching JS btoa())
        stamp_b64 = base64.b64encode(
            json.dumps(stamp, separators=(",", ":")).encode()
        ).decode()

        resp = requests.post(
            "https://api.turnkey.com/public/v1/submit/sign_raw_payload",
            data=body_json,
            headers={
                "Content-Type": "application/json",
                "X-Stamp": stamp_b64,
            },
        )
        resp.raise_for_status()
        result = resp.json()
        
        sign_result = result.get("activity", {}).get("result", {}).get("signRawPayloadResult", {})
        return {
            "r": sign_result.get("r", ""),
            "s": sign_result.get("s", ""),
            "v": sign_result.get("v", ""),
        }

    def reveal_card(self, card_id: str) -> dict:
        """Reveal card PAN/CVC/EXP using Rain crypto protocol."""
        secret_key_hex, encrypted_session_id = encrypt_session_id()
        resp = self.session.post(
            f"{BASE_URL}/v2/cards/{self.account_id}/card/{card_id}/reveal-rain",
            json={"publicKey": encrypted_session_id},
            headers=self._headers(),
        )
        resp.raise_for_status()
        card_data = resp.json().get("data", {}).get("data", {})
        if not card_data:
            return {}

        pan = decrypt_secret(card_data["encryptedPan"]["data"], card_data["encryptedPan"]["iv"], secret_key_hex)
        cvc = decrypt_secret(card_data["encryptedCvc"]["data"], card_data["encryptedCvc"]["iv"], secret_key_hex)
        return {"pan": pan, "cvc": cvc, "exp": card_data.get("exp", "")}

    # ─── Balances & Deposit ─────────────────────────────────────────────

    def get_safe_details(self) -> dict:
        resp = self.session.get(
            f"{BASE_URL}/v2/account-safe/{self.safe_id}/details",
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json().get("data", {})

    def get_assets(self) -> dict:
        resp = self.session.get(f"{BASE_URL}/assets", headers=self._headers())
        resp.raise_for_status()
        return resp.json().get("data", {})

    def get_balances(self) -> dict:
        """Get resolved balances with token symbols and spending limits."""
        details = self.get_safe_details()
        assets_config = self.get_assets()
        summary = self.get_account_summary()
        chain_id = summary["chain_id"]

        # Build token address -> symbol/decimals/icon map from asset config
        token_map = {}
        for symbol, info in assets_config.items():
            addr = info.get("address", {}).get(str(chain_id))
            if addr:
                icons = info.get("icons", {})
                token_map[addr.lower()] = {
                    "symbol": symbol,
                    "decimals": info.get("decimals", 18),
                    "icon_svg": icons.get("svg", ""),
                    "icon_png": icons.get("png", ""),
                }

        # Build token address -> USD price map
        price_map = {}
        for p in details.get("tokenPrices", []):
            price_map[p["token"].lower()] = float(p.get("amount", 0))

        # Convert raw asset amounts using decimals
        balances = []
        for a in details.get("assets", []):
            addr = a["token"]
            raw_amount = int(a["amount"])
            info = token_map.get(addr.lower(), {"symbol": addr[:10] + "...", "decimals": 18, "icon_svg": "", "icon_png": ""})
            decimals = info["decimals"]
            amount = raw_amount / (10 ** decimals)
            usd_price = price_map.get(addr.lower(), 0)
            usd_value = amount * usd_price
            if amount > 0.000001:
                # Build static icon URL from icon_cache
                icon_url = ""
                if info.get("icon_png"):
                    # icon_png is like "/app/cash/images/tokens/png/usdt.png"
                    # icon_cache filename: token_png_usdt.png
                    path = info["icon_png"].replace("/app/cash/images/tokens/", "").replace("/", "_")
                    icon_url = f"/icons/token_{path}"
                elif info.get("icon_svg"):
                    path = info["icon_svg"].replace("/app/cash/images/tokens/", "").replace("/", "_")
                    icon_url = f"/icons/token_{path}"

                balances.append({
                    "symbol": info["symbol"],
                    "address": addr,
                    "amount": round(amount, 6),
                    "usd_value": round(usd_value, 2),
                    "icon": icon_url,
                    "decimals": decimals,
                })

        total_balance = float(details.get("totalBalance", 0))

        spending = details.get("spendingLimitData", {})
        return {
            "total_balance": total_balance,
            "balances": balances,
            "daily_limit": spending.get("daily", {}).get("limit", 0),
            "daily_used": spending.get("daily", {}).get("used", 0),
            "monthly_limit": spending.get("monthly", {}).get("limit", 0),
            "monthly_used": spending.get("monthly", {}).get("used", 0),
        }

    def get_deposit_info(self) -> dict:
        """Get deposit address and supported topup tokens with per-network addresses."""
        summary = self.get_account_summary()
        assets = self.get_assets()

        topup_tokens = []
        for symbol, info in assets.items():
            networks = info.get("topUpNetworks") or []
            if not networks:
                continue
            addresses = info.get("address", {})
            icons = info.get("icons", {})
            # Build list of supported networks with their addresses
            network_list = []
            for chain_id in networks:
                addr = addresses.get(str(chain_id))
                if addr:
                    network_list.append({
                        "chain_id": chain_id,
                        "chain_name": CHAIN_NAMES.get(chain_id, f"Chain {chain_id}"),
                        "token_address": addr,
                    })
            if network_list:
                topup_tokens.append({
                    "symbol": symbol,
                    "displayLabel": info.get("displayLabel", symbol),
                    "decimals": info.get("decimals", 18),
                    "icon_svg": icons.get("svg", ""),
                    "icon_png": icons.get("png", ""),
                    "networks": network_list,
                })

        return {
            "safe_address": summary["safe_address"],
            "chain_id": summary["chain_id"],
            "chain_name": summary["chain_name"],
            "tokens": sorted(topup_tokens, key=lambda x: x["symbol"]),
        }
    # ─── Withdrawals ──────────────────────────────────────────────────────

    def get_withdrawal_fee(self, token: str, amount: str) -> dict:
        """Get the withdrawal fee for a given token and amount.
        
        token: token contract address
        amount: raw amount in base units (e.g. "5000000" for 5 USDT)
        """
        resp = self.session.get(
            f"{BASE_URL}/v3/crypto/{self.safe_id}/get-withdrawal-fee",
            params={"token": token, "amount": amount},
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json().get("data", {})

    def request_withdrawal_challenge(self, token: str, amount: str, recipient: str) -> dict:
        """Get the Turnkey signing challenge for a withdrawal request.
        
        token: token contract address
        amount: raw amount in base units
        recipient: destination wallet address on the same network
        """
        resp = self.session.get(
            f"{BASE_URL}/v3/crypto/{self.safe_id}/request-withdrawal-challenge",
            params={
                "token": token,
                "amount": amount,
                "recipient": recipient,
            },
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json().get("data", {})

    def execute_withdrawal_request(
        self, token: str, amount: str, recipient: str,
        r: str, s: str, v: str,
    ) -> dict:
        """Submit signed withdrawal request."""
        resp = self.session.post(
            f"{BASE_URL}/v3/crypto/{self.safe_id}/execute-request-withdrawal",
            json={
                "token": token,
                "amount": amount,
                "recipient": recipient,
                "r": r,
                "s": s,
                "v": v,
            },
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json()

    def process_withdrawal(self) -> dict:
        """Process/finalize a pending withdrawal."""
        resp = self.session.post(
            f"{BASE_URL}/v3/crypto/{self.safe_id}/execute-withdrawal",
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json()

    # ─── Transactions ───────────────────────────────────────────────────

    def get_transactions(self, page: int = 1, limit: int = 50) -> list[dict]:
        params = {
            "page": str(page),
            "limit": str(limit),
            "withPendingCancellation": "true",
            "withPendingManualReview": "true",
            "withGranularRefundStatus": "true",
            "withDisputeStatus": "true",
        }
        resp = self.session.get(
            f"{BASE_URL}/v3/account-safe/{self.safe_id}/transaction-history",
            params=params,
            headers=self._headers(),
        )
        resp.raise_for_status()
        return resp.json().get("data", [])

    def is_valid(self) -> bool:
        """Check if the session is still valid."""
        try:
            resp = self.session.get(
                f"{BASE_URL}/v2/users/me",
                headers=self._headers(),
                timeout=10,
            )
            return resp.status_code == 200 and "data" in resp.json()
        except Exception:
            return False
