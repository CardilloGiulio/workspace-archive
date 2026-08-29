# Audio to add later

All files are optional. The site already works without them.

## Music

```text
public/assets/audio/music/music-advice1-beach.mp3
public/assets/audio/music/music-advice2-tree.mp3
public/assets/audio/music/music-advice3-computer.mp3
```

## Shared interface sounds

```text
public/assets/audio/effects/dialogue-open.mp3
public/assets/audio/effects/dialogue-next.mp3
public/assets/audio/effects/button-hover.mp3
public/assets/audio/effects/button-click.mp3
public/assets/audio/effects/giulio-realisation.mp3
public/assets/audio/effects/advice-introduction.mp3
public/assets/audio/effects/advice-conclusion.mp3
public/assets/audio/effects/giulio-exit.mp3
public/assets/audio/effects/silent-stare.mp3
```

## Scene effects

Place scene-specific sound effects under:

```text
public/assets/audio/effects/advice1/
public/assets/audio/effects/advice2/
public/assets/audio/effects/advice3/
```

## Italian Giulio voice lines

The scene manifest already points to:

```text
public/assets/audio/voices/giulio/advice1/
public/assets/audio/voices/giulio/advice2/
public/assets/audio/voices/giulio/advice3/
public/assets/audio/voices/giulio/shared/
```

Use the voice filenames defined inside `mainSequence` and object dialogue in the corresponding scene file under `src/config/scenes/`. Keep one spoken line per MP3 and do not mix music into the voice files.

## Complete machine-readable list

`public/assets/audio/audio-manifest.json` contains every music, effect and voice path currently expected by the application, including object comments inferred from the scene manifest.
