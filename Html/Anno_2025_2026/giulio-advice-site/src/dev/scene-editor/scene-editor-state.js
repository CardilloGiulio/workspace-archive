export class SceneEditorState {
  constructor() {
    this.active = false;
    this.mode = null;
    this.selected = null;
    this.originals = new Map();
    this.changes = new Map();
    this.history = [];
  }

  reset() {
    this.active = false;
    this.mode = null;
    this.selected = null;
    this.originals.clear();
    this.changes.clear();
    this.history.length = 0;
  }

  remember(key, value) {
    if (!this.originals.has(key)) this.originals.set(key, structuredClone(value));
  }

  pushHistory(snapshot) {
    this.history.push(structuredClone(snapshot));
    if (this.history.length > 80) this.history.shift();
  }

  setChange(key, value) {
    this.changes.set(key, structuredClone(value));
  }

}
