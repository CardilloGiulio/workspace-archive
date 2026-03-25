from app.domain.lobby import Lobby
from app.ports.lobby_repository_port import LobbyRepositoryPort


class LobbyRepository(LobbyRepositoryPort):
    def __init__(self):
        self._lobbies: list[Lobby] = []

    def all(self) -> tuple[Lobby, ...]:
        return tuple(self._lobbies)

    def add(self, lobby: Lobby) -> None:
        self._lobbies.append(lobby)

    def get(self, lobby_id: str) -> Lobby | None:
        for lobby in self._lobbies:
            if lobby.id() == lobby_id:
                return lobby
        return None

    def remove(self, lobby_id: str) -> None:
        self._lobbies = [l for l in self._lobbies if l.id() != lobby_id]