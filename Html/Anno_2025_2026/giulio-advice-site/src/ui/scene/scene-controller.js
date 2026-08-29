import { logger } from "../../services/logger.js";
import { loadImage, preloadImages } from "../../services/asset-loader.js";
import { audioManager } from "../../services/audio-manager.js";
import { motion } from "../../services/motion-service.js";
import { DialogueEngine } from "../dialogue-engine.js";
import { applyResponsiveVariables } from "./layout-variables.js";
import { SceneElement } from "./scene-element.js";
import { SceneObject } from "./scene-object.js";
import { SceneTrigger } from "./scene-trigger.js";
import { SceneEffect } from "./scene-effect.js";
import { SceneCharacter } from "./scene-character.js";
import { runObjectAction } from "./object-actions.js";
import { runSceneAnimation, runSceneAmbient } from "./scene-animations.js";

const sharedPortrait = (name) => `/assets-optimized/sprites/shared/giulio-${name}.webp`;

export class SceneController {
  constructor(root, scene) {
    this.root = root;
    this.scene = scene;
    this.busy = false;
    this.started = false;
    this.processingInteraction = false;
    this.interactions = new Map();
    this.objects = new Map();
    this.effects = new Map();
    this.layers = new Map();
    this.activeDialogueEffects = new Set();
    this.assetFailures = [];
    this.ambientPromise = null;
  }

  async init() {
    this.renderShell();
    this.cacheShell();
    this.applySceneVariables();
    this.createElements();
    this.dialogue = new DialogueEngine(this.dialogueHost);
    this.bindEvents();
    await this.loadAssets();
    const beginScene = () => {
      if (this.scene.animation?.ambient) {
        this.ambientPromise = runSceneAmbient(this.scene.animation.ambient, this.getActionContext()).catch((error) => {
          logger.log("ambient_animation_error", { scene: this.scene.id, message: error.message });
        });
      }
      if (this.scene.preludeSequence?.length) this.startPrelude();
    };

    if (this.assetFailures.length) {
      const kind = this.assetFailures[0];
      const text = {
        background: "Lo sfondo non si è caricato. Perfetto. Immaginalo.",
        character: "Fantastico. Adesso sono un segnaposto. Che cazzo di professionalità.",
        object: "L'oggetto non si è caricato. Non toccare niente finché non torna.",
        effect: "L'effetto è morto. Pazienza. La scena continua.",
        trigger: "Il comando principale non si è caricato. Ottimo inizio."
      }[kind] || "Qualcosa non si è caricato. La scena continua lo stesso.";
      this.dialogue.play([{ text, portrait: sharedPortrait("fourth-wall"), speaker: "GIULIO" }], {
        context: `${this.scene.id}:asset-fallback`,
        silent: true,
        onComplete: beginScene
      });
    } else {
      beginScene();
    }
    logger.log("scene_ready", { scene: this.scene.id, props: this.scene.props.length });
  }

  renderShell() {
    this.root.innerHTML = `
      <section class="scene-shell" aria-label="${this.scene.location}">
        <div class="scene-stage scene--${this.scene.theme} ${this.scene.backgroundFallback}" data-scene-stage>
          <div class="scene-background-host asset-host">
            <img class="scene-background" data-background alt="Scenografia: ${this.scene.location}">
            <div class="scene-background-fallback" aria-hidden="true"></div>
          </div>
          <div class="comic-halftone" aria-hidden="true"></div>
          <div class="scene-accent scene-accent--top" aria-hidden="true"></div>
          <div class="scene-accent scene-accent--bottom" aria-hidden="true"></div>
          <div class="scene-title-card">
            <span class="scene-title-card__number">${this.scene.number}</span>
            <span><strong>${this.scene.location}</strong><small>${this.scene.title}</small></span>
          </div>
          <div class="scene-layers" data-layers></div>
          <div class="scene-composition" data-scene-composition>
            <div class="scene-props" data-props></div>
            <div class="scene-effects" data-effects aria-hidden="true"></div>
          </div>
          <p id="trigger-hint" class="trigger-hint">${this.scene.trigger.hint}</p>
          <button class="replay-button" type="button" data-replay hidden>RIPETI LA SCENA</button>
          <div class="scene-status" aria-live="polite" data-scene-status></div>
        </div>
        <div class="dialogue-host" data-dialogue-host></div>
      </section>
    `;
  }

  cacheShell() {
    this.stage = this.root.querySelector("[data-scene-stage]");
    this.background = this.root.querySelector("[data-background]");
    this.layerHost = this.root.querySelector("[data-layers]");
    this.composition = this.root.querySelector("[data-scene-composition]");
    this.objectHost = this.root.querySelector("[data-props]");
    this.effectHost = this.root.querySelector("[data-effects]");
    this.replay = this.root.querySelector("[data-replay]");
    this.status = this.root.querySelector("[data-scene-status]");
    this.dialogueHost = this.root.querySelector("[data-dialogue-host]");
  }

  applySceneVariables() {
    this.composition.style.setProperty("--scene-content-scale-desktop", this.scene.contentScale?.desktop || "1");
    this.composition.style.setProperty("--scene-content-scale-mobile", this.scene.contentScale?.mobile || this.scene.contentScale?.desktop || "1");
    applyResponsiveVariables(this.stage, this.scene.backgroundStyle, "background");
  }

  createElements() {
    for (const definition of this.scene.layers) {
      const layer = new SceneElement(this.layerHost, {
        ...definition,
        asset: definition.src,
        label: definition.alt || definition.id
      }, { sceneId: this.scene.id, type: "layer" });
      layer.element.classList.add(`scene-layer--${definition.id}`);
      this.layers.set(definition.id, layer);
    }

    for (const definition of this.scene.props) {
      const object = new SceneObject(this.objectHost, definition, { sceneId: this.scene.id });
      this.objects.set(definition.id, object);
    }

    this.character = new SceneCharacter(this.composition, this.scene.character, { sceneId: this.scene.id });

    for (const definition of this.scene.effects) {
      const effect = new SceneEffect(this.effectHost, definition, { sceneId: this.scene.id });
      this.effects.set(definition.id, effect);
    }

    this.trigger = new SceneTrigger(this.composition, this.scene.trigger, {
      sceneId: this.scene.id,
      hintId: "trigger-hint"
    });
  }

  async loadAssets() {
    const [backgroundLoaded, characterLoaded, triggerLoaded] = await Promise.all([
      this.scene.background ? loadImage(this.background, this.scene.background, {
        scene: this.scene.id,
        role: "background",
        priority: "high",
        fallback: this.scene.backgroundFallback
      }) : Promise.resolve(true),
      this.character.loadInitial(),
      this.trigger.load()
    ]);
    if (!backgroundLoaded) this.assetFailures.push("background");
    if (!characterLoaded) this.assetFailures.push("character");
    if (!triggerLoaded) this.assetFailures.push("trigger");

    const secondaryLoads = [
      ...[...this.layers.values()].map((layer) => ({ kind: "object", load: () => layer.setAsset(layer.definition.src, "layer") })),
      ...[...this.objects.values()].map((object) => ({ kind: "object", load: () => object.load() })),
      ...[...this.effects.values()].map((effect) => ({ kind: "effect", load: () => effect.load() }))
    ];
    const secondaryResults = await Promise.allSettled(secondaryLoads.map((entry) => entry.load()));
    secondaryResults.forEach((result, index) => {
      const failed = result.status === "rejected" || result.value === false;
      if (failed) this.assetFailures.push(secondaryLoads[index].kind);
    });

    const sequenceImages = [...(this.scene.mainSequence || []), ...(this.scene.preludeSequence || [])]
      .flatMap((line) => [line.sprite, line.portrait])
      .concat(this.scene.preload || [])
      .filter(Boolean)
      .map((src) => ({ src, scene: this.scene.id, role: "sequence-preload" }));
    preloadImages(sequenceImages, { concurrency: 3 });
  }

  bindEvents() {
    this.trigger.element.addEventListener("pointerenter", () => {
      if (!this.started && this.scene.character.hover) {
        this.character.setSprite(this.scene.character.hover, { animate: false });
      }
      logger.log("reveal_button_hovered", { scene: this.scene.id, trigger: this.scene.trigger.id });
    });

    this.trigger.element.addEventListener("pointerleave", () => {
      if (!this.started && this.scene.character.hover) {
        this.character.setSprite(this.scene.character.initial, { animate: false });
      }
    });

    this.trigger.element.addEventListener("click", () => {
      if (this.started && this.scene.trigger.postLines?.length) this.interactWithTrigger();
      else this.startMainSequence();
    });
    this.replay.addEventListener("click", () => {
      logger.log("scene_replayed", { scene: this.scene.id });
      location.reload();
    });

    this.objectHost.addEventListener("click", (event) => {
      const target = event.target.closest("[data-object-id]");
      if (!target || this.busy || this.dialogue?.active) return;
      const object = this.objects.get(target.dataset.objectId);
      if (!object || object.definition.decorative) return;
      this.interactWithObject(object);
    });
  }

  isSceneBusy() {
    return Boolean(
      this.busy ||
      this.processingInteraction ||
      this.dialogue?.active ||
      this.dialogue?.panel?.dataset.busy === "true" ||
      this.stage?.classList.contains("is-sequence-active")
    );
  }

  getActionContext(object) {
    return {
      scene: this.scene,
      stage: this.stage,
      status: this.status,
      object,
      objects: this.objects,
      effects: this.effects,
      layers: this.layers,
      trigger: this.trigger,
      character: this.character,
      activeDialogueEffects: this.activeDialogueEffects
    };
  }

  startPrelude() {
    this.trigger.element.disabled = true;
    this.dialogue.play(this.scene.preludeSequence, {
      context: `${this.scene.id}:prelude`,
      silent: this.scene.audioSkipped === true,
      onStep: (line) => this.applyDialogueStep(line),
      onComplete: () => {
        this.trigger.element.disabled = false;
        this.stage.classList.remove("is-theatrical", "is-host-mode");
      }
    });
  }

  async startMainSequence() {
    if (this.busy || this.started || this.dialogue?.active) return;
    this.busy = true;
    this.started = true;
    this.trigger.setTriggered(true);
    this.stage.classList.add("is-sequence-active");

    if (this.ambientPromise) {
      await this.ambientPromise;
      this.ambientPromise = null;
    }

    for (const id of this.scene.hidePropsOnStart || []) this.objects.get(id)?.hide();

    logger.log("reveal_button_clicked", { scene: this.scene.id, trigger: this.scene.trigger.id });
    if (!this.scene.audioSkipped) audioManager.playMusic(this.scene.music);
    logger.log("reveal_animation_started", { scene: this.scene.id });

    try {
      await runSceneAnimation(this.scene.animation.type, this.getActionContext());
    } catch (error) {
      logger.log("animation_error", {
        scene: this.scene.id,
        message: error.message,
        fallback: "dialogue-start"
      });
    }

    logger.log("reveal_animation_completed", { scene: this.scene.id });
    await this.dialogue.play(this.scene.mainSequence, {
      context: `${this.scene.id}:main`,
      silent: this.scene.audioSkipped === true,
      onStep: (line) => this.applyDialogueStep(line),
      onComplete: () => this.finishMainSequence()
    });
  }

  async applyDialogueStep(line) {
    const keepEffects = line.keepEffects || [];
    for (const [id, effect] of this.effects) {
      if (!keepEffects.includes(id)) effect.hide();
    }
    for (const id of [...this.activeDialogueEffects]) {
      if (!keepEffects.includes(id)) this.activeDialogueEffects.delete(id);
    }

    if (line.sprite) {
      await this.character.setSprite({ src: line.sprite, layout: line.layout });
    }
    if (line.showEffect) {
      await this.effects.get(line.showEffect)?.show();
      this.activeDialogueEffects.add(line.showEffect);
    }
    for (const id of line.showObjects || []) this.objects.get(id)?.show();
    for (const id of line.hideObjects || []) this.objects.get(id)?.hide();

    this.stage.classList.toggle("is-theatrical", line.tone === "theatrical");
    if (line.tone === "switch") this.stage.classList.add("is-host-mode");
  }

  async finishMainSequence() {
    for (const effect of this.effects.values()) effect.hide();
    this.activeDialogueEffects.clear();

    const last = this.scene.mainSequence.at(-1);
    if (last?.tone === "exit") {
      await motion.animate(this.character.image, [
        { opacity: 1, transform: "translateX(0) rotate(0deg)" },
        { opacity: 1, transform: "translateX(112vw) rotate(7deg)" }
      ], { duration: 570, easing: "cubic-bezier(.5,0,.9,.4)", persist: true });

      const exit = this.scene.animation.exit || {};
      if (exit.sfx) audioManager.playEffect(this.scene.sfx?.[exit.sfx]);
      if (exit.effect) {
        const effect = this.effects.get(exit.effect);
        await effect?.show();
        effect?.hideAfter(520);
      }
    }

    this.stage.classList.remove("is-sequence-active", "is-theatrical", "is-host-mode");
    this.status.textContent = "Consiglio completato.";
    this.replay.hidden = false;
    if (this.scene.trigger.postLines?.length) {
      this.trigger.element.disabled = false;
    } else {
      this.trigger.hide();
    }
    this.busy = false;
    logger.log("scene_completed", { scene: this.scene.id });
  }

  async interactWithTrigger() {
    if (this.busy || this.dialogue?.active) return;
    const lines = this.scene.trigger.postLines || [];
    const count = this.interactions.get("__trigger_post__") || 0;
    this.interactions.set("__trigger_post__", count + 1);
    const chosenIndex = Math.min(count, lines.length - 1);
    const [text, portraitName] = lines[chosenIndex] || lines.at(-1);
    await this.dialogue.play([{
      text,
      portrait: sharedPortrait(portraitName || "neutral"),
      speaker: "GIULIO"
    }], {
      context: `${this.scene.id}:trigger:post`,
      silent: this.scene.audioSkipped === true
    });
  }

  async interactWithObject(object) {
    this.processingInteraction = true;
    try {
      const definition = object.definition;
      const count = this.interactions.get(definition.id) || 0;
      this.interactions.set(definition.id, count + 1);

      logger.log("object_interacted", {
        scene: this.scene.id,
        object: definition.id,
        count: count + 1,
        action: definition.action
      });

      await runObjectAction(definition.action, this.getActionContext(object));

      let sequence;
      if (definition.dialogue?.length) {
        sequence = definition.dialogue;
      } else {
        const lines = definition.lines || [["L'oggetto non sembra avere altro da dire.", "neutral"]];
        const chosenIndex = Math.min(count, lines.length - 1);
        const [text, portraitName, explicitVoice] = lines[chosenIndex] || lines.at(-1);
        const voiceNumber = String(chosenIndex + 1).padStart(2, "0");
        const inferredVoice = `/assets/audio/voices/giulio/${this.scene.id}/voice-${this.scene.id}-${definition.voiceId || definition.id}-${voiceNumber}.mp3`;
        sequence = [{
          text,
          portrait: sharedPortrait(portraitName || "neutral"),
          voice: this.scene.audioSkipped ? null : (explicitVoice || inferredVoice)
        }];
      }

      await this.dialogue.play(sequence, {
        context: `${this.scene.id}:object:${definition.id}`,
        silent: this.scene.audioSkipped === true,
        onStep: (line) => this.applyDialogueStep(line)
      });
    } finally {
      this.processingInteraction = false;
    }
  }
}
