import { SceneObject } from "./scene-object.js";
import { applyResponsiveVariables } from "./layout-variables.js";

export class SceneTrigger extends SceneObject {
  constructor(host, definition, { sceneId, hintId } = {}) {
    super(host, { ...definition, decorative: false }, { sceneId });
    this.element.classList.remove(`scene-object--${definition.id}`);
    this.element.classList.add("scene-trigger", `scene-trigger--${definition.id}`);
    this.element.dataset.triggerId = definition.id;
    this.element.removeAttribute("data-object-id");
    this.visual.classList.add("trigger-art");

    const label = document.createElement("span");
    label.className = "trigger-label";
    label.textContent = definition.label;
    applyResponsiveVariables(label, definition.labelLayout, "label");
    this.element.append(label);
    this.label = label;

    if (hintId) this.element.setAttribute("aria-describedby", hintId);
  }

  async load() {
    if (this.definition.render === "css") return true;
    return this.setAsset(this.definition.asset, "main-trigger", { priority: "high" });
  }

  setTriggered(triggered = true) {
    this.element.classList.toggle("is-triggered", triggered);
    this.element.disabled = triggered;
  }
}
