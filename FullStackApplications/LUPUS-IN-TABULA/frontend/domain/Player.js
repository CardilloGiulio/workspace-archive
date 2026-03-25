export class Player {
  constructor({ id, name }) {
    this._id = id;
    this._name = name;
  }

  id() {
    return this._id;
  }

  name() {
    return this._name;
  }
}