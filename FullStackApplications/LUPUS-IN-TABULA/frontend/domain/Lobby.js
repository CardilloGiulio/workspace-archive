import { Player } from "./Player";

export class Lobby {
  constructor({
    id,
    name,
    creator_id = null,
    status = "WAITING",
    min_players = 4,
    active_session_id = null,
    players = [],
    spectators = [],
  }) {
    this._id = id;
    this._name = name;
    this._creatorId = creator_id;
    this._status = status;
    this._minPlayers = min_players;
    this._activeSessionId = active_session_id;

    this._players = players.map((p) => (p instanceof Player ? p : new Player(p)));
    this._spectators = spectators.map((p) => (p instanceof Player ? p : new Player(p)));
  }

  id() {
    return this._id;
  }

  name() {
    return this._name;
  }

  creatorId() {
    return this._creatorId;
  }

  status() {
    return this._status;
  }

  minPlayers() {
    return this._minPlayers;
  }

  activeSessionId() {
    return this._activeSessionId;
  }

  players() {
    return [...this._players];
  }

  spectators() {
    return [...this._spectators];
  }

  hasPlayer(playerId) {
    return this._players.some((p) => p.id() === playerId);
  }

  hasSpectator(playerId) {
    return this._spectators.some((p) => p.id() === playerId);
  }

  isEmpty() {
    return this._players.length === 0 && this._spectators.length === 0;
  }

  withPlayer(player) {
    const p = player instanceof Player ? player : new Player(player);
    if (this.hasPlayer(p.id())) return this;
    return new Lobby({
      id: this._id,
      name: this._name,
      creator_id: this._creatorId,
      status: this._status,
      min_players: this._minPlayers,
      active_session_id: this._activeSessionId,
      players: [...this._players, p],
      spectators: this._spectators,
    });
  }

  withoutPlayer(playerId) {
    if (!this.hasPlayer(playerId)) return this;
    return new Lobby({
      id: this._id,
      name: this._name,
      creator_id: this._creatorId,
      status: this._status,
      min_players: this._minPlayers,
      active_session_id: this._activeSessionId,
      players: this._players.filter((p) => p.id() !== playerId),
      spectators: this._spectators,
    });
  }

  withSpectator(player) {
    const p = player instanceof Player ? player : new Player(player);
    if (this.hasSpectator(p.id())) return this;
    return new Lobby({
      id: this._id,
      name: this._name,
      creator_id: this._creatorId,
      status: this._status,
      min_players: this._minPlayers,
      active_session_id: this._activeSessionId,
      players: this._players,
      spectators: [...this._spectators, p],
    });
  }

  withoutSpectator(playerId) {
    if (!this.hasSpectator(playerId)) return this;
    return new Lobby({
      id: this._id,
      name: this._name,
      creator_id: this._creatorId,
      status: this._status,
      min_players: this._minPlayers,
      active_session_id: this._activeSessionId,
      players: this._players,
      spectators: this._spectators.filter((p) => p.id() !== playerId),
    });
  }
}