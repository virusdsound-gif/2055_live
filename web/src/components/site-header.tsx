import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function SiteHeader({ quiet = false }: { quiet?: boolean }) {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-4 px-5 py-4 sm:px-8",
        quiet && "absolute inset-x-0 top-0 z-10",
      )}
    >
      <Link
        to="/"
        className="font-display text-sm uppercase tracking-mark text-fg"
      >
        2055_live
      </Link>
      <nav className="flex items-center gap-1 text-sm">
        <Link
          to="/sessions"
          className="inline-flex min-h-11 items-center rounded-full px-3 py-2 text-muted transition-colors duration-150 hover:text-fg"
        >
          Sessions
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex min-h-11 items-center rounded-full px-3 py-2 text-muted transition-colors duration-150 hover:text-fg"
        >
          System
        </Link>
      </nav>
    </header>
  );
}
