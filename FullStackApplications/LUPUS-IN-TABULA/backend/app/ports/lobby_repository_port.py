from abc import ABC, abstractmethod
from app.domain.lobby import Lobby


class LobbyRepositoryPort(ABC):
    @abstractmethod
    def all(self) -> tuple[Lobby, ...]:
        raise NotImplementedError

    @abstractmethod
    def add(self, lobby: Lobby) -> None:
        raise NotImplementedError

    @abstractmethod
    def get(self, lobby_id: str) -> Lobby | None:
        raise NotImplementedError

    @abstractmethod
    def remove(self, lobby_id: str) -> None:
        raise NotImplementedError