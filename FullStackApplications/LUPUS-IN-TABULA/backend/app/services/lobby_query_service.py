from app.ports.lobby_repository_port import LobbyRepositoryPort
from app.domain.lobby import Lobby


class LobbyQueryService:
    def __init__(self, lobby_repo: LobbyRepositoryPort):
        self._lobby_repo = lobby_repo

    def list_lobbies(self) -> tuple[Lobby, ...]:
        return self._lobby_repo.all()

    def get_lobby(self, lobby_id: str) -> Lobby | None:
        return self._lobby_repo.get(lobby_id)