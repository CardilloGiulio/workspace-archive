import Phaser from "phaser";
import { useEffect, useId, useRef } from "react";
import { createRebeccaChaseGame } from "../../logic/game/createRebeccaChaseGame";

type RebeccaChaseGameProps = {
  onCompleted: () => void;
};

export function RebeccaChaseGame({ onCompleted }: RebeccaChaseGameProps) {
  const generatedId = useId().replaceAll(":", "");
  const parentId = `rebecca-game-${generatedId}`;
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    gameRef.current = createRebeccaChaseGame({
      parentId,
      onCompleted
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [parentId, onCompleted]);

  return (
    <section className="game-shell glass">
      <div className="game-toolbar">
        <span>Usa click/tap oppure SPAZIO quando appare un'azione.</span>
        <span>Obiettivo: raggiungi Rebecca senza perdere l’orientamento.</span>
      </div>
      <div id={parentId} className="phaser-host" />
    </section>
  );
}
