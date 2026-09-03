import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PLANE_LABEL,
  type Filing,
  type GridNode,
  type Plane,
} from "@/lib/grid";

const planeClass: Record<Plane, string> = {
  live: "text-fg",
  deferred: "text-muted",
  archive: "text-subtle",
};

function Stamp({ plane }: { plane: Plane }) {
  return (
    <span
      className={cn(
        "shrink-0 text-xs uppercase tracking-mark",
        plane === "live" ? "text-accent" : "text-subtle",
      )}
    >
      {PLANE_LABEL[plane]}
    </span>
  );
}

function Branch({ node }: { node: GridNode }) {
  const kids = node.children ?? [];
  return (
    <li>
      <div className="flex items-baseline justify-between gap-4 py-2">
        <div className="min-w-0">
          <p className={cn("text-sm font-medium", planeClass[node.plane])}>
            {node.label}
          </p>
          {node.note ? (
            <p className="mt-0.5 text-sm text-muted">{node.note}</p>
          ) : null}
        </div>
        <Stamp plane={node.plane} />
      </div>
      {kids.length > 0 ? (
        <ul className="mb-1 ml-1 border-l border-border pl-4">
          {kids.map((child) => (
            <Branch key={child.id} node={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function PlaneLegend({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted",
        className,
      )}
    >
      <li>
        <span className="uppercase tracking-mark text-accent">Live</span>
        {" — in the room"}
      </li>
      <li>
        <span className="uppercase tracking-mark text-subtle">Deferred</span>
        {" — scheduled later"}
      </li>
      <li>
        <span className="uppercase tracking-mark text-subtle">Archive</span>
        {" — recorded, not in the way"}
      </li>
    </ul>
  );
}

export function ProjectTree({
  root,
  fold = false,
}: {
  root: GridNode;
  fold?: boolean;
}) {
  const kids = root.children ?? [];
  const body = (
    <>
      {root.note ? (
        <p className="mt-2 max-w-prose text-sm text-muted">{root.note}</p>
      ) : null}
      <ul className="mt-5 border-t border-border pt-2">
        {kids.map((child) => (
          <Branch key={child.id} node={child} />
        ))}
      </ul>
    </>
  );

  const heading = (
    <h2 className="font-display text-xl font-medium tracking-tight">
      {root.label}
    </h2>
  );

  if (fold) {
    return (
      <details className="group rounded-xl border border-border bg-surface p-5 sm:p-6">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
          {heading}
          <span className="flex items-center gap-3">
            <Stamp plane={root.plane} />
            <ChevronDown className="size-4 text-subtle transition-transform duration-150 group-open:rotate-180" />
          </span>
        </summary>
        {body}
      </details>
    );
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <header className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">{heading}</div>
        <Stamp plane={root.plane} />
      </header>
      {body}
    </section>
  );
}

export function FilingList({
  filings,
  fold = false,
}: {
  filings: Filing[];
  fold?: boolean;
}) {
  const body = (
    <ul className="mt-5 grid gap-4">
      {filings.map((filing) => (
        <li
          key={filing.id}
          className="rounded-lg border border-border bg-elevated p-4"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-sm font-medium text-fg">{filing.title}</h3>
            <Stamp plane={filing.plane} />
          </div>
          <p className="mt-2 text-sm text-muted">{filing.what}</p>
          <p className="mt-3 text-sm text-fg">
            <span className="text-subtle">Keep. </span>
            {filing.keep}
          </p>
          <p className="mt-1 text-sm text-muted">
            <span className="text-subtle">Drop. </span>
            {filing.drop}
          </p>
        </li>
      ))}
    </ul>
  );

  if (fold) {
    return (
      <details className="group rounded-xl border border-border bg-surface p-5 sm:p-6">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
          <h2 className="font-display text-xl font-medium tracking-tight">
            Filed from the table
          </h2>
          <ChevronDown className="size-4 text-subtle transition-transform duration-150 group-open:rotate-180" />
        </summary>
        <p className="mt-2 max-w-prose text-sm text-muted">
          Two artifacts. Neither runs the room.
        </p>
        {body}
      </details>
    );
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <header>
        <h2 className="font-display text-xl font-medium tracking-tight">
          Filed from the table
        </h2>
        <p className="mt-2 max-w-prose text-sm text-muted">
          Two artifacts. Neither runs the room.
        </p>
      </header>
      {body}
    </section>
  );
}
