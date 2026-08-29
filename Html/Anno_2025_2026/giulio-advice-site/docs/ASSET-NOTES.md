# Asset and scenery notes

## Runtime assets

- 122 optimized runtime image entries are recorded in `public/assets-optimized/asset-inventory.json`.
- Runtime images are WebP files sized for their actual on-screen use.
- Only one canonical runtime copy is included in the package.
- The original upload archives are not duplicated inside the production project.

## Intentional omissions

Items marked as skipped in the checklist were not recreated:

- separate computer desk, keyboard and mouse
- optional computer effect images such as screen flicker and chair trail

The laptop image already contains its keyboard and screen. Small missing effects are implemented with CSS or Web Animations.

## Composition

- Beach: towel behind Giulio; props grouped by use.
- Tree: picnic items on the left; apple and nature interactions around the tree.
- Computer: laptop aligned under Giulio's hands; headphones and stationery on the blue table; charger connected visually to the laptop and power area.

Positions and sizes are stored in the relevant object definition under `src/config/scenes/`.
