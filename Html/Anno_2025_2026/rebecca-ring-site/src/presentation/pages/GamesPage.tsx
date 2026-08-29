import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject, PointerEvent } from "react";
import gamesContent from "../../store/content/games.json";
import type { AppRoute } from "../../logic/types";
import { RomanticButton } from "../components/RomanticButton";
import { isGameCompleted } from "../../logic/handlers/gameProgressHandler";
import { mainOrchestrator } from "../../logic/mainOrchestrator";
import { VoiceAudioManager } from "../../logic/audio/VoiceAudioManager";
import { runnerDebug } from "../../debug/runnerDebug";
import { runnerConfig } from "../../logic/game/runner/config";
import { giulioVoiceSources, rebeccaVoiceSources } from "../../logic/game/runner/data/commentaryLines";
import { StageAudioHandler } from "../../logic/game/runner/audio/StageAudioHandler";
import { CommentaryHandler, eventDrivenCommentary } from "../../logic/game/runner/handlers/CommentaryHandler";
import { ObjectInteractionHandler } from "../../logic/game/runner/handlers/ObjectInteractionHandler";
import { clampLane, getEventLane, getEventY, isPlayerCollision } from "../../logic/game/runner/handlers/RunnerGeometryHandler";
import { createCommentaryRequest } from "../../logic/game/runner/requests/CommentaryRequest";
import { initialRunnerState } from "../../logic/game/runner/state";
import { audioTracks, clearPortaSusaEventMemory, getZone, runnerEvents } from "../../logic/game/runner/tracks/trackRegistry";
import type { CommentaryTrigger, PendingCommentaryRequest, ResolvedCommentary, RunnerState, RunnerZoneKey } from "../../logic/game/runner/types";

type GamesPageProps = {
  navigate: (route: AppRoute) => void;
};

function useStableInstance<T>(factory: () => T) {
  const instance = useRef<T | null>(null);
  if (instance.current === null) instance.current = factory();
  return instance as MutableRefObject<T>;
}

function isInteractiveCommentary(trigger: CommentaryTrigger) {
  return eventDrivenCommentary.has(trigger) || trigger === "nearRebecca" || trigger === "farFromRebecca";
}

export function GamesPage({ navigate }: GamesPageProps) {
  const [completed, setCompleted] = useState(isGameCompleted());
  const [runner, setRunner] = useState<RunnerState>(initialRunnerState);
  const touchStartX = useRef<number | null>(null);

  const stageAudio = useStableInstance(() => new StageAudioHandler(audioTracks));
  const commentary = useStableInstance(() => new CommentaryHandler());
  const objectInteraction = useStableInstance(() => new ObjectInteractionHandler());
  const giulioVoice = useStableInstance(() => new VoiceAudioManager());
  const rebeccaVoice = useStableInstance(() => new VoiceAudioManager());

  const dialogueBusyRef = useRef(false);
  const dialogueSequenceRef = useRef(0);
  const pendingCommentaryRef = useRef<PendingCommentaryRequest | null>(null);
  const voicePreloadStartedRef = useRef(false);
  const lastPeriodicRequestAtMsRef = useRef(0);
  const runModeRef = useRef(false);

  const zone = getZone(runner.progress);

  const visibleEvents = useMemo(
    () =>
      runnerEvents
        .map((event) => ({ event, y: getEventY(runner.progress, event.at) }))
        .filter(({ y }) => y > -100 && y < 790),
    [runner.progress]
  );

  const rebeccaCloseness = Math.max(0, Math.min(1, (100 - runner.distance) / 100));
  const rebeccaTop = `calc(14% + ${rebeccaCloseness * 64}%)`;
  const rebeccaScale = 0.82 + rebeccaCloseness * 0.22;

  useEffect(() => {
    return () => {
      stageAudio.current.stopAll();
      stopAllVoices();
      giulioVoice.current.dispose();
      rebeccaVoice.current.dispose();
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (["ArrowLeft", "a", "A"].includes(event.key)) {
        event.preventDefault();
        changeLane(-1);
      }

      if (["ArrowRight", "d", "D"].includes(event.key)) {
        event.preventDefault();
        changeLane(1);
      }

      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        setRunMode(true);
      }
    }

    function onKeyUp(event: KeyboardEvent) {
      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        setRunMode(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    if (runner.status !== "running") {
      stageAudio.current.stopAll();
      return;
    }

    stageAudio.current.play(zone.key);
  }, [runner.status, zone.key]);

  useEffect(() => {
    if (runner.status !== "running") return;

    const interval = window.setInterval(() => {
      setRunner((current) => tickRunner(current));
    }, 52);

    return () => window.clearInterval(interval);
  }, [runner.status]);

  function tickRunner(current: RunnerState): RunnerState {
    if (current.status !== "running") return current;

    const nextRunCharge = current.isRunning
      ? Math.min(runnerConfig.maxRunCharge, current.runCharge + 0.018)
      : Math.max(0, current.runCharge - 0.032);
    const progressStep = runnerConfig.baseProgressStep + (current.isRunning ? runnerConfig.runningProgressBaseBonus + nextRunCharge * runnerConfig.runningProgressChargeBonus : 0);
    const nextProgress = current.progress + progressStep;
    const nextZone = getZone(nextProgress);
    const distanceDrift = current.isRunning ? -(0.044 + nextRunCharge * 0.072) : 0.125;
    const minCatchDistance = nextZone.key === "portaSusa" ? 0 : runnerConfig.minCatchDistanceBeforePortaSusa;
    const clampDistance = (value: number) => Math.max(minCatchDistance, Math.min(runnerConfig.failDistance + 10, value));

    let next: RunnerState = {
      ...current,
      progress: nextProgress,
      runCharge: nextRunCharge,
      currentZoneKey: nextZone.key,
      distance: clampDistance(current.distance + distanceDrift)
    };

    if (nextZone.key !== current.currentZoneKey) {
      deferCommentary("zoneStart", nextZone.key, true);
    }

    if (next.distance >= runnerConfig.failDistance) {
      runnerDebug.log("game:fail:distance", { distance: next.distance });
      return {
        ...next,
        status: "failed",
        isRunning: false,
        message: "Rebecca è troppo lontana. A volte devi correre davvero, scemo."
      };
    }

    for (const event of runnerEvents) {
      const hidden = next.hitIds.includes(event.id) || next.collectedIds.includes(event.id);
      if (hidden || !isPlayerCollision(next.progress, event, next.lane)) continue;

      const interaction = objectInteraction.current.recognize(event);
      if (!interaction || interaction.kind === "message") continue;

      const applied = objectInteraction.current.applyInteraction(next, interaction, nextZone.key, clampDistance);
      next = applied.state;
      if (applied.trigger) deferCommentary(applied.trigger, nextZone.key, applied.urgent);

      if (next.mistakes >= 3) {
        runnerDebug.log("game:fail:mistakes", { mistakes: next.mistakes });
        return {
          ...next,
          status: "failed",
          isRunning: false,
          message: "Troppi ostacoli. Rebecca sparisce verso la metro."
        };
      }
    }

    if (next.status === "running" && next.progress >= runnerConfig.totalProgress && next.distance > runnerConfig.winDistance) {
      runnerDebug.log("track:portaSusa:replay", { distance: next.distance });
      const replaying = clearPortaSusaEventMemory({
        ...next,
        progress: runnerConfig.portaSusaReplayStart,
        currentZoneKey: "portaSusa" as RunnerZoneKey,
        portaSusaLoopStarted: true,
        message: "Porta Susa: ci sei, ma Rebecca è ancora avanti. Rifacciamo questo tratto.",
        currentCommentTrigger: undefined,
        lastCommentAt: runnerConfig.portaSusaReplayStart,
        lastCommentAtMs: Date.now()
      });
      deferCommentary("portaSusaLoop", "portaSusa", false);
      return replaying;
    }

    if (next.progress >= runnerConfig.totalProgress && next.distance <= runnerConfig.winDistance && next.status === "running" && next.mistakes < 3) {
      localStorage.setItem("rebecca-affection-total-stage1", String(next.affection));
      mainOrchestrator.dispatch({
        type: "GAME_COMPLETED",
        payload: { completedAt: new Date().toISOString() }
      });
      setCompleted(true);
      runnerDebug.log("game:completed", { affection: next.affection });
      return {
        ...next,
        status: "completed",
        isRunning: false,
        runCharge: 0,
        distance: 0,
        message: "Porta Susa",
        currentCommentTrigger: undefined
      };
    }

    maybeRequestPeriodicCommentary(next, nextZone.key);
    return next;
  }

  function maybeRequestPeriodicCommentary(current: RunnerState, zoneKey: RunnerZoneKey) {
    const now = Date.now();
    if (current.progress - current.lastCommentAt < runnerConfig.periodicProgressGap) return;
    if (now - lastPeriodicRequestAtMsRef.current < runnerConfig.periodicTimeGapMs) return;

    const candidates: CommentaryTrigger[] = [];
    if (current.distance <= 42) candidates.push("nearRebecca");
    if (current.distance >= 108) candidates.push("farFromRebecca");
    if (current.progress >= runnerConfig.totalProgress && current.distance > runnerConfig.winDistance && commentary.current.getTriggerCount("portaSusaLoop") < 3) {
      candidates.push("portaSusaLoop");
    }
    if (zoneKey === "portaSusa" && current.distance <= 46 && commentary.current.getTriggerCount("nearPortaSusa") < 1) {
      candidates.push("nearPortaSusa");
    }
    if (current.isRunning && current.runCharge > 0.72) candidates.push("sprinting");
    if (current.isRunning && commentary.current.getTriggerCount("running") < 4) candidates.push("running");
    if (!current.isRunning && current.runCharge <= 0.05 && current.distance > 82 && commentary.current.getTriggerCount("walkingTooLong") < 3) {
      candidates.push("walkingTooLong");
    }
    if (!current.isRunning && commentary.current.getTriggerCount("walking") < 4) candidates.push("walking");

    const trigger = commentary.current.pickLeastUsedTrigger(candidates);
    if (!trigger) return;
    lastPeriodicRequestAtMsRef.current = now;
    deferCommentary(trigger, zoneKey, false);
  }

  function deferCommentary(trigger: CommentaryTrigger, zoneKey: RunnerZoneKey, urgent: boolean) {
    window.setTimeout(() => requestCommentary(createCommentaryRequest(trigger, zoneKey, urgent)), 0);
  }

  function requestCommentary(request: PendingCommentaryRequest) {
    runnerDebug.commentaryRequest(request);

    if (dialogueBusyRef.current && !request.urgent) {
      runnerDebug.log("commentary:dropped:busy", {
        trigger: request.trigger,
        zoneKey: request.zoneKey,
        reason: "dialogue-slot-busy"
      });
      return;
    }

    if (request.urgent) {
      stopAllVoices();
    }

    const resolved = commentary.current.resolve(request.trigger, request.zoneKey, request.urgent);
    if (!resolved || !resolved.message) return;

    playCommentary(resolved);
  }

  function queueCommentary(request: PendingCommentaryRequest) {
    runnerDebug.log("commentary:dropped:no-delay", {
      trigger: request.trigger,
      zoneKey: request.zoneKey,
      reason: "delayed-commentary-disabled"
    });
    pendingCommentaryRef.current = null;
  }

  async function playCommentary(resolved: ResolvedCommentary) {
    const token = dialogueSequenceRef.current + 1;
    dialogueSequenceRef.current = token;
    dialogueBusyRef.current = true;
    pendingCommentaryRef.current = resolved.urgent ? null : pendingCommentaryRef.current;

    runnerDebug.commentaryStart({ token, id: resolved.line.id, trigger: resolved.trigger });

    setRunner((current) => ({
      ...current,
      message: resolved.message,
      currentCommentTrigger: resolved.trigger,
      commentaryToken: token,
      lastCommentAt: current.progress,
      lastCommentAtMs: Date.now()
    }));

    try {
      if (resolved.line.giulioAudio) {
        runnerDebug.audioStart({ speaker: "Giulio", source: resolved.line.giulioAudio, token });
        await giulioVoice.current.playAndWait(resolved.line.giulioAudio, { volume: 0.94, interrupt: true });
        runnerDebug.audioEnd({ speaker: "Giulio", source: resolved.line.giulioAudio, token });
      }

      if (dialogueSequenceRef.current !== token) return;

      if (resolved.line.rebeccaAudio) {
        runnerDebug.audioStart({ speaker: "Rebecca", source: resolved.line.rebeccaAudio, token });
        await rebeccaVoice.current.playAndWait(resolved.line.rebeccaAudio, { volume: 0.9, interrupt: true });
        runnerDebug.audioEnd({ speaker: "Rebecca", source: resolved.line.rebeccaAudio, token });
      }
    } finally {
      if (dialogueSequenceRef.current === token) {
        runnerDebug.commentaryEnd({ token, id: resolved.line.id });
        window.setTimeout(() => clearDialogue(token), runnerConfig.dialogueClearDelayMs);
      }
    }
  }

  function clearDialogue(token: number) {
    if (dialogueSequenceRef.current !== token) return;

    setRunner((current) => {
      if (current.commentaryToken !== token || current.status !== "running") return current;
      return {
        ...current,
        message: "",
        currentCommentTrigger: undefined
      };
    });

    window.setTimeout(() => {
      if (dialogueSequenceRef.current !== token) return;
      dialogueBusyRef.current = false;
      pendingCommentaryRef.current = null;
      runnerDebug.log("dialogue-slot:empty", { token });
    }, runnerConfig.dialogueCooldownMs);
  }

  function flushPendingCommentary() {
    // Delayed commentary is intentionally disabled: if a voice is active,
    // normal object/pickup commentary is dropped instead of played late.
    pendingCommentaryRef.current = null;
  }

  function stopAllVoices() {
    dialogueSequenceRef.current += 1;
    dialogueBusyRef.current = false;
    pendingCommentaryRef.current = null;
    giulioVoice.current.stop();
    rebeccaVoice.current.stop();
  }

  function prepareVoiceAudio() {
    giulioVoice.current.unlock().catch(() => undefined);
    rebeccaVoice.current.unlock().catch(() => undefined);

    if (!voicePreloadStartedRef.current) {
      voicePreloadStartedRef.current = true;
      giulioVoice.current.preload(giulioVoiceSources).catch(() => undefined);
      rebeccaVoice.current.preload(rebeccaVoiceSources).catch(() => undefined);
    }
  }

  function startRunner() {
    prepareVoiceAudio();
    stopAllVoices();
    commentary.current.reset();
    lastPeriodicRequestAtMsRef.current = 0;
    runModeRef.current = false;
    runnerDebug.gameStart({ route: "stage1" });
    stageAudio.current.play("piazzaStatuto");

    setRunner({
      ...initialRunnerState,
      hitIds: [],
      collectedIds: [],
      status: "running",
      message: "Via! Rebecca è avanti: devi abbassare la distanza.",
      commentaryToken: 0
    });

    deferCommentary("zoneStart", "piazzaStatuto", false);
  }

  function restartRunner() {
    stageAudio.current.stopAll();
    stopAllVoices();
    commentary.current.reset();
    lastPeriodicRequestAtMsRef.current = 0;
    runModeRef.current = false;
    setRunner({ ...initialRunnerState, hitIds: [], collectedIds: [] });
  }

  function changeLane(direction: -1 | 1) {
    setRunner((current) => ({
      ...current,
      lane: clampLane(current.lane + direction)
    }));
  }

  function setRunMode(active: boolean) {
    setRunner((current) => {
      if (current.status !== "running" || current.isRunning === active) return current;

      if (active && !runModeRef.current) {
        runnerDebug.runStart({ progress: current.progress, distance: current.distance });
      }
      if (!active && runModeRef.current) {
        runnerDebug.runStop({ progress: current.progress, distance: current.distance });
      }
      runModeRef.current = active;

      return { ...current, isRunning: active };
    });

    window.setTimeout(() => {
      setRunner((current) => {
        if (current.status !== "running") return current;
        if (dialogueBusyRef.current) return current;
        deferCommentary(active ? "running" : "walking", getZone(current.progress).key, false);
        return current;
      });
    }, 0);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    touchStartX.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const deltaX = event.clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 36) return;
    changeLane(deltaX > 0 ? 1 : -1);
  }

  function handleRunPointerDown(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setRunMode(true);
  }

  function handleRunPointerEnd(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setRunMode(false);
  }

  return (
    <section className="page games-page">
      <div className="game-intro glass">
        <p className="eyebrow">Stage 1</p>
        <h1>{gamesContent.title}</h1>
        <p>
          Primo pezzo del minigioco: inseguimento verticale più lungo tra Piazza Statuto,
          mercato e Porta Susa. Devi chiudere la distanza fino a 0 a Porta Susa: se non la raggiungi, rifai quel tratto pulito, senza caos infinito.
        </p>

        <div className="stage-list compact-stages">
          <span>Piazza Statuto</span>
          <span>Mercato</span>
          <span>Porta Susa</span>
        </div>

        <div className="vertical-runner-shell glass">
          <div className="runner-topbar">
            <div>
              <span className="runner-label">Luogo</span>
              <strong>{zone.name}</strong>
            </div>
            <div>
              <span className="runner-label">Distanza</span>
              <strong>{Math.round(runner.distance)}</strong>
            </div>
            <div>
              <span className="runner-label">Errori</span>
              <strong>{runner.mistakes}/3</strong>
            </div>
            <div>
              <span className="runner-label">Affetto totale</span>
              <strong>{runner.affection}</strong>
            </div>
          </div>

          <div
            className={`vertical-runner runner-${runner.status} zone-${zone.key} ${runner.isRunning ? "runner-fast" : "runner-normal"} ${runner.runCharge > 0.68 ? "runner-sprint" : ""}`}
            style={{ backgroundImage: `url("${zone.image}")` }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <div className="runner-photo-tint" />
            <div className="runner-road" />
            <div className="runner-lane lane-0" />
            <div className="runner-lane lane-1" />
            <div className="runner-lane lane-2" />

            <div className="runner-location-card">
              <strong>{zone.name}</strong>
              <span>{zone.subtitle}</span>
            </div>

            <div className="runner-progress">
              <span style={{ height: `${Math.min(100, (runner.progress / runnerConfig.totalProgress) * 100)}%` }} />
              <span style={{ height: `${Math.min(100, (runner.progress / runnerConfig.totalProgress) * 100)}%` }} />
            </div>

            <div className={`runner-distance-line ${runner.message ? "has-dialogue" : "empty-dialogue"}`}>
              <span>{runner.message}</span>
            </div>

            {visibleEvents.map(({ event, y }) => {
              const eventLane = getEventLane(event, runner.progress);
              const hidden = runner.hitIds.includes(event.id) || runner.collectedIds.includes(event.id);

              if (hidden) return null;

              if (event.kind === "message") {
                return (
                  <div
                    key={event.id}
                    className={`runner-message-bubble runner-lane-pos-${eventLane}`}
                    style={{ top: y }}
                  >
                    {event.message}
                  </div>
                );
              }

              return (
                <div
                  key={event.id}
                  className={`runner-object runner-${event.kind} runner-lane-pos-${eventLane} ${event.moving ? "moving-object" : ""}`}
                  style={{ top: y }}
                  aria-label={event.label}
                >
                  {event.image ? (
                    <span className="runner-poster-image" style={{ backgroundImage: `url("${event.image}")` }} />
                  ) : (
                    <span className="runner-object-icon">{event.icon}</span>
                  )}
                  <small>{event.detail}</small>
                </div>
              );
            })}

            <div
              className={`runner-rebecca ${runner.isRunning ? "rebecca-running" : ""}`}
              style={{ top: rebeccaTop, transform: `translateX(-50%) scale(${rebeccaScale})` }}
            >
              <span className="mini-head ponytail" />
              <span className="mini-body">Rebecca</span>
            </div>

            <div className={`runner-giulio lane-player-${runner.lane} ${runner.isRunning ? "is-dashing" : ""}`}>
              <span className="mini-head messy" />
              <span className="mini-body">Giulio</span>
            </div>

            <div className="runner-background-cameos" aria-hidden="true">
              {zone.key === "piazzaStatuto" && (
                <>
                  <span className="cameo cameo-left">📣 Gesù salva dalla droga</span>
                  <span className="cameo cameo-right">📖 lettura delle Scritture</span>
                </>
              )}
              {zone.key === "market" && (
                <>
                  <span className="cameo trade-left">🧍‍♀️ 🥔🥔🥔 ⇄ 🧭 🧍‍♂️</span>
                  <span className="cameo trade-right">🧑‍🦱 🥔 ⇄ 🎫 🧓</span>
                </>
              )}
              {zone.key === "portaSusa" && (
                <>
                  <span className="cameo cameo-left">🧑‍🍳 Perché corrono?</span>
                  <span className="cameo cameo-right">👨‍💼 Manager in arrivo</span>
                </>
              )}
            </div>

            {runner.status === "tutorial" && (
              <div className="runner-overlay tutorial-overlay">
                <h2>Inseguimento verticale</h2>
                <p>
                  Scorri a sinistra/destra o usa le frecce per cambiare corsia.
                  Tieni premuto <strong>CORRI</strong> per abbassare la distanza: più lo tieni premuto,
                  più Giulio prende ritmo, Rebecca accelera e gli ostacoli arrivano più velocemente.
                </p>
                <p>
                  La <strong>Distanza</strong> parte da 100. Prima di Porta Susa puoi arrivare al massimo a 10:
                  l’ultimo passo fino a 0 può succedere solo lì, quando la raggiungi davvero.
                </p>
                <p>
                  Raccogli <strong>Affetto</strong>: non si azzera, sarà il valore che porterai nei tre
                  momenti del viaggio per convincere Rebecca.
                </p>
                <RomanticButton onClick={startRunner}>Inizia a correre</RomanticButton>
              </div>
            )}

            {runner.status === "failed" && (
              <div className="runner-overlay failed-overlay">
                <h2>Rebecca è scappata</h2>
                <p>{runner.message}</p>
                <RomanticButton onClick={restartRunner}>Riprova</RomanticButton>
              </div>
            )}

            {runner.status === "completed" && (
              <div className="runner-overlay completed-overlay porta-susa-screen">
                <h2>Porta Susa</h2>
              </div>
            )}
          </div>

          <div className="runner-controls" aria-label="Controlli minigioco">
            <button onClick={() => changeLane(-1)} disabled={runner.status !== "running"}>←</button>
            <button
              className={`dash-button ${runner.isRunning ? "is-held" : ""}`}
              onPointerDown={handleRunPointerDown}
              onPointerUp={handleRunPointerEnd}
              onPointerCancel={handleRunPointerEnd}
              onLostPointerCapture={() => setRunMode(false)}
              onContextMenu={(event) => event.preventDefault()}
              disabled={runner.status !== "running"}
            >
              {runner.isRunning ? `CORRI ${Math.round(runner.runCharge * 100)}%` : "TIENI CORRI"}
            </button>
            <button onClick={() => changeLane(1)} disabled={runner.status !== "running"}>→</button>
          </div>

          <div className="runner-footer-actions">
            {completed ? (
              <RomanticButton onClick={() => navigate("/finale")}>Vai al finale sbloccato</RomanticButton>
            ) : (
              <span>Il finale resta bloccato finché non raggiungi davvero Rebecca a Porta Susa.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
