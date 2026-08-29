import { SceneElement } from "./scene-element.js";
import { motion } from "../../services/motion-service.js";

export class SceneEffect extends SceneElement {
  constructor(host, definition, { sceneId } = {}) {
    super(host, definition, { sceneId, type: "effect" });
    this.element.classList.add(`scene-effect--${definition.id}`);
    this.element.setAttribute("aria-hidden", "true");
    this.element.hidden = true;
    this.timer = null;
  }

  async load() {
    return this.setAsset(this.definition.asset, "effect");
  }

  async show(mode = "pop") {
    this.clearTimer();
    this.resetAnimation();
    this.showElement();
    if (mode === "fade") return motion.fadeIn(this.visual, 170);
    return motion.pop(this.visual, 260);
  }

  showElement() {
    this.element.hidden = false;
  }

  hide() {
    this.clearTimer();
    this.element.hidden = true;
    this.resetAnimation();
  }

  hideAfter(delay) {
    this.clearTimer();
    this.timer = setTimeout(() => this.hide(), delay);
  }

  clearTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }
}
