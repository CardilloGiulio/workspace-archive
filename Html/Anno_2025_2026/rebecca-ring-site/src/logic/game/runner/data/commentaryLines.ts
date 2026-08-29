import type { CommentaryLine } from "../types";

const availableRebeccaVoiceNumbers = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 17, 18, 19, 20, 22
]);

function rebeccaVoice(number: number) {
  return availableRebeccaVoiceNumbers.has(number) ? `/audio/rebecca/${number}.ogg` : undefined;
}

const rawCommentaryLines: CommentaryLine[] = [
  { id: "walk-1", giulioAudio: "/audio/giulio/1.wav", trigger: "walking", giulio: "Sto dosando le energie.", rebecca: "No, stai camminando. Mi stai perdendo, scemo." },
  { id: "walk-2", giulioAudio: "/audio/giulio/2.wav", trigger: "walking", giulio: "È una camminata strategica.", rebecca: "Strategica per arrivare ultimo." },
  { id: "walk-3", giulioAudio: "/audio/giulio/3.wav", trigger: "walking", giulio: "Rebecca, rallenta un secondo.", rebecca: "Convincimi. Non inseguirmi a velocità nonno." },
  { id: "walk-4", giulioAudio: "/audio/giulio/4.wav", trigger: "walking", giulio: "Sto controllando se il percorso è sicuro.", rebecca: "No, stai trovando una scusa elegante per non correre." },
  { id: "walk-5", giulioAudio: "/audio/giulio/5.wav", trigger: "walking", giulio: "Magari se cammino non ti spaventi.", rebecca: "Mi spaventa di più il tuo senso dell'urgenza." },
  { id: "walk-6", giulioAudio: "/audio/giulio/6.wav", trigger: "walking", giulio: "Dai, non sei così lontana.", rebecca: "Lo sarò tra cinque secondi se continui così." },
  { id: "walklong-1", giulioAudio: "/audio/giulio/7.wav", trigger: "walkingTooLong", giulio: "Okay, forse sto andando piano.", rebecca: "Forse? Giulio, un poster ti supererebbe." },
  { id: "walklong-2", giulioAudio: "/audio/giulio/8.wav", trigger: "walkingTooLong", giulio: "Sto arrivando, promesso.", rebecca: "Promesse lente non valgono, scemo." },
  { id: "walklong-3", giulioAudio: "/audio/giulio/9.wav", trigger: "walkingTooLong", giulio: "Aspetta almeno fino a Porta Susa!", rebecca: "Allora muovi quelle gambe." },
  { id: "run-1", giulioAudio: "/audio/giulio/10.wav", trigger: "running", giulio: "Okay, adesso corro davvero.", rebecca: "E adesso devo correre anch’io? Idiota." },
  { id: "run-2", giulioAudio: "/audio/giulio/11.wav", trigger: "running", giulio: "Ti raggiungo, vedrai.", rebecca: "Evita almeno di investire mezzo centro di Torino." },
  { id: "run-3", giulioAudio: "/audio/giulio/12.wav", trigger: "running", giulio: "Modalità inseguimento romantico.", rebecca: "Non chiamarlo romantico mentre mi stai facendo scappare." },
  { id: "run-4", giulioAudio: "/audio/giulio/13.wav", trigger: "running", giulio: "Sto prendendo ritmo.", rebecca: "Lo vedo. Ed è fastidiosamente efficace." },
  { id: "run-5", giulioAudio: "/audio/giulio/14.wav", trigger: "running", giulio: "Se rallenti un po', facciamo prima.", rebecca: "No. Tu corri, io valuto." },
  { id: "run-6", giulioAudio: "/audio/giulio/15.wav", trigger: "running", giulio: "Sto arrivando, principessa delle fughe.", rebecca: "Non chiamarmi così mentre mi insegui in pubblico." },
  { id: "sprint-1", giulioAudio: "/audio/giulio/16.wav", trigger: "sprinting", giulio: "Adesso sì che sto correndo.", rebecca: "Ehi! Così mi costringi a fare cardio vero!" },
  { id: "sprint-2", giulioAudio: "/audio/giulio/17.wav", trigger: "sprinting", giulio: "Sprint romantico attivato.", rebecca: "Mi stai quasi raggiungendo... non sorridere." },
  { id: "sprint-3", giulioAudio: "/audio/giulio/18.wav", trigger: "sprinting", giulio: "Non puoi scappare per sempre.", rebecca: "Posso provarci, scemo." },
  { id: "sprint-4", giulioAudio: "/audio/giulio/19.wav", trigger: "sprinting", giulio: "Sento Porta Susa vicina.", rebecca: "Senti anche gli ostacoli, per favore." },
  { id: "hit-1", giulioAudio: "/audio/giulio/20.wav", trigger: "hitObstacle", giulio: "Okay, quello non era previsto.", rebecca: "Era fermo. Tu no. Complimenti." },
  { id: "hit-2", giulioAudio: "/audio/giulio/21.wav", trigger: "hitObstacle", giulio: "Ho perso mezzo secondo.", rebecca: "Hai litigato con l’arredo urbano, scemo." },
  { id: "hit-3", giulioAudio: "/audio/giulio/22.wav", trigger: "hitObstacle", giulio: "Sto bene, credo.", rebecca: "Io sto meglio perché non ho preso quel coso in faccia." },
  { id: "heart-1", giulioAudio: "/audio/giulio/23.wav", trigger: "collectHeart", giulio: "Questo era un punto amore.", rebecca: "Non chiamarlo così. Però sì, punto valido." },
  { id: "heart-2", giulioAudio: "/audio/giulio/24.wav", trigger: "collectHeart", giulio: "Affetto raccolto.", rebecca: "Non montarti la testa solo perché hai preso un cuore." },
  { id: "ice-1", giulioAudio: "/audio/giulio/25.wav", trigger: "collectIceCream", giulio: "Gelato! Sapevo che avrebbe funzionato.", rebecca: "Dove? Non sto rallentando. Sto valutando." },
  { id: "ice-2", giulioAudio: "/audio/giulio/26.wav", trigger: "collectIceCream", giulio: "Missione gelato completata.", rebecca: "Non è una missione. È una necessità alimentare." },
  { id: "ice-3", giulioAudio: "/audio/giulio/27.wav", trigger: "collectIceCream", giulio: "Se ti prendo col gelato, vale doppio?", rebecca: "Forse. Ma non dirlo come se avessi già vinto." },
  { id: "fries-1", giulioAudio: "/audio/giulio/28.wav", trigger: "collectFries", giulio: "Patatine trovate. Strategia sentimentale perfetta.", rebecca: "Non puoi conquistarmi con le patatine… però continua." },
  { id: "fries-2", giulioAudio: "/audio/giulio/29.wav", trigger: "collectFries", giulio: "Patatine bonus!", rebecca: "Concentrati. Poi magari ne parliamo." },
  { id: "choco-1", giulioAudio: "/audio/giulio/30.wav", trigger: "collectChocolate", giulio: "Cioccolato: arma diplomatica.", rebecca: "Finalmente una decisione intelligente." },
  { id: "choco-2", giulioAudio: "/audio/giulio/31.wav", trigger: "collectChocolate", giulio: "Questo aumenta l’Affetto, vero?", rebecca: "Aumenta la probabilità che io ti ascolti. Forse." },
  { id: "potato-1", giulioAudio: "/audio/giulio/32.wav", trigger: "collectPotato", giulio: "Ho preso una patata.", rebecca: "Perfetto. Ora manca solo capire perché." },
  { id: "potato-2", giulioAudio: "/audio/giulio/33.wav", trigger: "collectPotato", giulio: "Patata acquisita.", rebecca: "Giulio, non tutto quello che luccica è utile per viaggiare." },
  { id: "near-1", giulioAudio: "/audio/giulio/34.wav", trigger: "nearRebecca", giulio: "Ti sto raggiungendo.", rebecca: "Sì, e la cosa mi irrita pochissimo. Forse." },
  { id: "near-2", giulioAudio: "/audio/giulio/35.wav", trigger: "nearRebecca", giulio: "Sei quasi qui.", rebecca: "Non dire cose carine mentre corro, idiota." },
  { id: "far-1", giulioAudio: "/audio/giulio/36.wav", trigger: "farFromRebecca", giulio: "Aspetta, sto arrivando!", rebecca: "A questo ritmo arrivi domani." },
  { id: "far-2", giulioAudio: "/audio/giulio/37.wav", trigger: "farFromRebecca", giulio: "Rebecca!", rebecca: "Corri invece di urlare il mio nome." },
  { id: "zone-ps", giulioAudio: "/audio/giulio/38.wav", trigger: "zoneStart", zone: "piazzaStatuto", giulio: "Partiamo da Piazza Statuto.", rebecca: "E tu parti già in svantaggio." },
  { id: "zone-mk", giulioAudio: "/audio/giulio/39.wav", trigger: "zoneStart", zone: "market", giulio: "Perché scambiano patate per oggetti?", rebecca: "Non giudicare l’economia locale e corri." },
  { id: "zone-pss", giulioAudio: "/audio/giulio/40.wav", trigger: "zoneStart", zone: "portaSusa", giulio: "Porta Susa. Ci siamo quasi.", rebecca: "Quasi. Non rovinare tutto al McDonald’s." },
  { id: "porta-1", giulioAudio: "/audio/giulio/41.wav", trigger: "nearPortaSusa", zone: "portaSusa", giulio: "Se ti raggiungo prima della metro, mi ascolti?", rebecca: "Forse. Ma devi raggiungermi davvero." },
  { id: "porta-loop-1", giulioAudio: "/audio/giulio/42.wav", trigger: "portaSusaLoop", zone: "portaSusa", giulio: "Siamo a Porta Susa, ma sei ancora avanti.", rebecca: "Allora continua. Qui non basta arrivare." },
  { id: "porta-loop-2", giulioAudio: "/audio/giulio/43.wav", trigger: "portaSusaLoop", zone: "portaSusa", giulio: "Okay, giro extra davanti al McDonald’s.", rebecca: "Non chiamarlo giro extra. Chiamalo: hai perso tempo." },
  { id: "porta-loop-3", giulioAudio: "/audio/giulio/44.wav", trigger: "portaSusaLoop", zone: "portaSusa", giulio: "Ti raggiungo qui, promesso.", rebecca: "Meglio. Perché la metro non aspetta il tuo dramma." }

];

export const commentaryLines: CommentaryLine[] = rawCommentaryLines.map((line, index) => {
  const mappedRebeccaAudio = rebeccaVoice(index + 1);

  return {
    ...line,
    rebecca: mappedRebeccaAudio ? line.rebecca : undefined,
    rebeccaAudio: mappedRebeccaAudio
  };
});

export const giulioVoiceSources = Array.from(
  new Set(
    commentaryLines
      .map((line) => line.giulioAudio)
      .filter((source): source is string => Boolean(source))
  )
);

export const rebeccaVoiceSources = Array.from(
  new Set(
    commentaryLines
      .map((line) => line.rebeccaAudio)
      .filter((source): source is string => Boolean(source))
  )
);
