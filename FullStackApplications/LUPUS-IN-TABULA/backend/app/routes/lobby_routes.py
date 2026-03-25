from fastapi import APIRouter, Depends, HTTPException
from app.api.schemas import CreateLobbyIn, LobbyOut, PlayerOut
from app.security.auth_dependency import get_current_player
from app.api.auth_schemas import PlayerIdentity


def _lobby_to_out(lobby) -> LobbyOut:
    return LobbyOut(
        id=lobby.id(),
        name=lobby.name(),
        creator_id=lobby.creator_id(),
        status=lobby.status(),
        min_players=lobby.min_players(),
        active_session_id=lobby.active_session_id(),
        players=[PlayerOut(id=p.id(), name=p.name()) for p in lobby.players()],
        spectators=[PlayerOut(id=s.id(), name=s.name()) for s in lobby.spectators()],
    )


def build_lobby_router(get_game_service):
    router = APIRouter(prefix="/lobbies", tags=["lobbies"])

    @router.get("/", response_model=list[LobbyOut])
    def list_lobbies(game=Depends(get_game_service)):
        return [_lobby_to_out(l) for l in game.list_lobbies()]

    @router.get("/{lobby_id}", response_model=LobbyOut)
    def get_lobby(lobby_id: str, game=Depends(get_game_service)):
        lobby = game.get_lobby(lobby_id)
        if lobby is None:
            raise HTTPException(status_code=404, detail="Lobby not found")
        return _lobby_to_out(lobby)

    @router.post("/", response_model=LobbyOut)
    def create_lobby(
        payload: CreateLobbyIn,
        me: PlayerIdentity = Depends(get_current_player),
        game=Depends(get_game_service),
    ):
        lobby = game.create_lobby(payload.lobby_id, payload.name, me.player_id)
        return _lobby_to_out(lobby)

    @router.post("/{lobby_id}/join", response_model=LobbyOut)
    def join_lobby(
        lobby_id: str,
        me: PlayerIdentity = Depends(get_current_player),
        game=Depends(get_game_service),
    ):
        lobby = game.join_lobby(lobby_id, me.player_id, me.player_name)
        if lobby is None:
            raise HTTPException(status_code=404, detail="Lobby not found")
        return _lobby_to_out(lobby)

    @router.post("/{lobby_id}/leave", response_model=LobbyOut)
    def leave_lobby(
        lobby_id: str,
        me: PlayerIdentity = Depends(get_current_player),
        game=Depends(get_game_service),
    ):
        lobby = game.leave_lobby(lobby_id, me.player_id)
        if lobby is None:
            raise HTTPException(status_code=404, detail="Lobby not found")
        return _lobby_to_out(lobby)

    @router.post("/{lobby_id}/start", response_model=LobbyOut)
    def start_game(
        lobby_id: str,
        me: PlayerIdentity = Depends(get_current_player),
        game=Depends(get_game_service),
    ):
        try:
            lobby = game.start_game(lobby_id, me.player_id)
        except ValueError as e:
            raise HTTPException(status_code=409, detail=str(e))
        if lobby is None:
            raise HTTPException(status_code=404, detail="Lobby not found")
        return _lobby_to_out(lobby)

    @router.post("/{lobby_id}/end", response_model=LobbyOut)
    def end_game(
        lobby_id: str,
        me: PlayerIdentity = Depends(get_current_player),
        game=Depends(get_game_service),
    ):
        try:
            lobby = game.end_game(lobby_id, me.player_id)
        except ValueError as e:
            raise HTTPException(status_code=409, detail=str(e))
        if lobby is None:
            raise HTTPException(status_code=404, detail="Lobby not found")
        return _lobby_to_out(lobby)

    @router.post("/{lobby_id}/rematch", response_model=LobbyOut)
    def rematch(
        lobby_id: str,
        me: PlayerIdentity = Depends(get_current_player),
        game=Depends(get_game_service),
    ):
        try:
            lobby = game.rematch(lobby_id, me.player_id)
        except ValueError as e:
            raise HTTPException(status_code=409, detail=str(e))
        if lobby is None:
            raise HTTPException(status_code=404, detail="Lobby not found")
        return _lobby_to_out(lobby)

    return router