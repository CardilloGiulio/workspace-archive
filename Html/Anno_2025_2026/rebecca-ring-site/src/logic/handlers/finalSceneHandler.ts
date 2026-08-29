let audioContext: AudioContext | null = null;

export function handleFinalSceneStarted() {
  playGentleMelody();
}

function playGentleMelody() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  audioContext = audioContext ?? new AudioContextClass();

  const now = audioContext.currentTime;
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.8);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 18);
  gain.connect(audioContext.destination);

  const notes = [
    261.63, 329.63, 392.0, 523.25,
    493.88, 392.0, 329.63, 392.0,
    349.23, 440.0, 523.25, 587.33,
    523.25, 392.0, 329.63, 261.63
  ];

  notes.forEach((frequency, index) => {
    const osc = audioContext!.createOscillator();
    const noteGain = audioContext!.createGain();

    osc.type = index % 2 === 0 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(frequency, now + index * 0.45);

    noteGain.gain.setValueAtTime(0.0001, now + index * 0.45);
    noteGain.gain.exponentialRampToValueAtTime(0.055, now + index * 0.45 + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.45 + 0.42);

    osc.connect(noteGain);
    noteGain.connect(gain);

    osc.start(now + index * 0.45);
    osc.stop(now + index * 0.45 + 0.44);
  });
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
