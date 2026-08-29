# GR 20/05/2026 — v0.5.4 verde acqua one-month theme

This version keeps the Netlify-ready setup, Stage 1 runner, stable Porta Susa replay loop, Web Audio Giulio/Rebecca voices, Android minigame polish, final scene and final music behavior. It changes only the public visual theme and homepage copy for the one-month celebration.

Changes in v0.4.5:

- Added Rebecca voice folder: `public/audio/rebecca/`.
- Loaded Rebecca `.ogg` files from `AllTheVoicelines.zip` using the same numbering scheme as Giulio.
- Kept Giulio WAV files in `public/audio/giulio/`.
- Commentary now plays Giulio first, then Rebecca after Giulio's line duration.
- Web Audio preloads both Giulio and Rebecca voice files after the player clicks `Inizia a correre`.
- Hit/urgent commentary still interrupts the previous voice pair.
- Missing Rebecca numbers are safely skipped, so those text lines still appear but only Giulio audio plays.
- Background stage audio and final scene music behavior remain unchanged.

Run:

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Netlify deploy settings

Use these settings on Netlify:

- Base directory: `rebecca-ring-site` if the repo contains this folder as a subfolder
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: handled by `.nvmrc` / `netlify.toml`

If Netlify serves 404, check the Deploy File Browser and confirm that the deployed root contains `/index.html` and `/_redirects`.

## v0.4.7 notes
- Missing Rebecca voice files no longer keep the dialogue queue blocked.
- If a Rebecca `.ogg` is missing for a mapped commentary line, Rebecca is not rendered as speaking for that line.
- Giulio-only lines now use a shorter voice lock based on Giulio's available audio instead of the full two-speaker lock.
- Existing Giulio/Rebeca audio mappings, Netlify config, final scene and stage audio are unchanged.

## v0.5.2 - commentary priority and track tuning

- Disabled delayed queued commentary for normal events: if a voice is already speaking, pickups/walking/running commentary is dropped instead of playing late.
- Hit obstacles still interrupt immediately.
- `nearPortaSusa` is capped so “Se ti raggiungo prima della metro...” cannot spam.
- Periodic walking/running commentary is less frequent and capped, so object and hit audio have more space.
- Piazza Statuto, Mercato and Porta Susa tracks now have more challenging fixed object patterns using existing objects only.
- Debug logs now include `commentary:dropped:busy` and `dialogue-slot:empty` to verify the commentary slot state.

## v0.5.3 - Android minigame page polish

- Mobile work focused only on the minigame page; homepage and final page are unchanged.
- Added Android/touch CSS polish for runner controls: tap highlight removed, text selection disabled on game controls, and button active states softened.
- The `CORRI` button now captures pointer input while pressed, so a small finger movement should not accidentally stop running.
- Tutorial overlay is scrollable inside the runner, so small Android screens are not locked out of the `Inizia a correre` button.
- Runner layout is more compact on phones: smaller HUD, controls, objects, dialogue box, and character sprites.
- Added short-height mobile rules so the minigame remains reachable on devices with limited vertical space.

## v0.5.4 - verde acqua one-month theme

- Re-themed the visible UI palette to `verde acqua` / teal.
- Removed visible ring references from the homepage because the ring will be gifted later.
- Reframed the homepage as a one-month celebration.
- Minigame logic, audio, Android runner polish, final scene and final music behavior are unchanged.


## v0.5.7

Museum scenes now use finite, scene-specific mini scenography instead of looping floating emoji. Piazza Statuto and religious poster scenes reuse the same public image references used by the runner. Scenes restart when selected, then hold their final frame.
