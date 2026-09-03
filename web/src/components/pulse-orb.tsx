import { cn } from "@/lib/utils";

export function PulseOrb({
  className,
  size = "lg",
  live = false,
}: {
  className?: string;
  size?: "sm" | "lg";
  live?: boolean;
}) {
  const dim = size === "lg" ? "size-28" : "size-14";
  return (
    <div
      className={cn("relative grid place-items-center", dim, className)}
      aria-hidden
    >
      <span className="pulse-orb absolute inset-0 rounded-full border border-border-strong" />
      <span
        className={cn(
          "pulse-orb absolute inset-4 rounded-full",
          live ? "bg-accent/25" : "bg-accent/15",
        )}
      />
      <span className="size-2 rounded-full bg-accent" />
    </div>
  );
}
