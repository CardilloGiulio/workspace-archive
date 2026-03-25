from abc import ABC, abstractmethod
from app.domain.lobby import Lobby


class GameServicePort(ABC):
    @abstractmethod
    def create_lobby(self, lobby_id: str, name: str) -> Lobby:
        raise NotImplementedError

    @abstractmethod
    def join_lobby(self, lobby_id: str, player_id: str, player_name: str) -> Lobby | None:
        raise NotImplementedError

    @abstractmethod
    def leave_lobby(self, lobby_id: str, player_id: str) -> Lobby | None:
        raise NotImplementedError

    @abstractmethod
    def list_lobbies(self) -> tuple[Lobby, ...]:
        raise NotImplementedError