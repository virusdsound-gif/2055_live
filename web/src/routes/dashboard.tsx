import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  FilingList,
  PlaneLegend,
  ProjectTree,
} from "@/components/project-tree";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { FILINGS, LIVE_SLICE, WHOLE_GRID } from "@/lib/grid";
import { getSession } from "@/lib/sessions";
import { formatListened, loadStore } from "@/lib/session-store";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const store = useMemo(() => loadStore(), []);
  const last = store.lastId ? getSession(store.lastId) : undefined;

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pb-20 pt-6 sm:px-8">
        <p className="text-xs uppercase tracking-mark text-muted">System</p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight">
          Overview
        </h1>
        <p className="mt-3 max-w-lg text-sm text-muted">
          What a listener can enter. The map and the filings stay folded.
        </p>

        <PlaneLegend className="mt-6" />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Completed" value={String(store.completed)} />
          <Stat label="Last room" value={last ? last.title : "None"} />
          <Stat label="Listened" value={formatListened(store.listenedSeconds)} />
          <Stat label="Root" value="0.7 Hz" />
        </div>

        {store.history.length > 0 ? (
          <section className="mt-8 rounded-xl border border-border bg-surface p-5">
            <h2 className="font-display text-lg font-medium">Recent</h2>
            <ul className="mt-3 grid gap-2">
              {store.history.map((entry) => {
                const room = getSession(entry.id);
                return (
                  <li
                    key={entry.at}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span className="text-fg">
                      {room?.title ?? entry.id}
                      {entry.form === "short" ? " · first listen" : ""}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-subtle">
                      {formatListened(entry.seconds)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <div className="mt-8 grid gap-4">
          <ProjectTree root={LIVE_SLICE} />
          <ProjectTree root={WHOLE_GRID} fold />
          <FilingList filings={FILINGS} fold />
        </div>

        <Button asChild variant="outline" className="mt-8">
          <Link to="/session/$id" params={{ id: "morning-star" }}>
            Begin Morning Star
          </Link>
        </Button>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-xs uppercase tracking-mark text-subtle">{label}</p>
      <p className="mt-2 font-display text-2xl tabular-nums text-fg">{value}</p>
    </div>
  );
}
