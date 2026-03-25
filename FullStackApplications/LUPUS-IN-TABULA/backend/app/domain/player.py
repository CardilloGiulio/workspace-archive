class Player:
  def __init__(self, player_id: str, name: str):
    self._id = player_id
    self._name = name

  def id(self) -> str:
    return self._id

  def name(self) -> str:
    return self._name