from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.repositories.lobby_repositories import LobbyRepository
from app.services.game_service import GameService
from app.routes.lobby_routes import build_lobby_router
from app.routes.auth_routes import router as auth_router




def create_app() -> FastAPI:
    app = FastAPI()
    app.include_router(auth_router, prefix="/auth", tags=["auth"])

    app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  # includes Authorization
    )

    lobby_repo = LobbyRepository()
    game_service = GameService(lobby_repo)

    def get_game_service():
        return game_service

    app.include_router(build_lobby_router(get_game_service))
    return app


app = create_app()