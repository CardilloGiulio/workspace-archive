const scene = {
  "id": "advice3",
  "number": "03",
  "title": "Arresto imprevisto",
  "location": "Postazione PC",
  "background": "/assets-optimized/backgrounds/advice3/background-advice3-computer-room.webp",
  "backgroundFallback": "fallback-computer",
  "music": "/assets/audio/music/music-advice3-computer.mp3",
  "sfx": {
    "unplug": "/assets/audio/effects/advice3/charger-unplug-advice3.mp3",
    "shutdown": "/assets/audio/effects/advice3/computer-shutdown-advice3.mp3",
    "chairTurn": "/assets/audio/effects/advice3/chair-turn-advice3.mp3",
    "chairExit": "/assets/audio/effects/advice3/chair-roll-advice3.mp3"
  },
  "layers": [
    {
      "id": "dark",
      "src": "/assets-optimized/backgrounds/advice3/overlay-advice3-dark-room.webp",
      "alt": "Stanza oscurata",
      "initiallyHidden": true,
      "layout": {
        "desktop": {
          "left": "0",
          "top": "0",
          "width": "100%",
          "height": "100%",
          "opacity": ".28",
          "z": "3"
        }
      },
      "visual": "dark"
    }
  ],
  "hidePropsOnStart": [
    "chair"
  ],
  "trigger": {
    "id": "charger",
    "label": "Rivela il consiglio",
    "hint": "Quel cavo sembra essenziale. Naturalmente.",
    "render": "css",
    "layout": {
      "desktop": {
        "left": "41.8%",
        "top": "68.9%",
        "width": "16.9%",
        "height": "14%",
        "z": "13",
        "origin": "0 45%",
        "rotate": "143.9deg"
      },
      "mobile": {
        "left": "29.4%",
        "top": "40.1%",
        "width": "42%",
        "height": "24.5%",
        "rotate": "135.1deg"
      }
    },
    "labelLayout": {
      "desktop": {
        "left": "63%",
        "bottom": "38%",
        "maxWidth": "190px",
        "fontSize": "clamp(.68rem, 1vw, .9rem)"
      },
      "mobile": {
        "left": "66%",
        "bottom": "1%",
        "maxWidth": "105px",
        "padding": "5px 7px",
        "borderWidth": "3px",
        "shadow": "3px 3px 0 var(--yellow)",
        "fontSize": ".64rem"
      }
    },
    "visual": "charger"
  },
  "effects": [
    {
      "id": "electric",
      "asset": "/assets-optimized/objects/advice3/electric-pop-advice3.webp",
      "layout": {
        "desktop": {
          "left": "42%",
          "top": "61%",
          "width": "6.5%",
          "height": "10%",
          "z": "28"
        },
        "mobile": {
          "left": "35.1%",
          "top": "20.9%",
          "width": "56.8%",
          "height": "46.5%",
          "rotate": "18.4deg"
        }
      },
      "visual": null
    }
  ],
  "props": [
    {
      "id": "laptop",
      "label": "Computer portatile",
      "asset": "/assets-optimized/objects/advice3/generated/laptop-on-trimmed.webp",
      "alternateAsset": "/assets-optimized/objects/advice3/generated/laptop-off-trimmed.webp",
      "action": "laptop",
      "lines": [
        [
          "Ah, il paziente. Bello, elegante, completamente privo di corrente.",
          "silent-stare"
        ],
        [
          "Sì, è ancora scollegato. L'hardware non si nutre della nostra speranza.",
          "annoyed"
        ],
        [
          "Premere più forte non genera watt. Te lo dico da sviluppatore e da persona affezionata alla tastiera.",
          "pointing"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "36.6%",
          "top": "49.1%",
          "width": "25%",
          "height": "31.9%",
          "z": "12",
          "rotate": "-30.7deg",
          "origin": "center bottom"
        },
        "mobile": {
          "left": "33.1%",
          "top": "27.8%",
          "width": "42.1%",
          "height": "26.9%",
          "rotate": "-32.5deg"
        }
      },
      "fadeDuringSequence": false,
      "visual": "laptop"
    },
    {
      "id": "chair",
      "label": "Sedia da ufficio",
      "asset": "/assets-optimized/objects/advice3/chair-advice3.webp",
      "action": "nudge",
      "lines": [
        [
          "Quella è la mia scialuppa di salvataggio ergonomica. Trattala con rispetto.",
          "suspicious"
        ],
        [
          "Non cambiare l'altezza: ho calibrato perfettamente postura, rotazione e livello di teatralità.",
          "theatrical"
        ]
      ],
      "layout": {
        "desktop": {
          "display": "none"
        },
        "mobile": {
          "display": "none"
        }
      },
      "fadeDuringSequence": false,
      "visual": null
    },
    {
      "id": "lamp",
      "label": "Interruttore della luce",
      "asset": "/assets-optimized/objects/advice3/lamp-on-advice3.webp",
      "alternateAsset": "/assets-optimized/objects/advice3/lamp-off-advice3.webp",
      "action": "dark",
      "lines": [
        [
          "Certo. Togliamo anche la luce. Completiamo il pacchetto «sviluppo in modalità grotta».",
          "annoyed"
        ],
        [
          "Magnifico. Ora il computer è spento e pure io sto per perdere il rendering della stanza.",
          "theatrical"
        ],
        [
          "AH! Fotoni! La civiltà ritorna!",
          "excited"
        ],
        [
          "Aspetta... acceso, spento, acceso, spento. Stai facendo debug della lampadina?",
          "suspicious"
        ]
      ],
      "layout": {
        "desktop": {
          "right": "35.5%",
          "top": "-34.4%",
          "width": "3.6%",
          "height": "8.5%",
          "z": "10"
        },
        "mobile": {
          "right": "2%",
          "top": "25%",
          "width": "5%",
          "height": "6%"
        }
      },
      "fadeDuringSequence": true,
      "visual": null,
      "actionOptions": {
        "layer": "dark"
      }
    },
    {
      "id": "headphones",
      "label": "Cuffie",
      "asset": "/assets-optimized/objects/advice3/headphones-advice3.webp",
      "action": "nudge",
      "lines": [
        [
          "Quelle non sono decorazioni: sono il muro diplomatico tra me e il resto del mondo quando programmo.",
          "annoyed"
        ],
        [
          "Tolte le cuffie sento tutto. Persino il silenzio del computer morto. Terrificante.",
          "fourth-wall"
        ],
        [
          "Rimettimele prima che l'interfaccia inizi a parlarmi e io le risponda sul serio.",
          "suspicious"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "15.4%",
          "top": "61.5%",
          "width": "8.8%",
          "height": "15%",
          "z": "13",
          "rotate": "-37.7deg"
        },
        "mobile": {
          "left": "1.4%",
          "top": "13.5%",
          "width": "27.1%",
          "height": "20.4%",
          "rotate": "-13deg",
          "z": "10"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "mug",
      "label": "Tazza",
      "asset": "/assets-optimized/objects/advice3/mug-advice3.webp",
      "action": "wobble",
      "lines": [
        [
          "No. Quella tazza è infrastruttura critica.",
          "silent-stare"
        ],
        [
          "Il PC è caduto in battaglia; il caffè resiste. La produzione può ancora ripartire.",
          "theatrical"
        ],
        [
          "A questo punto la caffeina è letteralmente l'unico servizio con uptime decente nella stanza.",
          "pointing"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "26.1%",
          "top": "49.5%",
          "width": "9.7%",
          "height": "16.9%",
          "z": "13",
          "rotate": "-3deg"
        },
        "mobile": {
          "left": "53.5%",
          "top": "54%",
          "width": "5.7%",
          "height": "5.2%"
        }
      },
      "fadeDuringSequence": false,
      "visual": null
    },
    {
      "id": "fan",
      "label": "Ventilatore",
      "asset": "/assets-optimized/objects/advice3/fan-off-advice3.webp",
      "alternateAsset": "/assets-optimized/objects/advice3/fan-on-advice3.webp",
      "action": "fan",
      "lines": [
        [
          "Oh! Finalmente una macchina che comprende la mia esigenza primaria: non sciogliermi mentre penso.",
          "happy"
        ],
        [
          "E naturalmente lo spegni. La fortuna cambia, io soffro, Machiavelli annuisce da qualche parte.",
          "offended"
        ],
        [
          "Non trasformiamo anche il ventilatore in un dibattito filosofico. O gira o non gira.",
          "facepalm"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "82.7%",
          "top": "-16.2%",
          "width": "11.6%",
          "height": "28.2%",
          "z": "9"
        },
        "mobile": {
          "top": "-3.7%",
          "width": "21.1%",
          "height": "28.2%",
          "left": "98.2%",
          "rotate": "1.1deg"
        }
      },
      "fadeDuringSequence": true,
      "visual": "fan"
    },
    {
      "id": "note",
      "label": "Post-it",
      "asset": "/assets-optimized/objects/advice3/sticky-note-advice3.webp",
      "action": "nudge",
      "lines": [
        [
          "Quel foglietto contiene conoscenza proibita. O la lista della spesa. Il confine è sottile.",
          "smug"
        ],
        [
          "Dice «NON SCOLLEGARE IL COMPUTER». Interessante documento storico.",
          "pointing"
        ],
        [
          "Che tempismo meraviglioso scoprirlo solo dopo l'evento che intendeva prevenire.",
          "fourth-wall"
        ]
      ],
      "layout": {
        "desktop": {
          "right": "38%",
          "top": "-36.8%",
          "width": "8.7%",
          "height": "16.4%",
          "z": "10",
          "rotate": "1.5deg"
        },
        "mobile": {
          "right": "40.3%",
          "top": "-15.7%",
          "width": "18.8%",
          "height": "18.8%",
          "rotate": "1.3deg"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "notebooks",
      "label": "Libri",
      "asset": "/assets-optimized/objects/advice3/notebooks-advice3.webp",
      "action": "nudge",
      "lines": [
        [
          "Documentazione! Il boss segreto di chi preferisce cliccare finché qualcosa funziona.",
          "smug"
        ],
        [
          "No, purtroppo nessun capitolo si intitola «Come alimentare un laptop tramite pura determinazione».",
          "annoyed"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "59.1%",
          "top": "19.4%",
          "width": "12.3%",
          "height": "16.4%",
          "z": "10",
          "rotate": "-2deg"
        },
        "mobile": {
          "left": "65.6%",
          "top": "-0.8%",
          "width": "29.4%",
          "height": "21.9%",
          "rotate": "-7deg"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "pens",
      "label": "Portapenne",
      "asset": "/assets-optimized/objects/advice3/pen-holder-advice3.webp",
      "action": "nudge",
      "lines": [
        [
          "Vedi? Le penne funzionano senza batteria, account, update o licenza. Tecnologia immortale.",
          "happy"
        ],
        [
          "Le forbici restano lì. Abbiamo già superato la quota giornaliera di incidenti assurdi.",
          "suspicious"
        ]
      ],
      "layout": {
        "desktop": {
          "left": "43.7%",
          "top": "23.7%",
          "width": "8.4%",
          "height": "22.8%",
          "z": "10"
        },
        "mobile": {
          "left": "25.1%",
          "top": "20.2%",
          "width": "16.3%",
          "height": "20.3%",
          "rotate": "-3.4deg"
        }
      },
      "fadeDuringSequence": true,
      "visual": null
    },
    {
      "id": "power",
      "label": "Ciabatta elettrica",
      "asset": "/assets-optimized/objects/advice3/power-strip-advice3.webp",
      "action": "nudge",
      "lines": [
        [
          "ECCOLA. La sorgente mistica dei volt. Guardare, comprendere, non toccare.",
          "pointing"
        ],
        [
          "...Ho appena detto «non toccare» davanti a te. Ho praticamente premuto il pulsante da solo.",
          "exhausted"
        ]
      ],
      "layout": {
        "desktop": {
          "right": "64.8%",
          "bottom": "-3.6%",
          "width": "14.4%",
          "height": "16.3%",
          "z": "11",
          "rotate": "-8deg"
        },
        "mobile": {
          "right": "8%",
          "bottom": "18%",
          "width": "12%",
          "height": "7%"
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
      "sprite": "/assets-optimized/sprites/advice3/giulio-advice3-silent-stare.webp",
      "tone": "silent",
      "layout": "seated"
    },
    {
      "text": "Vaffa—",
      "portrait": "/assets-optimized/sprites/shared/giulio-angry.webp",
      "sprite": "/assets-optimized/sprites/advice3/giulio-advice3-pointing.webp",
      "tone": "impact",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-01.mp3",
      "layout": "upright"
    },
    {
      "text": "...Oh.",
      "portrait": "/assets-optimized/sprites/shared/giulio-realisation.webp",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-02.mp3"
    },
    {
      "text": "La pagina dei consigli. Certo. Naturalmente il computer sceglie proprio QUESTO momento per morire.",
      "portrait": "/assets-optimized/sprites/shared/giulio-fourth-wall.webp",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-03.mp3"
    },
    {
      "text": "Va bene. Respira. Nessun commit è stato perso. Credo. Spero. Signore, fa' che l'autosalvataggio abbia funzionato.",
      "portrait": "/assets-optimized/sprites/shared/giulio-annoyed.webp",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-04.mp3"
    },
    {
      "text": "Ugh... tra acqua, mele e adesso sabotaggio informatico, questa caccia sta accumulando debito tecnico sulla mia anima.",
      "portrait": "/assets-optimized/sprites/shared/giulio-exhausted.webp",
      "sprite": "/assets-optimized/sprites/advice3/giulio-advice3-exhausted.webp",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-05.mp3",
      "layout": "seated"
    },
    {
      "text": "Tre pagine. Tre incidenti. A questo punto non è più sfortuna: è una feature ricorrente.",
      "portrait": "/assets-optimized/sprites/shared/giulio-fourth-wall.webp",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-06.mp3"
    },
    {
      "text": "MA NON IMPORTA!",
      "portrait": "/assets-optimized/sprites/shared/giulio-excited.webp",
      "sprite": "/assets-optimized/sprites/advice3/giulio-advice3-realisation.webp",
      "tone": "switch",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-07.mp3",
      "layout": "upright"
    },
    {
      "text": "Se Machiavelli insegna qualcosa, è che quando la fortuna cambia bisogna cambiare metodo: niente corrente? Si procede in analogico!",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "sprite": "/assets-optimized/sprites/advice3/giulio-advice3-theatrical.webp",
      "tone": "theatrical",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-08.mp3",
      "layout": "upright"
    },
    {
      "text": "...Quella frase aveva molta più autorità nella mia testa.",
      "portrait": "/assets-optimized/sprites/shared/giulio-embarrassed.webp",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-09.mp3"
    },
    {
      "text": "COMUNQUE! Lo spettacolo continua, con o senza alimentatore!",
      "portrait": "/assets-optimized/sprites/shared/giulio-excited.webp",
      "tone": "impact",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-10.mp3"
    },
    {
      "text": "Suona la campanella, zaini in spalla e quaderni a quadretti,",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "tone": "advice"
    },
    {
      "text": "qui s'impara ogni giorno tra libri, lezioni e compiti retti!",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "tone": "advice"
    },
    {
      "text": "Raggiungi la scuola e guarda con attenzione,",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "tone": "advice"
    },
    {
      "text": "vicino al cancello c'è la prossima indicazione!",
      "portrait": "/assets-optimized/sprites/shared/giulio-theatrical.webp",
      "tone": "advice"
    },
    {
      "text": "Eccolo! Indizio consegnato anche senza elettricità. La resilienza del software umano!",
      "portrait": "/assets-optimized/sprites/shared/giulio-proud.webp",
      "sprite": "/assets-optimized/sprites/advice3/giulio-advice3-finish.webp",
      "tone": "theatrical",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-11.mp3",
      "layout": "seated"
    },
    {
      "text": "Io adesso recupero quella sedia e vado dove esistono prese, caffè e una minima tutela per gli sviluppatori.",
      "portrait": "/assets-optimized/sprites/shared/giulio-exit-grin.webp",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-12.mp3"
    },
    {
      "text": "PROBLEMA RISOLTO! Tecnicamente. Moralmente ne riparliamo.",
      "portrait": "/assets-optimized/sprites/shared/giulio-exit-grin.webp",
      "sprite": "/assets-optimized/sprites/advice3/giulio-advice3-chair-exit.webp",
      "tone": "exit",
      "voice": "/assets/audio/voices/giulio/advice3/voice-advice3-main-13.mp3",
      "layout": "exit"
    }
  ],
  "theme": "computer",
  "backgroundStyle": {
    "desktop": {
      "position": "54% 52%",
      "filter": "saturate(.84) contrast(1.03) brightness(.94)"
    },
    "mobile": {
      "position": "59% 52%"
    }
  },
  "contentScale": {
    "desktop": ".67",
    "mobile": ".67"
  },
  "character": {
    "initial": {
      "src": "/assets-optimized/sprites/advice3/giulio-advice3-typing.webp",
      "layout": "seated"
    },
    "hover": null,
    "layouts": {
      "seated": {
        "desktop": {
          "left": "58.2%",
          "bottom": "11.1%",
          "width": "min(42vw, 760px)",
          "height": "62%",
          "anchorX": "-50%",
          "z": "13"
        },
        "mobile": {
          "left": "80.8%",
          "bottom": "39.2%",
          "width": "95.7vw",
          "height": "61.3%",
          "anchorX": "-50%",
          "rotate": "2.9deg"
        }
      },
      "upright": {
        "desktop": {
          "left": "56.6%",
          "bottom": "-4%",
          "width": "48.6%",
          "height": "80.9%",
          "anchorX": "-50%"
        },
        "mobile": {
          "left": "63.7%",
          "bottom": "29.5%",
          "width": "126.4vw",
          "height": "138.1%",
          "anchorX": "-50%",
          "rotate": "-2.6deg",
          "z": "13"
        }
      },
      "exit": {
        "desktop": {
          "left": "58.2%",
          "bottom": "1.6%",
          "width": "min(38vw, 685px)",
          "height": "62%",
          "anchorX": "-50%"
        },
        "mobile": {
          "left": "54.6%",
          "bottom": "30.3%",
          "width": "112.9vw",
          "height": "90.3%",
          "anchorX": "-50%",
          "rotate": "4.5deg"
        }
      }
    },
  },
  "animation": {
    "type": "computerShutdown",
    "frozenSprite": {
      "src": "/assets-optimized/sprites/advice3/giulio-advice3-frozen.webp",
      "layout": "seated"
    },
    "turnSprite": {
      "src": "/assets-optimized/sprites/advice3/giulio-advice3-chair-turn.webp",
      "layout": "seated"
    },
    "exit": {
      "sfx": "chairExit"
    }
  }
};

export default Object.freeze(scene);
