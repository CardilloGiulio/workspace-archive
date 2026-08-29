import type { RunnerZoneKey } from "../types";

export class StageAudioHandler {
  private tracks: Partial<Record<RunnerZoneKey, HTMLAudioElement[]>> = {};

  constructor(config: Record<RunnerZoneKey, Array<{ src: string; volume: number }>>) {
    this.tracks = Object.fromEntries(
      Object.entries(config).map(([key, items]) => [
        key,
        items.map((item) => {
          const audio = new Audio(item.src);
          audio.loop = true;
          audio.volume = item.volume;
          audio.preload = "auto";
          return audio;
        })
      ])
    ) as Partial<Record<RunnerZoneKey, HTMLAudioElement[]>>;
  }

  play(zoneKey: RunnerZoneKey) {
    Object.entries(this.tracks).forEach(([key, group]) => {
      group?.forEach((audio) => {
        if (key === zoneKey) {
          if (audio.paused) audio.play().catch(() => undefined);
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    });
  }

  stopAll() {
    Object.values(this.tracks).forEach((group) => {
      group?.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    });
  }
}
