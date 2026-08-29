const shared = (name) => `/assets-optimized/sprites/shared/giulio-${name}.webp`;

export function createPlaceholderScene(number) {
  const padded = String(number).padStart(2, "0");
  const id = `advice${number}`;

  return {
    id,
    number: padded,
    title: "Scenario da definire",
    location: `Scena ${padded}`,
    background: null,
    backgroundFallback: "fallback-placeholder",
    music: null,
    sfx: {},
    layers: [],
    trigger: {
      id: "placeholder",
      label: "Apri segnaposto",
      hint: "Questa scena è pronta a ricevere ambientazione, oggetti e animazioni.",
      render: "css",
      layout: {
        desktop: {
          left: "50%",
          top: "43%",
          width: "clamp(150px, 16vw, 260px)",
          height: "clamp(150px, 16vw, 260px)",
          anchorX: "-50%",
          anchorY: "-50%",
          z: "25"
        },
        mobile: {
          top: "36%",
          width: "42vw",
          height: "42vw"
        }
      },
      labelLayout: {
        desktop: { left: "50%", bottom: "-18%" },
        mobile: { bottom: "-22%" }
      },
      visual: "placeholder"
    },
    effects: [],
    props: [],
    mainSequence: [
      {
        text: `Lo spazio ${padded} è operativo. Manca soltanto il dettaglio irrilevante chiamato “scena”.`,
        portrait: shared("fourth-wall"),
        tone: "normal"
      },
      {
        text: "Quando arriveranno scenario, oggetti e azione, questo segnaposto verrà sostituito senza cambiare il motore del sito.",
        portrait: shared("presenting"),
        tone: "theatrical"
      }
    ],
    theme: "placeholder",
    backgroundStyle: {
      desktop: { position: "50% 50%", filter: "none" }
    },
    contentScale: { desktop: "1", mobile: "1" },
    character: {
      initial: { src: shared("standing"), layout: "upright" },
      hover: { src: shared("pointing-full"), layout: "upright" },
      layouts: {
        upright: {
          desktop: {
            right: "7%",
            bottom: "-8%",
            width: "clamp(250px, 30vw, 510px)",
            height: "clamp(380px, 72vh, 760px)",
            z: "18"
          },
          mobile: {
            right: "-18%",
            bottom: "-5%",
            width: "68vw",
            height: "58vh"
          }
        }
      }
    },
    animation: { type: "placeholderReveal" }
  };
}
