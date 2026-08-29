import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { isSecretMuseumUnlocked } from "../../logic/secret/SecretUnlockHandler";
import { MuseumSceneHandler } from "../../logic/secret/handlers/MuseumSceneHandler";
import { MuseumAudioHandler } from "../../logic/secret/handlers/MuseumAudioHandler";
import { museumCategories, type MuseumCategoryId } from "../../store/museum/museumCategories";
import type { MuseumScene } from "../../store/museum/museumScenes";
import type { AppRoute } from "../../logic/types";
import { RomanticButton } from "../components/RomanticButton";
import { MuseumStage } from "../museum/MuseumStage";

const sceneHandler = new MuseumSceneHandler();

type SecretMuseumPageProps = {
  navigate: (route: AppRoute) => void;
};

export function SecretMuseumPage({ navigate }: SecretMuseumPageProps) {
  const audioHandlerRef = useRef<MuseumAudioHandler | null>(null);
  const scenes = sceneHandler.listScenes();
  const [category, setCategory] = useState<MuseumCategoryId>("all");
  const [selectedId, setSelectedId] = useState(sceneHandler.getDefaultScene().id);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedScene = sceneHandler.resolve({ sceneId: selectedId });
  const filteredScenes = useMemo(
    () => scenes.filter((scene) => category === "all" || scene.category === category),
    [category, scenes]
  );

  useEffect(() => {
    audioHandlerRef.current = new MuseumAudioHandler();
    const openTimer = window.setTimeout(() => setCurtainOpen(true), 260);

    return () => {
      window.clearTimeout(openTimer);
      audioHandlerRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    setCurtainOpen(false);
    const timer = window.setTimeout(() => setCurtainOpen(true), 260);
    return () => window.clearTimeout(timer);
  }, [selectedId]);

  if (!isSecretMuseumUnlocked()) {
    return (
      <section className="page museum-page">
        <div className="locked-card glass">
          <div>
            <div className="lock-icon">🎭</div>
            <h1>Archivio chiuso</h1>
            <p>Questo museo non è ancora stato sbloccato.</p>
            <RomanticButton onClick={() => navigate("/")}>Torna alla presentazione</RomanticButton>
          </div>
        </div>
      </section>
    );
  }

  const playSelected = async () => {
    if (!audioHandlerRef.current || isPlaying) return;
    setIsPlaying(true);
    await audioHandlerRef.current.unlockAndPreload();
    await audioHandlerRef.current.playScene(selectedScene);
    setIsPlaying(false);
  };

  const stopSelected = () => {
    audioHandlerRef.current?.stop();
    setIsPlaying(false);
  };

  const selectScene = (sceneId: string) => {
    stopSelected();
    setSelectedId(sceneId);
  };

  return (
    <section className="page museum-page">
      <motion.div
        className="museum-shell glass"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="museum-heading">
          <p className="eyebrow">Archivio segreto</p>
          <h1>Museo delle corse inutilmente romantiche</h1>
          <p>
            Ogni scena è una piccola memoria del minigioco: scegli una battuta,
            apri il sipario e rivedi quel momento in versione mini-teatro.
          </p>
        </div>

        <div className="museum-layout">
          <article className="museum-main">
            <MuseumStage scene={selectedScene} curtainOpen={curtainOpen} />

            <div className="museum-caption-card">
              <div>
                <span>Scena {selectedScene.number}</span>
                <h2>{selectedScene.title}</h2>
                <p>{selectedScene.caption}</p>
              </div>

              <div className="museum-controls">
                <RomanticButton onClick={playSelected} disabled={isPlaying}>
                  {isPlaying ? "In riproduzione..." : "Riproduci voce"}
                </RomanticButton>
                <RomanticButton variant="ghost" onClick={stopSelected}>
                  Ferma
                </RomanticButton>
              </div>
            </div>

            <div className="museum-dialogue-card">
              <p><strong>Giulio:</strong> «{selectedScene.giulioText}»</p>
              {selectedScene.rebeccaText ? (
                <p><strong>Rebecca:</strong> «{selectedScene.rebeccaText}»</p>
              ) : (
                <p className="museum-muted"><strong>Rebecca:</strong> presente in scena, senza battuta audio per questo ricordo.</p>
              )}
            </div>
          </article>

          <aside className="museum-selector" aria-label="Selettore voiceline">
            <div className="museum-category-bar">
              {museumCategories.map((item) => (
                <button
                  key={item.id}
                  className={category === item.id ? "active" : ""}
                  onClick={() => setCategory(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="museum-scene-list">
              {filteredScenes.map((scene) => (
                <button
                  key={scene.id}
                  className={scene.id === selectedId ? "active" : ""}
                  onClick={() => selectScene(scene.id)}
                >
                  <span>{String(scene.number).padStart(2, "0")}</span>
                  <strong>{scene.title}</strong>
                  <small>{scene.rebeccaAudio ? "Giulio + Rebecca" : "Giulio solo"}</small>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
