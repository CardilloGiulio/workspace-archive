import { loadImage } from "../../services/asset-loader.js";
import { applyResponsiveVariables } from "./layout-variables.js";

export class SceneElement {
  constructor(host, definition, { sceneId, type, tagName = "div", interactive = false } = {}) {
    this.definition = definition;
    this.sceneId = sceneId;
    this.type = type;

    const element = document.createElement(tagName);
    element.className = `scene-element scene-${type} scene-${type}--${definition.id} asset-host`;
    element.dataset.elementId = definition.id;
    element.dataset.elementType = type;
    if (definition.visual) element.dataset.visual = definition.visual;
    if (definition.fadeDuringSequence) element.dataset.fadeDuringSequence = "true";
    if (definition.render === "css") element.classList.add("scene-element--css-rendered");
    if (interactive && tagName === "button") element.type = "button";
    if (definition.initiallyHidden) element.hidden = true;

    const visual = document.createElement("span");
    visual.className = `scene-element__visual scene-${type}__visual`;

    const image = definition.render === "css" ? null : new Image();
    if (image) {
      image.alt = definition.alt || "";
      visual.append(image);
    }
    element.append(visual);

    if (image) {
      const fallback = document.createElement("span");
      fallback.className = `asset-fallback asset-fallback--${type}`;
      fallback.textContent = definition.label || definition.id;
      element.append(fallback);
    }

    host.append(element);

    this.element = element;
    this.visual = visual;
    this.image = image;
    this.setLayout(definition.layout);
  }

  setLayout(layout) {
    this.layout = layout || {};
    applyResponsiveVariables(this.element, this.layout);
  }

  async setAsset(src, role = this.type, metadata = {}) {
    if (!this.image || !src) return false;
    this.currentAsset = src;
    this.image.hidden = false;
    return loadImage(this.image, src, {
      scene: this.sceneId,
      role: `${role}:${this.definition.id}`,
      ...metadata
    });
  }

  show() {
    this.element.hidden = false;
  }

  hide() {
    this.element.hidden = true;
  }

  resetAnimation() {
    this.visual.getAnimations?.().forEach((animation) => animation.cancel());
    this.visual.style.removeProperty("opacity");
    this.visual.style.removeProperty("transform");
    this.visual.style.removeProperty("filter");
  }
}
