import React, { useMemo, useState } from "react";

/*
 * ESSENTIUM / DSOUND COMMAND DASHBOARD
 * Live spine only — portal, sessions, Morning Star, music, status.
 * Dependency-light. Parked layers are not listed as ONLINE.
 */

type Status = "ONLINE" | "ACTIVE" | "STABLE" | "PARKED";

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
    description: "Identity, state, and orchestration root.",
    status: "ONLINE",
    files: ["docs/SYSTEM_STATUS.md", "docs/OPTIMIZE_LOG.md"],
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
    description: "Portal → sessions → Morning Star path.",
    status: "ONLINE",
    files: ["ui/portal.html", "ui/session-select.html", "docs/SESSIONS.md"],
  },
  {
    name: "Transnet Door",
    category: "PUBLIC",
    description: "Public entry when you choose to share.",
    status: "STABLE",
    files: ["docs/GIT_SHELF_AND_PUBLIC.md", "ui/portal.html"],
  },
  {
    name: "Music Vault",
    category: "CREATIVE",
    description: "Lyrics, production, track lane (later).",
    status: "ACTIVE",
    files: ["music/morning-star-after-the-noise.md"],
  },
  {
    name: "Git Shelf",
    category: "OPS",
    description: "Chat-first workbench · push finished pieces only.",
    status: "STABLE",
    files: ["docs/GIT_SHELF_AND_PUBLIC.md", "docs/TERMUX_AND_GIT_TRACK.md"],
  },
  {
    name: "Chain / Hardhat",
    category: "PROTOCOL",
    description: "Parked until deliberately chosen.",
    status: "PARKED",
    files: ["hardhat-project/", "MorningStar.sol"],
  },
];

const initialEvents: Event[] = [
  {
    time: "SYSTEM",
    source: "BOOT",
    message: "Dashboard on live spine only.",
    level: "INFO",
  },
  {
    time: "CORE",
    source: "OPTIMIZE",
    message: "Parked layers excluded from ONLINE set.",
    level: "SYNC",
  },
  {
    time: "LIVE",
    source: "2055",
    message: "Portal path ready.",
    level: "INFO",
  },
  {
    time: "CREATIVE",
    source: "DJANGO",
    message: "Morning Star session playable.",
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

export default function EssentiumDashboard() {
  const [view, setView] = useState("overview");
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [pulse, setPulse] = useState(73);
  const [integrity, setIntegrity] = useState(98);
  const [silence, setSilence] = useState(88);
  const [running, setRunning] = useState(true);

  const filteredModules = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return modules;
    return modules.filter((m) =>
      [m.name, m.category, m.description, ...m.files]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
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
    const nextSilence = Math.floor(80 + Math.random() * 20);
    setPulse(nextPulse);
    setIntegrity(nextIntegrity);
    setSilence(nextSilence);
    addEvent("PULSE", `Pulse ${nextPulse}% · silence ${nextSilence}%`, "SYNC");
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
    setSilence(95);
    addEvent("AUDIT", "Spine integrity check complete.", "SYNC");
  }

  const stats = {
    modules: modules.filter((m) => m.status !== "PARKED").length,
    parked: modules.filter((m) => m.status === "PARKED").length,
    events: events.length,
    integrity,
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        :root {
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
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
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 14px 18px;
          border-bottom: 1px solid #1c2330;
          background: rgba(7, 9, 13, 0.94);
          backdrop-filter: blur(14px);
        }
        .brand { display: flex; align-items: center; gap: 12px; }
        .brand-mark {
          width: 36px; height: 36px; display: grid; place-items: center;
          border: 1px solid #56667d; border-radius: 12px;
          font-weight: 800; letter-spacing: -1px;
        }
        .brand-title { font-weight: 800; letter-spacing: 0.08em; font-size: 13px; }
        .brand-sub { margin-top: 2px; font-size: 10px; color: #7f8da1; letter-spacing: 0.12em; }
        .runtime {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; color: #9ba7b8;
        }
        .dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: ${running ? "#7ddea0" : "#d1b98c"};
        }
        .shell {
          display: grid;
          grid-template-columns: 200px 1fr;
          min-height: calc(100vh - 65px);
        }
        .sidebar {
          border-right: 1px solid #1c2330;
          padding: 16px 10px;
        }
        .nav-label {
          padding: 8px 12px;
          font-size: 10px; color: #69768a;
          letter-spacing: 0.16em; text-transform: uppercase;
        }
        .nav { display: grid; gap: 4px; }
        .nav button {
          border: 1px solid transparent;
          background: transparent;
          color: #9da9ba;
          text-align: left;
          padding: 10px 12px;
          border-radius: 9px;
        }
        .nav button:hover, .nav button.active {
          border-color: #273244;
          background: #10151d;
          color: #f0f4fa;
        }
        .main { width: 100%; max-width: 1200px; padding: 20px; }
        .hero {
          display: flex; justify-content: space-between; gap: 16px;
          align-items: flex-end; margin-bottom: 20px; flex-wrap: wrap;
        }
        .eyebrow {
          color: #7d8ba0; font-size: 11px;
          letter-spacing: 0.15em; text-transform: uppercase;
        }
        h1 {
          margin: 6px 0;
          font-size: clamp(24px, 4vw, 40px);
          letter-spacing: -0.04em;
        }
        .hero p {
          max-width: 520px; margin: 0;
          color: #8996a9; line-height: 1.55; font-size: 14px;
        }
        .search {
          min-width: 200px; max-width: 320px; width: 100%;
          padding: 11px 13px;
          border: 1px solid #283344; border-radius: 10px;
          outline: none; background: #0d1118; color: #e8edf5;
        }
        .search:focus { border-color: #52647e; }
        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px; margin-bottom: 24px;
        }
        .stat {
          padding: 16px;
          border: 1px solid #1c2634; border-radius: 12px;
          background: #0b0f15;
        }
        .stat-label {
          color: #738096; font-size: 10px;
          text-transform: uppercase; letter-spacing: 0.12em;
        }
        .stat-value { margin-top: 6px; font-size: 24px; font-weight: 800; }
        .section { margin-top: 26px; }
        h2 { margin: 0 0 12px; font-size: 16px; }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .card {
          border: 1px solid #1d2735; border-radius: 12px;
          background: #0b0f15; padding: 14px;
        }
        .card:hover { border-color: #344257; }
        .card-top {
          display: flex; justify-content: space-between; gap: 10px;
        }
        .card-title { font-weight: 700; font-size: 14px; }
        .category {
          margin-top: 3px; color: #66758a;
          font-size: 10px; letter-spacing: 0.12em;
        }
        .description {
          min-height: 44px; margin: 12px 0;
          color: #8996a9; font-size: 13px; line-height: 1.45;
        }
        .files { display: flex; flex-wrap: wrap; gap: 5px; }
        .file {
          padding: 4px 6px;
          border: 1px solid #202c3b; border-radius: 6px;
          color: #7e8da1; font-size: 10px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        .status {
          height: fit-content; padding: 3px 7px;
          border: 1px solid #303c4e; border-radius: 999px;
          font-size: 9px; font-weight: 800; letter-spacing: 0.06em;
        }
        .status-online, .status-stable, .status-active { color: #b8c9df; }
        .status-parked { color: #66758a; }
        .panel {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 10px;
        }
        .metric {
          padding: 16px;
          border: 1px solid #1d2735; border-radius: 12px;
          background: #0b0f15;
        }
        .metric-head {
          display: flex; justify-content: space-between;
          color: #8d9aae; font-size: 12px;
        }
        .metric-number {
          margin: 10px 0 8px; font-size: 32px; font-weight: 850;
        }
        .bar {
          height: 6px; overflow: hidden;
          border-radius: 999px; background: #171e29;
        }
        .bar > span {
          display: block; height: 100%;
          background: #8191a8; border-radius: inherit;
          transition: width 300ms ease;
        }
        .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .button {
          padding: 8px 12px;
          border: 1px solid #293648; border-radius: 8px;
          background: #10151d; color: #d7deea;
        }
        .button:hover {
          background: #171e28; border-color: #405069;
        }
        .events { display: grid; gap: 6px; }
        .event {
          display: grid;
          grid-template-columns: 70px 90px 1fr;
          gap: 8px; padding: 9px 11px;
          border: 1px solid #18212d; border-radius: 8px;
          background: #090d13; font-size: 11px;
        }
        .event-time { color: #647287; font-family: ui-monospace, monospace; }
        .event-source { color: #a4b0c0; font-weight: 700; }
        .event-message { color: #7e8b9e; }
        .event-warn { border-color: #3a3021; }
        .footer {
          margin-top: 36px; padding: 20px 0 10px;
          border-top: 1px solid #1c2330;
          color: #5e6c80; font-size: 11px; line-height: 1.6;
        }
        .signature { margin-top: 8px; color: #8c99ab; }
        @media (max-width: 900px) {
          .shell { grid-template-columns: 1fr; }
          .sidebar {
            border-right: 0;
            border-bottom: 1px solid #1c2330;
          }
          .nav { display: flex; flex-wrap: wrap; }
          .stats, .grid { grid-template-columns: repeat(2, 1fr); }
          .panel { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .topbar, .hero {
            align-items: flex-start;
            flex-direction: column;
          }
          .main { padding: 14px; }
          .stats, .grid { grid-template-columns: 1fr; }
          .event {
            grid-template-columns: 1fr;
            gap: 2px;
          }
        }
      `}</style>

      <div className="app">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">E</div>
            <div>
              <div className="brand-title">ESSENTIUM</div>
              <div className="brand-sub">DSOUND · 2055 LIVE</div>
            </div>
          </div>
          <div className="runtime">
            <span className="dot" />
            {running ? "RUNTIME LIVE" : "PAUSED"}
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
                  ["events", "Events"],
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
                <div className="eyebrow">Live spine</div>
                <h1>Command surface</h1>
                <p>
                  Portal, sessions, Morning Star, music lane. Parked systems stay
                  out of the ONLINE set.
                </p>
              </div>
              <input
                className="search"
                placeholder="Search modules…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-label">Active modules</div>
                <div className="stat-value">{stats.modules}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Parked</div>
                <div className="stat-value">{stats.parked}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Integrity</div>
                <div className="stat-value">{integrity}%</div>
              </div>
              <div className="stat">
                <div className="stat-label">Events</div>
                <div className="stat-value">{stats.events}</div>
              </div>
            </div>

            {(view === "overview" || view === "telemetry") && (
              <section className="section">
                <h2>Telemetry</h2>
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
                        Recalculate pulse
                      </button>
                      <button
                        type="button"
                        className="button"
                        onClick={toggleRuntime}
                      >
                        {running ? "Pause" : "Resume"}
                      </button>
                      <button type="button" className="button" onClick={runAudit}>
                        Audit spine
                      </button>
                    </div>
                  </div>
                  <div className="metric">
                    <div className="metric-head">
                      <span>Silence strength</span>
                      <span>{silence}%</span>
                    </div>
                    <div className="metric-number">{silence}</div>
                    <div className="bar">
                      <span style={{ width: `${silence}%` }} />
                    </div>
                    <p
                      style={{
                        marginTop: 12,
                        color: "#718096",
                        fontSize: 12,
                        lineHeight: 1.5,
                      }}
                    >
                      Root 0.7 Hz · Django Sound. Integrity reflects live-spine
                      alignment, not chain deploy.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {(view === "overview" || view === "modules") && (
              <section className="section">
                <h2>Modules</h2>
                <div className="grid">
                  {filteredModules.map((module) => (
                    <article key={module.name} className="card">
                      <div className="card-top">
                        <div>
                          <div className="card-title">{module.name}</div>
                          <div className="category">{module.category}</div>
                        </div>
                        <StatusBadge status={module.status} />
                      </div>
                      <p className="description">{module.description}</p>
                      <div className="files">
                        {module.files.map((file) => (
                          <span key={file} className="file">
                            {file}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {(view === "overview" || view === "events") && (
              <section className="section">
                <h2>Events</h2>
                <div className="events">
                  {events.map((event, i) => (
                    <div
                      key={`${event.time}-${event.source}-${i}`}
                      className={`event${
                        event.level === "WARN" ? " event-warn" : ""
                      }`}
                    >
                      <span className="event-time">{event.time}</span>
                      <span className="event-source">{event.source}</span>
                      <span className="event-message">{event.message}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <footer className="footer">
              Workbench: chat · Shelf: GitHub · Door: portal when you choose.
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
