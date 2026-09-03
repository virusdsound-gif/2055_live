export type SessionId = "morning-star" | "root" | "silent" | "ghost";

export type Phase = {
  name: string;
  start: number;
  end: number;
  copy: string;
  volume: number;
  harmonicMix?: number;
};

export type SessionDef = {
  id: SessionId;
  title: string;
  duration: number;
  feeling: string;
  bestFor: string;
  durationLabel: string;
  flagship?: boolean;
  carrierHz: number;
  harmonicHz: number | null;
  lfoHz: number;
  lfoDepth: number;
  phases: Phase[];
};

export const FIRST_LISTEN = 90;

export const SESSIONS: SessionDef[] = [
  {
    id: "morning-star",
    title: "Morning Star",
    duration: 15 * 60,
    feeling: "Emergence after darkness",
    bestFor: "Flagship",
    durationLabel: "15 min",
    flagship: true,
    carrierHz: 180,
    harmonicHz: 270,
    lfoHz: 0.7,
    lfoDepth: 0.32,
    phases: [
      {
        name: "Threshold",
        start: 0,
        end: 120,
        copy: "Arrive. Let the pulse find you.",
        volume: 0.16,
      },
      {
        name: "First Light",
        start: 120,
        end: 330,
        copy: "A thin harmonic rises. The root stays.",
        volume: 0.2,
        harmonicMix: 0.1,
      },
      {
        name: "Presence",
        start: 330,
        end: 660,
        copy: "Stay with the field. Nothing is asked of you.",
        volume: 0.26,
        harmonicMix: 0.22,
      },
      {
        name: "Return",
        start: 660,
        end: 870,
        copy: "Upper layers recede. Only the root remains.",
        volume: 0.14,
      },
      {
        name: "Silence",
        start: 870,
        end: 900,
        copy: "The star remains.",
        volume: 0,
      },
    ],
  },
  {
    id: "root",
    title: "0.7 Hz",
    duration: 12 * 60,
    feeling: "Deep body rest",
    bestFor: "Grounding",
    durationLabel: "12 min",
    carrierHz: 90,
    harmonicHz: null,
    lfoHz: 0.7,
    lfoDepth: 0.42,
    phases: [
      {
        name: "Entry",
        start: 0,
        end: 45,
        copy: "Settle. The pulse is slow on purpose.",
        volume: 0.18,
      },
      {
        name: "Deep rest",
        start: 45,
        end: 690,
        copy: "Continuous root. Almost no variation.",
        volume: 0.2,
      },
      {
        name: "Exit",
        start: 690,
        end: 720,
        copy: "Fade. Leave the body where it is.",
        volume: 0,
      },
    ],
  },
  {
    id: "silent",
    title: "Silent",
    duration: 10 * 60,
    feeling: "Pure presence",
    bestFor: "Stillness",
    durationLabel: "10 min",
    carrierHz: 160,
    harmonicHz: null,
    lfoHz: 0.7,
    lfoDepth: 0.2,
    phases: [
      {
        name: "Threshold",
        start: 0,
        end: 60,
        copy: "A faint pulse, then the field opens.",
        volume: 0.08,
      },
      {
        name: "Silence field",
        start: 60,
        end: 570,
        copy: "No sound. Keep the visual as an anchor.",
        volume: 0,
      },
      {
        name: "Return",
        start: 570,
        end: 600,
        copy: "One last pulse. Then nothing.",
        volume: 0.06,
      },
    ],
  },
  {
    id: "ghost",
    title: "Ghost",
    duration: 14 * 60,
    feeling: "Unfinished material",
    bestFor: "Exploration",
    durationLabel: "14 min",
    carrierHz: 196,
    harmonicHz: 247,
    lfoHz: 0.7,
    lfoDepth: 0.28,
    phases: [
      {
        name: "Drift",
        start: 0,
        end: 180,
        copy: "Fragments. The root appears and leaves.",
        volume: 0.14,
      },
      {
        name: "Unstable field",
        start: 180,
        end: 720,
        copy: "Experimental layers. Do not chase them.",
        volume: 0.18,
        harmonicMix: 0.16,
      },
      {
        name: "Dissolution",
        start: 720,
        end: 840,
        copy: "Everything thins back to 0.7 Hz.",
        volume: 0.1,
      },
    ],
  },
];

export function getSession(id: string | undefined): SessionDef | undefined {
  return SESSIONS.find((s) => s.id === id);
}

export function withForm(
  session: SessionDef,
  form: "full" | "short",
): SessionDef {
  if (form === "full" || session.duration <= FIRST_LISTEN) return session;
  const scale = FIRST_LISTEN / session.duration;
  const phases = session.phases.map((p, i, arr) => ({
    ...p,
    start: Math.round(p.start * scale),
    end: i === arr.length - 1 ? FIRST_LISTEN : Math.round(p.end * scale),
  }));
  return {
    ...session,
    duration: FIRST_LISTEN,
    durationLabel: "90 s",
    phases,
  };
}

export function phaseAt(session: SessionDef, elapsed: number): Phase {
  return (
    session.phases.find((p) => elapsed >= p.start && elapsed < p.end) ??
    session.phases[session.phases.length - 1]
  );
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const r = (s % 60).toString().padStart(2, "0");
  return `${m}:${r}`;
}

