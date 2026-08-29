const S = (name) => `/assets-optimized/sprites/advice5/giulio-advice5-${name}.webp`;
const O = (name) => `/assets-optimized/objects/advice5/${name}.webp`;
const P = (name) => `/assets-optimized/sprites/shared/giulio-${name}.webp`;

const scene = {
  id: "advice5", number: "05", title: "Giornata gambe", location: "Training Area",
  background: "/assets-optimized/backgrounds/advice5/background-advice5-training-area.webp", backgroundFallback: "fallback-basement", music: null, sfx: {}, audioSkipped: true,
  layers: [],
  trigger: {
    id: "weight", label: "Rivela il consiglio", hint: "Quel disco non sembra proprio stabile.",
    asset: O("weight-plate-advice5"),
    layout: { desktop: { left: "60.4%", bottom: "57.1%", width: "9%", height: "16%", z: "1" }, mobile: { left: "39.1%", bottom: "53.3%", width: "16%", height: "13%" } },
    labelLayout: { desktop: { left: "50%", bottom: "105%" } }, visual: "weight",
    postLines: [["No, replica annullata. Il mio alluce ha esercitato diritto di veto.", "silent-stare"]]
  },
  effects: [
    { id: "toeImpact", asset: O("toe-impact-advice5"), layout: { desktop: { left: "55.2%", bottom: "38.9%", width: "13%", height: "17%", z: "34" }, mobile: { left: "25.8%", bottom: "41.3%", width: "22%", height: "14%" } } },
    { id: "painStars", asset: O("pain-stars-advice5"), layout: { desktop: { left: "51.7%", top: "36.3%", width: "16%", height: "19.4%", z: "35" }, mobile: { left: "16%", top: "37.1%", width: "35%", height: "24%" } } },
    { id: "floorDust", asset: O("floor-vibration-advice5"), layout: { desktop: { left: "31%", bottom: "5%", width: "30%", height: "18%", z: "16" }, mobile: { left: "20.1%", bottom: "42.2%", width: "43%", height: "14%" } } }
  ],
  props: [
    { id: "bench", label: "Panca", asset: O("workout-bench-advice5"), action: "nudge", lines: [["La panca è innocente. Non allarghiamo questa indagine a tutto l'arredamento sportivo.", "neutral"]], layout: { desktop: { left: "56.1%", bottom: "37.3%", width: "37.8%", height: "33.5%", z: "8" }, mobile: { left: "40.3%", bottom: "39.7%", width: "50.3%", height: "25.1%" , rotate: "-18.3deg"} } },
    { id: "barbell", label: "Bilanciere", asset: O("barbell-advice5"), action: "nudge", lines: [["Il bilanciere resta dove si trova. Oggi gli oggetti pesanti hanno già avuto troppa libertà.", "pointing"]], layout: { desktop: { left: "25%", top: "73.1%", width: "24%", height: "18%", z: "9" }, mobile: { left: "61.4%", top: "31.9%", width: "34%", height: "14%" } } },
    { id: "rack", label: "Rack pesi", asset: O("weight-rack-advice5"), action: "nudge", lines: [["Il rack è in custodia cautelare. Nessun disco si muove senza testimoni.", "pointing"]], layout: { desktop: { right: "81.6%", bottom: "6.5%", width: "18%", height: "44%", z: "9" }, mobile: { right: "-13.5%", bottom: "-20%", width: "49%", height: "63.5%" , rotate: "2.7deg"} } },
    { id: "mat", label: "Tappetino", asset: O("exercise-mat-advice5"), action: "nudge", lines: [["Lui è innocente, morbido e soprattutto incapace di schiacciarmi un dito. Promosso.", "neutral"]], layout: { desktop: { left: "24.3%", bottom: "25.6%", width: "34%", height: "21.4%", z: "5" }, mobile: { left: "73.1%", bottom: "43.8%", width: "40%", height: "13%" } } },
    { id: "water", label: "Acqua", asset: O("water-bottle-advice5"), action: "bounce", lines: [["Acqua? SÌ. E magari anche un ricambio originale per l'alluce, se il distributore lo prevede.", "groaning"]], layout: { desktop: { right: "9.5%", bottom: "25%", width: "6.5%", height: "19.4%", z: "16" }, mobile: { right: "-5.7%", bottom: "45.9%", width: "12.6%", height: "19%" , rotate: "0.4deg"} } },
    { id: "towel", label: "Asciugamano", asset: O("workout-towel-advice5"), action: "nudge", lines: [["Ah, l'asciugamano: straordinario contro il sudore, sorprendentemente inefficace contro venti chili sul piede.", "silent-stare"]], layout: { desktop: { right: "65.8%", top: "26.1%", width: "7%", height: "22%", z: "13" }, mobile: { right: "68.9%", top: "4.6%", width: "19.4%", height: "30%" , rotate: "-2.1deg"} } },
    { id: "timer", label: "Timer", asset: O("workout-timer-advice5"), action: "bounce", lines: [["Ferma pure il timer. Il record di oggi è «ancora cosciente dopo quattro scene».", "pointing"]], layout: { desktop: { left: "46.2%", top: "48.5%", width: "6%", height: "11%", z: "14" }, mobile: { left: "1.8%", top: "70.4%", width: "17.6%", height: "15.8%" , rotate: "1.1deg"} } },
    { id: "mirror", label: "Specchio", asset: O("mirror-advice5-basement"), action: "nudge", lines: [["Magnifico. Adesso anche il mio riflesso può assistere al momento in cui perdo contro un disco di ghisa.", "annoyed"]], layout: { desktop: { left: "4%", top: "12%", width: "12%", height: "38%", z: "7" }, mobile: { left: "13.5%", top: "22.5%", width: "17%", height: "30%" } } },
    { id: "shaker", label: "Shaker", asset: O("protein-shaker-advice5"), action: "bounce", lines: [["Lo shaker dopo. Prima recuperiamo mobilità, poi discutiamo seriamente di proteine.", "groaning"]], layout: { desktop: { right: "13.3%", bottom: "23.8%", width: "7.4%", height: "18.5%", z: "15" }, mobile: { right: "2.8%", bottom: "48.4%", width: "9%", height: "12%" } } },
    { id: "band", label: "Elastico", asset: O("resistance-band-advice5"), action: "nudge", lines: [["No, niente round bonus. Il corpo chiede recupero e, per una volta, ascoltiamo la documentazione.", "pointing"]], layout: { desktop: { right: "12%", bottom: "4%", width: "10%", height: "15%", z: "12" }, mobile: { right: "6%", bottom: "11%", width: "16%", height: "12%" } } },
    { id: "pullup", label: "Sbarra", asset: O("pullup-bar-advice5"), action: "nudge", lines: [["La sbarra può aspettare. Oggi ho già abbastanza muscoli che stanno scrivendo recensioni negative.", "pointing"]], layout: { desktop: { left: "34%", top: "8%", width: "25%", height: "14%", z: "8" }, mobile: { left: "27%", top: "11.5%", width: "37.7%", height: "11.2%" , rotate: "7.6deg"} } }
  ],
  mainSequence: [
    { text: "AH— CAZZO! ...Okay. No. Quello ha centrato l'alluce con precisione militare.", portrait: P("angry"), sprite: S("hopping"), layout: "upright", tone: "impact", keepEffects: ["painStars"] },
    { text: "Chi sposta un peso mentre qualcuno si sta allenando?! Questa è una palestra, non un evento casuale di Mario Kart!", portrait: P("angry"), sprite: S("pointing"), layout: "upright" },
    { text: "...", portrait: P("silent-stare"), sprite: S("silent-stare"), layout: "upright", tone: "silent" },
    { text: "Perfetto. Alluce in sciopero, allenamento sospeso e io che improvvisamente rivaluto con affetto il masso di prima.", portrait: P("annoyed"), sprite: S("pointing"), layout: "upright" },
    { text: "Aspetta— il consiglio! Bene. Prima che il piede invii formalmente le dimissioni.", portrait: P("realisation"), sprite: S("realisation"), layout: "upright", tone: "switch" },
    { text: "Okay! Zoppico, sì, ma la missione continua. E se devo soffrire, almeno soffrirò con una presentazione degna.", portrait: P("excited"), sprite: S("theatrical"), layout: "upright", tone: "theatrical" },
    { text: "Occhi qui: questa tappa ha il diritto di essere annunciata come una vera avventura.", portrait: P("theatrical"), tone: "theatrical" },
    { text: "Vola verso l'Isola che non c'è con la fantasia,", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice" },
    { text: "questo posto ha il nome di chi non vuol crescere mai, mamma mia!", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice" },
    { text: "Cerca il bimbo che vola e non ha mai paura,", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice" },
    { text: "lì continua la tua grande avventura.", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice" },
    { text: "ECCOLA! Direzione chiarissima: niente interpretazioni astruse, niente allegorie petrarchesche. Seguite il bambino che vola.", portrait: P("proud"), tone: "theatrical" },
    { text: "Uff... okay, adesso la stanchezza delle ultime tappe sta presentando il conto. Però siamo oltre metà: si continua.", portrait: P("exhausted"), tone: "normal" },
    { text: "Consiglio consegnato! Il piede, invece, riceverà assistenza tecnica appena possibile.", portrait: P("proud"), sprite: S("finish"), layout: "upright", tone: "theatrical" },
    { text: "Per oggi i pesi hanno vinto abbastanza incontri. Li lasciamo festeggiare da soli.", portrait: P("suspicious"), sprite: S("weight-slip"), layout: "upright" },
    { text: "Io procedo con una ritirata tattica leggermente zoppicante. Voi avanti!", portrait: P("exit-grin"), sprite: S("exit"), layout: "exit", tone: "exit" }
  ],
  theme: "basement", backgroundStyle: { desktop: { position: "50% 50%", filter: "none" } }, contentScale: { desktop: "1", mobile: ".92" },
  character: {
    initial: { src: S("workout"), layout: "workout" }, hover: { src: S("adjusting-weight"), layout: "upright" },
    layouts: {
      workout: { desktop: { left: "59.5%", bottom: "50.8%", width: "23.4%", height: "20.6%", z: "20" , rotate: "-29.7deg"}, mobile: { left: "27.1%", bottom: "48.9%", width: "44.8%", height: "23.9%" , rotate: "-31deg"} },
      upright: { desktop: { left: "52.8%", bottom: "39.1%", width: "15.2%", height: "41.8%", z: "21" }, mobile: { left: "14.7%", bottom: "38.3%", width: "34%", height: "55%" } },
      exit: { desktop: { left: "48.4%", bottom: "38%", width: "19.1%", height: "49.7%", z: "21" }, mobile: { left: "-9.7%", bottom: "41.2%", width: "57.9%", height: "89.4%" , rotate: "-6.3deg"} }
    }
  },
  animation: { type: "basementWeight", impactSprite: S("toe-impact"), slipSprite: S("weight-slip"), hopSprite: S("hopping") }
};
export default scene;
