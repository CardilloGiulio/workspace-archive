# Directory and runtime flow

## Entry points

- `index.html` is the Control Room. It lists all eight routes, reads local logs and exposes settings.
- `advice1/index.html` through `advice8/index.html` are independent scene entry points.
- Scene pages deliberately contain no global navigation, settings button or page-transition overlay.

Every page loads `src/main.js`, which delegates to `src/core/script-loader.js`.

## Boot sequence

1. Initialise persistent settings and the local logger.
2. Attach the optional service collector and optimized-asset cache.
3. Select the page module from `body[data-page]`.
4. The Control Room loads `src/pages/dashboard.js`.
5. A scene route loads `src/pages/advice.js`, resolves `body[data-scene]` through `src/config/scenes/index.js`, then constructs `SceneController`.
6. In development, the scene editor is attached only when `VITE_ENABLE_SCENE_EDITOR=true`.

## Scene construction

`SceneController` owns orchestration, not scene-specific positions or asset paths. It creates:

- background and CSS fallback;
- visual layers;
- props and interactive objects;
- Giulio's current sprite and named layouts;
- temporary effects;
- the reveal trigger;
- the dialogue engine.

The controller then loads critical assets first, warms secondary assets, binds interactions, runs the animation registered in `scene-animations.js`, and advances the configured dialogue sequence. Missing images become labelled/CSS fallbacks; missing audio becomes silence and is logged.

## Ownership boundaries

- `src/config/scenes/advice*.js`: scenario content, assets, object/effect definitions, positions, dialogue and animation name.
- `src/ui/scene/`: reusable DOM and lifecycle classes.
- `src/ui/scene/object-actions.js`: reusable prop interactions.
- `src/ui/scene/scene-animations.js`: reusable reveal sequences.
- `src/styles/scene.css`: common scene UI and layout-variable application.
- `src/styles/pages/advice*.css`: only visuals unique to one route.
- `src/styles/components/dialogue.css`: dialogue UI.
- `src/services/`: logging, audio, assets, cache, motion and settings.
- `vite.config.js`: derives build entries and editor persistence registry from the central scene registry.

## Advice 4–8 placeholder contract

The five future routes are fully executable scenes, not blank HTML pages. For now they use:

- `create-placeholder-scene.js` for temporary manifest values;
- a CSS-rendered background and trigger;
- existing shared Giulio sprites;
- normal logging, dialogue, replay and scene-editor support.

When a final scenario is supplied, the normal replacement surface is limited to:

1. `src/config/scenes/adviceN.js` — replace the factory call with the final manifest.
2. `src/styles/pages/adviceN.css` — add only scene-specific visual rules when necessary.
3. `public/assets-optimized/backgrounds/adviceN/` — final background/layers.
4. `public/assets-optimized/sprites/adviceN/` — final stage sprites.
5. `public/assets-optimized/objects/adviceN/` — trigger, props and effects.
6. Optional audio under `public/assets/audio/`.

No edits are required in `SceneController`, the page loader, Vite build inputs, the Control Room filters, or the development editor merely to activate the route.

## Asset request method for a future scenario

After the scenario is described, compare it against `public/assets-optimized/` and return only the missing deliverables, grouped as:

- background and foreground layers;
- Giulio stage poses;
- interactive trigger states;
- props and alternate states;
- effects/overlays;
- optional music, SFX and voice lines.

Existing shared portraits and reusable Giulio sprites should be reused whenever they fit, avoiding redundant assets.
