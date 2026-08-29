# Build pipeline

## 1. Asset audit

- Inspect supplied archives and checklist statuses.
- Correct misleading extensions during import.
- Create lightweight runtime WebP files.
- Keep one canonical runtime copy in `public/assets-optimized/`.
- Record the result in `public/assets-optimized/asset-inventory.json`.

## 2. Structural skeleton

- Multi-page Vite entry points.
- Shared application loader.
- Separate configuration, services, UI classes, page modules and CSS components.
- Empty audio and optional vendor folders.

## 3. Shared services

- Control Room settings; scene pages contain no navigation UI.
- Local logger and dashboard.
- Asset loader with failure logging and visual fallback.
- Audio manager with silent fallback.
- Motion service using native Web Animations, with optional GSAP support.
- Reusable dialogue engine.

## 4. Scene assembly

Each scene has one source file:

```text
src/config/scenes/advice1.js ... advice8.js
src/config/scenes/create-placeholder-scene.js   # temporary factory for Advice 4–8
src/config/scenes/index.js                      # single scene registry
```

The scene file owns background, layers, objects, effects, character layouts, trigger, dialogue and animation references. Object position is stored beside that object and is not repeated in page CSS.

## 5. Runtime objects

`SceneElement` is the base class. `SceneObject`, `SceneTrigger`, `SceneEffect` and `SceneCharacter` extend it. `SceneController` assembles and coordinates them.

Object actions and reveal animations are selected from small registries, avoiding scene-ID branches in the controller.

## 6. Graceful degradation

- Missing background: CSS fallback.
- Missing sprite or object: labelled placeholder.
- Missing effect: sequence continues.
- Missing music, effect or voice: silence and one logged failure.
- Motion failure: dialogue starts anyway.
- Storage failure: site remains usable.

## 7. Validation

- JavaScript syntax scan.
- Configured images checked against disk.
- Missing audio accepted until supplied.
- Runtime CSS checked for parse errors, duplicate selectors and duplicate declarations.
- Static server HTTP check for all routes and critical assets.
