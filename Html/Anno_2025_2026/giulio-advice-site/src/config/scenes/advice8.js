const S = (name) => `/assets-optimized/sprites/advice8/giulio-advice8-${name}.webp`;
const O = (name) => `/assets-optimized/objects/advice8/${name}.webp`;
const P = (name) => `/assets-optimized/sprites/shared/giulio-${name}.webp`;

const scene = {
  id: "advice8", number: "08", title: "Troppo caldo", location: "Forno a legna",
  background: "/assets-optimized/backgrounds/advice8/background-advice8-wood-fired-oven.webp", backgroundFallback: "fallback-oven", music: null, sfx: {}, audioSkipped: true,
  layers: [],
  trigger: {
    id: "ignition", label: "Accendi il forno", hint: "Giulio è ancora lì dentro a pulire. Che potrebbe mai andare storto?", asset: O("oven-ignition-advice8"),
    layout: { desktop: { right: "17.2%", bottom: "44.6%", width: "11.1%", height: "20.8%", z: "28" }, mobile: { right: "-1%", bottom: "48.1%", width: "13%", height: "12%" } },
    labelLayout: { desktop: { left: "50%", bottom: "110%" } }, visual: "ignition",
    postLines: [["No. Quel comando ha perso ogni privilegio di accensione fino a nuovo ordine.", "pointing"]]
  },
  effects: [
    { id: "fire", asset: O("fire-in-oven-lit-advice8"), layout: { desktop: { left: "71%", bottom: "48.3%", width: "16%", height: "17.1%", z: "14" }, mobile: { left: "84.2%", bottom: "45.8%", width: "32.2%", height: "19.5%" , rotate: "-6.5deg"} } },
    { id: "burst", asset: O("flame-burst-advice8"), layout: { desktop: { left: "66.9%", bottom: "43.6%", width: "20.6%", height: "28.5%", z: "33" }, mobile: { left: "71.1%", bottom: "38.7%", width: "44%", height: "34%" } } },
    { id: "smoke", asset: O("smoke-ash-advice8"), layout: { desktop: { left: "56.5%", bottom: "32.4%", width: "37.4%", height: "41.8%", z: "31" }, mobile: { left: "64.7%", bottom: "40.7%", width: "48%", height: "30%" } } },
    { id: "sparks", asset: O("sparks-embers-advice8"), layout: { desktop: { left: "69.8%", bottom: "48.6%", width: "11%", height: "13.5%", z: "34" }, mobile: { left: "63.4%", bottom: "39.3%", width: "49%", height: "34%" } } }
  ],
  props: [
    { id: "oven", label: "Forno", asset: O("oven-cold-advice8"), decorative: true, layout: { desktop: { left: "39.6%", bottom: "7.7%", width: "66.4%", height: "98.9%", z: "8" }, mobile: { left: "44%", bottom: "13.1%", width: "90.1%", height: "84.1%" , rotate: "1.5deg"} } },
    { id: "logs", label: "Legna", asset: O("oven-logs-unlit-advice8"), action: "nudge", lines: [["Legna? Assolutamente no. Il finale ha già raggiunto il budget massimo di fuoco.", "annoyed"]], layout: { desktop: { left: "67.3%", bottom: "47.4%", width: "20%", height: "15%", z: "12" }, mobile: { left: "80.1%", bottom: "49.4%", width: "29%", height: "12%" } } },
    { id: "brush", label: "Spazzolone", asset: O("oven-brush-advice8"), action: "nudge", lines: [["Quel povero spazzolone ha visto cose che nessun utensile domestico dovrebbe testimoniare.", "neutral"]], layout: { desktop: { left: "32.5%", bottom: "17.3%", width: "20.5%", height: "72%", z: "17", rotate: "98.9deg" }, mobile: { left: "10.6%", bottom: "25.7%", width: "33.1%", height: "62.6%" , rotate: "100.5deg"} } },
    { id: "ash", label: "Paletta cenere", asset: O("ash-pan-advice8"), action: "nudge", lines: [["La cenere resta lì. Per oggi abbiamo prodotto abbastanza effetti particellari nel mondo reale.", "annoyed"]], layout: { desktop: { left: "58%", bottom: "40.6%", width: "12%", height: "20%", z: "15" }, mobile: { left: "59.6%", bottom: "42.6%", width: "18%", height: "16%" } } },
    { id: "bucket", label: "Secchio", asset: O("cleaning-bucket-advice8"), action: "bounce", lines: [["UN SECCHIO! Finalmente! Scena uno, perdono tutto: torna da me, vecchio sistema antincendio.", "annoyed"]], layout: { desktop: { left: "26.3%", bottom: "48.9%", width: "9%", height: "18%", z: "15" }, mobile: { left: "-7.4%", bottom: "50.1%", width: "14%", height: "15%" } } },
    { id: "wood", label: "Catasta di legna", asset: O("wood-stack-advice8"), action: "nudge", lines: [["Quella catasta non si tocca. Non voglio un DLC del forno subito dopo essere sopravvissuto alla campagna principale.", "annoyed"]], layout: { desktop: { right: "7.6%", bottom: "-2.6%", width: "28.8%", height: "42%", z: "10" }, mobile: { right: "-27.5%", bottom: "4.4%", width: "65%", height: "53.5%" , rotate: "-0.7deg"} } },
    { id: "thermometer", label: "Termometro", asset: O("thermometer-advice8"), action: "bounce", lines: [["Grazie, termometro. Informazione preziosa sapere con precisione scientifica quanto mancasse alla mia trasformazione in pizza.", "annoyed"]], layout: { desktop: { left: "60.7%", top: "41.6%", width: "8%", height: "13%", z: "16" }, mobile: { left: "-2.9%", top: "75.7%", width: "12%", height: "10%" } } },
    { id: "flour", label: "Farina", asset: O("flour-sack-advice8"), action: "nudge", lines: [["No, la farina no. Ho già cenere addosso: non completiamo la ricetta trasformandomi nell'impasto.", "silent-stare"]], layout: { desktop: { right: "56.4%", bottom: "18.1%", width: "10%", height: "23%", z: "13" }, mobile: { right: "46.8%", bottom: "35.5%", width: "15%", height: "19%" } } },
    { id: "vent", label: "Leva camino", asset: O("vent-lever-advice8"), action: "nudge", lines: [["Quella leva resta ferma. Non facciamo tuning delle fiamme dopo che hanno quasi fatto tuning di me.", "pointing"]], layout: { desktop: { right: "62.6%", top: "63.9%", width: "12.6%", height: "39.3%", z: "12" }, mobile: { right: "66%", top: "37.6%", width: "33.4%", height: "55.6%" , rotate: "-1deg"} } }
  ],
  mainSequence: [
    { text: "MA CHE CAZZO—?! ...Okay. Intero. Sono ancora intero.", portrait: P("angry"), sprite: S("silent-stare"), layout: "upright", tone: "impact", keepEffects: ["fire", "smoke"] },
    { text: "C'ERA UNA PERSONA DENTRO QUEL FORNO! Una persona! Questa caccia al tesoro ha ufficialmente superato ogni requisito di sicurezza.", portrait: P("angry"), sprite: S("pointing-oven"), layout: "upright", keepEffects: ["fire"] },
    { text: "...", portrait: P("silent-stare"), sprite: S("silent-stare"), layout: "upright", tone: "silent", keepEffects: ["fire"] },
    { text: "Fantastico. Dopo acqua, mele, blackout, massi, pesi e mobili mobili... oggi aggiungiamo «quasi cotto a legna» al curriculum.", portrait: P("annoyed"), sprite: S("pointing-oven"), layout: "upright", keepEffects: ["fire"] },
    { text: "Aspetta— L'ULTIMO CONSIGLIO. Giusto! Non posso farmi battere dal forno a cinque minuti dai titoli di coda.", portrait: P("realisation"), sprite: S("noticing-fire"), layout: "upright", tone: "switch", keepEffects: ["fire"] },
    { text: "Okay! Cenere addosso, temperatura discutibile, dignità sorprendentemente resistente. Finale: lo facciamo come si deve.", portrait: P("excited"), sprite: S("theatrical"), layout: "upright", tone: "theatrical", keepEffects: ["fire"] },
    { text: "OCCHI QUI! Questa è l'ultima tappa. Dopo otto scene, pretendo almeno un ingresso teatrale perfetto.", portrait: P("theatrical"), tone: "theatrical", keepEffects: ["fire"] },
    { text: "Il viaggio è stato lungo, hai fatto tanta strada,", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice", keepEffects: ["fire"] },
    { text: "ma ogni grande avventura finisce dove è iniziata!", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice", keepEffects: ["fire"] },
    { text: "Torna dove il calore e il comfort ti aspettano già:", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice", keepEffects: ["fire"] },
    { text: "apri la porta di casa... il tesoro finale è proprio là!", portrait: P("theatrical"), sprite: S("theatrical"), layout: "upright", tone: "advice", keepEffects: ["fire"] },
    { text: "E QUESTO È TUTTO! Il cerchio si chiude. L'epica termina dove era iniziata e, miracolosamente, il protagonista è ancora cosciente.", portrait: P("proud"), tone: "theatrical", keepEffects: ["fire"] },
    { text: "Uff... sono distrutto. Però ne è valsa la pena. Otto tappe e una quantità statisticamente offensiva di incidenti.", portrait: P("exhausted"), keepEffects: ["fire"] },
    { text: "Otto consigli. Otto scene. E io sono ancora in piedi... con una definizione molto generosa di «in piedi».", portrait: P("proud"), sprite: S("finish"), layout: "upright", tone: "theatrical", keepEffects: ["fire"] },
    { text: "Adesso io e quel fuoco adottiamo la saggia politica della distanza. Machiavelli approverebbe l'adattamento alla fortuna.", portrait: P("suspicious"), sprite: S("noticing-fire"), layout: "upright", keepEffects: ["fire"] },
    { text: "Io esco. Voi andate a prendervi il tesoro finale! E se vedete il secchio della prima scena, ditegli che finalmente lo rivoglio indietro.", portrait: P("exit-grin"), sprite: S("exit"), layout: "exit", tone: "exit" }
  ],
  theme: "oven", backgroundStyle: { desktop: { position: "50% 50%", filter: "none" } }, contentScale: { desktop: "1", mobile: ".93" },
  character: {
    initial: { src: S("cleaning-oven"), layout: "cleaning" }, hover: { src: S("brushing-ash"), layout: "cleaning" },
    layouts: {
      cleaning: { desktop: { left: "56.2%", bottom: "24.7%", width: "30%", height: "58%", z: "20" }, mobile: { left: "38.5%", bottom: "28.1%", width: "64.2%", height: "75.2%" , rotate: "-7.4deg"} },
      leap: { desktop: { left: "31%", bottom: "8%", width: "34%", height: "56%", z: "31" }, mobile: { left: "20%", bottom: "15%", width: "46%", height: "46%" } },
      upright: { desktop: { left: "42.9%", bottom: "6.7%", width: "21.8%", height: "59.4%", z: "21" }, mobile: { left: "2.2%", bottom: "19%", width: "82.9%", height: "128.9%" , rotate: "-1.2deg"} },
      exit: { desktop: { left: "37.5%", bottom: "3.9%", width: "26%", height: "68%", z: "21" }, mobile: { left: "1.1%", bottom: "20.8%", width: "72.6%", height: "109.9%" , rotate: "2.4deg"} }
    }
  },
  animation: { type: "ovenIgnition", brushSprite: S("brushing-ash"), noticeSprite: S("noticing-fire"), leapSprite: S("backward-leap"), checkSprite: S("checking-burns") }
};
export default scene;
