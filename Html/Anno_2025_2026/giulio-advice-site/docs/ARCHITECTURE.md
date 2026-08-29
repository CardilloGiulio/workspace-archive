# Architecture

## Rule

A value has one owner.

- Scene-specific values belong to the scene configuration.
- Behaviour belongs to a reusable class or registry.
- Visual component rules belong to one CSS file.
- Page CSS contains only visuals that are unique to that page.

## Scene configuration

Each scene is defined in one file under `src/config/scenes/`.

An object definition contains its complete contract:

```js
{
  id: "headphones",
  asset: "/assets-optimized/...",
  alternateAsset: null,
  action: "nudge",
  lines: [["Non erano decorazioni.", "annoyed"]],
  layout: {
    desktop: { left: "55.5%", top: "50.5%", width: "5.4%", height: "9.2%" },
    mobile: { left: "61%", top: "49.5%", width: "12%", height: "9%" }
  }
}
```

There is no second CSS placement rule for the same object.

## Class hierarchy

`SceneElement` creates the common DOM element, image fallback and responsive layout variables.

- `SceneObject` adds object loading, alternate states and interaction identity.
- `SceneTrigger` adds the reveal button and label.
- `SceneEffect` adds temporary show/hide lifecycle.
- `SceneCharacter` adds named pose layouts and sprite replacement.

`SceneController` coordinates the lifecycle but does not contain object positions or per-scene asset lists.

## Registries

`object-actions.js` maps action names to small handlers.

`scene-animations.js` maps animation names to the reveal sequences, including the reusable placeholder reveal used by future scene slots.

This replaces scene-ID condition chains and keeps each behaviour isolated.

## Responsive layout

`layout-variables.js` translates desktop/mobile values from the scene configuration into CSS custom properties. `scene.css` applies those variables generically.

Desktop and mobile are two states of the same object definition, not two unrelated sets of CSS patches.


## Scene scaling

`contentScale` is applied once to `.scene-composition`. Props, Giulio, effects and the main trigger share that transform; backgrounds, title cards and dialogue remain UI layers outside the composition.


## Route ownership

`src/config/scenes/index.js` is the single registry for all scene routes. Vite derives its production inputs and development editor registry from those scene manifests. The Control Room links to the routes; scene pages do not render a navigation bar.

## Placeholder contract

Advice 4–8 are intentionally asset-light but fully executable. Each has its own HTML route, manifest and page CSS extension point. `create-placeholder-scene.js` supplies only temporary values and can be replaced without modifying `SceneController`.
