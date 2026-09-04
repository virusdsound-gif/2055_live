import { Link } from "@tanstack/react-router";
import { Headphones, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PulseOrb } from "@/components/pulse-orb";
import { SessionAudio } from "@/lib/audio-engine";
import {
  FIRST_LISTEN,
  formatClock,
  phaseAt,
  type SessionDef,
} from "@/lib/sessions";
import { recordComplete } from "@/lib/session-store";
import { cn } from "@/lib/utils";

type Status = "idle" | "running" | "complete";
type Form = "full" | "short";

export function SessionPlayer({
  session,
  source,
  form,
}: {
  session: SessionDef;
  source: SessionDef;
  form: Form;
}) {
  const audioRef = useRef<SessionAudio | null>(null);
  const startRef = useRef<number | null>(null);
  const lastUiRef = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [level, setLevel] = useState(0.7);

  const phase = phaseAt(session, elapsed);
  const progress = Math.min(1, elapsed / session.duration);
  const canShort = source.duration > FIRST_LISTEN;

  useEffect(() => {
    return () => {
      void audioRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    if (status !== "running") return;
    let raf = 0;
    const loop = () => {
      const origin = startRef.current;
      if (origin == null) return;
      const next = (performance.now() - origin) / 1000;
      if (next >= session.duration) {
        setElapsed(session.duration);
        startRef.current = null;
        void audioRef.current?.stop();
        audioRef.current = null;
        setStatus("complete");
        recordComplete(session.id, session.duration, form);
        return;
      }
      const p = phaseAt(session, next);
      audioRef.current?.setLevel(p.volume, {
        harmonic: p.harmonicMix ?? 0,
        noise: p.noiseMix ?? 0,
        pad: p.padMix ?? 0,
      });
      if (session.id === "ghost") {
        audioRef.current?.driftCarrier(170 + Math.sin(next / 11) * 28);
      }
      if (next - lastUiRef.current >= 0.25) {
        lastUiRef.current = next;
        setElapsed(next);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [status, session, form]);

  async function begin() {
    if (status === "running") return;
    const engine = new SessionAudio();
    audioRef.current = engine;
    await engine.start(session);
    engine.setUserGain(level);
    const p = phaseAt(session, 0);
    engine.setLevel(p.volume, {
      harmonic: p.harmonicMix ?? 0,
      noise: p.noiseMix ?? 0,
      pad: p.padMix ?? 0,
    });
    startRef.current = performance.now();
    lastUiRef.current = 0;
    setElapsed(0);
    setStatus("running");
  }

  function endEarly() {
    startRef.current = null;
    void audioRef.current?.stop();
    audioRef.current = null;
    setStatus("idle");
    setElapsed(0);
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center px-6 py-24 text-center">
      <PulseOrb live={status === "running"} />

      <p className="mt-10 text-xs uppercase tracking-mark text-muted">
        {status === "complete"
          ? "Complete"
          : form === "short"
            ? `First listen · ${phase.name}`
            : phase.name}
      </p>
      <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-fg">
        {session.title}
      </h1>
      <p className="mt-3 min-h-12 text-sm text-muted">
        {status === "complete"
          ? "The star remains."
          : status === "idle"
            ? form === "short"
              ? "Ninety seconds through the cut."
              : session.feeling
            : phase.copy}
      </p>

      <p className="mt-8 font-mono text-sm tabular-nums text-subtle">
        {formatClock(elapsed)} / {formatClock(session.duration)}
      </p>
      <div className="mt-3 h-px w-full overflow-hidden bg-elevated">
        <div
          className="h-full origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <ol className="mt-4 flex items-center justify-center gap-2" aria-label="Phases">
        {session.phases.map((p) => {
          const on = elapsed >= p.start;
          return (
            <li key={p.name}>
              <span
                className={cn(
                  "block size-1.5 rounded-full",
                  on ? "bg-accent" : "bg-elevated",
                )}
              >
                <span className="sr-only">{p.name}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <label className="mt-8 flex w-full max-w-xs flex-col gap-2 text-xs text-subtle">
        <span className="uppercase tracking-mark">Level</span>
        <input
          className="level-range"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={level}
          aria-label="Level"
          onChange={(e) => {
            const next = Number(e.target.value);
            setLevel(next);
            audioRef.current?.setUserGain(next);
          }}
        />
      </label>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        {status !== "running" ? (
          <Button onClick={() => void begin()} className="w-full sm:w-auto">
            {status === "complete" ? "Begin again" : "Begin"}
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={endEarly}
            className="w-full sm:w-auto"
          >
            <Square className="size-3.5 fill-current" />
            End
          </Button>
        )}
      </div>

      {status !== "running" && canShort ? (
        <div className="mt-3">
          {form === "full" ? (
            <Button asChild variant="ghost" size="sm">
              <Link
                to="/session/$id"
                params={{ id: session.id }}
                search={{ form: "short" }}
              >
                First listen · 90s
              </Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link
                to="/session/$id"
                params={{ id: session.id }}
                search={{ form: undefined }}
              >
                Full session · {source.durationLabel}
              </Link>
            </Button>
          )}
        </div>
      ) : null}

      <p className="mt-8 flex items-center justify-center gap-2 text-xs text-subtle">
        <Headphones className="size-3.5" />
        {session.binaural
          ? "Headphones. 0.7 Hz between the ears."
          : "Headphones recommended. 0.7 Hz root throughout."}
      </p>

      <Link
        to="/sessions"
        className="mt-6 inline-flex min-h-11 items-center text-sm text-muted hover:text-fg"
      >
        All sessions
      </Link>
    </div>
  );
}
