import { logger } from "../services/logger.js";
import { audioManager } from "../services/audio-manager.js";
import { loadImage } from "../services/asset-loader.js";
import { motion } from "../services/motion-service.js";

const DIALOGUE_OPEN = "/assets/audio/effects/dialogue-open.mp3";
const DIALOGUE_NEXT = "/assets/audio/effects/dialogue-next.mp3";

function lengthClass(text = "") {
  const length = text.trim().length;
  if (length > 170) return "long";
  if (length > 105) return "medium";
  return "short";
}

export class DialogueEngine {
  constructor(host) {
    this.host = host;
    this.sequence = [];
    this.index = -1;
    this.active = false;
    this.onStep = null;
    this.onComplete = null;
    this.silent = false;

    host.innerHTML = `
      <section class="dialogue-panel" data-dialogue hidden aria-live="polite" aria-label="Dialogo di Giulio">
        <div class="dialogue-portrait asset-host">
          <img data-dialogue-portrait alt="Ritratto di Giulio">
          <span class="asset-fallback">GIULIO</span>
        </div>
        <div class="dialogue-copy" data-dialogue-copy>
          <span class="dialogue-speaker">GIULIO</span>
          <p data-dialogue-text></p>
          <span class="dialogue-hint">clic / invio / spazio</span>
        </div>
        <button class="dialogue-next" type="button" aria-label="Continua">▼</button>
      </section>
    `;

    this.panel = host.querySelector("[data-dialogue]");
    this.copy = host.querySelector("[data-dialogue-copy]");
    this.text = host.querySelector("[data-dialogue-text]");
    this.portrait = host.querySelector("[data-dialogue-portrait]");
    this.speaker = host.querySelector(".dialogue-speaker");

    this.panel.addEventListener("click", () => this.next());
    document.addEventListener("keydown", (event) => {
      const interactiveTarget = event.target.matches("input, textarea, select, button")
        && !event.target.closest(".dialogue-panel");
      if (!this.active || interactiveTarget) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.next();
      }
    });
  }

  async play(sequence, { context = "dialogue", onStep, onComplete, silent = false } = {}) {
    if (!Array.isArray(sequence) || sequence.length === 0) return;

    if (this.active) await this.close({ instant: true, runCallback: false });

    this.sequence = sequence;
    this.index = 0;
    this.active = true;
    this.context = context;
    this.onStep = onStep;
    this.onComplete = onComplete;
    this.silent = silent;
    this.panel.dataset.busy = "true";
    this.panel.hidden = true;
    this.resetPanelAnimation();

    // Prepare the first message while the panel is still hidden. This prevents
    // the final text of the previous dialogue from flashing during its entrance.
    await this.renderLine(this.sequence[0], this.index);

    this.panel.hidden = false;
    logger.log("dialogue_started", { context, lines: sequence.length });
    if (!this.silent) audioManager.playEffect(DIALOGUE_OPEN);
    await motion.pop(this.panel, 280);
    this.panel.dataset.busy = "false";
  }

  async next() {
  if (!this.active || this.panel.dataset.busy === "true") return;

  this.panel.dataset.busy = "true";
  if (this.index >= this.sequence.length - 1) {
    await this.close();
    return;
  }

  await motion.animate(this.copy, [
    { opacity: 1, transform: "translateY(0)" },
    { opacity: 0, transform: "translateY(-5px)" }
  ], {
    duration: 90,
    easing: "ease-in",
    persist: true
  });

  this.index += 1;
  if (!this.silent) audioManager.playEffect(DIALOGUE_NEXT);
  await this.renderLine(this.sequence[this.index], this.index);

  await motion.animate(this.copy, [
    { opacity: 0, transform: "translateY(7px)" },
    { opacity: 1, transform: "translateY(0)" }
  ], {
    duration: 170,
    persist: true
  });

  this.copy.style.removeProperty("opacity");
  this.copy.style.removeProperty("transform");

  this.panel.dataset.busy = "false";
}

  async renderLine(line, index) {
    this.panel.dataset.tone = line.tone || "normal";
    this.panel.dataset.length = lengthClass(line.text);
    this.copy.scrollTop = 0;
    this.text.textContent = line.text;
    const speaker = line.speaker || "GIULIO";
    if (this.speaker) this.speaker.textContent = speaker;
    this.panel.setAttribute("aria-label", `Dialogo di ${speaker}`);

    if (line.portrait) {
      this.portrait.hidden = false;
      this.portrait.style.visibility = "hidden";
      this.portrait.alt = `Ritratto di ${speaker}`;
      await loadImage(this.portrait, line.portrait, {
        role: "dialogue-portrait",
        fallback: "speaker-label"
      });
      this.portrait.style.visibility = "visible";
    }

    logger.log("dialogue_advanced", {
      context: this.context,
      index,
      text: line.text,
      tone: line.tone || "normal"
    });

    try {
      await this.onStep?.(line, index);
    } catch (error) {
      logger.log("dialogue_step_error", { message: error.message, index });
    }

    if (!this.silent && line.voice) audioManager.playVoice(line.voice);
  }

  async close({ instant = false, runCallback = true } = {}) {
    if (!this.active) return;

    this.active = false;
    this.panel.dataset.busy = "true";
    logger.log("dialogue_completed", { context: this.context, lines: this.sequence.length });

    if (instant) {
      this.panel.hidden = true;
    } else {
      await motion.fadeOut(this.panel, 150);
    }

    const callback = this.onComplete;
    this.sequence = [];
    this.index = -1;
    this.text.textContent = "";
    this.panel.dataset.tone = "normal";
    this.panel.dataset.length = "short";
    this.panel.dataset.busy = "false";
    this.silent = false;
    if (this.speaker) this.speaker.textContent = "GIULIO";
    this.resetPanelAnimation();

    if (runCallback) await callback?.();
  }

  resetPanelAnimation() {
    this.panel.getAnimations?.().forEach((animation) => animation.cancel());
    this.copy.getAnimations?.().forEach((animation) => animation.cancel());
    this.panel.style.removeProperty("opacity");
    this.panel.style.removeProperty("transform");
    this.panel.style.removeProperty("scale");
    this.panel.style.removeProperty("rotate");
    this.copy.style.removeProperty("opacity");
    this.copy.style.removeProperty("transform");
  }
}
