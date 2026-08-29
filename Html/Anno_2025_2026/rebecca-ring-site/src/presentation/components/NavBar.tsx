import type { AppRoute } from "../../logic/types";
import { isGameCompleted } from "../../logic/handlers/gameProgressHandler";
import { registerSecretMuseumClick } from "../../logic/secret/SecretUnlockHandler";

type NavBarProps = {
  route: AppRoute;
  navigate: (route: AppRoute) => void;
  secretMuseumUnlocked: boolean;
  onSecretMuseumUnlocked: () => void;
};

export function NavBar({ route, navigate, secretMuseumUnlocked, onSecretMuseumUnlocked }: NavBarProps) {
  const completed = isGameCompleted();

  const handleBrandClick = () => {
    const unlockedNow = registerSecretMuseumClick();
    if (unlockedNow) {
      onSecretMuseumUnlocked();
      navigate("/museo");
      return;
    }

    navigate("/");
  };

  return (
    <header className="nav-wrap">
      <button className="brand" onClick={handleBrandClick} title="GR">
        <span className="brand-mark">GR</span>
        <span>20/05/2026</span>
      </button>

      <nav className="nav-links" aria-label="Navigazione principale">
        <button
          className={route === "/" ? "active" : ""}
          onClick={() => navigate("/")}
        >
          Presentazione
        </button>
        <button
          className={route === "/giochi" ? "active" : ""}
          onClick={() => navigate("/giochi")}
        >
          Minigioco
        </button>
        <button
          className={route === "/finale" ? "active" : ""}
          onClick={() => navigate("/finale")}
          title={completed ? "Finale sbloccato" : "Completa il minigioco"}
        >
          Finale {completed ? "✨" : "🔒"}
        </button>
        {secretMuseumUnlocked && (
          <button
            className={route === "/museo" ? "active" : ""}
            onClick={() => navigate("/museo")}
            title="Archivio segreto sbloccato"
          >
            Museo 🎭
          </button>
        )}
      </nav>
    </header>
  );
}
