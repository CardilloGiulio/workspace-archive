const scene = {
  "id": "advice2",
  "number": "02",
  "title": "Gravità applicata",
  "location": "Sotto l'albero",
  "background": "/assets-optimized/backgrounds/advice2/background-advice2-tree.webp",
  "backgroundFallback": "fallback-tree",
  "music": null,
  "sfx": {},
  "audioSkipped": true,
  "layers": [
    {
      "id": "leaves",
      "src": "/assets-optimized/backgrounds/advice2/leaves-advice2.webp",
      "alt": "Rami e foglie",
      "layout": {
        "desktop": {
          "left": "-4%",
          "top": "-8%",
          "width": "59%",
          "height": "48%",
          "opacity": ".36",
          "z": "2"
        }
      },
      "visual": "treeLeaves"
    },
    {
      "id": "grass",
      "src": "/assets-optimized/backgrounds/advice2/foreground-advice2-grass.webp",
      "alt": "Erba in primo piano",
      "layout": {
        "desktop": {
          "left": "-2%",
          "bottom": "-5%",
          "width": "104%",
          "height": "24%",
          "opacity": ".62",
          "z": "3"
        }
      },
      "visual": null
    }
  ],
  "trigger": {
    "id": "apple",
    "label": "Rivela il consiglio",
    "hint": "Una mela attende il proprio momento scientifico.",
    "asset": "/assets-optimized/objects/advice2/apple-hanging-advice2.webp",
    "layout": {
      "desktop": {
        "left": "49%",
        "top": "11%",
        "width": "36%",
        "height": "14%",
        "z": "25",
        "anchorX": "-50%"
      },
      "mobile": {
        "left": "39%",
        "top": "10.1%",
        "width": "66%",
        "height": "12%"
      }
    },
    "labelLayout": {
      "desktop": {
        "left": "70%",
        "bottom": "-34%"
      },
      "mobile": {
        "left": "70%",
        "bottom": "-48%"
      }
    },
    "visual": "apple"
  },
  "effects": [
    {
      "id": "fallingApple",
      "asset": "/assets-optimized/objects/advice2/apple-falling-advice2.webp",
      "layout": {
        "desktop": {
          "left": "53%",
          "top": "46%",
          "width": "15%",
          "height": "23%",
          "z": "28"
        },
        "mobile": {
          "left": "53%",
          "top": "43%",
          "width": "25%",
          "height": "20%"
        }
      },
      "visual": null
    },
    {
      "id": "impact",
      "asset": "/assets-optimized/objects/advice2/apple-impact-advice2.webp",
      "layout": {
        "desktop": {
          "left": "48%",
          "top": "43%",
          "width": "19%",
          "height": "29%",
          "z": "28"
        },
        "mobile": {
          "left": "29.6%",
          "top": "52.9%",
          "width": "40.4%",
          "height": "32.6%",
          "rotate": "-4.2deg"
        }
      },
      "visual": null
    },
    {
      "id": "stars",
      "asset": "/assets-optimized/objects/advice2/impact-stars-advice2.webp",
      "layout": {
        "desktop": {
          "left": "50%",
          "top": "42%",
          "width": "16%",
          "height": "25%",
          "z": "28"
        },
        "mobile": {
          "left": "39.2%",
          "top": "55.6%",
          "width": "34.9%",
          "height": "28.6%",
          "rotate": "-1.2deg"
        }
      },
      "visual": null
    },
    {
      "id": "leaves",
      "asset": "/assets-optimized/objects/advice2/falling-leaves-advice2.webp",
      "layout": {
        "desktop": {
          "left": "12%",
          "top": "18%",
          "width": "29%",
          "height": "45%",
          "z": "28"
        }
      },
      "visual": null
    },
    {
      "id": "gravity",
      "asset": "/assets-optimized/objects/advice2/gravity-diagram-advice2.webp",
      "layout": {
        "desktop": {
          "right": "5%",
          "top": "22%",
          "width": "22%",
          "height": "33%",
          "z": "28"
        },
        "mobile": {
          "right": "16%",
          "top": "-5%",
          "width": "67.3%",
          "height": "100.8%",
          "rotate": "-0.1deg",
          "z": "17"
        }
      },
      "visual": "gravity"
    },
    {
      "id": "exit",
      "asset": "/assets-optimized/objects/advice2/exit-dust-advice2.webp",
      "layout": {
        "desktop": {
          "right": "4%",
          "bottom": "1%",
          "width": "28%",
          "height": "27%",
          "z": "28"
        }
      },
      "visual": null
    }
  ],
  "props": [
    {
      "id": "picnic",
      "label": "Telo da picnic",
      "asset": "/assets-optimized/objects/advice2/picnic-cloth-advice2.webp",
      "decorative": true,
      "layout": {
        "desktop": {
          "left": "-25.8%",
          "bottom": "-10.3%",
          "width": "79.4%",
          "height": "47.6%",
          "z": "4"
        },
        "mobile": {
          "left": "47%",
          "bottom": "15.7%",
          "width": "92.2%",
          "height": "31.8%",
          "rotate": "0.8deg"
        }
      },
      "fadeDuringSequence": false,
      "visual": null
    },
    {
      "id": "basket",
      "label": "Cesto di mele",
      "asset": "/assets-optimized/objects/advice2/apple-basket-advice2.webp",
      "action": "nudge",
      "lines": [
        [
          "No. Quel cesto ha già fornito abbastanza munizioni alla ricerca scientifica.",
          "silent-stare"
        ],
        [
          "Esperimento concluso: mela più gravità più Giulio uguale dolore. Abbiamo i dati.",
          "pointing"
        ],
        [
          "Le mele superstiti passano ufficialmente sotto la mia protezione. Nessun'altra vittima.",
          "theatrical"
        ]
      ],
      "layout": {
        "desktop": {
          "right": "19.2%",
          "bottom": "28%",
          "width": "11.5%",
          "height": "16%"
        },
        "mobile": {
          "right": "-0.1%",
          "bottom": "33.4%",
          "width": "19%",
          "height": "14%",
          "z": "14"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "book",
      "label": "Libro",
      "asset": "/assets-optimized/objects/advice2/book-closed-advice2.webp",
      "alternateAsset": "/assets-optimized/objects/advice2/book-open-advice2.webp",
      "action": "toggle",
      "lines": [
        [
          "Oh! Adesso la lettura interessa. Meraviglioso sviluppo dopo la lezione pratica a base di trauma cranico.",
          "smug"
        ],
        [
          "Sai, esistono libri interi che spiegano la gravità senza richiedere di colpire il lettore.",
          "annoyed"
        ],
        [
          "Voltare pagina è culturalmente apprezzabile, ma non cancella il reato della mela.",
          "suspicious"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "3.5%",
          "bottom": "15.7%",
          "width": "10.5%",
          "height": "11%",
          "z": "12"
        },
        "mobile": {
          "left": "67.9%",
          "bottom": "29.6%",
          "width": "18%",
          "height": "11%"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "bird",
      "label": "Uccellino",
      "asset": "/assets-optimized/objects/advice2/bird-idle-advice2.webp",
      "alternateAsset": "/assets-optimized/objects/advice2/bird-flying-advice2.webp",
      "action": "toggle",
      "lines": [
        [
          "Lascialo fuori da questa storia. È l'unico qui con una fedina penale pulita.",
          "pointing"
        ],
        [
          "Mi sta guardando come un critico letterario davanti a un secondo atto confuso.",
          "fourth-wall"
        ],
        [
          "Ha chiesto di essere rimosso dai credits finché non migliorano le condizioni di lavoro.",
          "exhausted"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "13.5%",
          "top": "25.1%",
          "width": "6.5%",
          "height": "11%"
        },
        "mobile": {
          "left": "10.8%",
          "top": "29.6%",
          "width": "11%",
          "height": "9%"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "tree",
      "label": "Tronco dell'albero",
      "action": "tree",
      "hotspot": true,
      "render": "css",
      "lines": [
        [
          "...",
          "silent-stare"
        ],
        [
          "Adesso stai interrogando l'albero. Perfetto. La nostra indagine si allarga al regno vegetale.",
          "annoyed"
        ],
        [
          "Non risponderà. È un tronco, non Virgilio: non può guidarti fuori da questa selva.",
          "fourth-wall"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "22.2%",
          "top": "6.2%",
          "width": "25%",
          "height": "55%",
          "z": "13"
        },
        "mobile": {
          "left": "70%",
          "width": "31%",
          "top": "1%"
        }
      },
      "fadeDuringSequence": false,
      "visual": "treeHotspot",
      "actionOptions": {
        "layer": "leaves",
        "effect": "leaves"
      }
    },
    {
      "id": "squirrel",
      "label": "Scoiattolo",
      "asset": "/assets-optimized/objects/advice2/squirrel-advice2.webp",
      "action": "bounce",
      "lines": [
        [
          "Lui ha visto tutto. E ho la netta sensazione che abbia già scelto da che parte stare.",
          "silent-stare"
        ],
        [
          "Fantastico. Io prendo una mela in testa e lo scoiattolo giudica ME. Processo imparziale.",
          "offended"
        ]
      ],
      "layout": {
        "desktop": {
          "right": "91.8%",
          "bottom": "58.6%",
          "width": "6.5%",
          "height": "10%"
        },
        "mobile": {
          "right": "75.4%",
          "bottom": "43.7%",
          "width": "11%",
          "height": "8%"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "notebook",
      "label": "Quaderno",
      "asset": "/assets-optimized/objects/advice2/notebook-advice2.webp",
      "action": "nudge",
      "lines": [
        [
          "Apprezzo molto questa improvvisa estetica da studente diligente.",
          "smug"
        ],
        [
          "Scrivi pure: «non usare la frutta come strumento pedagogico». Sottolinealo due volte.",
          "pointing"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "15%",
          "bottom": "13.9%",
          "width": "8.5%",
          "height": "9%",
          "z": "12"
        },
        "mobile": {
          "display": "none"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "pencil",
      "label": "Matita",
      "asset": "/assets-optimized/objects/advice2/pencil-advice2.webp",
      "action": "nudge",
      "lines": [
        [
          "Una matita! Finalmente un oggetto educativo che normalmente non arriva dal cielo.",
          "happy"
        ],
        [
          "Ti vedo pensare. No. Non trasformiamo anche la matita in un test di balistica.",
          "suspicious"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "23.5%",
          "bottom": "3.2%",
          "width": "3.3%",
          "height": "7%",
          "z": "13"
        },
        "mobile": {
          "display": "none"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "flowers",
      "label": "Fiori",
      "asset": "/assets-optimized/objects/advice2/flowers-advice2.webp",
      "action": "nudge",
      "lines": [
        [
          "Guarda: delicati, tranquilli, belli... e soprattutto incapaci di colpirmi sulla fronte.",
          "happy"
        ],
        [
          "Per il momento vincono loro il premio «presenza più rassicurante della scena».",
          "proud"
        ]
      ],
      "layout": {
        "desktop": {
          "right": "3.8%",
          "bottom": "7%",
          "width": "13.6%",
          "height": "20.7%",
          "z": "5"
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
      "sprite": "/assets-optimized/sprites/advice2/giulio-advice2-apple-stare.webp",
      "tone": "silent",
      "layout": "seated"
    },
    {
      "text": "Dimmi, per pura curiosità scientifica: che cosa pensavi sarebbe successo?",
      "portrait": "/assets-optimized/sprites/shared/giulio-annoyed.webp",
      "sprite": "/assets-optimized/sprites/advice2/giulio-advice2-holding-head.webp",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-01.mp3",
      "layout": "seated"
    },
    {
      "text": "Che una mela in testa mi avrebbe sbloccato Newton come abilità passiva e fatto calcolare la rotazione terrestre?",
      "portrait": "/assets-optimized/sprites/shared/giulio-offended.webp",
      "sprite": "/assets-optimized/sprites/advice2/giulio-advice2-apple-pointing.webp",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-02.mp3",
      "layout": "seated"
    },
    {
      "text": "Potremmo sperimentare una tecnologia rivoluzionaria chiamata «parlare» prima di lanciarmi altra frutta.",
      "portrait": "/assets-optimized/sprites/shared/giulio-pointing.webp",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-03.mp3"
    },
    {
      "text": "Sono una persona, non una dimostrazione interattiva di fisica con hitbox.",
      "portrait": "/assets-optimized/sprites/shared/giulio-fourth-wall.webp",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-04.mp3"
    },
    {
      "text": "Aspetta.",
      "portrait": "/assets-optimized/sprites/shared/giulio-realisation.webp",
      "sprite": "/assets-optimized/sprites/advice2/giulio-advice2-realisation.webp",
      "tone": "switch",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-05.mp3",
      "layout": "upright"
    },
    {
      "text": "Il consiglio. Giusto. C'è sempre il consiglio a salvarmi da queste situazioni.",
      "portrait": "/assets-optimized/sprites/shared/giulio-excited.webp",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-06.mp3"
    },
    {
      "text": "ALLORA IL FRUTTO NON È CADUTO INVANO! Che il dolore venga convertito in conoscenza!",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "sprite": "/assets-optimized/sprites/advice2/giulio-advice2-theatrical.webp",
      "tone": "theatrical",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-07.mp3",
      "showEffect": "gravity",
      "layout": "upright"
    },
    {
      "text": "Poiché, come la gravità richiama la mela verso la Terra, così il destino richiama voi verso—",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-08.mp3"
    },
    {
      "text": "...No. Petrarca aveva il dissidio interiore; io ho appena avuto il dissidio tra continuare questa metafora e salvarmi la reputazione.",
      "portrait": "/assets-optimized/sprites/shared/giulio-embarrassed.webp",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-09.mp3"
    },
    {
      "text": "RICOMINCIAMO DA CAPO, CON PIÙ DIGNITÀ!",
      "portrait": "/assets-optimized/sprites/shared/giulio-excited.webp",
      "tone": "impact",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-10.mp3"
    },
    {
      "text": "Qui la dolcezza la fa da padrona,c'è sempre qualcosa che sa di buono e stuzzica la gola!",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "tone": "advice"
    },
    {
      "text": "Cerca tra i colori e i dolciumi a più non posso,",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "tone": "advice"
    },
    {
      "text": "il prossimo indizio ha il sapore di un lecca-lecca rosso.",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "tone": "advice"
    },
    {
      "text": "E LA CONOSCENZA FIORISCE! Preferibilmente senza altra frutta in caduta libera.",
      "portrait": "/assets-optimized/sprites/shared/giulio-proud.webp",
      "sprite": "/assets-optimized/sprites/advice2/giulio-advice2-finish.webp",
      "tone": "theatrical",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-11.mp3",
      "layout": "upright"
    },
    {
      "text": "No. Non provare a vedere se funziona una seconda volta.",
      "portrait": "/assets-optimized/sprites/shared/giulio-silent-stare.webp",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-12.mp3"
    },
    {
      "text": "SCOPERTA COMPLETATA! IO MI RITIRO PRIMA CHE ARRIVI UNA PERA!",
      "portrait": "/assets-optimized/sprites/shared/giulio-exit-grin.webp",
      "sprite": "/assets-optimized/sprites/advice2/giulio-advice2-exit.webp",
      "tone": "exit",
      "voice": "/assets/audio/voices/giulio/advice2/voice-advice2-main-13.mp3",
      "layout": "exit"
    }
  ],
  "theme": "tree",
  "backgroundStyle": {
    "desktop": {
      "position": "50% 57%",
      "filter": "saturate(1.03) contrast(1.03) brightness(.96)"
    }
  },
  "contentScale": {
    "desktop": "1",
    "mobile": "1"
  },
  "character": {
    "initial": {
      "src": "/assets-optimized/sprites/advice2/giulio-advice2-sleeping.webp",
      "layout": "lying"
    },
    "hover": null,
    "layouts": {
      "lying": {
        "desktop": {
          "left": "49%",
          "bottom": "2.8%",
          "width": "min(50vw, 890px)",
          "height": "55%",
          "anchorX": "-50%"
        },
        "mobile": {
          "left": "28.4%",
          "bottom": "14.7%",
          "width": "86vw",
          "height": "48%",
          "anchorX": "-50%"
        }
      },
      "seated": {
        "desktop": {
          "left": "51.2%",
          "bottom": "0.8%",
          "width": "34.1%",
          "height": "55.1%",
          "anchorX": "-50%"
        },
        "mobile": {
          "left": "48%",
          "bottom": "17%",
          "width": "67vw",
          "height": "54%",
          "anchorX": "-50%"
        }
      },
      "upright": {
        "desktop": {
          "left": "53.6%",
          "bottom": "3.8%",
          "width": "min(32vw, 580px)",
          "height": "70%",
          "anchorX": "-50%"
        },
        "mobile": {
          "left": "49%",
          "bottom": "17%",
          "width": "55vw",
          "height": "59%",
          "anchorX": "-50%"
        }
      },
      "exit": {
        "desktop": {
          "left": "63.2%",
          "bottom": "6.6%",
          "width": "27.5%",
          "height": "53.4%",
          "anchorX": "-50%"
        },
        "mobile": {
          "left": "43%",
          "bottom": "17%",
          "width": "60vw",
          "height": "57%",
          "anchorX": "-50%"
        }
      }
    },
  },
  "animation": {
    "type": "treeApple",
    "impactSprite": {
      "src": "/assets-optimized/sprites/advice2/giulio-advice2-impact.webp",
      "layout": "lying"
    },
    "exit": {
      "effect": "exit",
      "sfx": "exit"
    }
  }
};

export default Object.freeze(scene);
