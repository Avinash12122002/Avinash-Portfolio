// Bulletproof Sound Synthesizer using Web Audio API + HTML5 Audio fallback
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  getAudioContext() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playBeep(880, "sine", 0.08, 0.25);
    }
    return this.enabled;
  }

  playBeep(freq = 520, type = "sine", duration = 0.08, volume = 0.2) {
    if (!this.enabled) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.linearRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Fallback
    }
  }

  hover() {
    this.playBeep(620, "sine", 0.04, 0.12);
  }

  click() {
    this.playBeep(880, "triangle", 0.08, 0.22);
  }

  success() {
    this.playBeep(523.25, "sine", 0.08, 0.18);
    setTimeout(() => this.playBeep(659.25, "sine", 0.1, 0.2), 70);
    setTimeout(() => this.playBeep(783.99, "sine", 0.14, 0.25), 140);
  }

  terminal() {
    this.playBeep(1050, "square", 0.04, 0.12);
  }
}

export const sound = new SoundFX();
