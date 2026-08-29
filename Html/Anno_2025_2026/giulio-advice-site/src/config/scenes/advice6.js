const S = (name) => `/assets-optimized/sprites/advice6/giulio-advice6-${name}.webp`;
const O = (name) => `/assets-optimized/objects/advice6/${name}.webp`;
const P = (name) => `/assets-optimized/sprites/shared/giulio-${name}.webp`;

const scene = {
  id: "advice6", number: "06", title: "Confini reali", location: "Camera — VR",
  background: "/assets-optimized/backgrounds/advice6/background-advice6-bedroom-vr.webp", backgroundFallback: "fallback-bedroom", music: null, sfx: {}, audioSkipped: true,
  layers: [],
  trigger: {
    id: "bed", label: "Sposta il letto", hint: "Giulio non può vedere un centimetro della stanza reale.", asset: O("bed-original-advice6"),
    layout: { desktop: { left: "6.8%", bottom: "2.7%", width: "46.6%", height: "46.6%", z: "14" }, mobile: { left: "-20.9%", bottom: "6.3%", width: "67.9%", height: "39.7%" , rotate: "-0.9deg"} },
    labelLayout: { desktop: { left: "54%", bottom: "80%" }, mobile: { left: "55%", bottom: "88%" } }, visual: "bed",
    postLines: [["No. Il letto ha raggiunto la sua posizione finale e io non approvo ulteriori patch.", "silent-stare"]]
  },
  effects: [],
  props: [
    { id: "wardrobe", label: "Armadio", asset: O("wardrobe-advice6"), action: "nudge", lines: [["Se da quell'armadio esce un secondo letto, chiudo la sessione e dichiaro la stanza proceduralmente generata.", "silent-stare"]], layout: { desktop: { right: "-5.8%", bottom: "-5.7%", width: "26.9%", height: "90.6%", z: "1" }, mobile: { right: "-15.8%", bottom: "6.5%", width: "52.9%", height: "104.1%" , rotate: "-0.5deg"} } },
    { id: "poster", label: "Poster", asset: O("poster-advice6"), action: "nudge", lines: [["Isaac, ascoltami: se da qualche parte hai una R Key, questo sarebbe un momento eccellente per prestarmela.", "neutral"]], layout: { desktop: { left: "6.9%", top: "16.9%", width: "11.9%", height: "29.7%", z: "6" }, mobile: { left: "40.9%", top: "-15.5%", width: "33.1%", height: "47.3%" , rotate: "1.4deg"} } },
    { id: "nightstand", label: "Comodino", asset: O("bedside-table-advice6"), action: "nudge", lines: [["Il comodino è ancora nella stessa posizione. Evento raro: un oggetto con coordinate affidabili.", "neutral"]], layout: { desktop: { left: "37.8%", bottom: "24.3%", width: "12%", height: "24%", z: "10" }, mobile: { left: "16.3%", bottom: "28.9%", width: "32.4%", height: "36%" , rotate: "0.9deg"} } },
    { id: "lamp", label: "Lampada", asset: O("bedroom-lamp-advice6"), action: "bounce", lines: [["La lampada non ha fatto niente. Per oggi la assolvo da ogni sospetto.", "pointing"]], layout: { desktop: { left: "40.2%", bottom: "42%", width: "7%", height: "18%", z: "11" }, mobile: { left: "17%", bottom: "43.3%", width: "19.7%", height: "26.9%" , rotate: "-2deg"} } },
    { id: "pillow", label: "Cuscino", asset: O("pillow-advice6"), action: "bounce", lines: [["Se si sposta anche il cuscino senza preavviso, controllo se la stanza ha attivato una modalità poltergeist.", "silent-stare"]], layout: { desktop: { left: "0.9%", bottom: "45.1%", width: "9.1%", height: "8.3%", z: "26" , rotate: "80.6deg"}, mobile: { left: "71%", bottom: "76.2%", width: "19%", height: "10%" } } },
    { id: "blanket", label: "Coperta", asset: O("blanket-advice6"), action: "nudge", lines: [["La coperta resti dov'è. Ho già abbastanza elementi della scena che praticano il teletrasporto.", "silent-stare"]], layout: { desktop: { left: "-7.3%", bottom: "10.5%", width: "24%", height: "19%", z: "34" }, mobile: { left: "83.9%", bottom: "73.3%", width: "16.2%", height: "7.4%" , rotate: "-1.7deg"} } },
    { id: "rug", label: "Tappeto", asset: O("rug-advice6"), action: "nudge", lines: [["Perfetto, un altro ostacolo reale che il gioco non renderizza come minaccia. Level design ostile.", "annoyed"]], layout: { desktop: { left: "-3.3%", bottom: "-29%", width: "108.1%", height: "56.9%", z: "1" , rotate: "-35.2deg"}, mobile: { left: "32.5%", bottom: "4.3%", width: "52%", height: "16%" } } },
    { id: "slippers", label: "Pantofole", asset: O("slippers-advice6"), action: "bounce", lines: [["Le pantofole sono piccole, innocenti e perfettamente capaci di diventare un boss se non le vedo col visore.", "annoyed"]], layout: { desktop: { left: "86.8%", bottom: "13.2%", width: "9%", height: "9%", z: "15" }, mobile: { left: "44.5%", bottom: "14.1%", width: "14%", height: "8%" } } },
    { id: "controllers", label: "Controller VR", asset: O("vr-controllers-advice6"), action: "bounce", lines: [["Questi sì: strumenti nobili. Tracking, input e responsabilità morale di non lanciarli contro il muro.", "proud"]], layout: { desktop: { right: "33.1%", bottom: "72.4%", width: "10%", height: "14%", z: "15" }, mobile: { right: "11.1%", bottom: "67.7%", width: "15%", height: "11%" } } },
    { id: "headset", label: "Visore VR", asset: O("vr-headset-advice6"), action: "nudge", lines: [["Il visore funziona benissimo. È il mondo fisico che ha deciso di fare modding non autorizzato.", "annoyed"]], layout: { desktop: { right: "26.4%", bottom: "73.9%", width: "9%", height: "11%", z: "15" }, mobile: { right: "22.2%", bottom: "68.7%", width: "14%", height: "9%" } } },
    { id: "clock", label: "Sveglia", asset: O("alarm-clock-advice6"), action: "bounce", lines: [["Ottimo. Anche l'orologio certifica che questa giornata sta degenerando con notevole costanza.", "annoyed"]], layout: { desktop: { left: "43%", bottom: "42.3%", width: "5%", height: "8%", z: "13" }, mobile: { left: "30.1%", bottom: "50.6%", width: "8%", height: "7%" } } },
    { id: "plush", label: "Peluche", asset: O("plush-toy-advice6"), action: "bounce", lines: [["Lui non sposta mobili, non scollega computer e non lancia pesi. Onestamente è il collega migliore finora.", "neutral"]], layout: { desktop: { right: "90.1%", bottom: "28.1%", width: "9%", height: "18%", z: "27" }, mobile: { right: "-6.5%", bottom: "67.6%", width: "13%", height: "15%" } } },
    { id: "vrGrid", label: "Confine VR", asset: O("vr-boundary-grid-advice6"), decorative: true, layout: { desktop: { left: "44.8%", bottom: "4.2%", width: "67.3%", height: "68.4%", z: "8", opacity: ".13" }, mobile: { left: "-27.8%", bottom: "-7.6%", width: "69%", height: "47%", opacity: ".12" } } }
  ],
  mainSequence: [
    { text: "Ma che cazzo... il letto era LÌ.", portrait: P("annoyed"), sprite: S("lifting-headset"), layout: "upright", tone: "impact" },
    { text: "Hai spostato il letto mentre avevo il visore?! Il Boundary non può proteggermi dai mobili che cambiano coordinate nel mondo reale!", portrait: P("angry"), sprite: S("pointing-controller"), layout: "upright" },
    { text: "...", portrait: P("silent-stare"), sprite: S("silent-stare"), layout: "seated", tone: "silent" },
    { text: "Fantastico. Il Meta Quest traccia la stanza meglio di quanto questa stanza rispetti la propria geometria.", portrait: P("annoyed"), sprite: S("pointing-controller"), layout: "upright" },
    { text: "OH— il consiglio! Quasi dimenticavo la missione mentre cercavo di capire se il pavimento fosse ancora canonico.", portrait: P("realisation"), sprite: S("realisation"), layout: "upright", tone: "switch" },
    { text: "Okay! Visore su, dignità temporaneamente offline. Però attenzione: la realtà mista è divertente finché nessuno patcha il mobilio a runtime.", portrait: P("excited"), sprite: S("theatrical"), layout: "upright", tone: "theatrical" },
    { text: "E ora, viandanti del mondo fisico: prossima destinazione!", portrait: P("theatrical"), tone: "theatrical" },
    { text: "Un campanile svetta e indica la via,", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice" },
    { text: "sulla strada che porta alla gelateria!", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice" },
    { text: "Fermati un attimo vicino alla chiesa e guardati intorno,", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice" },
    { text: "il tesoro si avvicina ogni minuto del giorno.", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice" },
    { text: "ECCO LA ROTTA! E, grazie al cielo, non richiede di attraversare un letto comparso fuori dal Boundary.", portrait: P("proud"), tone: "theatrical" },
    { text: "Uff... sì, adesso sono stanco davvero. Tra boulder, pesi e mobilio teletrasportato il mio corpo sta compilando una lista di reclami.", portrait: P("exhausted") },
    { text: "Consiglio consegnato! Caduta pessima, recovery dignitosa. Lo accetto.", portrait: P("proud"), sprite: S("finish"), layout: "upright", tone: "theatrical" },
    { text: "Da questo momento controllo Passthrough, pavimento e posizione del letto come se stessi facendo QA a una build instabile.", portrait: P("suspicious"), sprite: S("lifting-headset"), layout: "upright" },
    { text: "Il visore torna giù soltanto dopo una verifica completa della stanza. Nuova policy aziendale.", portrait: P("exit-grin"), sprite: S("exit"), layout: "exit", tone: "exit" }
  ],
  theme: "bedroom", backgroundStyle: { desktop: { position: "50% 50%", filter: "none" } }, contentScale: { desktop: "1", mobile: ".92" },
  character: {
    initial: { src: S("playing-vr"), layout: "upright" }, hover: { src: S("vr-dodge"), layout: "upright" },
    layouts: {
      upright: { desktop: { left: "75.6%", bottom: "7.3%", width: "25%", height: "68%", z: "21" }, mobile: { left: "61.7%", bottom: "17.9%", width: "54.5%", height: "84.7%" , rotate: "-0.8deg"} },
      seated: { desktop: { left: "52.5%", bottom: "12.4%", width: "28.9%", height: "40.8%", z: "21" }, mobile: { left: "50.7%", bottom: "19.1%", width: "57.4%", height: "48.7%" , rotate: "-0.9deg"} },
      fallen: { desktop: { left: "18%", bottom: "9%", width: "39%", height: "37%", z: "21" }, mobile: { left: "5%", bottom: "16%", width: "52%", height: "30%" } },
      exit: { desktop: { left: "61.5%", bottom: "8.4%", width: "24.7%", height: "64.4%", z: "21" }, mobile: { left: "61.1%", bottom: "14%", width: "60.6%", height: "91.6%" , rotate: "2.2deg"} }
    }
  },
  animation: { type: "bedroomVR", dodgeSprite: S("vr-dodge"), walkSprite: S("walking-backward"), collisionSprite: S("bed-collision"), fallenSprite: S("fallen-on-bed") }
};
export default scene;
