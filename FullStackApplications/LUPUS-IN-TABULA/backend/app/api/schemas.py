from pydantic import BaseModel
from typing import Literal

class CreateLobbyIn(BaseModel):
  lobby_id: str
  name: str

class PlayerOut(BaseModel):
  id: str
  name: str

class LobbyOut(BaseModel):
  id: str
  name: str
  creator_id: str
  status: Literal["WAITING", "RUNNING", "ENDED"]
  min_players: int
  active_session_id: str | None
  players: list[PlayerOut]
  spectators: list[PlayerOut]