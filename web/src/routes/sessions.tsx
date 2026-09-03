import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SESSIONS } from "@/lib/sessions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sessions")({ component: SessionsPage });

function SessionsPage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-lg px-5 pb-16 pt-6 sm:px-8">
        <p className="text-xs uppercase tracking-mark text-muted">
          Choose a session
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight">
          Listening rooms
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          Four rooms. One root. Headphones on.
        </p>

        <ul className="mt-8 grid gap-3">
          {SESSIONS.map((s) => (
            <li key={s.id}>
              <Link
                to="/session/$id"
                params={{ id: s.id }}
                className={cn(
                  "block rounded-xl border bg-surface p-5 transition-[border-color,background-color] duration-150 hover:border-border-strong hover:bg-elevated",
                  s.flagship ? "border-border-strong" : "border-border",
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-lg font-medium text-fg">
                    {s.title}
                  </h2>
                  <span className="font-mono text-xs tabular-nums text-subtle">
                    {s.durationLabel}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{s.feeling}</p>
                <p className="mt-1 text-xs text-subtle">{s.bestFor}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
