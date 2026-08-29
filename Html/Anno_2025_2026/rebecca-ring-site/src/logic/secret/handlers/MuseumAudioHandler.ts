import { VoiceAudioManager } from "../../audio/VoiceAudioManager";
import { museumScenes, type MuseumScene } from "../../../store/museum/museumScenes";
import { museumDebug } from "../../../debug/museumDebug";

export class MuseumAudioHandler {
  private giulioAudio = new VoiceAudioManager();
  private rebeccaAudio = new VoiceAudioManager();
  private sequenceToken = 0;

  async unlockAndPreload() {
    const giulioSources = museumScenes.map((scene) => scene.giulioAudio);
    const rebeccaSources = museumScenes
      .map((scene) => scene.rebeccaAudio)
      .filter((source): source is string => Boolean(source));

    await Promise.allSettled([
      this.giulioAudio.unlock(),
      this.rebeccaAudio.unlock(),
      this.giulioAudio.preload(giulioSources),
      this.rebeccaAudio.preload(rebeccaSources)
    ]);
  }

  async playScene(scene: MuseumScene) {
    this.stop();
    const token = ++this.sequenceToken;
    museumDebug("audio:scene:start", { id: scene.id, number: scene.number });

    await this.giulioAudio.playAndWait(scene.giulioAudio, { interrupt: true, volume: 0.96 });
    if (token !== this.sequenceToken) return;

    if (scene.rebeccaAudio) {
      await this.rebeccaAudio.playAndWait(scene.rebeccaAudio, { interrupt: true, volume: 0.96 });
    }

    if (token === this.sequenceToken) {
      museumDebug("audio:scene:end", { id: scene.id });
    }
  }

  stop() {
    this.sequenceToken += 1;
    this.giulioAudio.stop();
    this.rebeccaAudio.stop();
  }

  dispose() {
    this.stop();
    this.giulioAudio.dispose();
    this.rebeccaAudio.dispose();
  }
}
