import type { SessionDef } from "./sessions";

export class SessionAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private user: GainNode | null = null;
  private carrier: OscillatorNode | null = null;
  private harmonic: OscillatorNode | null = null;
  private harmonicGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
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

    const user = ctx.createGain();
    user.gain.value = this.userLevel;
    user.connect(ctx.destination);
    this.user = user;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(user);
    this.master = master;

    const carrierGain = ctx.createGain();
    carrierGain.gain.value = 0.5;
    carrierGain.connect(master);

    const carrier = ctx.createOscillator();
    carrier.type = "sine";
    carrier.frequency.value = session.carrierHz;
    carrier.connect(carrierGain);
    this.carrier = carrier;

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = session.lfoHz;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = session.lfoDepth;
    lfo.connect(lfoDepth);
    lfoDepth.connect(carrierGain.gain);
    this.lfo = lfo;

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

    carrier.start();
    lfo.start();
    if (ctx.state === "suspended") await ctx.resume();
  }

  setUserGain(volume: number) {
    this.userLevel = Math.min(1, Math.max(0, volume));
    if (!this.ctx || !this.user) return;
    this.user.gain.setTargetAtTime(this.userLevel, this.ctx.currentTime, 0.08);
  }

  setLevel(volume: number, harmonicMix = 0) {
    const ctx = this.ctx;
    const master = this.master;
    if (!ctx || !master) return;
    const t = ctx.currentTime;
    master.gain.setTargetAtTime(Math.max(0, volume), t, 0.45);
    if (this.harmonicGain) {
      this.harmonicGain.gain.setTargetAtTime(
        Math.max(0, volume * harmonicMix),
        t,
        0.6,
      );
    }
  }

  driftCarrier(hz: number) {
    if (!this.ctx || !this.carrier) return;
    this.carrier.frequency.setTargetAtTime(hz, this.ctx.currentTime, 1.2);
  }

  async stop() {
    const gen = this.gen;
    this.setLevel(0, 0);
    const ctx = this.ctx;
    if (!ctx) return;
    await new Promise((r) => setTimeout(r, 350));
    if (this.gen !== gen) return;
    try {
      this.carrier?.stop();
      this.lfo?.stop();
      this.harmonic?.stop();
    } catch {
      /* already stopped */
    }
    await ctx.close().catch(() => undefined);
    this.ctx = null;
    this.master = null;
    this.user = null;
    this.carrier = null;
    this.harmonic = null;
    this.harmonicGain = null;
    this.lfo = null;
  }
}
