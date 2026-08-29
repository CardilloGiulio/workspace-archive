export type VoiceAudioPlayOptions = {
  volume?: number;
  interrupt?: boolean;
  onEnded?: () => void;
};

export class VoiceAudioManager {
  private context?: AudioContext;
  private masterGain?: GainNode;
  private buffers = new Map<string, AudioBuffer>();
  private preloadPromises = new Map<string, Promise<AudioBuffer>>();
  private currentSource?: AudioBufferSourceNode;
  private fallbackAudio?: HTMLAudioElement;

  async unlock() {
    const context = this.getContext();
    if (!context) return;

    if (context.state === "suspended") {
      await context.resume().catch(() => undefined);
    }
  }

  preload(sources: string[]) {
    return Promise.allSettled(
      sources
        .filter(Boolean)
        .filter((source, index, array) => array.indexOf(source) === index)
        .map((source) => this.loadBuffer(source))
    );
  }

  async play(source: string, options: VoiceAudioPlayOptions = {}): Promise<number | undefined> {
    const volume = options.volume ?? 0.94;

    if (options.interrupt ?? true) {
      this.stop();
    }

    const context = this.getContext();
    if (!context) {
      return this.playFallback(source, volume, options.onEnded);
    }

    await this.unlock();

    try {
      const buffer = await this.loadBuffer(source);
      const node = context.createBufferSource();
      const gain = context.createGain();
      gain.gain.value = volume;
      node.buffer = buffer;
      node.connect(gain);
      gain.connect(this.getMasterGain(context));
      this.currentSource = node;
      node.onended = () => {
        if (this.currentSource === node) {
          this.currentSource = undefined;
          options.onEnded?.();
        }
      };
      node.start(0);
      return buffer.duration;
    } catch {
      return this.playFallback(source, volume, options.onEnded);
    }
  }


  async playAndWait(source: string, options: VoiceAudioPlayOptions = {}): Promise<number | undefined> {
    return new Promise((resolve) => {
      let settled = false;
      let fallbackTimer: number | undefined;

      const finish = (duration?: number) => {
        if (settled) return;
        settled = true;
        if (fallbackTimer !== undefined) {
          window.clearTimeout(fallbackTimer);
        }
        resolve(duration);
      };

      this.play(source, {
        ...options,
        onEnded: () => {
          options.onEnded?.();
          finish();
        }
      })
        .then((duration) => {
          if (duration !== undefined) {
            fallbackTimer = window.setTimeout(() => finish(duration), Math.max(650, duration * 1000 + 250));
          }
          return duration;
        })
        .catch(() => finish(undefined));
    });
  }

  stop() {
    if (this.currentSource) {
      const source = this.currentSource;
      this.currentSource = undefined;
      try {
        source.stop();
      } catch {
        // The node may already be stopped. That is safe.
      }
      try {
        source.disconnect();
      } catch {
        // Already disconnected is safe.
      }
    }

    if (this.fallbackAudio) {
      this.fallbackAudio.onended = null;
      this.fallbackAudio.pause();
      this.fallbackAudio.currentTime = 0;
    }
  }

  dispose() {
    this.stop();
    this.buffers.clear();
    this.preloadPromises.clear();

    if (this.context && this.context.state !== "closed") {
      this.context.close().catch(() => undefined);
    }

    this.context = undefined;
    this.masterGain = undefined;
  }

  private getContext() {
    if (typeof window === "undefined") return undefined;

    if (!this.context) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return undefined;
      this.context = new AudioContextClass();
    }

    return this.context;
  }

  private getMasterGain(context: AudioContext) {
    if (!this.masterGain) {
      this.masterGain = context.createGain();
      this.masterGain.gain.value = 1;
      this.masterGain.connect(context.destination);
    }

    return this.masterGain;
  }

  private loadBuffer(source: string) {
    const cached = this.buffers.get(source);
    if (cached) return Promise.resolve(cached);

    const active = this.preloadPromises.get(source);
    if (active) return active;

    const context = this.getContext();
    if (!context) return Promise.reject(new Error("Web Audio API is unavailable."));

    const promise = fetch(source)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load voice audio: ${source}`);
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
      .then((buffer) => {
        this.buffers.set(source, buffer);
        this.preloadPromises.delete(source);
        return buffer;
      })
      .catch((error) => {
        this.preloadPromises.delete(source);
        throw error;
      });

    this.preloadPromises.set(source, promise);
    return promise;
  }

  private playFallback(source: string, volume: number, onEnded?: () => void) {
    if (!this.fallbackAudio) {
      this.fallbackAudio = new Audio();
    }

    this.fallbackAudio.pause();
    this.fallbackAudio.currentTime = 0;
    this.fallbackAudio.src = source;
    this.fallbackAudio.volume = volume;
    this.fallbackAudio.onended = onEnded ?? null;
    this.fallbackAudio.play().catch(() => {
      window.setTimeout(() => onEnded?.(), 900);
    });
    return undefined;
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
