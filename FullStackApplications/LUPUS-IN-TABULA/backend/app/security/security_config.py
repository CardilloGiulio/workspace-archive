import os
from app.security.jwt_service import JwtService

_JWT = None


def jwt_service() -> JwtService:
    global _JWT
    if _JWT is None:
        secret = os.getenv("JWT_SECRET", "dev-secret-change-me")
        _JWT = JwtService(secret_key=secret)
    return _JWT


def dev_shared_secret() -> str:
    return os.getenv("DEV_SHARED_SECRET", "dev")