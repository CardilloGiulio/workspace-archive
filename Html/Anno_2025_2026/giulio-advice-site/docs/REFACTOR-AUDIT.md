# Refactor audit

## Contradictions removed

- Navigation height was defined in several later patches.
- Dialogue geometry was repeated across base, desktop-fix and multiple mobile blocks.
- Computer-scene objects were positioned more than once.
- Character pose layouts existed in both JavaScript and CSS.
- Scene-specific sprite paths and conditional branches were embedded in the controller.
- Old patch files and before/after screenshots were shipped inside the production package.
- Optimized assets existed in two separate folders.

## Current result

- One canonical optimized asset folder: `public/assets-optimized/`.
- One scene file per page.
- One definition per object.
- One primary CSS owner per UI component.
- No duplicate selectors within the same responsive context, and no later patch files overriding component ownership.
- Zero duplicate declarations inside runtime CSS rules.
- No scene-ID branching in `SceneController`.
- No object placement in page CSS.
- No backup patch files in the production package.

## Deliberate responsive rules

A media query is not a patch. It selects the `mobile` values declared beside the same object's desktop values. The underlying object remains defined once.

## Files normally edited

| Need | File |
|---|---|
| Move or resize an object | corresponding `src/config/scenes/advice*.js` object |
| Change a line or portrait | same object or `mainSequence` in that scene file |
| Change Control Room route cards | `index.html` and `src/styles/dashboard.css` |
| Change dialogue panel | `src/styles/components/dialogue.css` |
| Change all scene elements | `src/styles/scene.css` |
| Add an interaction behaviour | `src/ui/scene/object-actions.js` |
| Change a reveal animation | `src/ui/scene/scene-animations.js` |
