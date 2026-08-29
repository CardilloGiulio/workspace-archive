import { RomanticButton } from "./RomanticButton";
import type { AppRoute } from "../../logic/types";
import finalContent from "../../store/content/final.json";

type LockedPanelProps = {
  navigate: (route: AppRoute) => void;
};

export function LockedPanel({ navigate }: LockedPanelProps) {
  return (
    <section className="locked-card">
      <div className="lock-icon">🔒</div>
      <h1>{finalContent.lockedTitle}</h1>
      <p>{finalContent.lockedText}</p>
      <RomanticButton onClick={() => navigate("/giochi")}>
        Vai al minigioco
      </RomanticButton>
    </section>
  );
}
