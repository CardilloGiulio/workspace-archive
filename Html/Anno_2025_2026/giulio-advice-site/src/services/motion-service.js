import { settings } from "./settings.js";

function reduced() { return settings.getValue("reducedMotion"); }
function toKeyframes(from, to) { return [from, to]; }
function finalFrame(keyframes) {
  return Array.isArray(keyframes) ? (keyframes.at(-1) || {}) : (keyframes || {});
}
function styleFrame(frame = {}) {
  return Object.fromEntries(Object.entries(frame).filter(([key]) => key !== "offset" && key !== "easing" && key !== "composite"));
}

export const motion = {
  wait(ms) { return new Promise((resolve) => setTimeout(resolve, reduced() ? Math.min(ms, 40) : ms)); },

  async animate(element, keyframes, options = {}) {
    if (!element) return;
    const persist = options.persist === true;
    const last = styleFrame(finalFrame(keyframes));

    if (reduced()) {
      if (persist) Object.assign(element.style, last);
      return;
    }

    const frames = Array.isArray(keyframes) ? keyframes : [keyframes];
    const usesIndividualTransforms = frames.some((frame) =>
      frame && ("scale" in frame || "rotate" in frame || "translate" in frame)
    );

    if (globalThis.gsap && !usesIndividualTransforms) {
      await new Promise((resolve) => globalThis.gsap.to(element, {
        ...last,
        duration: (options.duration ?? 400) / 1000,
        ease: options.gsapEase ?? "power2.out",
        onComplete: () => {
          if (!persist) globalThis.gsap.set(element, { clearProps: Object.keys(last).join(",") });
          resolve();
        }
      }));
      return;
    }

    const animation = element.animate(keyframes, {
      duration: options.duration ?? 400,
      easing: options.easing ?? "cubic-bezier(.2,.8,.2,1)",
      fill: "both",
      delay: options.delay ?? 0,
      iterations: options.iterations ?? 1,
      direction: options.direction ?? "normal"
    });

    try { await animation.finished; } catch { /* interrupted animations are harmless */ }

    if (persist) {
      try { animation.commitStyles?.(); } catch { Object.assign(element.style, last); }
      if (!animation.commitStyles) Object.assign(element.style, last);
    }
    animation.cancel();
  },

  fadeIn(element, duration = 260) {
    element.hidden = false;
    return this.animate(element, toKeyframes({ opacity: 0 }, { opacity: 1 }), { duration });
  },

  fadeOut(element, duration = 220) {
    return this.animate(element, toKeyframes({ opacity: 1 }, { opacity: 0 }), { duration }).then(() => { element.hidden = true; });
  },

  shake(element, duration = 480) {
    return this.animate(element, [
      { transform: "translateX(0) rotate(0deg)" },
      { transform: "translateX(-8px) rotate(-3deg)" },
      { transform: "translateX(9px) rotate(3deg)" },
      { transform: "translateX(-6px) rotate(-2deg)" },
      { transform: "translateX(5px) rotate(2deg)" },
      { transform: "translateX(0) rotate(0deg)" }
    ], { duration, easing: "linear" });
  },

  pop(element, duration = 360) {
    element.hidden = false;
    return this.animate(element, [
      { opacity: 0, scale: ".25", rotate: "-12deg" },
      { opacity: 1, scale: "1.08", rotate: "2deg", offset: .72 },
      { opacity: 1, scale: "1", rotate: "0deg" }
    ], { duration, easing: "cubic-bezier(.18,.89,.32,1.35)" });
  }
};
