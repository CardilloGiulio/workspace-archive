const scene = {
  "id": "advice1",
  "number": "01",
  "title": "Riposo compromesso",
  "location": "Spiaggia",
  "background": "/assets-optimized/backgrounds/advice1/background-advice1-beach.webp",
  "backgroundFallback": "fallback-beach",
  "music": "/assets/audio/music/music-advice1-beach.mp3",
  "sfx": {
    "bucketShake": "/assets/audio/effects/advice1/bucket-shake-advice1.mp3",
    "bucketTip": "/assets/audio/effects/advice1/bucket-tip-advice1.mp3",
    "splash": "/assets/audio/effects/advice1/water-splash-advice1.mp3",
    "dripping": "/assets/audio/effects/advice1/water-dripping-advice1.mp3",
    "exit": "/assets/audio/effects/advice1/sand-running-advice1.mp3"
  },
  "layers": [
    {
      "id": "waves",
      "src": "/assets-optimized/backgrounds/advice1/waves-advice1.webp",
      "alt": "Onde sulla battigia",
      "layout": {
        "desktop": {
          "left": "28%",
          "bottom": "-11%",
          "width": "78%",
          "height": "42%",
          "opacity": ".38",
          "z": "2"
        }
      },
      "visual": "waves"
    },
    {
      "id": "sand",
      "src": "/assets-optimized/backgrounds/advice1/foreground-advice1-sand.webp",
      "alt": "Sabbia in primo piano",
      "layout": {
        "desktop": {
          "left": "-3%",
          "bottom": "-31%",
          "width": "106%",
          "height": "59%",
          "opacity": ".5",
          "z": "3"
        }
      },
      "visual": null
    }
  ],
  "trigger": {
    "id": "bucket",
    "label": "Rivela il consiglio",
    "hint": "Il secchio sembra sospettosamente pieno.",
    "asset": "/assets-optimized/objects/advice1/bucket-advice1.webp",
    "layout": {
      "desktop": {
        "left": "46.3%",
        "bottom": "42.6%",
        "width": "clamp(76px, 7vw, 128px)",
        "height": "clamp(102px, 9.4vw, 172px)",
        "z": "25",
        "anchorX": "-50%",
        "origin": "50% 18%"
      },
      "mobile": {
        "left": "48.1%",
        "bottom": "40.2%",
        "width": "15vw",
        "height": "21vw"
      }
    },
    "labelLayout": {
      "desktop": {
        "left": "50%",
        "bottom": "103%"
      }
    },
    "visual": "bucket"
  },
  "effects": [
    {
      "id": "splash",
      "asset": "/assets-optimized/objects/advice1/water-splash-advice1.webp",
      "layout": {
        "desktop": {
          "left": "37.8%",
          "top": "52.4%",
          "width": "22%",
          "height": "36%",
          "z": "28"
        },
        "mobile": {
          "left": "34.2%",
          "top": "53.5%",
          "width": "33%",
          "height": "32%"
        }
      },
      "visual": null
    },
    {
      "id": "droplets",
      "asset": "/assets-optimized/objects/advice1/water-droplets-advice1.webp",
      "layout": {
        "desktop": {
          "left": "25.4%",
          "top": "48.5%",
          "width": "34%",
          "height": "49%",
          "z": "28"
        },
        "mobile": {
          "left": "26.8%",
          "top": "43.9%",
          "width": "48%",
          "height": "43%"
        }
      },
      "visual": null
    },
    {
      "id": "dripping",
      "asset": "/assets-optimized/objects/advice1/water-dripping-advice1.webp",
      "layout": {
        "desktop": {
          "left": "29.2%",
          "top": "60%",
          "width": "12.1%",
          "height": "23.1%",
          "opacity": ".86",
          "z": "28"
        },
        "mobile": {
          "left": "30%",
          "top": "47.5%",
          "width": "20%",
          "height": "23.3%",
          "rotate": "-0.8deg"
        }
      },
      "visual": null
    },
    {
      "id": "exit",
      "asset": "/assets-optimized/objects/advice1/sand-cloud-advice1.webp",
      "layout": {
        "desktop": {
          "right": "8%",
          "bottom": "1%",
          "width": "25%",
          "height": "28%",
          "z": "28"
        }
      },
      "visual": null
    }
  ],
  "props": [
    {
      "id": "towel",
      "label": "Asciugamano",
      "asset": "/assets-optimized/objects/advice1/towel-advice1.webp",
      "decorative": true,
      "layout": {
        "desktop": {
          "left": "-35.8%",
          "bottom": "-25.3%",
          "width": "146.9%",
          "height": "62.4%",
          "z": "1"
        },
        "mobile": {
          "left": "-37.5%",
          "bottom": "1.9%",
          "width": "163.4%",
          "height": "33.8%",
          "rotate": "3.4deg",
          "z": "1"
        }
      },
      "fadeDuringSequence": false,
      "visual": null
    },
    {
      "id": "radio",
      "label": "Radio",
      "asset": "/assets-optimized/objects/advice1/radio-advice1.webp",
      "action": "music",
      "lines": [
        [
          "Ah. Naturalmente la musica era troppo serena. Dovevi intervenire.",
          "annoyed"
        ],
        [
          "Eccoci: solo noi, il rumore del mare e il peso morale delle tue scelte.",
          "fourth-wall"
        ],
        [
          "OH! L'hai riaccesa. Arco di redenzione completato in tre click.",
          "excited"
        ],
        [
          "Aspetta... stai davvero facendo avanti e indietro? È un remix concettuale del silenzio?",
          "suspicious"
        ],
        [
          "Ti prego, basta. Non è un rhythm game e io non ho intenzione di fare la combo.",
          "facepalm"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "12.7%",
          "bottom": "7.2%",
          "width": "8%",
          "height": "11%"
        },
        "mobile": {
          "left": "79%",
          "bottom": "22.9%",
          "width": "22.9%",
          "height": "18%",
          "rotate": "-6.3deg"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "umbrella",
      "label": "Ombrellone",
      "asset": "/assets-optimized/objects/advice1/umbrella-advice1.webp",
      "action": "nudge",
      "lines": [
        [
          "Complimenti. Hai appena sconfitto l'unica cosa che mi separava dal sole.",
          "annoyed"
        ],
        [
          "Perfetto, riaperto. La diplomazia climatica ha avuto successo.",
          "theatrical"
        ],
        [
          "Lo sai che l'ombrellone non sblocca un finale segreto se lo giri abbastanza, vero?",
          "suspicious"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "0.6%",
          "top": "11%",
          "width": "24.2%",
          "height": "82.8%",
          "z": "6"
        },
        "mobile": {
          "left": "-22.8%",
          "top": "10.5%",
          "width": "50.2%",
          "height": "89.8%",
          "rotate": "5.7deg"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "cooler",
      "label": "Frigo portatile",
      "asset": "/assets-optimized/objects/advice1/cooler-closed-advice1.webp",
      "alternateAsset": "/assets-optimized/objects/advice1/cooler-open-advice1.webp",
      "action": "toggle",
      "lines": [
        [
          "Aspetta, fammi sperare: dentro c'è qualcosa di freddo che non sia acqua lanciata contro di me?",
          "excited"
        ],
        [
          "Un cubetto di ghiaccio. Magnifico. Il banchetto degli dei.",
          "annoyed"
        ],
        [
          "No, non si è duplicato. Questo frigo non ha ancora implementato il respawn delle risorse.",
          "suspicious"
        ]
      ],
      "layout": {
        "desktop": {
          "right": "1.6%",
          "bottom": "2.9%",
          "width": "12%",
          "height": "17%"
        },
        "mobile": {
          "right": "0.5%",
          "bottom": "14.8%",
          "width": "19%",
          "height": "15%"
        }
      },
      "fadeDuringSequence": true,
      "visual": null,
      "actionOptions": {
        "target": "ice"
      }
    },
    {
      "id": "ice",
      "label": "Cubetto di ghiaccio",
      "initiallyHidden": true,
      "asset": "/assets-optimized/objects/advice1/ice-cube-advice1.webp",
      "decorative": true,
      "layout": {
        "desktop": {
          "right": "10.5%",
          "bottom": "12%",
          "width": "2.8%",
          "height": "4%",
          "z": "14",
          "opacity": ".92"
        },
        "mobile": {
          "display": "none"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "crab",
      "label": "Granchio",
      "asset": "/assets-optimized/objects/advice1/crab-idle-advice1.webp",
      "alternateAsset": "/assets-optimized/objects/advice1/crab-angry-advice1.webp",
      "action": "toggle",
      "lines": [
        [
          "Oh, lui no. Quello ha già l'aria di chi possiede autorità amministrativa sulla spiaggia.",
          "theatrical"
        ],
        [
          "Vedi quelle chele? Quello è il suo sistema di moderazione. Io non lo provocherei.",
          "smug"
        ],
        [
          "Continua a cliccarlo e finirà per rispettarti... oppure per dichiararti guerra. Cinquanta e cinquanta.",
          "suspicious"
        ]
      ],
      "layout": {
        "desktop": {
          "right": "32.2%",
          "bottom": "10.2%",
          "width": "6%",
          "height": "8%"
        },
        "mobile": {
          "right": "22%",
          "bottom": "20%",
          "width": "10%",
          "height": "7%"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "ball",
      "label": "Pallone da spiaggia",
      "asset": "/assets-optimized/objects/advice1/beach-ball-advice1.webp",
      "action": "bounce",
      "lines": [
        [
          "Un pallone. Benissimo. Sento già materializzarsi una decisione discutibile.",
          "annoyed"
        ],
        [
          "Non tirarlo verso di me. Lo dico con affetto e con una quantità sorprendente di paura.",
          "pointing"
        ],
        [
          "Hai preso il mio avvertimento come una side quest, vero? Certo che sì.",
          "fourth-wall"
        ]
      ],
      "layout": {
        "desktop": {
          "right": "25.1%",
          "bottom": "16.1%",
          "width": "6.5%",
          "height": "9%"
        },
        "mobile": {
          "right": "21%",
          "bottom": "30%",
          "width": "11%",
          "height": "9%"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "sandwich",
      "label": "Panino",
      "asset": "/assets-optimized/objects/advice1/sandwich-advice1.webp",
      "action": "seagull",
      "lines": [
        [
          "Quello... era il mio pranzo. Avevamo dei progetti insieme.",
          "silent-stare"
        ],
        [
          "Va bene. Ogni grande avventura esige un sacrificio. Non pensavo sarebbe stato al prosciutto.",
          "theatrical"
        ],
        [
          "È sparito. Non cerchiamolo. Lascia che io elabori il lutto gastronomico in pace.",
          "exhausted"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "57.6%",
          "bottom": "3.7%",
          "width": "7%",
          "height": "6%"
        },
        "mobile": {
          "left": "83%",
          "bottom": "31.2%",
          "width": "21.2%",
          "height": "10.6%",
          "rotate": "0.9deg"
        }
      },
      "fadeDuringSequence": true,
      "visual": null,
      "actionOptions": {
        "actor": "seagull",
        "target": "sandwich"
      }
    },
    {
      "id": "seagull",
      "label": "Gabbiano",
      "asset": "/assets-optimized/objects/advice1/seagull-advice1.webp",
      "decorative": true,
      "initiallyHidden": true,
      "layout": {
        "desktop": {
          "left": "0",
          "top": "4%",
          "width": "11%",
          "height": "16%",
          "z": "30"
        }
      },
      "fadeDuringSequence": false,
      "visual": null
    },
    {
      "id": "sunglasses",
      "label": "Occhiali da sole",
      "asset": "/assets-optimized/objects/advice1/sunglasses-advice1.webp",
      "action": "nudge",
      "lines": [
        [
          "Ah, sì. Prendiamo anche gli occhiali: tanto oggi la mia dignità ha già perso abbastanza equipaggiamento.",
          "offended"
        ],
        [
          "Rimettili, per favore. Quel sole mi sta guardando con intenzioni che non approvo.",
          "pointing"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "36.6%",
          "bottom": "16.3%",
          "width": "5.2%",
          "height": "6%",
          "z": "11"
        },
        "mobile": {
          "display": "none"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "flipflops",
      "label": "Infradito",
      "asset": "/assets-optimized/objects/advice1/flip-flops-advice1.webp",
      "action": "nudge",
      "lines": [
        [
          "Sono infradito. Non c'è una lore nascosta. Credo.",
          "annoyed"
        ],
        [
          "Eppure continui a interrogarle. Ammiro questa dedizione completamente priva di scopo.",
          "smug"
        ]
      ],
      "layout": {
        "desktop": {
          "right": "26.9%",
          "bottom": "4.2%",
          "width": "7.5%",
          "height": "6.5%"
        },
        "mobile": {
          "display": "none"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    }
  ],
  "mainSequence": [
    {
      "text": "...",
      "portrait": "/assets-optimized/sprites/shared/giulio-silent-stare.webp",
      "sprite": "/assets-optimized/sprites/advice1/giulio-advice1-wet-stare.webp",
      "tone": "silent",
      "keepEffects": [
        "dripping"
      ],
      "layout": "reclined"
    },
    {
      "text": "Avevi un mare intero. Un mare. Immenso. Blu. Perfettamente capace di restare AL SUO POSTO.",
      "portrait": "/assets-optimized/sprites/shared/giulio-annoyed.webp",
      "sprite": "/assets-optimized/sprites/advice1/giulio-advice1-sitting-annoyed.webp",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-01.mp3",
      "keepEffects": [
        "dripping"
      ],
      "layout": "seated"
    },
    {
      "text": "E invece hai deciso che l'acqua dovesse conoscere personalmente la mia faccia. Scelta narrativa audace.",
      "portrait": "/assets-optimized/sprites/shared/giulio-angry.webp",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-02.mp3",
      "keepEffects": [
        "dripping"
      ]
    },
    {
      "text": "Tu sei veramente un—",
      "portrait": "/assets-optimized/sprites/shared/giulio-pointing.webp",
      "sprite": "/assets-optimized/sprites/advice1/giulio-advice1-pointing.webp",
      "tone": "impact",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-03.mp3",
      "keepEffects": [
        "dripping"
      ],
      "layout": "seated"
    },
    {
      "text": "Ah.",
      "portrait": "/assets-optimized/sprites/shared/giulio-realisation.webp",
      "sprite": "/assets-optimized/sprites/advice1/giulio-advice1-realisation.webp",
      "tone": "switch",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-04.mp3",
      "layout": "seated"
    },
    {
      "text": "Aspetta. Io dovrei... sì. Il consiglio. La pagina dei consigli. Giusto.",
      "portrait": "/assets-optimized/sprites/shared/giulio-embarrassed.webp",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-05.mp3"
    },
    {
      "text": "BENVENUTA, VIANDANTE! Hai disturbato il mio riposo e quindi, per antica legge non scritta, riceverai saggezza!",
      "portrait": "/assets-optimized/sprites/shared/giulio-excited.webp",
      "sprite": "/assets-optimized/sprites/advice1/giulio-advice1-theatrical.webp",
      "tone": "theatrical",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-06.mp3",
      "layout": "seated"
    },
    {
      "text": "Dinanzi a te siede Giulio, custode di misteri, narratore di destini e, da circa trenta secondi, creatura anfibia.",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-07.mp3"
    },
    {
      "text": "Non preoccuparti per me. L'acqua salata tempra lo spirito. Credo. Sicuramente rovina i capelli.",
      "portrait": "/assets-optimized/sprites/shared/giulio-exhausted.webp",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-08.mp3"
    },
    {
      "text": "Ora, silenzio! Che il primo indizio venga proclamato come merita!",
      "portrait": "/assets-optimized/sprites/shared/giulio-pointing.webp",
      "tone": "impact",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-09.mp3"
    },
    {
      "text": "Non sono un sasso qualunque che trovi per strada,",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "tone": "advice"
    },
    {
      "text": "ma una pietra gigante che la storia ha sfiorata.",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "tone": "advice"
    },
    {
      "text": "Se la caccia al tesoro vuoi far proseguire,",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "tone": "advice"
    },
    {
      "text": "davanti a questo grande masso devi venire!",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "tone": "advice"
    },
    {
      "text": "E COSÌ PARLÒ IL CUSTODE! Primo frammento di destino consegnato con una dignità sorprendentemente intatta.",
      "portrait": "/assets-optimized/sprites/shared/giulio-proud.webp",
      "sprite": "/assets-optimized/sprites/advice1/giulio-advice1-finish.webp",
      "tone": "theatrical",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-10.mp3",
      "layout": "upright"
    },
    {
      "text": "Io, nel frattempo, vado a cercare un asciugamano... e a mettere quel secchio sotto sorveglianza speciale.",
      "portrait": "/assets-optimized/sprites/shared/giulio-suspicious.webp",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-11.mp3"
    },
    {
      "text": "AVANTI! CHE LA CACCIA ABBIA INIZIO!",
      "portrait": "/assets-optimized/sprites/shared/giulio-exit-grin.webp",
      "sprite": "/assets-optimized/sprites/advice1/giulio-advice1-exit.webp",
      "tone": "exit",
      "voice": "/assets/audio/voices/giulio/advice1/voice-advice1-main-12.mp3",
      "layout": "exit"
    }
  ],
  "theme": "beach",
  "backgroundStyle": {
    "desktop": {
      "position": "50% 54%",
      "filter": "saturate(1.12) contrast(1.05) brightness(.98)"
    }
  },
  "contentScale": {
    "desktop": "1",
    "mobile": "1"
  },
  "character": {
    "initial": {
      "src": "/assets-optimized/sprites/advice1/giulio-advice1-sleeping.webp",
      "layout": "lying"
    },
    "hover": {
      "src": "/assets-optimized/sprites/advice1/giulio-advice1-eye-open.webp",
      "layout": "lying"
    },
    "layouts": {
      "lying": {
        "desktop": {
          "left": "39.9%",
          "bottom": "0.7%",
          "width": "min(57vw, 1000px)",
          "height": "56%",
          "anchorX": "-50%"
        },
        "mobile": {
          "left": "34.6%",
          "bottom": "15.5%",
          "width": "61.6vw",
          "height": "33.6%",
          "anchorX": "-50%",
          "rotate": "-1.9deg"
        }
      },
      "reclined": {
        "desktop": {
          "left": "41.7%",
          "bottom": "2.3%",
          "width": "min(48vw, 850px)",
          "height": "59%",
          "anchorX": "-50%"
        },
        "mobile": {
          "left": "36.3%",
          "bottom": "16.5%",
          "width": "76vw",
          "height": "49%",
          "anchorX": "-50%"
        }
      },
      "seated": {
        "desktop": {
          "left": "38.4%",
          "bottom": "0%",
          "width": "min(38vw, 690px)",
          "height": "65%",
          "anchorX": "-50%"
        },
        "mobile": {
          "left": "50%",
          "bottom": "17%",
          "width": "62vw",
          "height": "53%",
          "anchorX": "-50%"
        }
      },
      "upright": {
        "desktop": {
          "left": "39.3%",
          "bottom": "2.7%",
          "width": "min(31vw, 560px)",
          "height": "70%",
          "anchorX": "-50%"
        },
        "mobile": {
          "left": "50%",
          "bottom": "17%",
          "width": "53vw",
          "height": "57%",
          "anchorX": "-50%"
        }
      },
      "exit": {
        "desktop": {
          "left": "42.7%",
          "bottom": "-0.9%",
          "width": "29.5%",
          "height": "46%",
          "anchorX": "-50%"
        },
        "mobile": {
          "left": "42%",
          "bottom": "17%",
          "width": "66vw",
          "height": "52%",
          "anchorX": "-50%"
        }
      }
    },
  },
  "animation": {
    "type": "beachSplash",
    "impactSprite": {
      "src": "/assets-optimized/sprites/advice1/giulio-advice1-splashed.webp",
      "layout": "lying"
    },
    "exit": {
      "effect": "exit",
      "sfx": "exit"
    }
  }
};

export default Object.freeze(scene);
