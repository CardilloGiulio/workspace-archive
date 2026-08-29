const S = (name) => `/assets-optimized/sprites/advice4/giulio-advice4-${name}.webp`;
const O = (name) => `/assets-optimized/objects/advice4/${name}.webp`;
const P = (name) => `/assets-optimized/sprites/shared/giulio-${name}.webp`;
const tanjiroPortrait = O("tanjiro-advice4-dialogue");

const scene = {
  id: "advice4",
  number: "04",
  title: "Allenamento interrotto",
  location: "Giardino — Allenamento",
  background: "/assets-optimized/backgrounds/advice4/background-advice4-garden-duel.webp",
  backgroundFallback: "fallback-garden",
  music: null,
  sfx: {},
  audioSkipped: true,
  preload: [
    S("katana-idle"), S("katana-guard"), S("katana-slash"), S("fight-grin"),
    S("rock-impact"), S("ko-ground"), S("stand-dazed"), S("advice-realisation"),
    S("advice-presenter"), S("return-fight"),
    O("tanjiro-advice4-idle"), O("tanjiro-advice4-dash"), O("tanjiro-advice4-slash"),
    O("tanjiro-advice4-guard"), O("tanjiro-advice4-recover"), O("tanjiro-advice4-pause"), tanjiroPortrait
  ],
  layers: [
    {
      id: "fightAtmosphere",
      src: "/assets-optimized/backgrounds/advice4/overlay-advice4-fight-atmosphere.webp",
      alt: "Polvere sollevata durante l'allenamento",
      layout: {
        desktop: { left: "37%", bottom: "10%", width: "32%", height: "38%", opacity: ".24", z: "7" },
        mobile: { left: "31%", bottom: "17%", width: "44%", height: "30%", opacity: ".2" }
      }
    }
  ],
  trigger: {
    id: "rockButton",
    label: "Rivela il consiglio",
    hint: "Il combattimento sembra andare fin troppo bene.",
    render: "css",
    layout: {
      desktop: { left: "46.4%", bottom: "10.4%", width: "94px", height: "62px", anchorX: "-50%", z: "45" },
      mobile: { bottom: "10%", width: "78px", height: "54px" }
    },
    labelLayout: {
      desktop: { left: "50%", bottom: "112%", maxWidth: "190px" },
      mobile: { bottom: "112%", fontSize: ".67rem" }
    },
    visual: "rock-button",
    postLines: [["No. Un masso basta e avanza per questa sessione. Il bis è ufficialmente cancellato.", "annoyed"]]
  },
  effects: [
    { id: "fallingRock", asset: O("rock-falling-advice4"), layout: { desktop: { left: "24.6%", top: "31.9%", width: "18%", height: "30%", z: "36" }, mobile: { left: "9.9%", top: "49.2%", width: "30%", height: "25%" } } },
    { id: "rockDust", asset: O("rock-impact-dust-advice4"), layout: { desktop: { left: "18.4%", bottom: "6%", width: "43%", height: "36%", z: "34" }, mobile: { left: "2%", bottom: "8%", width: "60%", height: "31%" } } },
    { id: "clash", asset: O("katana-clash-advice4"), layout: { desktop: { left: "40.8%", top: "46.6%", width: "8%", height: "13%", z: "34" }, mobile: { left: "41.5%", top: "56.3%", width: "13%", height: "10%" } } },
    { id: "swordArc", asset: O("sword-arc-advice4"), layout: { desktop: { left: "30.2%", top: "40.5%", width: "24%", height: "22%", z: "32" , rotate: "55deg"}, mobile: { left: "30.7%", top: "57.5%", width: "34%", height: "18%" } } },
    { id: "dashDust", asset: O("dash-dust-advice4"), layout: { desktop: { left: "55%", bottom: "8%", width: "22%", height: "16%", z: "16" }, mobile: { left: "55.4%", bottom: "27.3%", width: "32%", height: "12%" } } },
    { id: "ko", asset: O("ko-zero-advice4"), layout: { desktop: { left: "27.3%", top: "23.6%", width: "46.7%", height: "43.2%", z: "43" }, mobile: { left: "6.1%", top: "16.5%", width: "94.9%", height: "43.1%" , rotate: "8.7deg"} } }
  ],
  props: [
    {
      id: "boulder", label: "MASSO DI UROKODAKI", asset: O("boulder-urokodaki-advice4"), action: "nudge",
      lines: [["Tu resta esattamente lì. Urokodaki ti ha già dato abbastanza presenza scenica per oggi.", "annoyed"]],
      dialogue: [
        { text: "Tu resta esattamente lì. Urokodaki ti ha già dato abbastanza presenza scenica per oggi.", portrait: P("annoyed"), speaker: "GIULIO", sprite: S("stand-dazed"), layout: "upright" },
        { text: "Quel masso... mi ricorda l'allenamento del maestro Urokodaki.", portrait: tanjiroPortrait, speaker: "TANJIRO" }
      ],
      layout: { desktop: { left: "33.9%", bottom: "16.3%", width: "26%", height: "44%", z: "5", opacity: ".94" }, mobile: { left: "22.7%", bottom: "18.9%", width: "55.3%", height: "51.2%" , rotate: "-3deg"} }
    },
    {
      id: "tanjiroFighter", label: "Tanjiro", asset: O("tanjiro-advice4-idle"), decorative: true,
      layout: { desktop: { right: "28.4%", bottom: "4.4%", width: "25%", height: "64%", z: "19" }, mobile: { right: "6.7%", bottom: "1.7%", width: "42.3%", height: "58.9%" , rotate: "-1.8deg"} }
    },
    {
      id: "hpGiulio", label: "Barra vita di Giulio", asset: O("ui-hp-giulio-advice4"), action: "nudge",
      lines: [["Piena. Per ora. Guardala bene: è il «prima» della dimostrazione.", "smug"], ["Zero. Sì, lo vedo anch'io. Il masso ha presentato argomentazioni molto convincenti.", "annoyed"]],
      layout: { desktop: { left: "-31.6%", top: "9%", width: "91.6%", height: "24.2%", z: "38" }, mobile: { left: "-15.2%", top: "6.6%", width: "95.8%", height: "14.9%" , rotate: "-0.1deg"} }
    },
    {
      id: "hpTanjiro", label: "Barra vita di Tanjiro", asset: O("ui-hp-tanjiro-advice4"), action: "nudge",
      lines: [["La sua è ancora piena. Certo che lo è. Respira come se avesse letto il manuale della vita.", "annoyed"]],
      layout: { desktop: { right: "-33.8%", top: "9%", width: "94.5%", height: "25.1%", z: "38" }, mobile: { right: "-18%", top: "1.9%", width: "102.5%", height: "16%" , rotate: "-0.7deg"} }
    },
    {
      id: "sabito", label: "Figura nascosta", asset: O("sabito-hidden-advice4"), action: "fade",
      dialogue: [
        { text: "Aspetta— Sabito?! Perfetto, mancava solo il revisore ufficiale dell'allenamento. E naturalmente tocchi e sparisce.", portrait: P("fourth-wall"), speaker: "GIULIO" },
        { text: "Sabito...?", portrait: tanjiroPortrait, speaker: "TANJIRO" }
      ],
      lines: [["Aspetta— Sabito?! Perfetto, mancava solo il revisore ufficiale dell'allenamento.", "fourth-wall"]],
      layout: { desktop: { left: "1.2%", bottom: "3.1%", width: "8%", height: "28%", z: "8", opacity: ".18" }, mobile: { left: "-1.9%", bottom: "18.9%", width: "17.6%", height: "30.2%" , rotate: "0.6deg"} }
    },
    {
      id: "makomo", label: "Figura nascosta", asset: O("makomo-hidden-advice4"), action: "fade",
      dialogue: [
        { text: "MAKOMO! Finalmente qualcuno del mio main roster. ...E sparisce appena la tocchi. Questa scena mi sta prendendo personalmente.", portrait: P("fourth-wall"), speaker: "GIULIO" },
        { text: "Makomo...?", portrait: tanjiroPortrait, speaker: "TANJIRO" }
      ],
      lines: [["MAKOMO! Finalmente qualcuno del mio main roster. Questa apparizione ha automaticamente la mia approvazione.", "fourth-wall"]],
      layout: { desktop: { right: "4.5%", bottom: "2.2%", width: "7%", height: "26%", z: "8", opacity: ".18" }, mobile: { right: "-8.2%", bottom: "20.6%", width: "22.1%", height: "38.6%" , rotate: "0.4deg"} }
    }
  ],
  preludeSequence: [
    { text: "OH, QUELLO SÌ! Tanjiro, più forte! Se devo sentire i muscoli bruciare, almeno facciamolo per bene!", portrait: P("excited"), speaker: "GIULIO", tone: "impact" },
    { text: "Va bene! Ma non abbassare la guardia, Giulio!", portrait: tanjiroPortrait, speaker: "TANJIRO" },
    { text: "Non rallentare. Il fiato regge ancora e io voglio capire fin dove riesco a spingermi.", portrait: P("excited"), speaker: "GIULIO" },
    { text: "Respira! Se ti irrigidisci, il prossimo colpo ti sbilancia!", portrait: tanjiroPortrait, speaker: "TANJIRO" },
    { text: "Sei più forte di me, parecchio. È esattamente il motivo per cui non voglio fermarmi. Dai, Tanjiro: fammi lavorare!", portrait: P("excited"), speaker: "GIULIO", tone: "impact" },
    { text: "Anch'io devo diventare più forte. Se vuoi continuare, non mi tirerò indietro!", portrait: tanjiroPortrait, speaker: "TANJIRO" },
    { text: "SÌ! Così! Ancora! Se domani non riesco ad alzare le braccia, sapremo di aver fatto un ottimo lavoro.", portrait: P("excited"), speaker: "GIULIO" },
    { text: "Ancora! Guarda il movimento prima della lama!", portrait: tanjiroPortrait, speaker: "TANJIRO" }
  ],
  mainSequence: [
    { text: "—MA CHE CAZZO—?!", portrait: P("angry"), speaker: "GIULIO", sprite: S("rock-impact"), layout: "impact", tone: "impact", keepEffects: ["rockDust", "ko"] },
    { text: "GIULIO!", portrait: tanjiroPortrait, speaker: "TANJIRO", keepEffects: ["rockDust", "ko"] },
    { text: "Giulio! Rispondimi! Ti sei fatto male?!", portrait: tanjiroPortrait, speaker: "TANJIRO", sprite: S("ko-ground"), layout: "ground", keepEffects: ["ko"] },
    { text: "...Ahia.", portrait: P("groaning"), speaker: "GIULIO", sprite: S("stand-dazed"), layout: "upright" },
    { text: "Aspetta, non alzarti così in fretta. Controlla prima se riesci a muoverti.", portrait: tanjiroPortrait, speaker: "TANJIRO" },
    { text: "Chi ha deciso di aggiungere il masso di Urokodaki come attacco ambientale?! Questa non era nella movelist!", portrait: P("angry"), speaker: "GIULIO", sprite: S("stand-dazed"), layout: "upright", tone: "impact" },
    { text: "Calmati! Prima assicurati di riuscire a stare in piedi.", portrait: tanjiroPortrait, speaker: "TANJIRO" },
    { text: "Tanjiro, aspetta. Sto bene. Più o meno. E no, non abbiamo ancora finito.", portrait: P("excited"), speaker: "GIULIO", sprite: S("return-fight"), layout: "fight" },
    { text: "No! Sei appena finito sotto un masso! Non ricominciare subito!", portrait: tanjiroPortrait, speaker: "TANJIRO" },
    { text: "ASPETTA— il consiglio! Stavo davvero per rimettermi in guardia senza ricordarmi perché esiste questa pagina.", portrait: P("realisation"), speaker: "GIULIO", sprite: S("advice-realisation"), layout: "upright", tone: "switch" },
    { text: "Il... consiglio?", portrait: tanjiroPortrait, speaker: "TANJIRO" },
    { text: "Okay! Katane in pausa. Per trenta secondi fingiamo di essere persone responsabili e ascoltiamo la parte importante.", portrait: P("theatrical"), speaker: "GIULIO", sprite: S("advice-presenter"), layout: "upright", tone: "theatrical" },
    { text: "Ah... capisco. Quindi era questo che dovevi fare.", portrait: tanjiroPortrait, speaker: "TANJIRO" },
    { text: "Quando fa caldo è il posto perfetto,", portrait: P("theatrical"), speaker: "GIULIO", sprite: S("advice-presenter"), layout: "upright", tone: "advice" },
    { text: "ci tuffi le idee e ti diverti di certo!", portrait: P("theatrical"), speaker: "GIULIO", sprite: S("advice-presenter"), layout: "upright", tone: "advice" },
    { text: "Per trovare la tappa non devi nuotare,", portrait: P("theatrical"), speaker: "GIULIO", sprite: S("advice-presenter"), layout: "upright", tone: "advice" },
    { text: "ma verso l'acqua blu ti devi avviare.", portrait: P("theatrical"), speaker: "GIULIO", sprite: S("advice-presenter"), layout: "upright", tone: "advice" },
    { text: "ECCOLO! Pulito, preciso, elegante. Quasi quanto una parata perfetta quando non ti cade un masso sulla testa.", portrait: P("proud"), speaker: "GIULIO", tone: "theatrical" },
    { text: "È un indizio molto chiaro.", portrait: tanjiroPortrait, speaker: "TANJIRO" },
    { text: "Okay... le braccia stanno protestando, la schiena ha aperto un ticket e il cranio ha un'opinione. Ma reggo.", portrait: P("exhausted"), speaker: "GIULIO", sprite: S("return-fight"), layout: "fight" },
    { text: "Se sei stanco, fermiamoci. Allenarsi senza riuscire a concentrarsi è pericoloso.", portrait: tanjiroPortrait, speaker: "TANJIRO" },
    { text: "Poi riprendiamo, Tanjiro. In Hinokami Chronicles maino Makomo: non credere che rinunci solo perché qui non ho il tasto parata.", portrait: P("excited"), speaker: "GIULIO", sprite: S("fight-grin"), layout: "fight" },
    { text: "D'accordo. Ma questa volta resta concentrato.", portrait: tanjiroPortrait, speaker: "TANJIRO" },
    { text: "ROUND DUE! Stavolta combattiamo noi due e il masso resta spettatore. Patto semplice.", portrait: P("excited"), speaker: "GIULIO", sprite: S("katana-idle"), layout: "fight", tone: "theatrical" },
    { text: "Va bene! Cominciamo!", portrait: tanjiroPortrait, speaker: "TANJIRO" }
  ],
  theme: "garden",
  backgroundStyle: { desktop: { position: "50% 50%", filter: "none" } },
  contentScale: { desktop: "1", mobile: ".94" },
  character: {
    initial: { src: S("katana-idle"), layout: "fight" },
    hover: null,
    layouts: {
      fight: { desktop: { left: "23.8%", bottom: "6.1%", width: "27%", height: "67%", z: "20" }, mobile: { left: "18.2%", bottom: "18.5%", width: "41%", height: "55%" } },
      impact: { desktop: { left: "17%", bottom: "8%", width: "30%", height: "65%", z: "31" }, mobile: { left: "12.5%", bottom: "20.1%", width: "36.5%", height: "43.2%" , rotate: "-7.8deg"} },
      ground: { desktop: { left: "14%", bottom: "3%", width: "36%", height: "35%", z: "21" }, mobile: { left: "7.2%", bottom: "21.8%", width: "48%", height: "28%" } },
      upright: { desktop: { left: "18%", bottom: "4%", width: "27%", height: "66%", z: "21" }, mobile: { left: "8.9%", bottom: "21%", width: "40%", height: "54%" } }
    }
  },
  animation: {
    type: "gardenRock",
    ambient: "gardenFight",
    giulio: { idle: S("katana-idle"), guard: S("katana-guard"), slash: S("katana-slash"), grin: S("fight-grin"), impact: S("rock-impact"), ko: S("ko-ground") },
    tanjiro: { idle: O("tanjiro-advice4-idle"), dash: O("tanjiro-advice4-dash"), slash: O("tanjiro-advice4-slash"), guard: O("tanjiro-advice4-guard"), recover: O("tanjiro-advice4-recover"), pause: O("tanjiro-advice4-pause") }
  }
};

export default scene;
