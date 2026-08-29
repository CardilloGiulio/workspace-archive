import { SceneElement } from "./scene-element.js";

export class SceneObject extends SceneElement {
  constructor(host, definition, { sceneId } = {}) {
    super(host, definition, {
      sceneId,
      type: "object",
      tagName: definition.decorative ? "div" : "button",
      interactive: !definition.decorative
    });

    this.element.classList.add(`scene-object--${definition.id}`);
    this.element.dataset.objectId = definition.id;
    this.toggled = false;

    if (!definition.decorative) this.element.setAttribute("aria-label", definition.label);
    if (definition.decorative) this.element.setAttribute("aria-hidden", "true");
  }

  async load() {
    if (this.definition.render === "css") return true;
    return this.setAsset(this.definition.asset, "object");
  }

  async toggleAsset(force) {
    if (!this.definition.alternateAsset) return this.toggled;
    this.toggled = force ?? !this.toggled;
    const src = this.toggled ? this.definition.alternateAsset : this.definition.asset;
    await this.setAsset(src, "object-state");
    return this.toggled;
  }
}
