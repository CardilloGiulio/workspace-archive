import { audioManager } from "../../services/audio-manager.js";
import { motion } from "../../services/motion-service.js";

const ACTIONS = Object.freeze({
  async toggle(context) {
    const toggled = await context.object.toggleAsset();
    const targetId = context.object.definition.actionOptions?.target;
    if (targetId) {
      const target = context.objects.get(targetId);
      if (target) toggled ? target.show() : target.hide();
    }
  },

  async bounce({ object }) {
    await motion.animate(object.visual, [
      { transform: "translateY(0) rotate(0deg)" },
      { transform: "translateY(-28px) rotate(13deg)" },
      { transform: "translateY(0) rotate(0deg)" }
    ], { duration: 430 });
  },

  async nudge({ object }) {
    await motion.shake(object.visual, 350);
  },

  async fade({ object }) {
    await motion.fadeOut(object.element, 320);
    object.hide();
  },

  async wobble({ object }) {
    await motion.shake(object.visual, 520);
  },

  async fan(context) {
    const toggled = await context.object.toggleAsset();
    context.object.element.classList.toggle("is-spinning", toggled);
  },

  async dark(context) {
    const toggled = await context.object.toggleAsset();
    const layerId = context.object.definition.actionOptions?.layer;
    const layer = context.layers.get(layerId);
    if (!layer) return;
    if (toggled) {
      layer.show();
      await motion.fadeIn(layer.visual, 180);
    } else {
      layer.hide();
    }
  },

  async tree(context) {
    const options = context.object.definition.actionOptions || {};
    const layer = context.layers.get(options.layer);
    if (layer) await motion.shake(layer.visual, 420);
    const effect = context.effects.get(options.effect);
    if (effect) {
      await effect.show("pop");
      effect.hideAfter(820);
    }
  },

  async seagull(context) {
    const options = context.object.definition.actionOptions || {};
    const gull = context.objects.get(options.actor);
    const target = context.objects.get(options.target);
    if (!gull || !target || target.element.classList.contains("is-stolen")) return;

    gull.show();
    await motion.animate(gull.visual, [
      { transform: "translateX(-35vw) translateY(-12vh) rotate(-8deg)" },
      { transform: "translateX(12vw) translateY(18vh) rotate(5deg)" },
      { transform: "translateX(78vw) translateY(-5vh) rotate(10deg)" }
    ], { duration: 1100, easing: "cubic-bezier(.3,.05,.7,.9)" });

    target.element.classList.add("is-stolen");
    target.hide();
    gull.hide();
    gull.resetAnimation();
  },

  async music(context) {
    const played = await audioManager.playMusic(context.scene.music);
    if (!played) context.status.textContent = "Audio non disponibile: modalità silenziosa attiva.";
  },

  async laptop() {
    // The laptop's main state change belongs to the charger sequence.
  }
});

export async function runObjectAction(action, context) {
  const handler = ACTIONS[action];
  if (handler) await handler(context);
}
