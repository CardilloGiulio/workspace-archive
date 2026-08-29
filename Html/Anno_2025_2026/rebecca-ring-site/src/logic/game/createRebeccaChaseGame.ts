import Phaser from "phaser";
import { mainOrchestrator } from "../mainOrchestrator";
import gamesContent from "../../store/content/games.json";

type CreateGameOptions = {
  parentId: string;
  onCompleted: () => void;
};

type Choice = {
  label: string;
  correct: boolean;
  reply: string;
};

type SceneBackground = "turin" | "metro" | "bus";

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;

export function createRebeccaChaseGame({ parentId, onCompleted }: CreateGameOptions) {
  const scene = new RebeccaChaseScene(onCompleted);

  return new Phaser.Game({
    type: Phaser.AUTO,
    parent: parentId,
    backgroundColor: "#f8dce6",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT
    },
    scene: [scene],
    physics: {
      default: "arcade"
    }
  });
}

class RebeccaChaseScene extends Phaser.Scene {
  private phase: "turin" | "metro-one" | "metro-wrong" | "metro-two" | "bus-select" | "bus-talk" | "done" = "turin";
  private progress = 0;
  private affection = 0;
  private currentPlaceIndex = 0;
  private onCompleted: () => void;
  private titleText?: Phaser.GameObjects.Text;
  private subtitleText?: Phaser.GameObjects.Text;
  private helperText?: Phaser.GameObjects.Text;
  private actionButton?: Phaser.GameObjects.Container;
  private choices: Phaser.GameObjects.Container[] = [];
  private timerEvent?: Phaser.Time.TimerEvent;
  private timerText?: Phaser.GameObjects.Text;
  private player?: Phaser.GameObjects.Container;
  private rebecca?: Phaser.GameObjects.Container;
  private progressBar?: Phaser.GameObjects.Rectangle;
  private affectionText?: Phaser.GameObjects.Text;
  private bgObjects: Phaser.GameObjects.GameObject[] = [];
  private replyObjects: Phaser.GameObjects.Text[] = [];

  constructor(onCompleted: () => void) {
    super("RebeccaChaseScene");
    this.onCompleted = onCompleted;
  }

  preload() {
    this.load.setCORS("anonymous");
    this.load.image("bg-turin", gamesContent.backgrounds.turin);
    this.load.image("bg-metro", gamesContent.backgrounds.metro);
    this.load.image("bg-bus", gamesContent.backgrounds.bus);
  }

  create() {
    this.drawBaseBackground();
    this.drawCharacters();
    this.drawHud();
    this.startTurin();
    this.input.keyboard?.on("keydown-SPACE", () => this.handleAction());
  }

  private clearDynamic() {
    this.choices.forEach((choice) => choice.destroy());
    this.choices = [];
    this.timerEvent?.destroy();
    this.timerText?.destroy();
    this.timerText = undefined;
    this.actionButton?.destroy();
    this.actionButton = undefined;
    this.bgObjects.forEach((object) => object.destroy());
    this.bgObjects = [];
    this.replyObjects.forEach((object) => object.destroy());
    this.replyObjects = [];
  }

  private drawBaseBackground() {
    this.add.rectangle(480, 270, 960, 540, 0xf8dce6).setDepth(-100);
    this.add.rectangle(480, 470, 960, 150, 0xeac4cf).setDepth(-99);
    this.add.rectangle(480, 510, 960, 70, 0xd9a8b8).setDepth(-98);

    for (let i = 0; i < 9; i++) {
      const x = 70 + i * 120;
      const height = 80 + (i % 3) * 32;
      const building = this.add.rectangle(x, 390 - height / 2, 72, height, 0xf3edf2, 0.72);
      building.setStrokeStyle(2, 0xffffff, 0.6);
      building.setDepth(-97);
    }

    this.add.text(28, 22, "GR · 20/05/2026", {
      fontFamily: "monospace",
      fontSize: "17px",
      color: "#70475a",
      backgroundColor: "#ffffffbb",
      padding: { x: 8, y: 4 }
    }).setDepth(60);
  }

  private setSceneBackground(kind: SceneBackground, label: string) {
    const textureKey = `bg-${kind}`;

    const fallback = this.add.rectangle(480, 270, 960, 540, kind === "metro" ? 0xcfe9f6 : kind === "bus" ? 0xffead5 : 0xf8dce6, 0.9);
    fallback.setDepth(-90);
    this.bgObjects.push(fallback);

    if (this.textures.exists(textureKey)) {
      const photo = this.add.image(480, 270, textureKey);
      photo.setDisplaySize(960, 540);
      photo.setAlpha(0.64);
      photo.setDepth(-89);
      this.bgObjects.push(photo);
    }

    const veil = this.add.rectangle(480, 270, 960, 540, 0xfff4f8, 0.36);
    veil.setDepth(-88);
    this.bgObjects.push(veil);

    const floor = this.add.rectangle(480, 472, 960, 136, 0x4e3242, 0.28);
    floor.setDepth(-87);
    this.bgObjects.push(floor);

    const labelPlate = this.add.rectangle(772, 42, 320, 36, 0xffffff, 0.82);
    labelPlate.setStrokeStyle(2, 0xd75f89, 0.55);
    labelPlate.setDepth(45);
    const labelText = this.add.text(772, 42, label, {
      fontFamily: "monospace",
      fontSize: "16px",
      color: "#5c3448",
      fontStyle: "bold"
    }).setOrigin(0.5).setDepth(46);
    this.bgObjects.push(labelPlate, labelText);
  }

  private drawCharacters() {
    this.player = this.createPixelCharacter(160, 404, "Giulio", 0x795548, false);
    this.rebecca = this.createPixelCharacter(775, 394, "Rebecca", 0x6d4c41, true);
    this.player.setDepth(12);
    this.rebecca.setDepth(12);
  }

  private createPixelCharacter(x: number, y: number, name: string, hairColor: number, ponytail: boolean) {
    const container = this.add.container(x, y);
    const shadow = this.add.ellipse(0, 62, 74, 18, 0x000000, 0.12);
    const legs = this.add.rectangle(0, 45, 36, 46, 0x4e6f95);
    const shirt = this.add.rectangle(0, 6, 48, 46, 0xffffff);
    shirt.setStrokeStyle(3, 0xefb7c8);
    const logo = this.add.text(-16, -3, "WEP", {
      fontFamily: "monospace",
      fontSize: "13px",
      color: "#65445a"
    });
    const head = this.add.circle(0, -38, 25, 0xf4c7a9);
    const hair = this.add.rectangle(0, -58, 52, 18, hairColor);
    const eyeA = this.add.circle(-8, -39, 3, 0x4a2f2a);
    const eyeB = this.add.circle(8, -39, 3, 0x4a2f2a);
    const smile = this.add.text(-7, -31, "⌣", {
      fontFamily: "serif",
      fontSize: "15px",
      color: "#4a2f2a"
    });
    const nameTag = this.add.text(0, 78, name, {
      fontFamily: "monospace",
      fontSize: "14px",
      color: "#70475a",
      backgroundColor: "#ffffffd8",
      padding: { x: 6, y: 4 }
    }).setOrigin(0.5, 0);

    container.add([shadow, legs, shirt, logo, head, hair, eyeA, eyeB, smile, nameTag]);

    if (ponytail) {
      const tail = this.add.circle(29, -49, 14, hairColor);
      container.add(tail);
      tail.setDepth(-1);
    } else {
      const messyA = this.add.triangle(-16, -67, 0, 15, 14, 0, 24, 18, hairColor);
      const messyB = this.add.triangle(12, -68, 0, 14, 16, 0, 30, 16, hairColor);
      container.add([messyA, messyB]);
    }

    return container;
  }

  private drawHud() {
    this.add.rectangle(330, 82, 340, 14, 0xffffff, 0.58)
      .setStrokeStyle(2, 0xd75f89, 0.82)
      .setDepth(55);

    this.progressBar = this.add.rectangle(160, 82, 0, 12, 0xd75f89);
    this.progressBar.setOrigin(0, 0.5);
    this.progressBar.setDepth(56);

    this.affectionText = this.add.text(32, 104, "Affetto: 0", {
      fontFamily: "monospace",
      fontSize: "17px",
      color: "#70475a",
      backgroundColor: "#ffffffbb",
      padding: { x: 8, y: 4 }
    }).setDepth(55);
  }

  private updateHud() {
    this.progressBar?.setSize(Math.min(340, this.progress * 3.4), 12);
    this.affectionText?.setText(`Affetto: ${this.affection}`);
  }

  private startTurin() {
    this.phase = "turin";
    this.progress = 0;
    this.currentPlaceIndex = 0;
    this.clearDynamic();
    this.setSceneBackground("turin", "Torino centro");
    this.resetCharactersForStage();

    this.titleText = this.add.text(48, 126, "TORINO CENTRO", {
      fontFamily: "serif",
      fontSize: "35px",
      color: "#5c3448",
      fontStyle: "bold",
      backgroundColor: "#ffffffdc",
      padding: { x: 12, y: 4 }
    }).setDepth(50);

    this.subtitleText = this.add.text(50, 178, "Rebecca è scappata. Giulio, naturalmente, la insegue.", {
      fontFamily: "monospace",
      fontSize: "16px",
      color: "#70475a",
      backgroundColor: "#ffffffd2",
      padding: { x: 10, y: 5 },
      wordWrap: { width: 650 }
    }).setDepth(50);

    this.helperText = this.add.text(50, 220, "Premi CORRI o usa SPAZIO. Non perderla, scemo.", {
      fontFamily: "monospace",
      fontSize: "15px",
      color: "#8f4964",
      backgroundColor: "#ffffffd2",
      padding: { x: 10, y: 5 },
      wordWrap: { width: 620 }
    }).setDepth(50);

    this.createActionButton(800, 466, "CORRI", () => this.handleAction(), 190);
    this.showTurinPlace();
  }

  private resetCharactersForStage() {
    this.player?.setPosition(160, 404);
    this.rebecca?.setPosition(775, 394);
    this.player?.setVisible(true);
    this.rebecca?.setVisible(true);
  }

  private showTurinPlace() {
    const place = gamesContent.turinPlaces[this.currentPlaceIndex];
    if (!place) return;

    this.bgObjects.forEach((object) => object.destroy());
    this.bgObjects = [];
    this.setSceneBackground("turin", place.name);

    const sign = this.add.container(480, 302).setDepth(35);
    const plate = this.add.rectangle(0, 0, 610, 86, 0xffffff, 0.86);
    plate.setStrokeStyle(3, 0xd75f89, 0.86);

    const name = this.add.text(0, -23, place.name.toUpperCase(), {
      fontFamily: "serif",
      fontSize: "28px",
      color: "#5c3448",
      fontStyle: "bold"
    }).setOrigin(0.5);

    const subtitle = this.add.text(0, 18, place.subtitle, {
      fontFamily: "monospace",
      fontSize: "15px",
      color: "#70475a",
      align: "center",
      wordWrap: { width: 540 }
    }).setOrigin(0.5);

    sign.add([plate, name, subtitle]);
    this.bgObjects.push(sign);

    if (place.name === "Piazza Statuto") {
      this.bgObjects.push(
        this.sceneBadge(673, 366, "Manifesto: “Gesù salva dalla droga” ✨")
      );
    }

    if (place.name === "Il mercato") {
      this.bgObjects.push(this.sceneBadge(680, 366, "Mercato: patate ⇄ oggetti misteriosi"));
      for (let i = 0; i < 5; i++) {
        const potato = this.add.text(560 + i * 42, 402 + (i % 2) * 14, "🥔", { fontSize: "27px" }).setDepth(36);
        this.bgObjects.push(potato);
      }
    }

    if (place.name === "Porta Susa") {
      this.bgObjects.push(
        this.sceneBadge(672, 366, "McDonald’s dentro Porta Susa 🍟")
      );
    }
  }

  private sceneBadge(x: number, y: number, label: string) {
    return this.add.text(x, y, label, {
      fontFamily: "monospace",
      fontSize: "15px",
      color: "#70475a",
      backgroundColor: "#ffffffdf",
      padding: { x: 10, y: 6 },
      wordWrap: { width: 330 }
    }).setOrigin(0.5).setDepth(36);
  }

  private handleAction() {
    if (this.phase !== "turin") return;

    this.progress += 9 + Math.floor(Math.random() * 5);
    this.updateHud();

    this.tweens.add({
      targets: this.player,
      x: Math.min(610, 160 + this.progress * 4.4),
      duration: 220,
      yoyo: true,
      ease: "Sine.easeInOut"
    });

    if (this.progress >= 34 && this.currentPlaceIndex === 0) {
      this.currentPlaceIndex = 1;
      this.showTurinPlace();
    }

    if (this.progress >= 68 && this.currentPlaceIndex === 1) {
      this.currentPlaceIndex = 2;
      this.showTurinPlace();
    }

    if (this.progress >= 100) {
      this.startMetroOne();
    }
  }

  private startMetroOne() {
    this.phase = "metro-one";
    this.clearDynamic();
    this.setSceneBackground("metro", "Metro · giro 1");
    this.drawMetroInterior("Direzione: sicuramente giusta", "Da Enrico VIII d’Inghilterra verso... boh.");
    this.moveCharactersForDialogue();

    this.titleText?.setText("METRO · GIRO 1");
    this.subtitleText?.setText("Siete saliti a Enrico VIII d’Inghilterra. Giulio è sicuro della direzione. Questo è già sospetto.");
    this.helperText?.setText("Scegli i meme giusti prima che il timer finisca.");

    this.affection = 0;
    this.updateHud();

    this.startTimer(35, () => this.startMetroWrong());
    this.renderChoices([
      {
        label: "Artefatto doppio crit per Skirk C4",
        correct: true,
        reply: "Rebecca approva. Forse."
      },
      {
        label: "Farina di Fontanelle entra in campo",
        correct: true,
        reply: "Rebecca ride, anche se dice che non è vero."
      },
      {
        label: "I tuoi artefatti sono ottimi",
        correct: false,
        reply: "Rebecca ti guarda come se avessi detto una bestemmia."
      },
      {
        label: "Klee risolve tutto facendo esplodere Torino",
        correct: true,
        reply: "Pericoloso, ma incredibilmente convincente."
      }
    ]);
  }

  private startMetroWrong() {
    this.phase = "metro-wrong";
    this.clearDynamic();
    this.setSceneBackground("metro", "Metro · fermata sbagliata");
    this.drawMetroInterior("Prossima fermata: oltre Lingotto", "La faccia di Rebecca dice già tutto.");
    this.moveCharactersForDialogue();

    this.titleText?.setText("DIREZIONE SBAGLIATA");
    this.subtitleText?.setText("Rebecca: “Giulio. Scemo. Siamo andati dalla parte sbagliata.”");
    this.helperText?.setText("Torna indietro e prova a salvarti con un minimo di dignità.");
    this.createActionButton(735, 466, "TORNA INDIETRO", () => this.startMetroTwo(), 260);
  }

  private startMetroTwo() {
    this.phase = "metro-two";
    this.clearDynamic();
    this.setSceneBackground("metro", "Metro · direzione Fermi");
    this.drawMetroInterior("Direzione corretta: FERMI", "Secondo giro. Ora niente esperimenti geografici.");
    this.moveCharactersForDialogue();

    this.titleText?.setText("METRO · GIRO 2");
    this.subtitleText?.setText("Secondo tentativo. Stavolta la direzione è Fermi. Rebecca ti concede una possibilità, ma ti osserva.");
    this.helperText?.setText("Convincila con Genshin, Natlan e un minimo di dignità.");

    this.startTimer(38, () => this.startBusSelect());
    this.renderChoices([
      {
        label: "Escoffier mancante nel team Skirk? Errore tragico.",
        correct: true,
        reply: "Rebecca annuisce con superiorità."
      },
      {
        label: "Crit Rate e Crit DMG sono una forma d'amore",
        correct: true,
        reply: "Rebecca: “Finalmente dici qualcosa di sensato.”"
      },
      {
        label: "Natlan esplorata al 12% va benissimo",
        correct: false,
        reply: "Rebecca ti giudica in silenzio."
      },
      {
        label: "Oratrice Mecanique d’Analyse Cardinale!",
        correct: true,
        reply: "Il nome è abbastanza lungo da salvarti."
      }
    ]);
  }

  private drawMetroInterior(signText: string, smallText: string) {
    const carriage = this.add.rectangle(480, 310, 850, 194, 0xf4eef5, 0.9)
      .setStrokeStyle(4, 0xd75f89, 0.78)
      .setDepth(2);
    const windowA = this.add.rectangle(285, 300, 180, 72, 0xcfe9f6, 0.84).setDepth(3);
    const windowB = this.add.rectangle(675, 300, 180, 72, 0xcfe9f6, 0.84).setDepth(3);
    const sign = this.add.text(480, 217, signText, {
      fontFamily: "monospace",
      fontSize: "17px",
      color: "#5c3448",
      backgroundColor: "#ffffffdd",
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setDepth(6);
    const note = this.add.text(480, 250, smallText, {
      fontFamily: "monospace",
      fontSize: "13px",
      color: "#70475a",
      backgroundColor: "#ffffffc6",
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5).setDepth(6);

    this.bgObjects.push(carriage, windowA, windowB, sign, note);

    this.tweens.add({
      targets: [windowA, windowB],
      alpha: 0.55,
      duration: 450,
      yoyo: true,
      repeat: -1
    });
  }

  private startBusSelect() {
    this.phase = "bus-select";
    this.clearDynamic();
    this.setSceneBackground("bus", "Fermata · Pianezza");
    this.drawBusStop();
    this.resetCharactersForStage();

    this.titleText?.setText("BUS PER PIANEZZA");
    this.subtitleText?.setText("Rebecca è salita verso la fermata. Scegli il bus giusto.");
    this.helperText?.setText("Attenzione: il 2048 non è un bus, ma ormai è qui.");

    const buses = [...gamesContent.wrongBuses, gamesContent.correctBus];
    Phaser.Utils.Array.Shuffle(buses);

    this.renderBusChoices(buses);
  }

  private drawBusStop() {
    const shelter = this.add.rectangle(480, 318, 760, 146, 0xffffff, 0.66).setStrokeStyle(3, 0xd75f89, 0.72).setDepth(2);
    const pole = this.add.rectangle(172, 318, 16, 145, 0x5c3448, 0.72).setDepth(3);
    const sign = this.add.text(172, 242, "BUS", {
      fontFamily: "monospace",
      fontSize: "21px",
      color: "#ffffff",
      backgroundColor: "#d75f89",
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setDepth(4);
    const hint = this.add.text(480, 221, "Quale porta davvero a Pianezza?", {
      fontFamily: "monospace",
      fontSize: "15px",
      color: "#5c3448",
      backgroundColor: "#ffffffdd",
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setDepth(4);
    this.bgObjects.push(shelter, pole, sign, hint);
  }

  private startBusTalk() {
    this.phase = "bus-talk";
    this.clearDynamic();
    this.setSceneBackground("bus", "Sul CP1");
    this.drawBusInterior();
    this.moveCharactersForDialogue();

    this.titleText?.setText("SUL CP1");
    this.subtitleText?.setText("Siete sul bus giusto. Ora devi dire qualcosa che non sembri scritto da un sistema operativo.");
    this.helperText?.setText("Scegli frasi dolci, curiose o un po' sceme. Quelle sincere funzionano meglio.");

    this.startTimer(45, () => this.finishGame());
    this.renderChoices([
      {
        label: "Quando nuoti sembri una cosa seria in un mondo che spesso fa casino.",
        correct: true,
        reply: "Rebecca abbassa lo sguardo. Punto per te."
      },
      {
        label: "Amo le tue facce: anche quando giudichi il mondo senza accorgertene.",
        correct: true,
        reply: "Lei ti guarda male. Ovviamente non se ne accorge."
      },
      {
        label: "La tua famiglia è una parte enorme di ciò che sei, e io voglio conoscerla sempre meglio.",
        correct: true,
        reply: "Questa le arriva dritta."
      },
      {
        label: "Gelato, cioccolato e patatine sono una dieta bilanciata se sorridi così.",
        correct: true,
        reply: "Scientificamente discutibile. Romanticamente valido."
      }
    ]);
  }

  private drawBusInterior() {
    const busWindow = this.add.rectangle(480, 298, 820, 170, 0xfff7ef, 0.86)
      .setStrokeStyle(4, 0xd75f89, 0.7)
      .setDepth(2);
    const seats = this.add.rectangle(480, 388, 820, 62, 0x5c3448, 0.2).setDepth(3);
    const route = this.add.text(480, 218, "CP1 · Pianezza", {
      fontFamily: "monospace",
      fontSize: "18px",
      color: "#5c3448",
      backgroundColor: "#ffffffdf",
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setDepth(4);
    this.bgObjects.push(busWindow, seats, route);
  }

  private moveCharactersForDialogue() {
    this.player?.setPosition(142, 420);
    this.rebecca?.setPosition(816, 410);
    this.player?.setVisible(true);
    this.rebecca?.setVisible(true);
  }

  private finishGame() {
    if (this.phase === "done") return;

    this.phase = "done";
    this.clearDynamic();
    this.setSceneBackground("bus", "Missione completata");
    this.drawBusInterior();
    this.resetCharactersForStage();

    this.titleText?.setText("MISSIONE COMPLETATA");
    this.subtitleText?.setText("Rebecca è stata raggiunta, convinta e probabilmente ha ancora ragione lei.");
    this.helperText?.setText("Il finale è stato sbloccato.");

    mainOrchestrator.dispatch({
      type: "GAME_COMPLETED",
      payload: { completedAt: new Date().toISOString() }
    });

    this.createActionButton(735, 466, "VAI AL FINALE", () => this.onCompleted(), 250);
  }

  private renderChoices(choices: Choice[]) {
    this.choices.forEach((choice) => choice.destroy());
    this.choices = [];

    const panel = this.add.rectangle(480, 386, 812, 212, 0xffffff, 0.55).setStrokeStyle(2, 0xffffff, 0.72).setDepth(18);
    this.bgObjects.push(panel);

    choices.forEach((choice, index) => {
      const x = index % 2 === 0 ? 270 : 690;
      const y = 330 + Math.floor(index / 2) * 92;

      const container = this.add.container(x, y).setDepth(25);
      const bg = this.add.rectangle(0, 0, 376, 76, 0xffffff, 0.9);
      bg.setStrokeStyle(3, choice.correct ? 0xd75f89 : 0xb9a7af, 0.9);
      const text = this.add.text(0, 0, choice.label, {
        fontFamily: "monospace",
        fontSize: "13px",
        color: "#5c3448",
        align: "center",
        wordWrap: { width: 338 }
      }).setOrigin(0.5).setLineSpacing(3);

      container.add([bg, text]);
      container.setSize(376, 76);
      container.setInteractive({ useHandCursor: true });
      container.on("pointerdown", () => this.selectChoice(choice, container));
      this.choices.push(container);
    });
  }

  private selectChoice(choice: Choice, container: Phaser.GameObjects.Container) {
    container.disableInteractive();
    container.setAlpha(0.72);

    if (choice.correct) {
      this.affection += 1;
      this.updateHud();
      this.flashReply(choice.reply, true);
      this.tweens.add({
        targets: container,
        scale: 1.04,
        duration: 120,
        yoyo: true
      });
    } else {
      this.flashReply(choice.reply, false);
      this.cameras.main.shake(180, 0.006);
    }

    if (this.phase === "metro-one" && this.affection >= 3) {
      this.time.delayedCall(850, () => this.startMetroWrong());
    }

    if (this.phase === "metro-two" && this.affection >= 6) {
      this.time.delayedCall(850, () => this.startBusSelect());
    }

    if (this.phase === "bus-talk" && this.affection >= 10) {
      this.time.delayedCall(850, () => this.finishGame());
    }
  }

  private renderBusChoices(busCodes: string[]) {
    this.choices.forEach((choice) => choice.destroy());
    this.choices = [];

    busCodes.forEach((code, index) => {
      const x = 170 + (index % 5) * 155;
      const y = 292 + Math.floor(index / 5) * 88;

      const container = this.add.container(x, y).setDepth(24);
      const bg = this.add.rectangle(0, 0, 118, 58, 0xffffff, 0.92);
      bg.setStrokeStyle(4, code === "CP1" ? 0xd75f89 : 0x9e8791, 0.9);
      const label = this.add.text(0, 0, code, {
        fontFamily: "monospace",
        fontSize: "27px",
        color: "#5c3448",
        fontStyle: "bold"
      }).setOrigin(0.5);

      container.add([bg, label]);
      container.setSize(118, 58);
      container.setInteractive({ useHandCursor: true });

      container.on("pointerdown", () => {
        if (code === "CP1") {
          this.flashReply("Rebecca: “Va bene, scemo. Questa volta hai scelto giusto.”", true);
          container.disableInteractive();
          container.setAlpha(0.75);
          this.time.delayedCall(900, () => this.startBusTalk());
        } else {
          this.flashReply(`Rebecca: “${code}? Giulio, no. Questo non va a Pianezza.”`, false);
          this.cameras.main.shake(180, 0.007);
          container.disableInteractive();
          container.setAlpha(0.56);
        }
      });

      this.choices.push(container);
    });
  }

  private flashReply(message: string, positive: boolean) {
    this.replyObjects.forEach((object) => object.destroy());
    this.replyObjects = [];

    const reply = this.add.text(480, 497, message, {
      fontFamily: "monospace",
      fontSize: "15px",
      color: positive ? "#5c3448" : "#7b2e42",
      backgroundColor: "#ffffffee",
      align: "center",
      padding: { x: 12, y: 7 },
      wordWrap: { width: 820 }
    }).setOrigin(0.5).setDepth(80);

    this.replyObjects.push(reply);
    this.time.delayedCall(2000, () => {
      reply.destroy();
      this.replyObjects = this.replyObjects.filter((object) => object !== reply);
    });
  }

  private startTimer(seconds: number, onDone: () => void) {
    let remaining = seconds;

    this.timerText?.destroy();
    this.timerText = this.add.text(796, 86, `Tempo: ${remaining}`, {
      fontFamily: "monospace",
      fontSize: "17px",
      color: "#70475a",
      backgroundColor: "#ffffffd8",
      padding: { x: 8, y: 4 }
    }).setDepth(60);

    this.timerEvent?.destroy();
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      repeat: Math.max(0, seconds - 1),
      callback: () => {
        remaining -= 1;
        this.timerText?.setText(`Tempo: ${Math.max(0, remaining)}`);

        if (remaining <= 0) {
          this.timerEvent?.destroy();
          onDone();
        }
      }
    });
  }

  private createActionButton(x: number, y: number, label: string, callback: () => void, width = 210) {
    this.actionButton?.destroy();
    const container = this.add.container(x, y).setDepth(70);
    const bg = this.add.rectangle(0, 0, width, 58, 0xd75f89, 0.96);
    bg.setStrokeStyle(3, 0xffffff, 0.9);
    const text = this.add.text(0, 0, label, {
      fontFamily: "monospace",
      fontSize: label.length > 12 ? "17px" : "20px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    container.add([bg, text]);
    container.setSize(width, 58);
    container.setInteractive({ useHandCursor: true });
    container.on("pointerdown", callback);

    this.actionButton = container;
  }
}
