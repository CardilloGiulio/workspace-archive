import { SceneElement } from "./scene-element.js";
import { loadImage } from "../../services/asset-loader.js";
import { motion } from "../../services/motion-service.js";

export class SceneCharacter extends SceneElement {
  constructor(host, definition, { sceneId } = {}) {
    super(host, {
      id: "giulio",
      label: "GIULIO — sprite non disponibile",
      alt: "Giulio nella scena",
      layout: definition.layouts[definition.initial.layout]
    }, { sceneId, type: "character" });

    this.definition = definition;
    this.element.classList.add("scene-character");
    this.image.dataset.currentSrc = "";
  }

  async loadInitial() {
    return this.setSprite(this.definition.initial, { animate: false, priority: "high" });
  }

  async setSprite(sprite, { animate = true, priority } = {}) {
    if (!sprite?.src) return false;
    const layoutName = sprite.layout || "upright";
    const layout = this.definition.layouts[layoutName];
    if (layout) this.setLayout(layout);
    this.element.dataset.characterLayout = layoutName;

    if (this.image.dataset.currentSrc === sprite.src) return true;
    this.image.getAnimations?.().forEach((animation) => animation.cancel());

    if (animate) {
      await motion.animate(this.image, [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(7px) scale(.985)" }
      ], { duration: 90 });
    }

    this.image.style.visibility = "hidden";
    const loaded = await loadImage(this.image, sprite.src, {
      scene: this.sceneId,
      role: "stage-sprite",
      priority
    });
    this.image.dataset.currentSrc = sprite.src;
    this.image.style.visibility = "visible";

    if (animate && loaded) {
      await motion.animate(this.image, [
        { opacity: 0, transform: "translateY(8px) scale(.985)" },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ], { duration: 160 });
    }
    return loaded;
  }
}
