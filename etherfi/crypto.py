"""
Rain card encryption/decryption utilities.

Implements the RSA-OAEP + AES-128-GCM hybrid encryption scheme
used by Rain (ether.fi's BIN sponsor) for card PAN/CVC reveal.
"""

import base64
import os
import secrets

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding as asym_padding
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

# Rain RSA Public Key (1024-bit, extracted from JS bundle)
RAIN_RSA_PUBLIC_KEY_PEM = """-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCeZ9uCoxi2XvOw1VmvVLo88TLk
GE+OO1j3fa8HhYlJZZ7CCIAsaCorrU+ZpD5PUTnmME3DJk+JyY1BB3p8XI+C5uno
QucrbxFbkM1lgR10ewz/LcuhleG0mrXL/bzUZbeJqI6v3c9bXvLPKlsordPanYBG
FZkmBPxc8QEdRgH4awIDAQAB
-----END PUBLIC KEY-----"""


def encrypt_session_id() -> tuple[str, str]:
    """
    Generate a random AES-128 key, RSA-OAEP encrypt it with Rain's public key.
    Returns: (secret_key_hex, encrypted_base64)
    """
    secret_hex = secrets.token_hex(16)
    secret_bytes = bytes.fromhex(secret_hex)
    secret_b64 = base64.b64encode(secret_bytes).decode("ascii")

    rain_pubkey = serialization.load_pem_public_key(RAIN_RSA_PUBLIC_KEY_PEM.encode())
    encrypted = rain_pubkey.encrypt(
        secret_b64.encode("utf-8"),
        asym_padding.OAEP(
            mgf=asym_padding.MGF1(algorithm=hashes.SHA1()),
            algorithm=hashes.SHA1(),
            label=None,
        ),
    )
    return secret_hex, base64.b64encode(encrypted).decode("ascii")


def decrypt_secret(encrypted_data_b64: str, iv_b64: str, secret_key_hex: str) -> str:
    """
    AES-128-GCM decrypt card data (PAN/CVC) returned by Rain.
    """
    ciphertext = base64.b64decode(encrypted_data_b64)
    iv = base64.b64decode(iv_b64)
    key = bytes.fromhex(secret_key_hex)
    aesgcm = AESGCM(key)
    return aesgcm.decrypt(iv, ciphertext, None).decode("utf-8")


def encrypt_pin(pin: str, secret_key_hex: str) -> dict:
    """Encrypt PIN using AES-GCM (ISO 9564 Format 2 block)."""
    pin_block = f"2{len(pin):x}{pin}{'F' * (14 - len(pin))}"
    key = bytes.fromhex(secret_key_hex)
    iv = os.urandom(16)
    aesgcm = AESGCM(key)
    ciphertext = aesgcm.encrypt(iv, pin_block.encode("utf-8"), None)
    return {
        "iv": base64.b64encode(iv).decode("ascii"),
        "data": base64.b64encode(ciphertext).decode("ascii"),
    }
