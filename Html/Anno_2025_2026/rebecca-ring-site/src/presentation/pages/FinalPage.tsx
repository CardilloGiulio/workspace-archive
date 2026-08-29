import { useEffect, useRef, useState } from "react";
import finalContent from "../../store/content/final.json";
import type { AppRoute } from "../../logic/types";
import { isGameCompleted } from "../../logic/handlers/gameProgressHandler";
import { mainOrchestrator } from "../../logic/mainOrchestrator";
import { RomanticButton } from "../components/RomanticButton";
import { LockedPanel } from "../components/LockedPanel";

type FinalPageProps = {
  navigate: (route: AppRoute) => void;
};

const sceneSteps = [
  {
    title: "Accensione playlist",
    lyric: "Prima nota: stonata. Seconda nota: innamorata.",
    giulio: "Rebecca, questa è una serenata culinaria.",
    rebecca: "Scemo, prima non bruciare il pollo.",
    recipe: "accendi la musica"
  },
  {
    title: "Pollo in padella",
    lyric: "Il pollo gira, la cucina canta, Giulio tenta di sembrare affidabile.",
    giulio: "Sto seguendo tutto alla perfezione, credo.",
    rebecca: "Hai appena chiesto al pollo se era pronto.",
    recipe: "gira il pollo"
  },
  {
    title: "Agrodolce strategico",
    lyric: "Salsa, miele, caos: ricetta approvata dalla Oratrice del cuore.",
    giulio: "Serve più agrodolce o più amore?",
    rebecca: "Tutti e due. Ma non mettere le patatine nella padella.",
    recipe: "aggiungi agrodolce"
  },
  {
    title: "Assaggio ufficiale",
    lyric: "Se Rebecca sorride, il piatto ha vinto il suo 50/50.",
    giulio: "È buono?",
    rebecca: "È accettabile. Traduzione: sì, mi piace.",
    recipe: "assaggia senza panico"
  },
  {
    title: "Cena sbloccata",
    lyric: "Due idioti felici, un pollo salvato, una serata da ricordare.",
    giulio: "Alla fine non era proprio quello che avevi chiesto.",
    rebecca: "No. Era meglio.",
    recipe: "mangiate insieme"
  }
];

const recipeItems = [
  "accendi la musica",
  "gira il pollo",
  "aggiungi agrodolce",
  "assaggia senza panico",
  "mangiate insieme"
];

const finalSceneAudioPath = "/audio/final-song.mp3";

export function FinalPage({ navigate }: FinalPageProps) {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const completed = isGameCompleted();
  const currentStep = sceneSteps[stepIndex];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!started) return;

    const interval = window.setInterval(() => {
      setStepIndex((current) => (current + 1) % sceneSteps.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [started]);

  useEffect(() => {
    return () => {
      if (!audioRef.current) return;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  if (!completed) {
    return (
      <section className="page final-page">
        <LockedPanel navigate={navigate} />
      </section>
    );
  }

  async function startScene() {
    setStarted(true);
    setStepIndex(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    const audio = new Audio(finalSceneAudioPath);
    audio.loop = true;
    audio.volume = 0.42;
    audioRef.current = audio;

    try {
      await audio.play();
    } catch {
      // Browser autoplay policies can still interrupt audio in rare cases.
      // The scene remains usable and the user can click the start button again after refresh.
    }

    mainOrchestrator.dispatch({ type: "FINAL_SCENE_STARTED" });
  }

  return (
    <section className="page final-page">
      <div className="final-card glass">
        <p className="eyebrow">Finale sbloccato</p>
        <h1>{finalContent.title}</h1>

        {!started ? (
          <>
            <p>
              Questa scena non parte da sola. Deve iniziare quando Rebecca decide
              che è pronta.
            </p>
            <RomanticButton onClick={startScene}>
              {finalContent.startButton}
            </RomanticButton>
          </>
        ) : (
          <div className={`kitchen-scene kitchen-step-${stepIndex}`} aria-label={finalContent.sceneTitle}>
            <div className="scene-heading-row">
              <div>
                <p className="eyebrow">Scena finale in corso</p>
                <h2>{finalContent.sceneTitle}</h2>
              </div>

              <div className="scene-status" aria-live="polite">
                <span>{stepIndex + 1}/5</span>
                <strong>{currentStep.title}</strong>
              </div>
            </div>

            <div className="kitchen-stage detailed-kitchen">
              <div className="kitchen-wallpaper" />

              <div className="fairy-lights" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="kitchen-window">
                <span className="moon">☾</span>
                <span className="tiny-star star-a">✦</span>
                <span className="tiny-star star-b">✧</span>
                <small>20/05</small>
              </div>

              <div className="memory-shelf">
                <span>GR</span>
                <span>CP1</span>
                <span>🍦</span>
              </div>

              <div className="music-player">
                <span className="music-icon">♫</span>
                <div>
                  <strong>playlist cucina</strong>
                  <small>{currentStep.lyric}</small>
                  <small className="audio-source-note">♪ final-song.mp3 in loop</small>
                </div>
                <div className="equalizer" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="recipe-card-live">
                <strong>Ricetta segreta</strong>
                {recipeItems.map((item, index) => (
                  <span key={item} className={index <= stepIndex ? "done" : ""}>
                    {index <= stepIndex ? "✓" : "○"} {item}
                  </span>
                ))}
              </div>

              <div className="floating-ingredients" aria-hidden="true">
                <span className="ingredient ing-chicken">🍗</span>
                <span className="ingredient ing-sauce">🍯</span>
                <span className="ingredient ing-chocolate">🍫</span>
                <span className="ingredient ing-fries">🍟</span>
                <span className="ingredient ing-icecream">🍦</span>
              </div>

              <div className="music-note note-one">♪</div>
              <div className="music-note note-two">♫</div>
              <div className="music-note note-three">♪</div>
              <div className="music-note note-four">♬</div>

              <div className="character giulio final-character">
                <div className="pixel-head messy">
                  <span className="hair-lock lock-one" />
                  <span className="hair-lock lock-two" />
                  <span className="hair-lock lock-three" />
                </div>
                <div className="pixel-body">WEP</div>
                <div className="character-arm arm-left support-arm"><span className="hand-prop prop-lemon">🍋</span></div>
                <div className="character-arm arm-right cook-arm"><span className="hand-prop prop-spoon">🥄</span></div>
                <div className="speech">{currentStep.giulio}</div>
              </div>

              <div className="counter-top">
                <div className="cutting-board">
                  <span>🥄</span>
                  <span>🍯</span>
                  <span>🍋</span>
                </div>
                <div className="sauce-bottle">agro<br />dolce</div>
                <div className="little-plate">🍟</div>
              </div>

              <div className="stove enhanced-stove">
                <div className="burner-glow" />
                <div className="pan">
                  <span>🍗</span>
                </div>
                <div className="sauce-drop drop-a" />
                <div className="sauce-drop drop-b" />
                <div className="steam steam-a" />
                <div className="steam steam-b" />
                <div className="steam steam-c" />
                <p>pollo in agrodolce</p>
              </div>

              <div className="character rebecca final-character">
                <div className="pixel-head ponytail" />
                <div className="pixel-body">WEP</div>
                <div className="character-arm arm-left point-arm"><span className="hand-prop prop-finger">☝️</span></div>
                <div className="character-arm arm-right snack-arm"><span className="hand-prop prop-icecream">🍦</span></div>
                <div className="speech">{currentStep.rebecca}</div>
              </div>

              <div className="dinner-set" aria-hidden="true">
                <span>🍽️</span>
                <span>🍗</span>
                <span>🍦</span>
              </div>
            </div>

            <div className="dinner-table final-dinner-message">
              <span>🍽️</span>
              <p>{finalContent.finalMessage}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
