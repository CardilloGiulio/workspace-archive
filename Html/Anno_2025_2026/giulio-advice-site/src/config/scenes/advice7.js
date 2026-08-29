const S = (name) => `/assets-optimized/sprites/advice7/giulio-advice7-${name}.webp`;
const O = (name) => `/assets-optimized/objects/advice7/${name}.webp`;
const P = (name) => `/assets-optimized/sprites/shared/giulio-${name}.webp`;

const scene = {
  id: "advice7", number: "07", title: "Colazione sacrificata", location: "Bar — Colazione",
  background: "/assets-optimized/backgrounds/advice7/background-advice7-bar-interior.webp", backgroundFallback: "fallback-bar", music: null, sfx: {}, audioSkipped: true,
  layers: [
    {
      id: "morningLight",
      src: "/assets-optimized/backgrounds/advice7/overlay-advice7-morning-light.webp",
      alt: "Luce del mattino nel bar",
      layout: {
        desktop: { right: "-4%", top: "-8%", width: "46%", height: "64%", opacity: ".18", z: "4" },
        mobile: { right: "-12%", top: "-5%", width: "62%", height: "52%", opacity: ".15" }
      }
    }
  ],
  trigger: {
    id: "coffee", label: "Rivela il consiglio", hint: "Una tazzina piena, vicinissima al bordo. Ottima idea.", asset: O("coffee-full-advice7"),
    layout: { desktop: { left: "25.4%", bottom: "24.4%", width: "5.7%", height: "9.2%", z: "27" }, mobile: { left: "18.8%", bottom: "35.1%", width: "13%", height: "11%" } },
    labelLayout: { desktop: { left: "50%", bottom: "110%" } }, visual: "coffee",
    postLines: [["Vuoto. Caduto nell'adempimento del proprio dovere produttivo. Un minuto di silenzio.", "silent-stare"]]
  },
  hidePropsOnStart: ["steam"],
  effects: [
    { id: "splash", asset: O("coffee-splash-advice7"), layout: { desktop: { left: "27.4%", top: "73.2%", width: "7.1%", height: "9.1%", z: "34" }, mobile: { left: "31%", top: "49%", width: "39%", height: "28%" } } },
    { id: "droplets", asset: O("coffee-droplets-advice7"), layout: { desktop: { left: "28.7%", top: "70.5%", width: "8.6%", height: "10.6%", z: "35" }, mobile: { left: "28%", top: "43%", width: "48%", height: "34%" } } },
    { id: "stain", asset: O("coffee-stain-advice7"), layout: { desktop: { left: "33%", bottom: "20.5%", width: "5.1%", height: "6.4%", z: "29" }, mobile: { left: "32.1%", bottom: "27.1%", width: "22.2%", height: "15.7%" , rotate: "-5.8deg"} } }
  ],
  props: [
    { id: "table", label: "Tavolo", asset: O("bar-table-advice7"), decorative: true, layout: { desktop: { left: "63.1%", bottom: "-31.8%", width: "57%", height: "34%", z: "10" }, mobile: { left: "-19.9%", bottom: "19.3%", width: "64.5%", height: "22.9%" , rotate: "-0.5deg"} } },
    { id: "plate", label: "Piatto", asset: O("breakfast-plate-advice7"), action: "nudge", lines: [["Il piatto è salvo. Piccola vittoria, ma oggi celebriamo anche quelle.", "proud"]], layout: { desktop: { left: "12.5%", bottom: "25.2%", width: "12%", height: "8%", z: "21" }, mobile: { left: "0.7%", bottom: "36.4%", width: "18%", height: "7%" } } },
    { id: "croissant", label: "Cornetto", asset: O("croissant-advice7"), action: "bounce", lines: [["Il cornetto è l'ultimo vero sopravvissuto della colazione. Proteggetelo.", "proud"]], layout: { desktop: { left: "13.5%", bottom: "24.7%", width: "12.5%", height: "8.3%", z: "23" }, mobile: { left: "6.7%", bottom: "37.7%", width: "14%", height: "5%" } } },
    { id: "spoon", label: "Cucchiaino", asset: O("coffee-spoon-advice7"), action: "nudge", lines: [["Lascialo lì. Quel cucchiaino ha assistito a abbastanza tragedia per una mattina.", "silent-stare"]], layout: { desktop: { left: "21.7%", bottom: "13.3%", width: "5%", height: "7%", z: "22" , rotate: "-40.4deg"}, mobile: { left: "77.5%", bottom: "37.5%", width: "8%", height: "6%" } } },
    { id: "sugar", label: "Zucchero", asset: O("sugar-bowl-advice7"), action: "bounce", lines: [["Altro zucchero? No. A questo punto non mi serve dolcezza, mi serve che il caffè resti nel bicchiere.", "annoyed"]], layout: { desktop: { left: "19.2%", bottom: "9.8%", width: "7%", height: "9%", z: "22" }, mobile: { left: "75.3%", bottom: "35%", width: "11%", height: "8%" } } },
    { id: "napkin", label: "Tovaglioli", asset: O("napkin-dispenser-advice7"), action: "bounce", lines: [["SÌ. Finalmente un oggetto con una missione chiara: operazione salvataggio camicia.", "excited"]], layout: { desktop: { left: "13.2%", bottom: "7.5%", width: "8%", height: "12%", z: "21" }, mobile: { left: "86.1%", bottom: "32.2%", width: "12%", height: "10%" } } },
    { id: "newspaper", label: "Giornale", asset: O("newspaper-menu-advice7"), action: "nudge", lines: [["Ah, il giornale. Carta asciutta, stabile, non interattiva. In questo momento mi ispira una fiducia enorme.", "neutral"]], layout: { desktop: { left: "0.6%", bottom: "10.2%", width: "15%", height: "10%", z: "18" }, mobile: { left: "47.7%", bottom: "45.2%", width: "14.3%", height: "5%" , rotate: "0.6deg"} } },
    { id: "bell", label: "Campanello", asset: O("service-bell-advice7"), action: "bounce", lines: [["Non suonarlo. Non desidero convocare un pubblico mentre sto negoziando con una macchia di caffè.", "silent-stare"]], layout: { desktop: { right: "31.7%", bottom: "23.7%", width: "8.2%", height: "11%", z: "22" }, mobile: { right: "38.2%", bottom: "40.8%", width: "10%", height: "7%" } } },
    { id: "pastries", label: "Vetrina dolci", asset: O("pastry-display-advice7"), action: "nudge", lines: [["Quella vetrina contiene almeno dodici decisioni migliori di quella che ha portato il caffè sulla mia camicia.", "neutral"]], layout: { desktop: { right: "84.8%", top: "57.4%", width: "24.3%", height: "34.3%", z: "7" }, mobile: { right: "60.2%", top: "43.4%", width: "31%", height: "25%" } } },
    { id: "register", label: "Cassa", asset: O("cash-register-advice7"), action: "nudge", lines: [["Se questa scena termina con un conto per i danni, la considero una microtransazione ostile.", "annoyed"]], layout: { desktop: { right: "20.4%", bottom: "31.7%", width: "12%", height: "15%", z: "16" }, mobile: { right: "10%", bottom: "42.9%", width: "18%", height: "12%" } } },
    { id: "juice", label: "Succo d'arancia", asset: O("orange-juice-advice7"), action: "bounce", lines: [["No, niente sostituzioni creative. Il succo è buono, ma non compila codice al posto della caffeina.", "annoyed"]], layout: { desktop: { left: "74.6%", bottom: "16.9%", width: "6.8%", height: "16.1%", z: "20" }, mobile: { left: "64.5%", bottom: "38.5%", width: "8%", height: "10%" } } },
    { id: "steam", label: "Vapore", asset: O("coffee-steam-advice7"), decorative: true, layout: { desktop: { left: "19.6%", bottom: "29.8%", width: "8%", height: "16%", z: "24", opacity: ".7" }, mobile: { left: "22.2%", bottom: "33.1%", width: "12%", height: "13%" } } }
  ],
  mainSequence: [
    { text: "CAZZO— il caffè!", portrait: P("angry"), sprite: S("soaked-freeze"), layout: "seated", tone: "impact", keepEffects: ["stain"] },
    { text: "Era il primo caffè della giornata che stava svolgendo correttamente il suo compito: tenermi produttivo. Durata operativa: trenta secondi.", portrait: P("annoyed"), sprite: S("pointing-napkin"), layout: "seated", keepEffects: ["stain"] },
    { text: "Okay... respira. La caffeina è caduta in servizio, ma il progetto è ancora vivo.", portrait: P("annoyed"), keepEffects: ["stain"] },
    { text: "ASPETTA— il consiglio! Bene. La missione ha ancora più uptime del mio caffè.", portrait: P("realisation"), sprite: S("realisation"), layout: "seated", tone: "switch", keepEffects: ["stain"] },
    { text: "Perfetto! Colazione sacrificata, camicia reinterpretata artisticamente... ora però attenzione, perché questa tappa conta.", portrait: P("excited"), sprite: S("theatrical"), layout: "upright", tone: "theatrical", keepEffects: ["stain"] },
    { text: "Signore e signori, siamo alla penultima fermata. Che entri in scena l'indizio!", portrait: P("theatrical"), tone: "theatrical", keepEffects: ["stain"] },
    { text: "Tra scaffali, carrelli e cose da mangiare,", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice", keepEffects: ["stain"] },
    { text: "in via Castagna ti devi spingere e cercare.", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice", keepEffects: ["stain"] },
    { text: "Vicino al supermercato devi arrivare,", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice", keepEffects: ["stain"] },
    { text: "per scoprire dove l'ultima tappa ti farà andare!", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice", keepEffects: ["stain"] },
    { text: "Eccolo! Preciso, leggibile e soprattutto impossibile da versare sulla camicia. Tecnologia superiore.", portrait: P("proud"), tone: "theatrical", keepEffects: ["stain"] },
    { text: "Uff... sì, mi sto consumando. A questo punto funziono per inerzia, caffeina residua e puro orgoglio narrativo.", portrait: P("exhausted"), keepEffects: ["stain"] },
    { text: "Consiglio consegnato! Caffè perso, avanzamento ottenuto: uno scambio economicamente discutibile, ma efficace.", portrait: P("proud"), sprite: S("finish"), layout: "upright", tone: "theatrical", keepEffects: ["stain"] },
    { text: "Da questo momento ogni bicchiere passa sotto protezione speciale. Nessuno si muove senza autorizzazione.", portrait: P("suspicious"), sprite: S("coffee-croissant"), layout: "seated", keepEffects: ["stain"] },
    { text: "Io salvo quello che resta della colazione. Voi correte verso la penultima tappa!", portrait: P("exit-grin"), sprite: S("exit"), layout: "exit", tone: "exit" }
  ],
  theme: "bar", backgroundStyle: { desktop: { position: "50% 50%", filter: "none" } }, contentScale: { desktop: "1", mobile: ".93" },
  character: {
    initial: { src: S("breakfast"), layout: "seated" }, hover: { src: S("coffee-croissant"), layout: "seated" },
    layouts: {
      seated: { desktop: { left: "21.2%", bottom: "4.2%", width: "27%", height: "56%", z: "20" }, mobile: { left: "11.8%", bottom: "22.5%", width: "65.4%", height: "79.2%" , rotate: "-2.4deg"} },
      upright: { desktop: { left: "22.6%", bottom: "3.1%", width: "27%", height: "68%", z: "21" }, mobile: { left: "20.2%", bottom: "21.4%", width: "56.5%", height: "83.3%" , rotate: "-0.3deg"} },
      exit: { desktop: { left: "29.3%", bottom: "10.3%", width: "16.4%", height: "39.9%", z: "21" }, mobile: { left: "26.5%", bottom: "18.9%", width: "50%", height: "71.7%" , rotate: "-2.7deg"} }
    }
  },
  animation: { type: "barCoffee", impactSprite: S("coffee-impact"), freezeSprite: S("soaked-freeze"), inspectSprite: S("inspecting-stain") }
};
export default scene;
