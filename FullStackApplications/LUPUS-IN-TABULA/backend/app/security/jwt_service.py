from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt


class JwtService:
    def __init__(self, *, secret_key: str, algorithm: str = "HS256") -> None:
        self._secret_key = secret_key
        self._algorithm = algorithm

    def create_access_token(self, *, subject: str, name: str, expires_minutes: int = 60) -> str:
        now = datetime.now(timezone.utc)
        payload = {
            "sub": subject,
            "name": name,
            "iat": int(now.timestamp()),
            "exp": int((now + timedelta(minutes=expires_minutes)).timestamp()),
        }
        return jwt.encode(payload, self._secret_key, algorithm=self._algorithm)

    def decode(self, token: str) -> dict:
        return jwt.decode(token, self._secret_key, algorithms=[self._algorithm])

    def try_decode(self, token: str) -> dict | None:
        try:
            return self.decode(token)
        except JWTError:
            return None