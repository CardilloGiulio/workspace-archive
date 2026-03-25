from app.domain.lobby import Lobby
from app.domain.player import Player
from app.ports.lobby_repository_port import LobbyRepositoryPort
from app.ports.game_service_port import GameServicePort


class GameService(GameServicePort):
    def __init__(self, lobby_repo: LobbyRepositoryPort):
        self._lobby_repo = lobby_repo

    def list_lobbies(self) -> tuple[Lobby, ...]:
        return self._lobby_repo.all()

    def get_lobby(self, lobby_id: str) -> Lobby | None:
        return self._lobby_repo.get(lobby_id)

    def create_lobby(self, lobby_id: str, name: str, creator_id: str) -> Lobby:
        lobby = Lobby(lobby_id, name, creator_id)
        self._lobby_repo.add(lobby)
        return lobby

    def join_lobby(self, lobby_id: str, player_id: str, player_name: str) -> Lobby | None:
        lobby = self._lobby_repo.get(lobby_id)
        if lobby is None:
            return None

        p = Player(player_id, player_name)

        if lobby.status() == "RUNNING":
            lobby.add_spectator(p)
        else:
            lobby.add_player(p)

        return lobby

    def leave_lobby(self, lobby_id: str, player_id: str) -> Lobby | None:
        lobby = self._lobby_repo.get(lobby_id)
        if lobby is None:
            return None

        lobby.remove_member(player_id)

        if len(lobby.players()) == 0 and len(lobby.spectators()) == 0:
            self._lobby_repo.remove(lobby.id())
            return None

        return lobby

    def start_game(self, lobby_id: str, requester_id: str) -> Lobby | None:
        lobby = self._lobby_repo.get(lobby_id)
        if lobby is None:
            return None

        if lobby.creator_id() != requester_id:
            raise ValueError("Only the lobby creator can start the game")

        lobby.start()
        return lobby

    def end_game(self, lobby_id: str, requester_id: str) -> Lobby | None:
        lobby = self._lobby_repo.get(lobby_id)
        if lobby is None:
            return None

        if lobby.creator_id() != requester_id:
            raise ValueError("Only the lobby creator can end the game")

        lobby.end()
        return lobby

    def rematch(self, lobby_id: str, requester_id: str) -> Lobby | None:
        lobby = self._lobby_repo.get(lobby_id)
        if lobby is None:
            return None

        if lobby.creator_id() != requester_id:
            raise ValueError("Only the lobby creator can request a rematch")

        lobby.rematch()
        return lobby