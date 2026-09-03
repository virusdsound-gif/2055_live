import { createFileRoute, Link } from "@tanstack/react-router";
import { SessionPlayer } from "@/components/session-player";
import { SiteHeader } from "@/components/site-header";
import { getSession, withForm } from "@/lib/sessions";

export const Route = createFileRoute("/session/$id")({
  validateSearch: (search: Record<string, unknown>): { form?: "short" } => ({
    form: search.form === "short" ? "short" : undefined,
  }),
  component: SessionRoute,
});

function SessionRoute() {
  const { id } = Route.useParams();
  const { form } = Route.useSearch();
  const session = getSession(id);
  const mode = form === "short" ? "short" : "full";

  if (!session) {
    return (
      <div className="min-h-dvh">
        <SiteHeader />
        <main className="px-6 py-20 text-center">
          <h1 className="font-display text-2xl">Session not found</h1>
          <Link to="/sessions" className="mt-6 inline-flex min-h-11 text-muted">
            Return to sessions
          </Link>
        </main>
      </div>
    );
  }

  const active = withForm(session, mode);

  return (
    <div className="min-h-dvh">
      <SiteHeader quiet />
      <SessionPlayer
        key={`${session.id}-${mode}`}
        session={active}
        source={session}
        form={mode}
      />
    </div>
  );
}
