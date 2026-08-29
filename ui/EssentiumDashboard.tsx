import React, { useMemo, useState } from "react";

/*
 * ESSENTIUM / DSOUND COMMAND DASHBOARD — optimized
 * Live-first nav. Archive in one drawer. Honest status.
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
    description: "Identity, state, orchestration root.",
    status: "ONLINE",
    files: ["docs/SYSTEM_STATUS.md"],
  },
  {
    name: "Django Sound",
    category: "CREATIVE",
    description: "0.7 Hz root · KNG DRIZZ · presence.",
    status: "ACTIVE",
    files: ["ui/morning-star.html", "music/morning-star-after-the-noise.md"],
  },
  {
    name: "2055 Live",
    category: "LIVE",
    description: "Portal → sessions → Morning Star.",
    status: "ONLINE",
    files: ["ui/portal.html", "ui/session-select.html"],
  },
  {
    name: "Music Vault",
    category: "CREATIVE",
    description: "Lyrics and track lane.",
    status: "ACTIVE",
    files: ["music/morning-star-after-the-noise.md"],
  },
  {
    name: "Frequency Engine",
    category: "SIGNAL",
    description: "0.7 Hz session root.",
    status: "ACTIVE",
    files: ["ui/morning-star.html"],
  },
  {
    name: "Transnet Door",
    category: "PUBLIC",
    description: "Public entry when you choose.",
    status: "STABLE",
    files: ["docs/GIT_SHELF_AND_PUBLIC.md", "ui/portal.html"],
  },
  {
    name: "Git Shelf",
    category: "OPS",
    description: "Chat workbench · push when finished.",
    status: "STABLE",
    files: ["docs/GIT_SHELF_AND_PUBLIC.md"],
  },
  {
    name: "Chain / Hardhat",
    category: "PROTOCOL",
    description: "Parked until chosen.",
    status: "PARKED",
    files: ["hardhat-project/", "MorningStar.sol"],
  },
  {
    name: "Lexi",
    category: "ARCHIVE",
    description: "Design layer — not a live service.",
    status: "ARCHIVED",
    files: [],
  },
  {
    name: "Vivian",
    category: "ARCHIVE",
    description: "Design layer — not a live service.",
    status: "ARCHIVED",
    files: [],
  },
  {
    name: "Trinity",
    category: "ARCHIVE",
    description: "Design layer — archived.",
    status: "ARCHIVED",
    files: [],
  },
  {
    name: "Mirror / Fortress",
    category: "ARCHIVE",
    description: "Protection design — archived.",
    status: "ARCHIVED",
    files: [],
  },
];

const initialEvents: Event[] = [
  {
    time: "SYSTEM",
    source: "BOOT",
    message: "Optimized dashboard — live-first.",
    level: "INFO",
  },
  {
    time: "CORE",
    source: "OPTIMIZE",
    message: "Archive collapsed to one view.",
    level: "SYNC",
  },
  {
    time: "LIVE",
    source: "2055",
    message: "Portal path ONLINE.",
    level: "INFO",
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

export default function EssentiumDashboard() {
  const [view, setView] = useState("overview");
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [pulse, setPulse] = useState(73);
  const [integrity, setIntegrity] = useState(98);
  const [silence, setSilence] = useState(88);
  const [running, setRunning] = useState(true);

  const liveModules = useMemo(
    () =>
      modules.filter(
        (m) => m.status !== "ARCHIVED" && m.status !== "PARKED"
      ),
    []
  );

  const archivedModules = useMemo(
    () =>
      modules.filter(
        (m) => m.status === "ARCHIVED" || m.status === "PARKED"
      ),
    []
  );

  const filteredLive = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return liveModules;
    return liveModules.filter((m) =>
      [m.name, m.category, m.description, ...m.files]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, liveModules]);

  function addEvent(
    source: string,
    message: string,
    level: Event["level"] = "INFO"
  ) {
    setEvents((c) => [{ time: now(), source, message, level }, ...c]);
  }

  function runPulse() {
    const p = Math.floor(60 + Math.random() * 36);
    const i = Math.floor(94 + Math.random() * 7);
    const s = Math.floor(80 + Math.random() * 20);
    setPulse(p);
    setIntegrity(i);
    setSilence(s);
    addEvent("PULSE", `Pulse ${p}% · silence ${s}%`, "SYNC");
  }

  function toggleRuntime() {
    const next = !running;
    setRunning(next);
    addEvent(
      "RUNTIME",
      next ? "Resumed." : "Paused.",
      next ? "INFO" : "WARN"
    );
  }

  function runAudit() {
    setIntegrity(100);
    setSilence(95);
    addEvent("AUDIT", "Spine integrity OK.", "SYNC");
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        :root {
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          background: #07090d;
          color: #e8edf5;
        }
        body {
          margin: 0;
          background:
            radial-gradient(circle at top right, rgba(65,95,150,0.1), transparent 30%),
            #07090d;
        }
        button, input { font: inherit; }
        button { cursor: pointer; }
        .app { min-height: 100vh; }
        .topbar {
          position: sticky; top: 0; z-index: 20;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 14px 18px;
          border-bottom: 1px solid #1c2330;
          background: rgba(7,9,13,0.94);
          backdrop-filter: blur(12px);
        }
        .brand { display: flex; align-items: center; gap: 10px; }
        .brand-mark {
          width: 34px; height: 34px; display: grid; place-items: center;
          border: 1px solid #56667d; border-radius: 10px; font-weight: 800;
        }
        .brand-title { font-weight: 800; letter-spacing: 0.08em; font-size: 13px; }
        .brand-sub { font-size: 10px; color: #7f8da1; letter-spacing: 0.1em; margin-top: 2px; }
        .runtime {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; color: #9ba7b8;
        }
        .dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: ${running ? "#7ddea0" : "#d1b98c"};
        }
        .shell {
          display: grid;
          grid-template-columns: 180px 1fr;
          min-height: calc(100vh - 62px);
        }
        .sidebar {
          border-right: 1px solid #1c2330;
          padding: 14px 8px;
        }
        .nav-label {
          padding: 8px 10px;
          font-size: 9px; color: #69768a;
          letter-spacing: 0.14em; text-transform: uppercase;
        }
        .nav { display: grid; gap: 3px; }
        .nav button {
          border: 1px solid transparent;
          background: transparent;
          color: #9da9ba;
          text-align: left;
          padding: 9px 10px;
          border-radius: 8px;
          font-size: 13px;
        }
        .nav button:hover, .nav button.active {
          border-color: #273244;
          background: #10151d;
          color: #f0f4fa;
        }
        .main { padding: 18px; max-width: 1100px; }
        .hero {
          display: flex; justify-content: space-between; gap: 14px;
          align-items: flex-end; flex-wrap: wrap; margin-bottom: 18px;
        }
        .eyebrow {
          font-size: 10px; color: #7d8ba0;
          letter-spacing: 0.14em; text-transform: uppercase;
        }
        h1 {
          margin: 4px 0;
          font-size: clamp(22px, 3.5vw, 34px);
          letter-spacing: -0.03em;
        }
        .hero p {
          margin: 0; max-width: 420px;
          color: #8996a9; font-size: 13px; line-height: 1.5;
        }
        .search {
          padding: 10px 12px;
          border: 1px solid #283344; border-radius: 9px;
          background: #0d1118; color: #e8edf5;
          min-width: 180px; max-width: 280px; width: 100%;
          outline: none;
        }
        .search:focus { border-color: #52647e; }
        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px; margin-bottom: 20px;
        }
        .stat {
          padding: 14px;
          border: 1px solid #1c2634; border-radius: 11px;
          background: #0b0f15;
        }
        .stat-label {
          font-size: 9px; color: #738096;
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .stat-value { margin-top: 4px; font-size: 22px; font-weight: 800; }
        .section { margin-top: 22px; }
        h2 { margin: 0 0 10px; font-size: 15px; }
        .sub {
          margin: -6px 0 12px; color: #718096; font-size: 12px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .card {
          border: 1px solid #1d2735; border-radius: 11px;
          background: #0b0f15; padding: 12px;
        }
        .card:hover { border-color: #344257; }
        .card-top {
          display: flex; justify-content: space-between; gap: 8px;
        }
        .card-title { font-weight: 700; font-size: 13px; }
        .category {
          margin-top: 2px; font-size: 9px; color: #66758a;
          letter-spacing: 0.1em;
        }
        .description {
          margin: 10px 0; color: #8996a9;
          font-size: 12px; line-height: 1.45; min-height: 36px;
        }
        .files { display: flex; flex-wrap: wrap; gap: 4px; }
        .file {
          padding: 3px 6px;
          border: 1px solid #202c3b; border-radius: 5px;
          font-size: 9px; color: #7e8da1;
          font-family: ui-monospace, monospace;
        }
        .status {
          height: fit-content; padding: 3px 6px;
          border: 1px solid #303c4e; border-radius: 999px;
          font-size: 8px; font-weight: 800; letter-spacing: 0.06em;
        }
        .status-online, .status-active, .status-stable { color: #b8c9df; }
        .status-archived, .status-parked { color: #66758a; }
        .panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .metric {
          padding: 14px;
          border: 1px solid #1d2735; border-radius: 11px;
          background: #0b0f15;
        }
        .metric-head {
          display: flex; justify-content: space-between;
          font-size: 11px; color: #8d9aae;
        }
        .metric-number {
          margin: 8px 0; font-size: 28px; font-weight: 850;
        }
        .bar {
          height: 5px; border-radius: 999px;
          background: #171e29; overflow: hidden;
        }
        .bar > span {
          display: block; height: 100%;
          background: #8191a8; border-radius: inherit;
          transition: width 280ms ease;
        }
        .actions {
          display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px;
        }
        .button {
          padding: 8px 11px;
          border: 1px solid #293648; border-radius: 7px;
          background: #10151d; color: #d7deea;
          font-size: 12px;
        }
        .button:hover {
          background: #171e28; border-color: #405069;
        }
        .events { display: grid; gap: 5px; }
        .event {
          display: grid;
          grid-template-columns: 64px 80px 1fr;
          gap: 8px; padding: 8px 10px;
          border: 1px solid #18212d; border-radius: 7px;
          background: #090d13; font-size: 11px;
        }
        .event-time { color: #647287; font-family: ui-monospace, monospace; }
        .event-source { color: #a4b0c0; font-weight: 700; }
        .event-message { color: #7e8b9e; }
        .event-warn { border-color: #3a3021; }
        .footer {
          margin-top: 32px; padding-top: 16px;
          border-top: 1px solid #1c2330;
          font-size: 11px; color: #5e6c80; line-height: 1.6;
        }
        .signature { margin-top: 8px; color: #8c99ab; }
        @media (max-width: 860px) {
          .shell { grid-template-columns: 1fr; }
          .sidebar {
            border-right: 0;
            border-bottom: 1px solid #1c2330;
          }
          .nav { display: flex; flex-wrap: wrap; }
          .stats, .grid { grid-template-columns: repeat(2, 1fr); }
          .panel { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .topbar, .hero { flex-direction: column; align-items: flex-start; }
          .main { padding: 12px; }
          .stats, .grid { grid-template-columns: 1fr; }
          .event { grid-template-columns: 1fr; gap: 2px; }
        }
      `}</style>

      <div className="app">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">E</div>
            <div>
              <div className="brand-title">ESSENTIUM</div>
              <div className="brand-sub">LIVE SPINE · DSOUND</div>
            </div>
          </div>
          <div className="runtime">
            <span className="dot" />
            {running ? "LIVE" : "PAUSED"}
          </div>
        </header>

        <div className="shell">
          <aside className="sidebar">
            <div className="nav-label">Command</div>
            <nav className="nav">
              {(
                [
                  ["overview", "Overview"],
                  ["modules", "Modules"],
                  ["telemetry", "Telemetry"],
                  ["archive", "Archive"],
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
                <div className="eyebrow">Optimized command surface</div>
                <h1>{view === "archive" ? "ARCHIVE" : "LIVE SPINE"}</h1>
                <p>
                  Portal, sessions, Morning Star, music. Archive stays one
                  click away — not in the main path.
                </p>
              </div>
              {view !== "archive" && (
                <input
                  className="search"
                  placeholder="Search live modules…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              )}
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-label">Live</div>
                <div className="stat-value">{liveModules.length}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Archive</div>
                <div className="stat-value">{archivedModules.length}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Integrity</div>
                <div className="stat-value">{integrity}%</div>
              </div>
              <div className="stat">
                <div className="stat-label">Silence</div>
                <div className="stat-value">{silence}%</div>
              </div>
            </div>

            {(view === "overview" || view === "telemetry") && (
              <section className="section">
                <h2>Telemetry</h2>
                <p className="sub">Local metrics — not on-chain</p>
                <div className="panel">
                  <div className="metric">
                    <div className="metric-head">
                      <span>Pulse</span>
                      <span>{pulse}%</span>
                    </div>
                    <div className="metric-number">{pulse}</div>
                    <div className="bar">
                      <span style={{ width: `${pulse}%` }} />
                    </div>
                    <div className="actions">
                      <button type="button" className="button" onClick={runPulse}>
                        Pulse
                      </button>
                      <button
                        type="button"
                        className="button"
                        onClick={toggleRuntime}
                      >
                        {running ? "Pause" : "Resume"}
                      </button>
                      <button type="button" className="button" onClick={runAudit}>
                        Audit
                      </button>
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-head">
                      <span>Silence</span>
                      <span>{silence}%</span>
                    </div>
                    <div className="metric-number">{silence}</div>
                    <div className="bar">
                      <span style={{ width: `${silence}%` }} />
                    </div>
                    <p
                      style={{
                        marginTop: 10,
                        color: "#718096",
                        fontSize: 11,
                        lineHeight: 1.45,
                      }}
                    >
                      Root 0.7 Hz · Django Sound
                    </p>
                  </div>
                </div>
              </section>
            )}

            {(view === "overview" || view === "modules") && (
              <section className="section">
                <h2>Live modules</h2>
                <div className="grid">
                  {filteredLive.map((m) => (
                    <article key={m.name} className="card">
                      <div className="card-top">
                        <div>
                          <div className="card-title">{m.name}</div>
                          <div className="category">{m.category}</div>
                        </div>
                        <StatusBadge status={m.status} />
                      </div>
                      <p className="description">{m.description}</p>
                      <div className="files">
                        {m.files.map((f) => (
                          <span key={f} className="file">
                            {f}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {view === "archive" && (
              <section className="section">
                <h2>Archive / parked</h2>
                <p className="sub">
                  Kept for history. Not part of the live product path.
                </p>
                <div className="grid">
                  {archivedModules.map((m) => (
                    <article key={m.name} className="card">
                      <div className="card-top">
                        <div>
                          <div className="card-title">{m.name}</div>
                          <div className="category">{m.category}</div>
                        </div>
                        <StatusBadge status={m.status} />
                      </div>
                      <p className="description">{m.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {(view === "overview" || view === "telemetry") && (
              <section className="section">
                <h2>Events</h2>
                <div className="events">
                  {events.map((e, i) => (
                    <div
                      key={`${e.time}-${i}`}
                      className={`event${
                        e.level === "WARN" ? " event-warn" : ""
                      }`}
                    >
                      <span className="event-time">{e.time}</span>
                      <span className="event-source">{e.source}</span>
                      <span className="event-message">{e.message}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <footer className="footer">
              Live first · archive second · chain only when chosen.
              <div className="signature">
                KNG DRIZZ · Django Sound · Ibidun Olamide Theophilus Olarewaju
              </div>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
