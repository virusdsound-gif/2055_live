import type { SessionDef } from "./sessions";

export type Mix = {
  harmonic?: number;
  noise?: number;
  pad?: number;
};

export class SessionAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private user: GainNode | null = null;
  private carrier: OscillatorNode | null = null;
  private right: OscillatorNode | null = null;
  private harmonic: OscillatorNode | null = null;
  private harmonicGain: GainNode | null = null;
  private pad: OscillatorNode | null = null;
  private padGain: GainNode | null = null;
  private noise: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private beatHz = 0.7;
  private userLevel = 0.7;
  private gen = 0;

  async start(session: SessionDef) {
    this.gen += 1;
    if (this.ctx) {
      await this.ctx.resume();
      return;
    }

    const ctx = new AudioContext();
    this.ctx = ctx;
    this.beatHz = session.lfoHz;

    const user = ctx.createGain();
    user.gain.value = this.userLevel;
    user.connect(ctx.destination);
    this.user = user;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(user);
    this.master = master;

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = session.lfoHz;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = session.lfoDepth;
    lfo.connect(lfoDepth);
    this.lfo = lfo;

    if (session.binaural) {
      const merger = ctx.createChannelMerger(2);
      merger.connect(master);

      const leftGain = ctx.createGain();
      leftGain.gain.value = 0.5;
      const rightGain = ctx.createGain();
      rightGain.gain.value = 0.5;

      const left = ctx.createOscillator();
      left.type = "sine";
      left.frequency.value = session.carrierHz;
      left.connect(leftGain);
      leftGain.connect(merger, 0, 0);

      const right = ctx.createOscillator();
      right.type = "sine";
      right.frequency.value = session.carrierHz + session.lfoHz;
      right.connect(rightGain);
      rightGain.connect(merger, 0, 1);

      lfoDepth.connect(leftGain.gain);
      lfoDepth.connect(rightGain.gain);

      this.carrier = left;
      this.right = right;
      left.start();
      right.start();
    } else {
      const carrierGain = ctx.createGain();
      carrierGain.gain.value = 0.5;
      carrierGain.connect(master);

      const carrier = ctx.createOscillator();
      carrier.type = "sine";
      carrier.frequency.value = session.carrierHz;
      carrier.connect(carrierGain);
      this.carrier = carrier;

      lfoDepth.connect(carrierGain.gain);
      carrier.start();
    }

    const padGain = ctx.createGain();
    padGain.gain.value = 0;
    padGain.connect(master);
    const pad = ctx.createOscillator();
    pad.type = "sine";
    pad.frequency.value = session.carrierHz / 2;
    pad.connect(padGain);
    this.pad = pad;
    this.padGain = padGain;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 380;
    filter.Q.value = 0.4;
    const noise = ctx.createBufferSource();
    noise.buffer = pinkBuffer(ctx);
    noise.loop = true;
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(master);
    this.noise = noise;
    this.noiseGain = noiseGain;

    if (session.harmonicHz) {
      const hGain = ctx.createGain();
      hGain.gain.value = 0;
      hGain.connect(master);
      const harmonic = ctx.createOscillator();
      harmonic.type = "sine";
      harmonic.frequency.value = session.harmonicHz;
      harmonic.connect(hGain);
      harmonic.start();
      this.harmonic = harmonic;
      this.harmonicGain = hGain;
    }

    lfo.start();
    pad.start();
    noise.start();
    if (ctx.state === "suspended") await ctx.resume();
  }

  setUserGain(volume: number) {
    this.userLevel = Math.min(1, Math.max(0, volume));
    if (!this.ctx || !this.user) return;
    this.user.gain.setTargetAtTime(this.userLevel, this.ctx.currentTime, 0.08);
  }

  setLevel(volume: number, mix: Mix = {}) {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;
    const t = ctx.currentTime;
    const v = Math.max(0, volume);
    master.gain.setTargetAtTime(v, t, 0.45);
    if (this.harmonicGain) {
      this.harmonicGain.gain.setTargetAtTime(v * (mix.harmonic ?? 0), t, 0.7);
    }
    if (this.padGain) {
      this.padGain.gain.setTargetAtTime(v * (mix.pad ?? 0), t, 0.8);
    }
    if (this.noiseGain) {
      this.noiseGain.gain.setTargetAtTime(Math.max(0, mix.noise ?? 0), t, 0.9);
    }
  }

  driftCarrier(hz: number) {
    if (!this.ctx || !this.carrier) return;
    const t = this.ctx.currentTime;
    this.carrier.frequency.setTargetAtTime(hz, t, 1.2);
    this.right?.frequency.setTargetAtTime(hz + this.beatHz, t, 1.2);
  }

  async stop() {
    const gen = this.gen;
    this.setLevel(0);
    const ctx = this.ctx;
    if (!ctx) return;
    await new Promise((r) => setTimeout(r, 350));
    if (this.gen !== gen) return;
    try {
      this.carrier?.stop();
      this.right?.stop();
      this.lfo?.stop();
      this.harmonic?.stop();
      this.pad?.stop();
      this.noise?.stop();
    } catch {
      /* already stopped */
    }
    await ctx.close().catch(() => undefined);
    this.ctx = null;
    this.master = null;
    this.user = null;
    this.carrier = null;
    this.right = null;
    this.harmonic = null;
    this.harmonicGain = null;
    this.pad = null;
    this.padGain = null;
    this.noise = null;
    this.noiseGain = null;
    this.lfo = null;
  }
}

function pinkBuffer(ctx: AudioContext): AudioBuffer {
  const length = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99765 * b0 + white * 0.099046;
    b1 = 0.963 * b1 + white * 0.2965164;
    b2 = 0.57 * b2 + white * 1.052691;
    data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.05;
  }
  return buffer;
}
