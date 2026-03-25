from fastapi import APIRouter, HTTPException
from app.api.auth_schemas import TokenRequest, TokenResponse
from app.security.security_config import dev_shared_secret, jwt_service

router = APIRouter()


@router.post("/token", response_model=TokenResponse)
def token(req: TokenRequest) -> TokenResponse:
    if req.secret != dev_shared_secret():
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt_service().create_access_token(
        subject=req.player_id,
        name=req.player_name,
        expires_minutes=60,
    )

    return TokenResponse(access_token=token, token_type="bearer")