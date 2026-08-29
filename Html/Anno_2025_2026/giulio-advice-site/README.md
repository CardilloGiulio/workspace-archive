# Giulio Advice Site

An eight-slot, Persona-inspired interactive website built with **Vite, HTML, modular CSS and vanilla JavaScript**.

The project is designed to remain functional even when an image, music track, sound effect or voice line is absent. Every failed load is recorded and the page continues with a CSS placeholder or silent fallback.

## Pages

- `/` — local activity dashboard and log viewer
- `/advice1/` — beach scene: the water bucket
- `/advice2/` — tree scene: the falling apple
- `/advice3/` — laptop scene: the unplugged charger
- `/advice4/` through `/advice8/` — functional placeholder scenes awaiting final scenery

## Start the project

Install Node.js 20.19 or newer, then run:

```bash
npm install
npm run dev
```

Open the address printed by Vite, normally `http://localhost:5173/`.

For a quick source preview without installing Vite:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`. The server must be started from the project root because the application uses root-relative paths.

## Production build

```bash
npm run build
npm run preview
```

Vite writes the deployable site to `dist/`.

## Audio status

The audio directory and all expected paths are already prepared, but no audio or voice files are included yet. When audio is triggered before those files are added, the failure is logged once and the scene continues silently.

See `docs/AUDIO-TODO.md` for the target folders and filenames.

## Logging

The dashboard reads logs from browser `localStorage`. It records:

- page entry, visibility and exit
- reveal-button use
- scene progress and dialogue steps
- object interactions
- asset successes and failures
- runtime errors
- settings changes

The dashboard can filter, clear and export the log as JSON.

This initial logger is local to the current browser and device. Cross-device QR analytics will require a backend endpoint. The collector is already isolated in `src/services/service-collector.js` for that later integration.

## Project structure

```text
advice1/ ... advice8/          HTML route entry points
public/assets/               supplied backgrounds, sprites and objects
public/assets/audio/         empty audio structure for later files
src/config/                  scene manifests and runtime settings
src/core/                    application boot pipeline
src/pages/                   dashboard and advice page entry logic
src/services/                logging, assets, audio, motion and settings
src/styles/                  global, dashboard, scene and page CSS
src/ui/                      settings, dialogue and scene controller
docs/                        implementation and asset notes
```

## Motion

The motion service uses native Web Animations by default. It will use `window.gsap` automatically if a local GSAP build is added later under `public/vendor/`; the site does not depend on it to run.

## Asset rules

Do not rename files casually. Scene assets are mapped in `src/config/scenes/`.

The supplied images were audited and copied with file extensions matching their actual encoded formats. Original source dimensions are recorded in `public/assets/asset-inventory.json`.

The artwork and photographs in `public/assets/` are treated as user-provided project assets and are not relicensed by this codebase.

## Final scene-layout revision

The final layout pass groups props by physical surface, aligns the apple and bucket triggers with Giulio, places the computer equipment on the blue table, and guarantees that temporary effects are removed between dialogue frames. See `docs/FINAL-LAYOUT-AUDIT.md`.

## Size and loading revision

The computer scene now uses a 67% internal art scale so the complete workstation remains visible on common laptop displays without changing the room background crop.

Android dialogue panels use dynamic viewport units, safe-area insets and compact responsive typography. The layout was checked at 320×568, 360×640, 390×844 and 740×360 with no text or panel overflow.

Runtime images are served from `public/assets-optimized/`. The original supplied images remain in `public/assets/`, but the application no longer downloads them during normal use.

- original image set: approximately 157 MB
- optimized WebP set: approximately 9.7 MB
- reduction: approximately 94%

Critical scene images are preloaded from each HTML page. Remaining scene images are warmed with limited concurrency, and a small service worker caches optimized assets for subsequent visits.


## Desktop PC UI pass

The desktop interface is calibrated for Chrome at 100% zoom. Do not reduce browser zoom to 67%: the scene title and right-side dialogue panel use compact native dimensions. Transparent sprite transitions also release their animation layers after each step to avoid colour flashes. See `docs/PC-UI-FIX.md`.


## Navigation and future scenes

The former global navigation bar and page-transition layer were removed. Scene pages now use the full viewport; the Control Room remains the single route directory and retains the settings control.

Advice 4–8 are complete routes backed by normal scene manifests. Their current manifests use `create-placeholder-scene.js`, CSS-rendered scenery and shared Giulio sprites. When a scenario is supplied, replace the corresponding manifest and page-specific CSS; the controller, logging, dialogue, build inputs and scene editor already recognize the route.
