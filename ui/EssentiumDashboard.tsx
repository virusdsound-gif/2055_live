import React, { useMemo, useState } from "react";

/*
 * ESSENTIUM / DSOUND COMMAND DASHBOARD
 * Full command surface (overview → telemetry).
 * Live spine is ONLINE; archived design layers are ARCHIVED (not fake ONLINE).
 */

type Status = "ONLINE" | "ACTIVE" | "STABLE" | "ARCHIVED" | "PARKED";

type Module = {
  name: string;
  category: string;
  description: string;
  status: Status;
  files: string[];
};

type Event = {
  time: string;
  source: string;
  message: string;
  level: "INFO" | "SYNC" | "WARN";
};

const modules: Module[] = [
  {
    name: "Essentium Core",
    category: "CORE",
    description: "Primary identity, state, and orchestration root.",
    status: "ONLINE",
    files: ["docs/SYSTEM_STATUS.md", "ui/EssentiumDashboard.tsx"],
  },
  {
    name: "Django Sound",
    category: "CREATIVE",
    description: "0.7 Hz root · KNG DRIZZ · music and presence.",
    status: "ACTIVE",
    files: ["ui/morning-star.html", "music/morning-star-after-the-noise.md"],
  },
  {
    name: "2055 Live",
    category: "LIVE",
    description: "Portal → sessions → Morning Star continuous path.",
    status: "ONLINE",
    files: ["ui/portal.html", "ui/session-select.html", "docs/SESSIONS.md"],
  },
  {
    name: "Dsoundics",
    category: "ENGINE",
    description: "Signal and frequency design layer (archived scripts).",
    status: "ARCHIVED",
    files: ["dsoundics_music.py", "beat_generator.py"],
  },
  {
    name: "Lexi",
    category: "COGNITION",
    description: "Lexical / frequency design notes — not a live runtime service.",
    status: "ARCHIVED",
    files: ["docs/TERMUX_AND_GIT_TRACK.md"],
  },
  {
    name: "Vivian",
    category: "COGNITION",
    description: "Narrative / restoration design layer — archived.",
    status: "ARCHIVED",
    files: ["docs/TERMUX_AND_GIT_TRACK.md"],
  },
  {
    name: "Trinity",
    category: "PROTOCOL",
    description: "Multi-node coordination design — archived.",
    status: "ARCHIVED",
    files: ["docs/TERMUX_AND_GIT_TRACK.md"],
  },
  {
    name: "Mirror Layer",
    category: "SECURITY",
    description: "Identity and sovereignty design notes.",
    status: "ARCHIVED",
    files: ["docs/GIT_SHELF_AND_PUBLIC.md"],
  },
  {
    name: "Fortress",
    category: "SECURITY",
    description: "Boundary and protection design — archived.",
    status: "ARCHIVED",
    files: ["docs/GIT_SHELF_AND_PUBLIC.md"],
  },
  {
    name: "Frequency Engine",
    category: "SIGNAL",
    description: "0.7 / 99.9 / 200 / 369 Hz map — session-backed.",
    status: "ACTIVE",
    files: ["ui/morning-star.html", "docs/SESSIONS.md"],
  },
  {
    name: "Music Vault",
    category: "CREATIVE",
    description: "Lyrics, production lane, track later.",
    status: "ACTIVE",
    files: ["music/morning-star-after-the-noise.md"],
  },
  {
    name: "Recovery",
    category: "RECOVERY",
    description: "Return / restore design — archived.",
    status: "ARCHIVED",
    files: ["docs/TERMUX_AND_GIT_TRACK.md"],
  },
  {
    name: "Chain / Hardhat",
    category: "PROTOCOL",
    description: "Deploy path parked until deliberately chosen.",
    status: "PARKED",
    files: ["hardhat-project/", "MorningStar.sol"],
  },
];

const contracts = [
  "MorningStar.sol",
  "EssentiumTrade.sol (draft)",
  "seal / validate family (archived drafts)",
];

const fileGroups: Record<string, string[]> = {
  "Live UI": [
    "ui/portal.html",
    "ui/session-select.html",
    "ui/morning-star.html",
    "ui/EssentiumDashboard.tsx",
  ],
  Docs: [
    "docs/SYSTEM_STATUS.md",
    "docs/SESSIONS.md",
    "docs/GIT_SHELF_AND_PUBLIC.md",
    "docs/TERMUX_AND_GIT_TRACK.md",
    "docs/OPTIMIZE_LOG.md",
  ],
  Creative: ["music/morning-star-after-the-noise.md"],
  Protocol: ["MorningStar.sol", "hardhat-project/"],
};

const initialEvents: Event[] = [
  {
    time: "SYSTEM",
    source: "BOOT",
    message: "Full command dashboard loaded.",
    level: "INFO",
  },
  {
    time: "CORE",
    source: "OPTIMIZE",
    message: "Archived layers labeled ARCHIVED — not ONLINE.",
    level: "SYNC",
  },
  {
    time: "LIVE",
    source: "2055",
    message: "Portal path registered.",
    level: "INFO",
  },
  {
    time: "CREATIVE",
    source: "DJANGO",
    message: "Morning Star + music vault active.",
    level: "SYNC",
  },
];

function now() {
  return new Date().toLocaleTimeString();
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`status status-${status.toLowerCase()}`}>{status}</span>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function EssentiumDashboard() {
  const [view, setView] = useState("overview");
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [pulse, setPulse] = useState(73);
  const [integrity, setIntegrity] = useState(98);
  const [running, setRunning] = useState(true);

  const filteredModules = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return modules;
    return modules.filter((module) =>
      [module.name, module.category, module.description, ...module.files]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const filteredFiles = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return fileGroups;
    const result: Record<string, string[]> = {};
    Object.entries(fileGroups).forEach(([group, files]) => {
      const matches = files.filter((file) => file.toLowerCase().includes(q));
      if (matches.length) result[group] = matches;
    });
    return result;
  }, [query]);

  function addEvent(
    source: string,
    message: string,
    level: Event["level"] = "INFO"
  ) {
    setEvents((current) => [
      { time: now(), source, message, level },
      ...current,
    ]);
  }

  function runPulse() {
    const nextPulse = Math.floor(60 + Math.random() * 36);
    const nextIntegrity = Math.floor(94 + Math.random() * 7);
    setPulse(nextPulse);
    setIntegrity(nextIntegrity);
    addEvent("PULSE", `System pulse recalculated: ${nextPulse}%`, "SYNC");
  }

  function toggleRuntime() {
    const next = !running;
    setRunning(next);
    addEvent(
      "RUNTIME",
      next ? "Live runtime resumed." : "Live runtime paused.",
      next ? "INFO" : "WARN"
    );
  }

  function runAudit() {
    setIntegrity(100);
    addEvent("AUDIT", "Spine integrity audit completed.", "SYNC");
  }

  const stats = {
    modules: modules.length,
    contracts: contracts.length,
    files: Object.values(fileGroups).flat().length,
    events: events.length,
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        :root {
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #07090d;
          color: #e8edf5;
        }
        body {
          margin: 0;
          background:
            radial-gradient(circle at top right, rgba(65, 95, 150, 0.12), transparent 32%),
            #07090d;
        }
        button, input { font: inherit; }
        button { cursor: pointer; }
        .app { min-height: 100vh; }
        .topbar {
          position: sticky; top: 0; z-index: 20;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
          padding: 16px 22px;
          border-bottom: 1px solid #1c2330;
          background: rgba(7, 9, 13, 0.94);
          backdrop-filter: blur(14px);
        }
        .brand { display: flex; align-items: center; gap: 12px; }
        .brand-mark {
          width: 38px; height: 38px; display: grid; place-items: center;
          border: 1px solid #56667d; border-radius: 12px;
          font-weight: 800; letter-spacing: -1px;
        }
        .brand-title { font-weight: 800; letter-spacing: 0.08em; }
        .brand-sub { margin-top: 2px; font-size: 11px; color: #7f8da1; letter-spacing: 0.12em; }
        .runtime {
          display: flex; align-items: center; gap: 9px;
          font-size: 12px; color: #9ba7b8;
        }
        .dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: ${running ? "#7ddea0" : "#d1b98c"};
        }
        .shell {
          display: grid;
          grid-template-columns: 220px 1fr;
          min-height: calc(100vh - 71px);
        }
        .sidebar {
          border-right: 1px solid #1c2330;
          padding: 18px 12px;
        }
        .nav-label {
          padding: 10px 12px;
          font-size: 10px; color: #69768a;
          letter-spacing: 0.16em; text-transform: uppercase;
        }
        .nav { display: grid; gap: 5px; }
        .nav button {
          border: 1px solid transparent;
          background: transparent;
          color: #9da9ba;
          text-align: left;
          padding: 10px 12px;
          border-radius: 9px;
        }
        .nav button:hover,
        .nav button.active {
          border-color: #273244;
          background: #10151d;
          color: #f0f4fa;
        }
        .main { width: 100%; max-width: 1500px; padding: 24px; }
        .hero {
          display: flex; justify-content: space-between; gap: 20px;
          align-items: flex-end; margin-bottom: 22px; flex-wrap: wrap;
        }
        .eyebrow {
          color: #7d8ba0; font-size: 11px;
          letter-spacing: 0.15em; text-transform: uppercase;
        }
        h1 {
          margin: 7px 0;
          font-size: clamp(28px, 4vw, 48px);
          letter-spacing: -0.04em;
        }
        .hero p {
          max-width: 680px; margin: 0;
          color: #8996a9; line-height: 1.6;
        }
        .search {
          min-width: 260px; max-width: 360px; width: 100%;
          padding: 12px 14px;
          border: 1px solid #283344; border-radius: 10px;
          outline: none; background: #0d1118; color: #e8edf5;
        }
        .search:focus { border-color: #52647e; }
        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px; margin-bottom: 28px;
        }
        .stat {
          padding: 18px;
          border: 1px solid #1c2634; border-radius: 13px;
          background: #0b0f15;
        }
        .stat-label {
          color: #738096; font-size: 11px;
          text-transform: uppercase; letter-spacing: 0.12em;
        }
        .stat-value { margin-top: 8px; font-size: 28px; font-weight: 800; }
        .section { margin-top: 30px; }
        .section-head {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 13px;
        }
        h2 { margin: 0; font-size: 18px; }
        .section-head p { margin: 4px 0 0; color: #718096; font-size: 12px; }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .card {
          border: 1px solid #1d2735; border-radius: 13px;
          background: #0b0f15; padding: 16px;
        }
        .card:hover { border-color: #344257; }
        .card-top {
          display: flex; justify-content: space-between; gap: 12px;
        }
        .card-title { font-weight: 750; }
        .category {
          margin-top: 4px; color: #66758a;
          font-size: 10px; letter-spacing: 0.13em;
        }
        .description {
          min-height: 58px; margin: 14px 0;
          color: #8996a9; font-size: 13px; line-height: 1.5;
        }
        .files { display: flex; flex-wrap: wrap; gap: 5px; }
        .file {
          padding: 5px 7px;
          border: 1px solid #202c3b; border-radius: 6px;
          color: #7e8da1; font-size: 10px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        .status {
          height: fit-content; padding: 4px 7px;
          border: 1px solid #303c4e; border-radius: 999px;
          font-size: 9px; font-weight: 800; letter-spacing: 0.08em;
        }
        .status-online, .status-stable, .status-active { color: #b8c9df; }
        .status-archived, .status-parked { color: #66758a; }
        .panel {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 12px;
        }
        .metric {
          padding: 18px;
          border: 1px solid #1d2735; border-radius: 13px;
          background: #0b0f15;
        }
        .metric-head {
          display: flex; justify-content: space-between;
          color: #8d9aae; font-size: 12px;
        }
        .metric-number {
          margin: 13px 0 10px; font-size: 36px; font-weight: 850;
        }
        .bar {
          height: 7px; overflow: hidden;
          border-radius: 999px; background: #171e29;
        }
        .bar > span {
          display: block; height: 100%;
          background: #8191a8; border-radius: inherit;
          transition: width 300ms ease;
        }
        .actions { display: flex; flex-wrap: wrap; gap: 8px; }
        .button {
          padding: 9px 12px;
          border: 1px solid #293648; border-radius: 8px;
          background: #10151d; color: #d7deea;
        }
        .button:hover {
          background: #171e28; border-color: #405069;
        }
        .events { display: grid; gap: 7px; }
        .event {
          display: grid;
          grid-template-columns: 70px 100px 1fr;
          gap: 10px; padding: 10px 12px;
          border: 1px solid #18212d; border-radius: 8px;
          background: #090d13; font-size: 11px;
        }
        .event-time { color: #647287; font-family: ui-monospace, monospace; }
        .event-source { color: #a4b0c0; font-weight: 700; }
        .event-message { color: #7e8b9e; }
        .event-warn { border-color: #3a3021; }
        .file-table { width: 100%; border-collapse: collapse; }
        .file-table td {
          padding: 10px;
          border-bottom: 1px solid #18212d;
          font-size: 12px;
        }
        .file-table td:first-child { color: #6e7c90; width: 180px; }
        .contract-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 7px;
        }
        .contract {
          padding: 10px;
          border: 1px solid #1d2735; border-radius: 8px;
          background: #0a0e14; color: #8996a9;
          font-family: ui-monospace, monospace; font-size: 11px;
        }
        .footer {
          margin-top: 45px; padding: 24px 0 12px;
          border-top: 1px solid #1c2330;
          color: #5e6c80; font-size: 11px; line-height: 1.7;
        }
        .signature { margin-top: 10px; color: #8c99ab; }
        @media (max-width: 1000px) {
          .shell { grid-template-columns: 1fr; }
          .sidebar {
            border-right: 0;
            border-bottom: 1px solid #1c2330;
          }
          .nav { display: flex; flex-wrap: wrap; }
          .stats, .grid, .contract-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .panel { grid-template-columns: 1fr; }
        }
        @media (max-width: 650px) {
          .topbar, .hero {
            align-items: flex-start;
            flex-direction: column;
          }
          .main { padding: 16px; }
          .stats, .grid, .contract-grid {
            grid-template-columns: 1fr;
          }
          .event {
            grid-template-columns: 1fr;
            gap: 3px;
          }
        }
      `}</style>

      <div className="app">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">E</div>
            <div>
              <div className="brand-title">ESSENTIUM</div>
              <div className="brand-sub">DSOUND COMMAND ARCHITECTURE</div>
            </div>
          </div>
          <div className="runtime">
            <span className="dot" />
            {running ? "LIVE RUNTIME" : "RUNTIME PAUSED"}
          </div>
        </header>

        <div className="shell">
          <aside className="sidebar">
            <div className="nav-label">System</div>
            <nav className="nav">
              {(
                [
                  ["overview", "Overview"],
                  ["essence", "Essence"],
                  ["live", "2055 Live"],
                  ["engines", "Engines"],
                  ["lexi", "Lexi / Vivian"],
                  ["music", "Django Sound"],
                  ["security", "Security"],
                  ["protocol", "Protocols"],
                  ["files", "Architecture"],
                  ["events", "Telemetry"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={view === id ? "active" : ""}
                  onClick={() => setView(id)}
                >
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          <main className="main">
            <div className="hero">
              <div>
                <div className="eyebrow">Unified system command surface</div>
                <h1>{view.toUpperCase()}</h1>
                <p>
                  One interface for Essentium / Dsound: live spine, creative
                  systems, archived design layers, protocols, and telemetry.
                  Status labels stay honest.
                </p>
              </div>
              <input
                className="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modules and files..."
              />
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-label">Registered modules</div>
                <div className="stat-value">{stats.modules}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Protocol entries</div>
                <div className="stat-value">{stats.contracts}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Tracked files</div>
                <div className="stat-value">{stats.files}+</div>
              </div>
              <div className="stat">
                <div className="stat-label">Telemetry events</div>
                <div className="stat-value">{stats.events}</div>
              </div>
            </div>

            {view === "overview" && (
              <>
                <Section
                  title="System Pulse"
                  subtitle="Local synthetic telemetry (not on-chain)"
                >
                  <div className="panel">
                    <div className="metric">
                      <div className="metric-head">
                        <span>ESSENTIUM PULSE</span>
                        <span>{pulse}%</span>
                      </div>
                      <div className="metric-number">{pulse}%</div>
                      <div className="bar">
                        <span style={{ width: `${pulse}%` }} />
                      </div>
                    </div>
                    <div className="metric">
                      <div className="metric-head">
                        <span>INTEGRITY</span>
                        <span>{integrity}%</span>
                      </div>
                      <div className="metric-number">{integrity}%</div>
                      <div className="bar">
                        <span style={{ width: `${integrity}%` }} />
                      </div>
                    </div>
                  </div>
                </Section>

                <Section title="Command Layer" subtitle="Safe local dashboard actions">
                  <div className="actions">
                    <button type="button" className="button" onClick={runPulse}>
                      Recalculate Pulse
                    </button>
                    <button type="button" className="button" onClick={runAudit}>
                      Run Integrity Audit
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick={toggleRuntime}
                    >
                      {running ? "Pause Runtime" : "Resume Runtime"}
                    </button>
                  </div>
                </Section>

                <Section
                  title="Architecture"
                  subtitle="Major subsystems registered in this dashboard"
                >
                  <div className="grid">
                    {filteredModules.slice(0, 6).map((module) => (
                      <div className="card" key={module.name}>
                        <div className="card-top">
                          <div>
                            <div className="card-title">{module.name}</div>
                            <div className="category">{module.category}</div>
                          </div>
                          <StatusBadge status={module.status} />
                        </div>
                        <div className="description">{module.description}</div>
                        <div className="files">
                          {module.files.map((file) => (
                            <span className="file" key={file}>
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {view === "essence" && (
              <Section
                title="Essence Layer"
                subtitle="Essence as a measurable local dimension"
              >
                <div className="panel">
                  <div className="metric">
                    <div className="metric-head">
                      <span>ESSENCE STATE</span>
                      <span>ACTIVE</span>
                    </div>
                    <div className="metric-number">{pulse}</div>
                    <div className="bar">
                      <span style={{ width: `${pulse}%` }} />
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-head">
                      <span>PURITY / INTEGRITY</span>
                      <span>{integrity}%</span>
                    </div>
                    <div className="metric-number">{integrity}</div>
                    <div className="bar">
                      <span style={{ width: `${integrity}%` }} />
                    </div>
                  </div>
                </div>
                <div className="grid" style={{ marginTop: 12 }}>
                  {[
                    ["Activity", "Real events"],
                    ["Pulse", "Current system motion"],
                    ["Purity", "Signal quality"],
                    ["Growth", "Change over time"],
                    ["State", "Current condition"],
                    ["History", "Recorded transitions"],
                  ].map(([title, description]) => (
                    <div className="card" key={title}>
                      <div className="card-title">{title}</div>
                      <div className="description">{description}</div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {view === "live" && (
              <Section
                title="2055 Live"
                subtitle="Continuous monitoring and session path"
              >
                <div className="panel">
                  <div className="metric">
                    <div className="metric-head">
                      <span>RUNTIME</span>
                      <span>{running ? "RUNNING" : "PAUSED"}</span>
                    </div>
                    <div className="metric-number">
                      {running ? "LIVE" : "HOLD"}
                    </div>
                    <div className="actions">
                      <button
                        type="button"
                        className="button"
                        onClick={toggleRuntime}
                      >
                        {running ? "Pause" : "Resume"}
                      </button>
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-head">
                      <span>PATH</span>
                      <span>READY</span>
                    </div>
                    <div className="metric-number">2055</div>
                    <div className="bar">
                      <span style={{ width: "100%" }} />
                    </div>
                    <p
                      style={{
                        marginTop: 12,
                        color: "#718096",
                        fontSize: 12,
                        lineHeight: 1.5,
                      }}
                    >
                      Portal → Sessions → Morning Star
                    </p>
                  </div>
                </div>
              </Section>
            )}

            {view === "engines" && (
              <Section
                title="Engine Registry"
                subtitle="Core, signal, and design engines"
              >
                <div className="grid">
                  {filteredModules
                    .filter((m) =>
                      ["ENGINE", "SIGNAL", "CORE"].includes(m.category)
                    )
                    .map((module) => (
                      <div className="card" key={module.name}>
                        <div className="card-top">
                          <div>
                            <div className="card-title">{module.name}</div>
                            <div className="category">{module.category}</div>
                          </div>
                          <StatusBadge status={module.status} />
                        </div>
                        <div className="description">{module.description}</div>
                        <div className="files">
                          {module.files.map((file) => (
                            <span className="file" key={file}>
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </Section>
            )}

            {view === "lexi" && (
              <Section
                title="Lexi / Vivian"
                subtitle="Archived cognitive design layers — not live services"
              >
                <div className="grid">
                  {filteredModules
                    .filter((m) => ["Lexi", "Vivian"].includes(m.name))
                    .map((module) => (
                      <div className="card" key={module.name}>
                        <div className="card-top">
                          <div>
                            <div className="card-title">{module.name}</div>
                            <div className="category">{module.category}</div>
                          </div>
                          <StatusBadge status={module.status} />
                        </div>
                        <div className="description">{module.description}</div>
                        <div className="files">
                          {module.files.map((file) => (
                            <span className="file" key={file}>
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </Section>
            )}

            {view === "music" && (
              <Section
                title="Django Sound"
                subtitle="Creative production, archive, and session root"
              >
                <div className="grid">
                  {filteredModules
                    .filter((m) => m.category === "CREATIVE")
                    .map((module) => (
                      <div className="card" key={module.name}>
                        <div className="card-top">
                          <div>
                            <div className="card-title">{module.name}</div>
                            <div className="category">{module.category}</div>
                          </div>
                          <StatusBadge status={module.status} />
                        </div>
                        <div className="description">{module.description}</div>
                        <div className="files">
                          {module.files.map((file) => (
                            <span className="file" key={file}>
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </Section>
            )}

            {view === "security" && (
              <Section
                title="Security / Protection"
                subtitle="Design boundaries — archived unless reactivated"
              >
                <div className="grid">
                  {filteredModules
                    .filter((m) => m.category === "SECURITY")
                    .map((module) => (
                      <div className="card" key={module.name}>
                        <div className="card-top">
                          <div>
                            <div className="card-title">{module.name}</div>
                            <div className="category">{module.category}</div>
                          </div>
                          <StatusBadge status={module.status} />
                        </div>
                        <div className="description">{module.description}</div>
                        <div className="files">
                          {module.files.map((file) => (
                            <span className="file" key={file}>
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </Section>
            )}

            {view === "protocol" && (
              <Section
                title="Protocol Layer"
                subtitle="Contracts and seals — live draft vs parked"
              >
                <div className="contract-grid">
                  {contracts.map((contract) => (
                    <div className="contract" key={contract}>
                      {contract}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {view === "files" && (
              <Section
                title="Architecture Registry"
                subtitle="Known components grouped by function"
              >
                <div className="card">
                  <table className="file-table">
                    <tbody>
                      {Object.entries(filteredFiles).map(([group, files]) => (
                        <tr key={group}>
                          <td>{group}</td>
                          <td>
                            <div className="files">
                              {files.map((file) => (
                                <span className="file" key={file}>
                                  {file}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            {view === "events" && (
              <Section title="Telemetry" subtitle="Unified event stream">
                <div className="events">
                  {events.map((event, index) => (
                    <div
                      className={`event ${
                        event.level === "WARN" ? "event-warn" : ""
                      }`}
                      key={`${event.time}-${index}`}
                    >
                      <div className="event-time">{event.time}</div>
                      <div className="event-source">{event.source}</div>
                      <div className="event-message">{event.message}</div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            <footer className="footer">
              <div>
                ESSENTIUM / DSOUND
                <br />
                Command surface · live spine · archived design · telemetry
              </div>
              <div className="signature">
                Yours sincerely,
                <br />
                Kng Drizz
                <br />
                Django Sound
                <br />
                Ibidun Olamide Theophilus Olarewaju
              </div>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
