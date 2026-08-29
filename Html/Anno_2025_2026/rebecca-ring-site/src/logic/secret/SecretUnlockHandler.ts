export const SECRET_MUSEUM_UNLOCK_KEY = "rebecca-secret-museum-unlocked-v1";
const SECRET_CLICK_WINDOW_MS = 2800;
const SECRET_REQUIRED_CLICKS = 5;
const SECRET_EVENT_NAME = "rebecca-secret-museum-unlocked";

let clickCount = 0;
let firstClickAt = 0;

export function isSecretMuseumUnlocked() {
  return window.localStorage.getItem(SECRET_MUSEUM_UNLOCK_KEY) === "true";
}

export function markSecretMuseumUnlocked() {
  window.localStorage.setItem(SECRET_MUSEUM_UNLOCK_KEY, "true");
  window.dispatchEvent(new CustomEvent(SECRET_EVENT_NAME));
}

export function registerSecretMuseumClick() {
  if (isSecretMuseumUnlocked()) return true;

  const now = Date.now();
  if (!firstClickAt || now - firstClickAt > SECRET_CLICK_WINDOW_MS) {
    firstClickAt = now;
    clickCount = 0;
  }

  clickCount += 1;

  if (clickCount >= SECRET_REQUIRED_CLICKS) {
    clickCount = 0;
    firstClickAt = 0;
    markSecretMuseumUnlocked();
    return true;
  }

  return false;
}

export function addSecretMuseumUnlockListener(listener: () => void) {
  window.addEventListener(SECRET_EVENT_NAME, listener);
  return () => window.removeEventListener(SECRET_EVENT_NAME, listener);
}
