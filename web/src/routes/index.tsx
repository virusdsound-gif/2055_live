import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PulseOrb } from "@/components/pulse-orb";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="relative min-h-dvh">
      <SiteHeader quiet />
      <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center">
        <PulseOrb />
        <p className="mt-10 text-xs uppercase tracking-mark text-muted">
          Transnet
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl">
          2055_live
        </h1>
        <p className="mt-5 max-w-sm text-pretty text-base text-muted">
          You have crossed into a space for intentional listening. Presence
          without demand.
        </p>
        <Button asChild className="mt-10" size="lg">
          <Link to="/session/$id" params={{ id: "morning-star" }}>
            Begin Morning Star
          </Link>
        </Button>
        <Link
          to="/session/$id"
          params={{ id: "morning-star" }}
          search={{ form: "short" }}
          className="mt-4 inline-flex min-h-11 items-center text-sm text-muted hover:text-fg"
        >
          First listen · 90s
        </Link>
        <Link
          to="/sessions"
          className="mt-1 inline-flex min-h-11 items-center text-sm text-subtle hover:text-fg"
        >
          All sessions
        </Link>
        <p className="mt-8 text-xs text-subtle">
          Root frequency 0.7 Hz · Django Sound
        </p>
      </main>
    </div>
  );
}
