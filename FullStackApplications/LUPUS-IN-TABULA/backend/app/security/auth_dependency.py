from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.api.auth_schemas import PlayerIdentity
from app.security.security_config import jwt_service

_bearer = HTTPBearer(auto_error=True)


def get_current_player(
    creds: HTTPAuthorizationCredentials = Depends(_bearer),
) -> PlayerIdentity:
    token = creds.credentials
    payload = jwt_service().try_decode(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    sub = payload.get("sub")
    name = payload.get("name")

    if not isinstance(sub, str) or not isinstance(name, str):
        raise HTTPException(status_code=401, detail="Invalid token payload")

    return PlayerIdentity(player_id=sub, player_name=name)