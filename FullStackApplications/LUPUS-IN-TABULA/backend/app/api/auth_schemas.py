from pydantic import BaseModel


class TokenRequest(BaseModel):
    player_id: str
    player_name: str
    secret: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class PlayerIdentity(BaseModel):
    player_id: str
    player_name: str