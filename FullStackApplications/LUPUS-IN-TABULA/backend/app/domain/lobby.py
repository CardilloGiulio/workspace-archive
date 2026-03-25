from app.domain.player import Player

class Lobby:
  def __init__(self, lobby_id: str, name: str, creator_id: str, min_players: int = 4):
    self._id = lobby_id
    self._name = name
    self._creator_id = creator_id
    self._status = "WAITING"
    self._min_players = min_players
    self._active_session_id = None
    self._players: list[Player] = []
    self._spectators: list[Player] = []

  def id(self) -> str:
    return self._id

  def name(self) -> str:
    return self._name

  def creator_id(self) -> str:
    return self._creator_id

  def status(self) -> str:
    return self._status

  def min_players(self) -> int:
    return self._min_players

  def active_session_id(self) -> str | None:
        return self._active_session_id

  def players(self) -> list[Player]:
    return list(self._players)

  def spectators(self) -> list[Player]:
    return list(self._spectators)

  def has_player(self, player_id: str) -> bool:
    return any(p.id() == player_id for p in self._players)

  def has_spectator(self, player_id: str) -> bool:
    return any(p.id() == player_id for p in self._spectators)

  def add_player(self, player: Player):
    if self.has_player(player.id()):
      return
    self._players.append(player)

  def add_spectator(self, player: Player):
    if self.has_spectator(player.id()):
      return
    self._spectators.append(player)

  def remove_member(self, player_id: str):
    self._players = [p for p in self._players if p.id() != player_id]
    self._spectators = [p for p in self._spectators if p.id() != player_id]

  def start(self):
    if self._status != "WAITING":
      raise ValueError("Lobby is not in WAITING")
    if len(self._players) < self._min_players:
      raise ValueError("Not enough players to start")
    self._status = "RUNNING"
    self._active_session_id = f"s-{self._id}"

  def end(self):
    if self._status != "RUNNING":
      raise ValueError("Lobby is not in RUNNING")
    self._status = "ENDED"

  def rematch(self):
    if self._status != "ENDED":
        raise ValueError("Lobby is not in ENDED")

    for s in self._spectators:
        if not self.has_player(s.id()):
            self._players.append(s)

        self._spectators = []
        self._status = "WAITING"
        self._active_session_id = None
