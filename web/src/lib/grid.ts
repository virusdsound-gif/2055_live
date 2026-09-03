export type Plane = "live" | "deferred" | "archive";

export type GridNode = {
  id: string;
  label: string;
  plane: Plane;
  note?: string;
  children?: GridNode[];
};

export const PLANE_LABEL: Record<Plane, string> = {
  live: "Live",
  deferred: "Deferred",
  archive: "Archive",
};

/** The road. What a person can touch now. */
export const LIVE_SLICE: GridNode = {
  id: "live-slice",
  label: "Live slice",
  plane: "live",
  note: "The road. Portal, four rooms, local system. Nothing else pretends to run.",
  children: [
    {
      id: "identity",
      label: "Django Sound",
      plane: "live",
      note: "One identity. KNG DRIZZ and Essentium are registers, not subsystems.",
    },
    {
      id: "frequency",
      label: "0.7 Hz root",
      plane: "live",
      note: "Carrier AM throughout. The pulse is slow on purpose.",
    },
    {
      id: "music",
      label: "Music",
      plane: "live",
      children: [
        {
          id: "morning-star",
          label: "Morning Star",
          plane: "live",
          note: "Flagship. 15 minutes.",
        },
        {
          id: "root-room",
          label: "0.7 Hz",
          plane: "live",
          note: "Grounding. 12 minutes.",
        },
        {
          id: "silent",
          label: "Silent",
          plane: "live",
          note: "Stillness. 10 minutes.",
        },
        {
          id: "ghost",
          label: "Ghost",
          plane: "live",
          note: "Exploration. 14 minutes.",
        },
      ],
    },
    {
      id: "surface",
      label: "Surface",
      plane: "live",
      children: [
        { id: "portal", label: "Portal", plane: "live" },
        { id: "sessions", label: "Sessions", plane: "live" },
        { id: "player", label: "Player", plane: "live" },
        {
          id: "system",
          label: "System overview",
          plane: "live",
          note: "Operator. This device only.",
        },
      ],
    },
    {
      id: "telemetry",
      label: "Telemetry",
      plane: "live",
      note: "Completions and last room, stored here. Not a network.",
    },
  ],
};

/** The map. Original grid, every box stamped. */
export const WHOLE_GRID: GridNode = {
  id: "essentium-grid",
  label: "Essentium Grid",
  plane: "live",
  note: "The whole project. Live is the road. Deferred waits. Archive is recorded, not in the way.",
  children: [
    {
      id: "control",
      label: "Control",
      plane: "live",
      note: "Thin. Not a separate operating system.",
      children: [
        {
          id: "start",
          label: "Start",
          plane: "live",
          note: "Portal and Begin.",
        },
        {
          id: "status",
          label: "Status",
          plane: "live",
          note: "This overview.",
        },
        {
          id: "audit",
          label: "Audit",
          plane: "live",
          note: "Local completions. No operator log sink.",
        },
      ],
    },
    {
      id: "identity-branch",
      label: "Identity",
      plane: "live",
      note: "One person. Three registers.",
      children: [
        {
          id: "kng-drizz",
          label: "KNG DRIZZ",
          plane: "live",
          note: "Register. Not a subsystem.",
        },
        {
          id: "django-sound",
          label: "Django Sound",
          plane: "live",
          note: "Public name.",
        },
        {
          id: "essentium",
          label: "Essentium",
          plane: "live",
          note: "Grid name.",
        },
      ],
    },
    {
      id: "orchestration",
      label: "Orchestration",
      plane: "live",
      children: [
        {
          id: "core",
          label: "Core",
          plane: "live",
          note: "Session runtime. Web Audio AM.",
        },
        {
          id: "engines",
          label: "Engines",
          plane: "archive",
          note: "Characters. Not running.",
          children: [
            { id: "lexi", label: "Lexi", plane: "archive" },
            { id: "vivian", label: "Vivian", plane: "archive" },
            { id: "trinity", label: "Trinity", plane: "archive" },
            { id: "void-seal", label: "Void Seal", plane: "archive" },
          ],
        },
        {
          id: "fractal-nexus",
          label: "Fractal nexus",
          plane: "archive",
          note: "Recorded prune-and-signal run. Not a live runtime.",
        },
        {
          id: "frequency-node",
          label: "Frequency",
          plane: "live",
          note: "0.7 Hz root.",
        },
        {
          id: "data",
          label: "Data",
          plane: "live",
          note: "Local store. Shared durable data is deferred.",
        },
      ],
    },
    {
      id: "service-mesh",
      label: "Service mesh",
      plane: "live",
      children: [
        { id: "music-svc", label: "Music", plane: "live" },
        {
          id: "telemetry-svc",
          label: "Telemetry",
          plane: "live",
          note: "This device.",
        },
        {
          id: "archive-svc",
          label: "Archive",
          plane: "deferred",
          note: "Lyrics and production remain off this surface.",
        },
      ],
    },
    {
      id: "security",
      label: "Security",
      plane: "deferred",
      children: [
        { id: "mirror", label: "Mirror", plane: "deferred" },
        { id: "fortress", label: "Fortress", plane: "deferred" },
        { id: "shield", label: "Shield", plane: "deferred" },
      ],
    },
    {
      id: "protocol",
      label: "Protocol",
      plane: "deferred",
      note: "Resume only when scheduled.",
      children: [
        { id: "solidity", label: "Solidity", plane: "deferred" },
        { id: "ledger", label: "Ledger", plane: "deferred" },
        { id: "validation", label: "Validation", plane: "deferred" },
      ],
    },
    {
      id: "recovery",
      label: "Recovery",
      plane: "deferred",
      children: [
        { id: "restore", label: "Restore", plane: "deferred" },
        { id: "resurrect", label: "Resurrect", plane: "deferred" },
        { id: "return", label: "Return", plane: "deferred" },
      ],
    },
    {
      id: "observability",
      label: "Observability",
      plane: "live",
      note: "Only what is true.",
      children: [
        {
          id: "health",
          label: "Health",
          plane: "live",
          note: "Root, last room, completed count.",
        },
        {
          id: "events",
          label: "Events",
          plane: "live",
          note: "Local session history.",
        },
        {
          id: "logs",
          label: "Logs",
          plane: "deferred",
          note: "No remote sink.",
        },
      ],
    },
    {
      id: "cli-bridge",
      label: "API / CLI bridge",
      plane: "archive",
      note: "Termux was the door. It is not the door now.",
    },
    {
      id: "dashboard",
      label: "Essentium Dashboard",
      plane: "live",
      note: "This page. Serves the work. Does not invent metrics.",
    },
    {
      id: "legacy-cockpit",
      label: "Legacy operator cockpit",
      plane: "archive",
      note: "PaC, APY, crown, 145.9 Hz, simulated socket. Theatre.",
    },
    {
      id: "django-leaf",
      label: "Django Sound",
      plane: "live",
      note: "The work. Identity lives above, not as a product of the dashboard.",
    },
  ],
};

export type Filing = {
  id: string;
  title: string;
  plane: Plane;
  what: string;
  keep: string;
  drop: string;
};

export const FILINGS: Filing[] = [
  {
    id: "legacy-cockpit",
    title: "Legacy operator cockpit",
    plane: "archive",
    what: "PaC balance, crown authority, 145.9 Hz, yield, Trinity cards, simulated live socket.",
    keep: "Nothing as a live number. The room already has a real 0.7 Hz field.",
    drop: "Token balance, APY, crown percent, 145.9 Hz, socket theatre, Lexi / Vivian / Void Seal as running modules.",
  },
  {
    id: "fractal-nexus",
    title: "Fractal nexus run",
    plane: "archive",
    what: "A prune-and-signal log under D'sound. Energy redistributed after named feedback.",
    keep: "The pruning rule. Unused branches leave the live trunk. That is already Live / Deferred / Archive.",
    drop: "Energy scores as a runtime, nested Root.1.1.1 as product structure, named feedback as engines.",
  },
];

