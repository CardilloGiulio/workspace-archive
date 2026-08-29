# Development Scene Layout Editor

The editor is an isolated development-only calibration layer for Advice 3.

## Enable

`.env.development` contains:

```text
VITE_ENABLE_SCENE_EDITOR=true
```

Run the Vite development server. The editor is not loaded in production builds because the import is guarded by `import.meta.env.DEV` and the explicit flag.

## Activate and exit

Open and close Options three complete times within ten seconds. Once active, one further open-and-close Options cycle exits and discards the in-memory preview.

## Controls

- Desktop: click and drag an object; resize with corner handles; `S` exports; `Ctrl+Z` undoes.
- Mobile: tap and drag; pinch with two fingers; `G` exports; use the small Undo and Reset controls.
- The target selector can preview registered hidden effects and Giulio layouts.

Exports are separate `scene-layout-advice3-desktop.json` or `scene-layout-advice3-mobile.json` patches. Source scene files are never overwritten.
