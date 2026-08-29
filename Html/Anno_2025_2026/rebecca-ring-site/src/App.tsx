import { useEffect, useMemo, useState } from "react";
import { HomePage } from "./presentation/pages/HomePage";
import { GamesPage } from "./presentation/pages/GamesPage";
import { FinalPage } from "./presentation/pages/FinalPage";
import { SecretMuseumPage } from "./presentation/pages/SecretMuseumPage";
import { NavBar } from "./presentation/components/NavBar";
import { mainOrchestrator } from "./logic/mainOrchestrator";
import type { AppRoute } from "./logic/types";
import { addSecretMuseumUnlockListener, isSecretMuseumUnlocked } from "./logic/secret/SecretUnlockHandler";

function normalisePath(pathname: string): AppRoute {
  if (pathname.startsWith("/giochi")) return "/giochi";
  if (pathname.startsWith("/finale")) return "/finale";
  if (pathname.startsWith("/museo")) return "/museo";
  return "/";
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() =>
    normalisePath(window.location.pathname)
  );
  const [secretMuseumUnlocked, setSecretMuseumUnlocked] = useState(() =>
    isSecretMuseumUnlocked()
  );

  const navigate = useMemo(
    () => (nextRoute: AppRoute) => {
      window.history.pushState({}, "", nextRoute);
      setRoute(nextRoute);
      mainOrchestrator.dispatch({
        type: "PAGE_OPENED",
        payload: { route: nextRoute }
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  useEffect(() => {
    const removeSecretListener = addSecretMuseumUnlockListener(() =>
      setSecretMuseumUnlocked(true)
    );
    const onPopState = () => setRoute(normalisePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);

    mainOrchestrator.dispatch({
      type: "PAGE_OPENED",
      payload: { route }
    });

    return () => {
      removeSecretListener();
      window.removeEventListener("popstate", onPopState);
    };
  }, [route]);

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <NavBar
        route={route}
        navigate={navigate}
        secretMuseumUnlocked={secretMuseumUnlocked}
        onSecretMuseumUnlocked={() => setSecretMuseumUnlocked(true)}
      />

      <main>
        {route === "/" && <HomePage navigate={navigate} />}
        {route === "/giochi" && <GamesPage navigate={navigate} />}
        {route === "/finale" && <FinalPage navigate={navigate} />}
        {route === "/museo" && <SecretMuseumPage navigate={navigate} />}
      </main>
    </div>
  );
}
