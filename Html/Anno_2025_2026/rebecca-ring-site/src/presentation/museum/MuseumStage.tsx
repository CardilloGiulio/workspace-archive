import gamesContent from "../../store/content/games.json";
import type { MuseumPose, MuseumScene } from "../../store/museum/museumScenes";

type SceneMode =
  | "walk"
  | "slow"
  | "run"
  | "sprint"
  | "hitPoster"
  | "hitBox"
  | "hitPotato"
  | "heartToRebecca"
  | "heartSelf"
  | "iceCreamGrab"
  | "iceCreamBite"
  | "iceCreamOffer"
  | "friesGrab"
  | "friesCarry"
  | "chocolateFind"
  | "chocolateOffer"
  | "potatoConfused"
  | "potatoRare"
  | "near"
  | "far"
  | "zonePiazza"
  | "zoneMarket"
  | "zonePorta"
  | "portaPromise"
  | "portaLoop"
  | "mcdonaldLoop";

function settingLabel(setting: MuseumScene["setting"]) {
  switch (setting) {
    case "piazza": return "Piazza Statuto";
    case "market": return "Mercato";
    case "porta": return "Porta Susa";
    case "mcdonald": return "McDonald’s";
    default: return "Torino";
  }
}

function settingImage(setting: MuseumScene["setting"]) {
  switch (setting) {
    case "piazza": return gamesContent.backgrounds.piazzaStatuto;
    case "market": return gamesContent.backgrounds.market;
    case "porta":
    case "mcdonald": return gamesContent.backgrounds.portaSusa;
    default: return gamesContent.backgrounds.turin;
  }
}

function sceneMode(scene: MuseumScene): SceneMode {
  if (scene.id === "hit-1") return "hitPoster";
  if (scene.id === "hit-2") return "hitBox";
  if (scene.id === "hit-3") return "hitPotato";
  if (scene.id === "heart-1") return "heartToRebecca";
  if (scene.id === "heart-2") return "heartSelf";
  if (scene.id === "ice-1") return "iceCreamGrab";
  if (scene.id === "ice-2") return "iceCreamBite";
  if (scene.id === "ice-3") return "iceCreamOffer";
  if (scene.id === "fries-1") return "friesGrab";
  if (scene.id === "fries-2") return "friesCarry";
  if (scene.id === "choco-1") return "chocolateFind";
  if (scene.id === "choco-2") return "chocolateOffer";
  if (scene.id === "potato-1") return "potatoConfused";
  if (scene.id === "potato-2") return "potatoRare";
  if (scene.id === "zone-ps") return "zonePiazza";
  if (scene.id === "zone-mk") return "zoneMarket";
  if (scene.id === "zone-pss") return "zonePorta";
  if (scene.id === "porta-1") return "portaPromise";
  if (scene.id === "porta-loop-1") return "portaLoop";
  if (scene.id === "porta-loop-2") return "mcdonaldLoop";
  if (scene.id === "porta-loop-3") return "portaPromise";
  if (scene.category === "distance" && scene.id.startsWith("far")) return "far";
  if (scene.category === "distance") return "near";
  if (scene.category === "sprinting") return "sprint";
  if (scene.category === "running") return "run";
  if (scene.id.startsWith("walklong") || scene.giulioPose === "slow") return "slow";
  return "walk";
}

function sceneTone(scene: MuseumScene) {
  if (scene.category === "hit") return "tone-impact";
  if (scene.category === "collectibles") return "tone-collectible";
  if (scene.category === "sprinting") return "tone-sprint";
  if (scene.category === "running") return "tone-run";
  if (scene.category === "distance" && scene.id.startsWith("far")) return "tone-far";
  if (scene.category === "distance") return "tone-near";
  if (scene.category === "porta") return "tone-porta";
  if (scene.category === "zones") return "tone-zone";
  return "tone-walk";
}

function shortCaption(scene: MuseumScene) {
  if (scene.caption.length <= 86) return scene.caption;
  return `${scene.caption.slice(0, 84).trim()}…`;
}


function sceneIdClass(scene: MuseumScene) {
  return `scene-id-${scene.id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

function SceneSpecificBeat({ scene }: { scene: MuseumScene; mode: SceneMode }) {
  return (
    <div className="scene-specific-layer" aria-hidden="true">
      {scene.id === "walk-1" && (<><div className="beat-card energy-meter"><span>energia</span><i /></div><div className="beat-ground turtle-pass">lento</div></>)}
      {scene.id === "walk-2" && (<><div className="beat-chair" /><div className="beat-yawn">zzz</div><div className="beat-street-gaze left" /><div className="beat-street-gaze right" /></>)}
      {scene.id === "walk-3" && (<><div className="breath-cloud one" /><div className="breath-cloud two" /><div className="pace-sign nonno">velocità nonno</div></>)}
      {scene.id === "walk-4" && (<><div className="route-scan" /><div className="inspection-marker a" /><div className="inspection-marker b" /><div className="pace-sign excuse">ispezione percorso</div></>)}
      {scene.id === "walk-5" && (<><div className="sweet-halo" /><div className="warning-board">urgenza?</div></>)}
      {scene.id === "walk-6" && (<><div className="countdown-card"><b>5</b><span>secondi</span></div><div className="distance-line widening" /></>)}
      {scene.id === "walklong-2" && (<><div className="sweat-drops"><i/><i/><i/></div><div className="promise-ribbon">promesso</div></>)}
      {scene.id === "walklong-3" && (<><div className="metro-far-sign">metro lontana</div><div className="direction-arrow-long" /></>)}

      {scene.id === "run-1" && (<><div className="speed-switch"><span>cammino</span><b>→</b><span>corsa</span></div><div className="wake-trail behind-giulio" /><div className="wake-trail behind-rebecca" /></>)}
      {scene.id === "run-2" && (<><div className="dodge-lane left">scusa!</div><div className="dodge-lane right">attento!</div><div className="crossing-warning" /></>)}
      {scene.id === "run-3" && (<><div className="flower-mouth" /><div className="romantic-disaster-label">romantico?</div><div className="pink-swipe" /></>)}
      {scene.id === "run-4" && (<><div className="rhythm-meter"><span/><span/><span/><span/></div><div className="closing-distance-note">sta funzionando</div></>)}
      {scene.id === "run-5" && (<><div className="negotiation-panel">rallenti?</div><div className="evaluation-stamp">valuto</div></>)}
      {scene.id === "run-6" && (<><div className="tiny-crown" /><div className="blush-burst rebecca-blush"><i/><i/></div></>)}

      {scene.id === "sprint-1" && (<><div className="cardio-bar"><i /></div><div className="sprint-shockwave" /></>)}
      {scene.id === "sprint-2" && (<><div className="sprint-flower-trophy" /><div className="dont-smile-card">non sorridere</div></>)}
      {scene.id === "sprint-3" && (<><div className="slalom-box one" /><div className="slalom-box two" /><div className="slalom-path" /></>)}
      {scene.id === "sprint-4" && (<><div className="danger-pole" /><div className="metro-background-pass">metro</div><div className="obstacle-warning">ostacolo!</div></>)}
    </div>
  );
}

function MuseumCharacter({ person, pose }: { person: "giulio" | "rebecca"; pose: MuseumPose }) {
  return (
    <div className={`museum-character ${person} pose-${pose}`}>
      <div className={`museum-shadow ${person}`} />
      <div className={`museum-head ${person === "rebecca" ? "ponytail" : "messy"}`}>
        <span className="museum-eye left" />
        <span className="museum-eye right" />
      </div>
      <div className="museum-body">WEP</div>
      <div className="museum-arm arm-left" />
      <div className="museum-arm arm-right" />
      <div className="museum-leg leg-left" />
      <div className="museum-leg leg-right" />
    </div>
  );
}

function BackgroundActors({ mode, setting }: { mode: SceneMode; setting: MuseumScene["setting"] }) {
  const hasPiazza = setting === "piazza";
  const hasMarket = setting === "market";
  const hasPorta = setting === "porta" || setting === "mcdonald";
  const hasPedestrians = ["run", "sprint", "hitBox", "friesGrab", "friesCarry"].includes(mode);

  return (
    <>
      {hasPiazza && (
        <div className="museum-bg-group piazza-protest">
          <div className="museum-signboard">Gesù salva dalla droga</div>
          <div className="museum-real-poster christ" />
          <span className="ground-person protester-one">🧍‍♂️</span>
          <span className="ground-person protester-two">🧍‍♀️</span>
        </div>
      )}

      {hasMarket && (
        <div className="museum-bg-group market-trade">
          <span className="ground-person trader-left">🧑‍🌾</span>
          <div className="trade-table"><span>🥔🥔🥔</span><b>⇄</b><span>🎟️</span></div>
          <span className="ground-person trader-right">🧑‍💼</span>
        </div>
      )}

      {hasPorta && (
        <div className="museum-bg-group porta-station">
          <div className="station-board">PORTA SUSA · METRO</div>
          <div className="metro-one-pass"><span>METRO</span><span>FERMI</span><span>→</span></div>
          {setting === "mcdonald" && <div className="mcd-counter"><b>M</b><span>🍟</span><span>🍔</span></div>}
          {setting === "mcdonald" && <span className="ground-person cashier">🧑‍🍳</span>}
          {setting === "mcdonald" && <span className="ground-person manager">🧑‍💼</span>}
        </div>
      )}

      {hasPedestrians && (
        <div className="museum-bg-group pedestrians">
          <span className="ground-person pedestrian-one">🚶‍♂️</span>
          <span className="ground-person pedestrian-two">🚶‍♀️</span>
          <span className="ground-person pedestrian-three">🧍</span>
        </div>
      )}
    </>
  );
}

function SceneAction({ scene, mode }: { scene: MuseumScene; mode: SceneMode }) {
  const christImage = gamesContent.religiousImages.christIcon;
  const pantocratorImage = gamesContent.religiousImages.pantocrator;

  return (
    <div className="museum-action-layer" aria-hidden="true">
      {mode === "hitPoster" && (
        <>
          <div className="action-poster incoming" style={{ backgroundImage: `url(${christImage})` }} />
          <div className="action-burst poster-burst">BAM</div>
          <span className="reaction-mark rebecca-mark">!</span>
        </>
      )}

      {mode === "hitBox" && (
        <>
          <div className="action-box incoming">📦</div>
          <div className="action-burst foot-burst">AHI</div>
        </>
      )}

      {mode === "hitPotato" && (
        <>
          <div className="action-potato flying">🥔</div>
          <div className="action-burst potato-burst">💫</div>
        </>
      )}

      {mode === "heartToRebecca" && <div className="token token-heart to-rebecca">💚</div>}
      {mode === "heartToRebecca" && <div className="heart-crush at-rebecca"><i /><i /><i /><i /></div>}
      {mode === "heartSelf" && <div className="token token-heart self-hit">💚</div>}
      {mode === "heartSelf" && <div className="heart-crush at-giulio"><i /><i /><i /><i /></div>}

      {mode === "iceCreamGrab" && <><span className="vendor vendor-ice">🍨</span><div className="token token-ice grab-path">🍦</div><span className="reaction-mark rebecca-look">?</span></>}
      {mode === "iceCreamBite" && <><div className="token token-ice bite-path">🍦</div><span className="bite-mark">morso</span></>}
      {mode === "iceCreamOffer" && <><div className="token token-ice offer-path">🍦</div><div className="offer-line" /></>}

      {mode === "friesGrab" && <><div className="mcd-mini-counter">🍟 🍔</div><div className="token token-fries grab-path">🍟</div></>}
      {mode === "friesCarry" && <><div className="token token-fries carry-path">🍟</div><span className="focus-arrow">→</span></>}

      {mode === "chocolateFind" && <><div className="stand-mini">🍫</div><div className="token token-choco treasure-path">🍫</div><span className="shine-line" /></>}
      {mode === "chocolateOffer" && <><div className="token token-choco offer-path">🍫</div><div className="offer-line chocolate" /></>}

      {mode === "potatoConfused" && <><div className="token token-potato confused-path">🥔</div><span className="question-cloud">?</span></>}
      {mode === "potatoRare" && <><div className="token token-potato rare-path">🥔</div><span className="rare-glow">★</span></>}

      {mode === "run" && <div className="motion-ribbons run-lines"><i /><i /><i /></div>}
      {mode === "sprint" && <div className="motion-ribbons sprint-lines"><i /><i /><i /><i /></div>}
      {mode === "slow" && scene.id === "walklong-1" && <div className="action-poster poster-overtake" style={{ backgroundImage: `url(${pantocratorImage})` }} />}
      {mode === "near" && <div className="reach-line" />}
      {mode === "far" && <div className="far-distance-haze" />}
      {mode === "zonePiazza" && <div className="start-flag">PARTENZA</div>}
      {mode === "zoneMarket" && <div className="trade-callout">3 patate per una bussola?</div>}
      {mode === "zonePorta" && <div className="station-reveal">PORTA SUSA</div>}
      {mode === "portaPromise" && <><div className="metro-entrance">🚇</div><div className="reach-line porta" /></>}
      {mode === "portaLoop" && <><div className="loop-track">↺</div><div className="station-reveal small">ancora avanti</div></>}
      {mode === "mcdonaldLoop" && <><div className="mcd-mini-counter large">🍟 🍔</div><span className="ground-person manager action-manager">🧑‍💼</span><div className="loop-track mcd">↺</div></>}
    </div>
  );
}

export function MuseumStage({ scene, curtainOpen }: { scene: MuseumScene; curtainOpen: boolean }) {
  const mode = sceneMode(scene);
  const background = settingImage(scene.setting);

  return (
    <div
      className={`museum-stage museum-cinematic setting-${scene.setting} scene-mode-${mode} ${sceneTone(scene)} ${sceneIdClass(scene)}`}
      style={{ backgroundImage: `linear-gradient(180deg, rgba(236,255,250,.74), rgba(214,247,241,.82)), url(${background})` }}
    >
      <div className="museum-backdrop-glow" />
      <div className="museum-location-tag">{settingLabel(scene.setting)}</div>
      <div className="cinematic-play" key={scene.id}>
        <div className="museum-road-perspective"><i /><i /><i /></div>
        <BackgroundActors mode={mode} setting={scene.setting} />
        <SceneAction scene={scene} mode={mode} />
        <SceneSpecificBeat scene={scene} mode={mode} />
        <MuseumCharacter person="giulio" pose={scene.giulioPose} />
        <MuseumCharacter person="rebecca" pose={scene.rebeccaPose} />
        <div className="timeline-pips"><span /><span /><span /></div>
      </div>
      <div className="museum-mini-caption"><strong>{scene.title}</strong><small>{shortCaption(scene)}</small></div>
      <div className={`museum-curtain curtain-left ${curtainOpen ? "open" : ""}`} />
      <div className={`museum-curtain curtain-right ${curtainOpen ? "open" : ""}`} />
    </div>
  );
}
