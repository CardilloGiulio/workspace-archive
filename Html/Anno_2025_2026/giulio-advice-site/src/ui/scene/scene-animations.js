import { audioManager } from "../../services/audio-manager.js";
import { motion } from "../../services/motion-service.js";

const ANIMATIONS = Object.freeze({
  async placeholderReveal({ trigger, character, stage }) {
    await motion.animate(trigger.visual, [
      { transform: "rotate(-4deg) scale(1)" },
      { transform: "rotate(3deg) scale(1.08)" },
      { transform: "rotate(0deg) scale(.92)", opacity: 0 }
    ], { duration: 420, easing: "cubic-bezier(.2,.8,.3,1)", persist: true });
    trigger.hide();
    stage.classList.add("is-theatrical");
    await motion.pop(character.visual, 280);
  },

  async beachSplash(context) {
    const { scene, trigger, character, effects } = context;
    audioManager.playEffect(scene.sfx?.bucketShake);
    await motion.shake(trigger.visual, 390);
    audioManager.playEffect(scene.sfx?.bucketTip);
    await motion.animate(trigger.visual, [
      { transform: "translate(0, 0) rotate(0deg)" },
      { transform: "translate(8%, 14%) rotate(108deg)" }
    ], { duration: 420, easing: "cubic-bezier(.42,0,.58,1)", persist: true });

    await character.setSprite(scene.animation.impactSprite, { animate: false });
    audioManager.playEffect(scene.sfx?.splash);
    await Promise.all([effects.get("splash")?.show(), effects.get("droplets")?.show()]);
    await motion.wait(430);
    effects.get("splash")?.hide();
    effects.get("droplets")?.hide();
    await effects.get("dripping")?.show("fade");
    context.activeDialogueEffects.add("dripping");
    audioManager.playEffect(scene.sfx?.dripping);
  },

  async treeApple(context) {
    const { scene, character, effects, stage } = context;
    audioManager.playEffect(scene.sfx?.appleRelease);
    audioManager.playEffect(scene.sfx?.appleFall);
    const apple = effects.get("fallingApple");

    if (apple) {
      apple.showElement();
      await motion.animate(apple.visual, [
        { opacity: 1, transform: "translate(0,-28vh) rotate(0deg) scale(.42)" },
        { opacity: 1, transform: "translate(-3vw,7vh) rotate(390deg) scale(.66)" }
      ], { duration: 650, easing: "cubic-bezier(.52,.02,.9,.55)", persist: true });
    }

    await character.setSprite(scene.animation.impactSprite, { animate: false });
    audioManager.playEffect(scene.sfx?.impact);
    await Promise.all([effects.get("impact")?.show(), effects.get("stars")?.show()]);
    stage.classList.add("scene-stage--impact");
    await motion.wait(410);
    stage.classList.remove("scene-stage--impact");
    effects.get("impact")?.hide();
    effects.get("stars")?.hide();
    apple?.hide();
  },



  async gardenRock(context) {
    const { scene, character, objects, effects, stage } = context;
    const tanjiro = objects.get("tanjiroFighter");
    const hpGiulio = objects.get("hpGiulio");
    tanjiro?.resetAnimation();
    character.resetAnimation();
    await character.setSprite({ src: scene.animation.giulio.impact, layout: "impact" }, { animate: false });
    if (tanjiro) await tanjiro.setAsset(scene.animation.tanjiro.pause, "tanjiro-pause");

    const rock = effects.get("fallingRock");
    if (rock) {
      rock.showElement();
      await motion.animate(rock.visual, [
        { opacity: 1, transform: "translateY(-72vh) rotate(-22deg) scale(.72)" },
        { opacity: 1, transform: "translateY(0) rotate(18deg) scale(1)" }
      ], { duration: 520, easing: "cubic-bezier(.6,.02,.92,.55)", persist: true });
    }

    hpGiulio?.element.classList.add("is-ko");
    stage.classList.add("scene-stage--impact");
    await Promise.all([effects.get("rockDust")?.show(), effects.get("ko")?.show()]);
    context.activeDialogueEffects.add("rockDust");
    context.activeDialogueEffects.add("ko");
    await character.setSprite({ src: scene.animation.giulio.ko, layout: "ground" }, { animate: false });
    await motion.wait(340);
    stage.classList.remove("scene-stage--impact");
    rock?.hide();
  },

  async basementWeight(context) {
    const { scene, trigger, character, effects, stage } = context;
    await character.setSprite({ src: scene.animation.slipSprite, layout: "upright" }, { animate: false });
    await motion.animate(trigger.visual, [
      { transform: "translate(0,0) rotate(0deg)" },
      { transform: "translate(-7vw,14vh) rotate(150deg)" }
    ], { duration: 470, easing: "cubic-bezier(.55,.03,.9,.55)", persist: true });
    await character.setSprite({ src: scene.animation.impactSprite, layout: "upright" }, { animate: false });
    stage.classList.add("scene-stage--impact");
    await Promise.all([effects.get("toeImpact")?.show(), effects.get("floorDust")?.show()]);
    await motion.wait(250);
    stage.classList.remove("scene-stage--impact");
    effects.get("toeImpact")?.hide();
    effects.get("floorDust")?.hide();
    await character.setSprite({ src: scene.animation.hopSprite, layout: "upright" }, { animate: false });
    await effects.get("painStars")?.show("fade");
    context.activeDialogueEffects.add("painStars");
  },

  async bedroomVR(context) {
    const { scene, trigger, character, stage } = context;
    await motion.animate(trigger.visual, [
      { transform: "translateX(0) translateY(0) rotate(0deg)" },
      { transform: "translateX(31vw) translateY(1vh) rotate(-2deg)" }
    ], { duration: 520, easing: "cubic-bezier(.2,.75,.25,1)", persist: true });
    await character.setSprite({ src: scene.animation.dodgeSprite, layout: "upright" }, { animate: false });
    await motion.animate(character.visual, [
      { transform: "translateX(0)" },
      { transform: "translateX(4vw)" }
    ], { duration: 250, persist: true });
    character.resetAnimation();
    await character.setSprite({ src: scene.animation.walkSprite, layout: "upright" }, { animate: false });
    await motion.animate(character.visual, [
      { transform: "translateX(0)" },
      { transform: "translateX(-14vw)" }
    ], { duration: 620, easing: "linear", persist: true });
    character.resetAnimation();
    await character.setSprite({ src: scene.animation.collisionSprite, layout: "upright" }, { animate: false });
    stage.classList.add("scene-stage--impact");
    await motion.wait(250);
    stage.classList.remove("scene-stage--impact");
    await character.setSprite({ src: scene.animation.fallenSprite, layout: "fallen" }, { animate: false });
  },

  async barCoffee(context) {
    const { scene, trigger, character, effects, stage } = context;
    await trigger.setAsset("/assets-optimized/objects/advice7/coffee-tipping-advice7.webp", "coffee-tipping");
    await motion.animate(trigger.visual, [
      { transform: "rotate(0deg) translate(0,0)" },
      { transform: "rotate(72deg) translate(2vw,1vh)" }
    ], { duration: 330, persist: true });
    await character.setSprite({ src: scene.animation.impactSprite, layout: "seated" }, { animate: false });
    stage.classList.add("scene-stage--impact");
    await Promise.all([effects.get("splash")?.show(), effects.get("droplets")?.show()]);
    await motion.wait(330);
    stage.classList.remove("scene-stage--impact");
    await trigger.setAsset("/assets-optimized/objects/advice7/coffee-empty-advice7.webp", "coffee-empty");
    trigger.resetAnimation();
    effects.get("splash")?.hide();
    effects.get("droplets")?.hide();
    await effects.get("stain")?.show("fade");
    context.activeDialogueEffects.add("stain");
    await character.setSprite({ src: scene.animation.freezeSprite, layout: "seated" }, { animate: false });
    await motion.wait(260);
    await character.setSprite({ src: scene.animation.inspectSprite, layout: "seated" }, { animate: false });
  },

  async ovenIgnition(context) {
    const { scene, character, effects, stage, objects } = context;
    await character.setSprite({ src: scene.animation.brushSprite, layout: "cleaning" }, { animate: false });
    await effects.get("fire")?.show("fade");
    context.activeDialogueEffects.add("fire");
    await Promise.all([effects.get("burst")?.show(), effects.get("sparks")?.show()]);
    await character.setSprite({ src: scene.animation.noticeSprite, layout: "upright" }, { animate: false });
    await motion.wait(180);
    await character.setSprite({ src: scene.animation.leapSprite, layout: "leap" }, { animate: false });
    stage.classList.add("scene-stage--impact");
    await motion.animate(character.visual, [
      { transform: "translateX(0) translateY(0) rotate(0deg)" },
      { transform: "translateX(18vw) translateY(-3vh) rotate(7deg)" }
    ], { duration: 390, easing: "cubic-bezier(.2,.75,.25,1)", persist: true });
    character.resetAnimation();
    await motion.wait(100);
    stage.classList.remove("scene-stage--impact");
    effects.get("burst")?.hide();
    effects.get("sparks")?.hide();
    await effects.get("smoke")?.show("fade");
    context.activeDialogueEffects.add("smoke");
    await character.setSprite({ src: scene.animation.checkSprite, layout: "upright" }, { animate: false });
    const logs = objects.get("logs");
    if (logs) await logs.setAsset("/assets-optimized/objects/advice8/oven-logs-burning-advice8.webp", "logs-burning");
  },

  async computerShutdown(context) {
    const { scene, trigger, character, objects, effects } = context;
    audioManager.playEffect(scene.sfx?.unplug);
    trigger.element.classList.add("is-unplugged");

    const laptop = objects.get("laptop");
    if (laptop) {
      laptop.element.classList.add("is-shutting-down");
      await motion.wait(320);
      laptop.element.classList.remove("is-shutting-down");
      await laptop.toggleAsset(true);
      laptop.element.classList.add("is-off");
    }

    audioManager.playEffect(scene.sfx?.shutdown);
    await character.setSprite(scene.animation.frozenSprite, { animate: false });
    await effects.get("electric")?.show();
    await motion.wait(260);
    effects.get("electric")?.hide();
    audioManager.playEffect(scene.sfx?.chairTurn);
    await character.setSprite(scene.animation.turnSprite);
    await motion.wait(170);
  }
});



const AMBIENTS = Object.freeze({
  async gardenFight(context) {
    const { scene, character, objects, effects, stage } = context;
    const tanjiro = objects.get("tanjiroFighter");
    if (!tanjiro) return;

    const reduced = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
      || document.documentElement.dataset.reducedMotion === "true";
    if (reduced) return;

    const stillFighting = () => !stage.classList.contains("is-sequence-active");
    while (stillFighting()) {
      tanjiro.resetAnimation();
      character.resetAnimation();
      await Promise.all([
        tanjiro.setAsset(scene.animation.tanjiro.idle, "tanjiro-fight"),
        character.setSprite({ src: scene.animation.giulio.idle, layout: "fight" }, { animate: false })
      ]);
      await motion.wait(360);
      if (!stillFighting()) break;

      await Promise.all([
        tanjiro.setAsset(scene.animation.tanjiro.dash, "tanjiro-fight"),
        character.setSprite({ src: scene.animation.giulio.guard, layout: "fight" }, { animate: false })
      ]);
      effects.get("dashDust")?.showElement();
      await motion.animate(tanjiro.visual, [
        { transform: "translateX(0)" },
        { transform: "translateX(-9vw)" }
      ], { duration: 260, easing: "cubic-bezier(.35,.02,.7,.9)", persist: true });
      effects.get("dashDust")?.hide();
      if (!stillFighting()) break;

      await tanjiro.setAsset(scene.animation.tanjiro.slash, "tanjiro-fight");
      await effects.get("clash")?.show();
      await motion.shake(character.visual, 180);
      effects.get("clash")?.hide();
      await motion.wait(120);
      if (!stillFighting()) break;

      tanjiro.resetAnimation();
      character.resetAnimation();
      await Promise.all([
        tanjiro.setAsset(scene.animation.tanjiro.guard, "tanjiro-fight"),
        character.setSprite({ src: scene.animation.giulio.slash, layout: "fight" }, { animate: false })
      ]);
      effects.get("swordArc")?.showElement();
      await motion.animate(character.visual, [
        { transform: "translateX(0)" },
        { transform: "translateX(7vw)" }
      ], { duration: 300, easing: "cubic-bezier(.35,.02,.7,.9)", persist: true });
      await effects.get("clash")?.show();
      effects.get("swordArc")?.hide();
      await motion.shake(tanjiro.visual, 170);
      effects.get("clash")?.hide();
      if (!stillFighting()) break;

      character.resetAnimation();
      tanjiro.resetAnimation();
      await Promise.all([
        character.setSprite({ src: scene.animation.giulio.grin, layout: "fight" }, { animate: false }),
        tanjiro.setAsset(scene.animation.tanjiro.recover, "tanjiro-fight")
      ]);
      await motion.wait(300);
    }
  }
});

export async function runSceneAmbient(type, context) {
  const ambient = AMBIENTS[type];
  if (!ambient) return;
  await ambient(context);
}

export async function runSceneAnimation(type, context) {
  const animation = ANIMATIONS[type];
  if (!animation) throw new Error(`Unknown scene animation: ${type}`);
  await animation(context);
}
