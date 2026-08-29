import type { MuseumCategoryId } from "./museumCategories";

export type MuseumPose =
  | "walk"
  | "slow"
  | "run"
  | "sprint"
  | "hit"
  | "collect"
  | "offer"
  | "near"
  | "far"
  | "confused"
  | "dramatic";

export type MuseumScene = {
  id: string;
  number: number;
  title: string;
  category: Exclude<MuseumCategoryId, "all">;
  giulioText: string;
  rebeccaText?: string;
  giulioAudio: string;
  rebeccaAudio?: string;
  setting: "piazza" | "market" | "street" | "porta" | "mcdonald";
  giulioPose: MuseumPose;
  rebeccaPose: MuseumPose;
  props: string[];
  caption: string;
};

const rebeccaAudioNumbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 22]);

function rebeccaAudio(number: number) {
  return rebeccaAudioNumbers.has(number) ? `/audio/rebecca/${number}.ogg` : undefined;
}

function scene(input: Omit<MuseumScene, "giulioAudio" | "rebeccaAudio">): MuseumScene {
  const maybeRebeccaAudio = rebeccaAudio(input.number);
  return {
    ...input,
    giulioAudio: `/audio/giulio/${input.number}.wav`,
    rebeccaText: maybeRebeccaAudio ? input.rebeccaText : undefined,
    rebeccaAudio: maybeRebeccaAudio
  };
}

export const museumScenes: MuseumScene[] = [
  scene({ id: "walk-1", number: 1, title: "Dosare le energie", category: "walking", setting: "piazza", giulioPose: "walk", rebeccaPose: "far", props: ["🐢", "💨"], giulioText: "Sto dosando le energie.", rebeccaText: "No, stai camminando. Mi stai perdendo, scemo.", caption: "Giulio finge di regolarsi il passo; Rebecca lo guarda da avanti e lo fulmina perché è troppo lento." }),
  scene({ id: "walk-2", number: 2, title: "Camminata strategica", category: "walking", setting: "street", giulioPose: "slow", rebeccaPose: "far", props: ["🪑", "😴"], giulioText: "È una camminata strategica.", rebeccaText: "Strategica per arrivare ultimo.", caption: "Giulio si ferma a guardare la strada, Rebecca si siede metaforicamente e aspetta, completamente unimpressed." }),
  scene({ id: "walk-3", number: 3, title: "Velocità nonno", category: "walking", setting: "street", giulioPose: "slow", rebeccaPose: "run", props: ["🫁", "⌛"], giulioText: "Rebecca, rallenta un secondo.", rebeccaText: "Convincimi. Non inseguirmi a velocità nonno.", caption: "Giulio boccheggia mentre prova a chiederle una pausa; Rebecca non concede sconti." }),
  scene({ id: "walk-4", number: 4, title: "Controllo percorso", category: "walking", setting: "piazza", giulioPose: "confused", rebeccaPose: "far", props: ["🔎", "🛣️"], giulioText: "Sto controllando se il percorso è sicuro.", rebeccaText: "No, stai trovando una scusa elegante per non correre.", caption: "Giulio ispeziona il tragitto come se fosse un tecnico; Rebecca capisce subito che è solo una scusa." }),
  scene({ id: "walk-5", number: 5, title: "Senso dell’urgenza", category: "walking", setting: "street", giulioPose: "walk", rebeccaPose: "dramatic", props: ["😇", "⚠️"], giulioText: "Magari se cammino non ti spaventi.", rebeccaText: "Mi spaventa di più il tuo senso dell’urgenza.", caption: "Giulio prova a fare il tenero camminando piano; Rebecca si gira incredula." }),
  scene({ id: "walk-6", number: 6, title: "Cinque secondi", category: "walking", setting: "street", giulioPose: "walk", rebeccaPose: "far", props: ["5️⃣", "🏃‍♀️"], giulioText: "Dai, non sei così lontana.", rebeccaText: "Lo sarò tra cinque secondi se continui così.", caption: "Rebecca si allontana di proposito mentre Giulio sottovaluta la distanza." }),

  scene({ id: "walklong-1", number: 7, title: "Poster più veloce", category: "walking", setting: "piazza", giulioPose: "slow", rebeccaPose: "dramatic", props: ["🖼️", "🌬️"], giulioText: "Okay, forse sto andando piano.", rebeccaText: "Forse? Giulio, un poster ti supererebbe.", caption: "Un poster vola davanti a Giulio e supera perfino Rebecca, rendendo la battuta troppo vera." }),
  scene({ id: "walklong-2", number: 8, title: "Promesse lente", category: "walking", setting: "street", giulioPose: "slow", rebeccaPose: "far", props: ["💦", "🤞"], giulioText: "Sto arrivando, promesso.", rebeccaText: "Promesse lente non valgono, scemo.", caption: "Giulio è sudato e promette di arrivare; Rebecca lo punisce con precisione chirurgica." }),
  scene({ id: "walklong-3", number: 9, title: "Fino a Porta Susa", category: "walking", setting: "porta", giulioPose: "dramatic", rebeccaPose: "run", props: ["🚇", "👉"], giulioText: "Aspetta almeno fino a Porta Susa!", rebeccaText: "Allora muovi quelle gambe.", caption: "Rebecca punta la direzione della metro e Giulio capisce che il ritmo deve cambiare." }),

  scene({ id: "run-1", number: 10, title: "Adesso corro", category: "running", setting: "street", giulioPose: "run", rebeccaPose: "run", props: ["💨", "🏃‍♂️"], giulioText: "Okay, adesso corro davvero.", rebeccaText: "E adesso devo correre anch’io? Idiota.", caption: "Giulio accelera finalmente e Rebecca è costretta a correre davvero." }),
  scene({ id: "run-2", number: 11, title: "Mezzo centro", category: "running", setting: "street", giulioPose: "run", rebeccaPose: "run", props: ["🚶", "😱"], giulioText: "Ti raggiungo, vedrai.", rebeccaText: "Evita almeno di investire mezzo centro di Torino.", caption: "Pedoni e passanti si scansano mentre Giulio prova a chiudere la distanza." }),
  scene({ id: "run-3", number: 12, title: "Inseguimento romantico", category: "running", setting: "street", giulioPose: "dramatic", rebeccaPose: "run", props: ["🌹", "💘"], giulioText: "Modalità inseguimento romantico.", rebeccaText: "Non chiamarlo romantico mentre mi stai facendo scappare.", caption: "Giulio prova la posa da film con un fiore; Rebecca lo considera solo disastro organizzato." }),
  scene({ id: "run-4", number: 13, title: "Prendere ritmo", category: "running", setting: "street", giulioPose: "run", rebeccaPose: "near", props: ["⚡", "📈"], giulioText: "Sto prendendo ritmo.", rebeccaText: "Lo vedo. Ed è fastidiosamente efficace.", caption: "La distanza cala e Rebecca si accorge che Giulio sta diventando pericolosamente efficace." }),
  scene({ id: "run-5", number: 14, title: "Io valuto", category: "running", setting: "street", giulioPose: "run", rebeccaPose: "dramatic", props: ["☝️", "🧠"], giulioText: "Se rallenti un po’, facciamo prima.", rebeccaText: "No. Tu corri, io valuto.", caption: "Giulio negozia correndo; Rebecca mantiene il controllo della scena." }),
  scene({ id: "run-6", number: 15, title: "Principessa delle fughe", category: "running", setting: "street", giulioPose: "run", rebeccaPose: "near", props: ["👑", "😳"], giulioText: "Sto arrivando, principessa delle fughe.", rebeccaText: "Non chiamarmi così mentre mi insegui in pubblico.", caption: "Rebecca arrossisce appena, ma non smette di scappare." }),

  scene({ id: "sprint-1", number: 16, title: "Cardio vero", category: "sprinting", setting: "street", giulioPose: "sprint", rebeccaPose: "sprint", props: ["🔥", "💨"], giulioText: "Adesso sì che sto correndo.", rebeccaText: "Ehi! Così mi costringi a fare cardio vero!", caption: "Lo sprint sorprende Rebecca e trasforma la fuga in una vera corsa." }),
  scene({ id: "sprint-2", number: 17, title: "Non sorridere", category: "sprinting", setting: "street", giulioPose: "sprint", rebeccaPose: "near", props: ["🌷", "😏"], giulioText: "Sprint romantico attivato.", rebeccaText: "Mi stai quasi raggiungendo... non sorridere.", caption: "Giulio si avvicina con aria soddisfatta; Rebecca prova a non concedergli la vittoria emotiva." }),
  scene({ id: "sprint-3", number: 18, title: "Scappare per sempre", category: "sprinting", setting: "street", giulioPose: "sprint", rebeccaPose: "sprint", props: ["📦", "↪️"], giulioText: "Non puoi scappare per sempre.", rebeccaText: "Posso provarci, scemo.", caption: "Giulio schiva scatole e ostacoli mentre Rebecca rilancia la sfida." }),
  scene({ id: "sprint-4", number: 19, title: "Porta Susa vicina", category: "sprinting", setting: "porta", giulioPose: "sprint", rebeccaPose: "run", props: ["🚇", "🪧"], giulioText: "Sento Porta Susa vicina.", rebeccaText: "Senti anche gli ostacoli, per favore.", caption: "La metro appare sullo sfondo e Giulio rischia di centrare un palo." }),

  scene({ id: "hit-1", number: 20, title: "Poster in faccia", category: "hit", setting: "piazza", giulioPose: "hit", rebeccaPose: "dramatic", props: ["🖼️", "💥"], giulioText: "Okay, quello non era previsto.", rebeccaText: "Era fermo. Tu no. Complimenti.", caption: "Giulio prende in pieno un poster mentre Rebecca assiste alla scena con imbarazzo controllato." }),
  scene({ id: "hit-2", number: 21, title: "Arredo urbano", category: "hit", setting: "street", giulioPose: "hit", rebeccaPose: "far", props: ["📦", "🦶"], giulioText: "Ho perso mezzo secondo.", rebeccaText: "Hai litigato con l’arredo urbano, scemo.", caption: "Una scatola lo tradisce e Giulio salta su un piede per non perdere l’inseguimento." }),
  scene({ id: "hit-3", number: 22, title: "Patata volante", category: "hit", setting: "market", giulioPose: "hit", rebeccaPose: "far", props: ["🥔", "💫"], giulioText: "Sto bene, credo.", rebeccaText: "Io sto meglio perché non ho preso quel coso in faccia.", caption: "Una patata volante colpisce Giulio; Rebecca dimostra zero pietà." }),

  scene({ id: "heart-1", number: 23, title: "Punto amore", category: "collectibles", setting: "street", giulioPose: "collect", rebeccaPose: "near", props: ["💚", "✨"], giulioText: "Questo era un punto amore.", rebeccaText: "Non chiamarlo così. Però sì, punto valido.", caption: "Giulio lancia un cuore verso Rebecca, che esplode in una nuvola verde acqua e rosa." }),
  scene({ id: "heart-2", number: 24, title: "Affetto raccolto", category: "collectibles", setting: "street", giulioPose: "collect", rebeccaPose: "dramatic", props: ["💚", "😵"], giulioText: "Affetto raccolto.", rebeccaText: "Non montarti la testa solo perché hai preso un cuore.", caption: "Giulio prende un cuore e finisce lui stesso dentro la piccola esplosione romantica." }),
  scene({ id: "ice-1", number: 25, title: "Gelato tattico", category: "collectibles", setting: "street", giulioPose: "collect", rebeccaPose: "near", props: ["🍦", "👀"], giulioText: "Gelato! Sapevo che avrebbe funzionato.", rebeccaText: "Dove? Non sto rallentando. Sto valutando.", caption: "Il gelato appare e Rebecca, anche se finge indifferenza, guarda subito nella sua direzione." }),
  scene({ id: "ice-2", number: 26, title: "Necessità alimentare", category: "collectibles", setting: "street", giulioPose: "collect", rebeccaPose: "near", props: ["🍦", "✅"], giulioText: "Missione gelato completata.", rebeccaText: "Non è una missione. È una necessità alimentare.", caption: "Giulio addenta il gelato mentre corre, trasformando la fuga in una pausa impossibile." }),
  scene({ id: "ice-3", number: 27, title: "Gelato offerta", category: "collectibles", setting: "street", giulioPose: "offer", rebeccaPose: "near", props: ["🍦", "🎁"], giulioText: "Se ti prendo col gelato, vale doppio?", rebeccaText: "Forse. Ma non dirlo come se avessi già vinto.", caption: "Giulio tende il gelato in avanti come un’offerta di pace, Rebecca rallenta solo mentalmente." }),
  scene({ id: "fries-1", number: 28, title: "Strategia patatine", category: "collectibles", setting: "mcdonald", giulioPose: "collect", rebeccaPose: "near", props: ["🍟", "🧂"], giulioText: "Patatine trovate. Strategia sentimentale perfetta.", rebeccaText: "Non puoi conquistarmi con le patatine… però continua.", caption: "Giulio trova le patatine e le assaggia con orgoglio strategico." }),
  scene({ id: "fries-2", number: 29, title: "Patatine bonus", category: "collectibles", setting: "mcdonald", giulioPose: "collect", rebeccaPose: "run", props: ["🍟", "💨"], giulioText: "Patatine bonus!", rebeccaText: "Concentrati. Poi magari ne parliamo.", caption: "Giulio stringe il sacchetto di patatine mentre prova a non perdere Rebecca." }),
  scene({ id: "choco-1", number: 30, title: "Arma diplomatica", category: "collectibles", setting: "street", giulioPose: "collect", rebeccaPose: "near", props: ["🍫", "🏆"], giulioText: "Cioccolato: arma diplomatica.", rebeccaText: "Finalmente una decisione intelligente.", caption: "Il cioccolato convince Rebecca a guardarlo con sincero interesse per la prima volta." }),
  scene({ id: "choco-2", number: 31, title: "Probabilità aumentata", category: "collectibles", setting: "street", giulioPose: "offer", rebeccaPose: "near", props: ["🍫", "📈"], giulioText: "Questo aumenta l’Affetto, vero?", rebeccaText: "Aumenta la probabilità che io ti ascolti. Forse.", caption: "Giulio offre la cioccolata come se fosse una quest item; Rebecca è tentata ma resiste." }),
  scene({ id: "potato-1", number: 32, title: "Patata confusa", category: "collectibles", setting: "market", giulioPose: "confused", rebeccaPose: "dramatic", props: ["🥔", "❓"], giulioText: "Ho preso una patata.", rebeccaText: "Perfetto. Ora manca solo capire perché.", caption: "Giulio corre con una patata in mano senza sapere perché; Rebecca si copre la faccia." }),
  scene({ id: "potato-2", number: 33, title: "Patata acquisita", category: "collectibles", setting: "market", giulioPose: "collect", rebeccaPose: "dramatic", props: ["🥔", "⭐"], giulioText: "Patata acquisita.", rebeccaText: "Giulio, non tutto quello che luccica è utile per viaggiare.", caption: "Giulio la solleva come fosse un drop raro; Rebecca gli ricorda che non tutto è una build." }),

  scene({ id: "near-1", number: 34, title: "Quasi vicino", category: "distance", setting: "street", giulioPose: "near", rebeccaPose: "near", props: ["🤏", "💚"], giulioText: "Ti sto raggiungendo.", rebeccaText: "Sì, e la cosa mi irrita pochissimo. Forse.", caption: "Giulio è quasi a portata di mano; Rebecca è infastidita, ma solo in apparenza." }),
  scene({ id: "near-2", number: 35, title: "Non dire cose carine", category: "distance", setting: "street", giulioPose: "near", rebeccaPose: "near", props: ["🤝", "😳"], giulioText: "Sei quasi qui.", rebeccaText: "Non dire cose carine mentre corro, idiota.", caption: "Giulio tende una mano verso Rebecca, che arrossisce ma accelera appena." }),
  scene({ id: "far-1", number: 36, title: "Arrivi domani", category: "distance", setting: "street", giulioPose: "far", rebeccaPose: "far", props: ["📣", "🌫️"], giulioText: "Aspetta, sto arrivando!", rebeccaText: "A questo ritmo arrivi domani.", caption: "Rebecca diventa quasi una sagoma in fondo alla strada mentre Giulio la chiama da lontano." }),
  scene({ id: "far-2", number: 37, title: "Corri invece di urlare", category: "distance", setting: "street", giulioPose: "dramatic", rebeccaPose: "far", props: ["📢", "🏃"], giulioText: "Rebecca!", rebeccaText: "Corri invece di urlare il mio nome.", caption: "Giulio urla il suo nome; Rebecca indica la strada e gli ricorda la meccanica principale." }),

  scene({ id: "zone-ps", number: 38, title: "Piazza Statuto", category: "zones", setting: "piazza", giulioPose: "dramatic", rebeccaPose: "far", props: ["📍", "🏁"], giulioText: "Partiamo da Piazza Statuto.", rebeccaText: "E tu parti già in svantaggio.", caption: "La corsa inizia: Giulio si prepara in modo drammatico e Rebecca è già avanti." }),
  scene({ id: "zone-mk", number: 39, title: "Economia delle patate", category: "zones", setting: "market", giulioPose: "confused", rebeccaPose: "run", props: ["🥔", "🧭"], giulioText: "Perché scambiano patate per oggetti?", rebeccaText: "Non giudicare l’economia locale e corri.", caption: "Il mercato è pieno di scambi assurdi; Giulio vorrebbe capire, Rebecca vuole solo passare." }),
  scene({ id: "zone-pss", number: 40, title: "Porta Susa", category: "zones", setting: "porta", giulioPose: "run", rebeccaPose: "run", props: ["🚉", "🍟"], giulioText: "Porta Susa. Ci siamo quasi.", rebeccaText: "Quasi. Non rovinare tutto al McDonald’s.", caption: "La stazione appare, il McDonald’s è vicino e la parte finale può ancora andare malissimo." }),

  scene({ id: "porta-1", number: 41, title: "Prima della metro", category: "porta", setting: "porta", giulioPose: "near", rebeccaPose: "near", props: ["🚇", "⏳"], giulioText: "Se ti raggiungo prima della metro, mi ascolti?", rebeccaText: "Forse. Ma devi raggiungermi davvero.", caption: "La metro è davanti a loro: Rebecca gli concede una sola condizione, raggiungerla davvero." }),
  scene({ id: "porta-loop-1", number: 42, title: "Qui non basta arrivare", category: "porta", setting: "porta", giulioPose: "run", rebeccaPose: "far", props: ["🚉", "🔁"], giulioText: "Siamo a Porta Susa, ma sei ancora avanti.", rebeccaText: "Allora continua. Qui non basta arrivare.", caption: "Giulio arriva a Porta Susa, ma non basta: Rebecca è ancora troppo avanti." }),
  scene({ id: "porta-loop-2", number: 43, title: "Giro extra", category: "porta", setting: "mcdonald", giulioPose: "dramatic", rebeccaPose: "run", props: ["🍔", "🔁"], giulioText: "Okay, giro extra davanti al McDonald’s.", rebeccaText: "Non chiamarlo giro extra. Chiamalo: hai perso tempo.", caption: "I due ripassano davanti al McDonald’s; Giulio prova a sdrammatizzare, Rebecca non glielo lascia fare." }),
  scene({ id: "porta-loop-3", number: 44, title: "Ultimo tratto", category: "porta", setting: "porta", giulioPose: "sprint", rebeccaPose: "near", props: ["🚇", "💨"], giulioText: "Ti raggiungo qui, promesso.", rebeccaText: "Meglio. Perché la metro non aspetta il tuo dramma.", caption: "Ultimo sprint vicino alla metro: Rebecca è vicina, ma il tempo non aspetta." })
];

export const museumSceneById = new Map(museumScenes.map((sceneItem) => [sceneItem.id, sceneItem]));
