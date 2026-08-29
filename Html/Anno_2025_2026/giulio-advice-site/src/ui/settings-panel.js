import { settings } from "../services/settings.js";
import { audioManager } from "../services/audio-manager.js";

export function initSettingsPanel() {
  const root = document.getElementById("settings-root");
  if (!root) return;
  root.innerHTML = `
    <div class="settings-backdrop" data-settings-backdrop hidden>
      <section class="settings-panel" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <button class="settings-close" type="button" data-close-settings aria-label="Chiudi impostazioni">×</button>
        <p class="eyebrow">SYSTEM OPTIONS</p>
        <h2 id="settings-title">Impostazioni</h2>
        <label class="toggle-row"><span>Riduci animazioni</span><input type="checkbox" data-setting="reducedMotion"></label>
        <label class="toggle-row"><span>Musica</span><input type="checkbox" data-setting="musicEnabled"></label>
        <label class="toggle-row"><span>Voce di Giulio</span><input type="checkbox" data-setting="voiceEnabled"></label>
        <label class="toggle-row"><span>Effetti sonori</span><input type="checkbox" data-setting="effectsEnabled"></label>
        <label class="range-row"><span>Volume</span><input type="range" min="0" max="1" step="0.05" data-setting="volume"></label>
        <p class="settings-note">L'audio non è ancora incluso. I controlli sono già pronti e ogni file mancante viene registrato senza interrompere la scena.</p>
      </section>
    </div>
  `;
  const backdrop = root.querySelector("[data-settings-backdrop]");
  const panel = root.querySelector(".settings-panel");
  const controls = [...root.querySelectorAll("[data-setting]")];

  function sync() {
    const values = settings.get();
    controls.forEach((control) => {
      const key = control.dataset.setting;
      if (control.type === "checkbox") control.checked = Boolean(values[key]);
      else control.value = values[key];
    });
  }

  function open() {
    sync();
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add("is-open"));
    panel.querySelector("button, input")?.focus();
    document.dispatchEvent(new CustomEvent("giulio:settings-open"));
  }
  function close() {
    backdrop.classList.remove("is-open");
    setTimeout(() => { backdrop.hidden = true; }, 180);
    document.dispatchEvent(new CustomEvent("giulio:settings-close"));
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-open-settings]")) open();
    if (event.target.closest("[data-close-settings]") || event.target === backdrop) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !backdrop.hidden) close();
  });
  controls.forEach((control) => control.addEventListener("input", () => {
    const key = control.dataset.setting;
    const value = control.type === "checkbox" ? control.checked : Number(control.value);
    settings.update({ [key]: value });
    audioManager.updateVolume();
  }));
  sync();
}
