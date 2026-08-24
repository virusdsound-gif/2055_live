import React, { useEffect, useState } from "react";

type Alignment = "stable" | "drifting" | "critical";
type Event = { time: string; source: string; message: string; level: "INFO" | "SYNC" | "WARN" };
type Telemetry = {
  pulse: number; integrity: number; silence: number;
  alignment: Alignment; noise: number; rootFrequency: number; sessionActive: boolean;
};

function now() { return new Date().toLocaleTimeString(); }
function computeAlignment(s: number, n: number): Alignment {
  if (n > 0.4 || s < 0.55) return "critical";
  if (n > 0.28 || s < 0.7) return "drifting";
  return "stable";
}

export default function EssentiumDashboard() {
  const [view, setView] = useState("overview");
  const [events, setEvents] = useState<Event[]>([
    { time: "SYSTEM", source: "BOOT", message: "Dashboard online.", level: "INFO" },
    { time: "SESSION", source: "MORNING STAR", message: "Playable session ready.", level: "SYNC" },
  ]);
  const [running, setRunning] = useState(true);
  const [autoPulse, setAutoPulse] = useState(true);
  const [t, setT] = useState<Telemetry>({
    pulse: 78, integrity: 97, silence: 0.85, alignment: "stable",
    noise: 0.12, rootFrequency: 0.7, sessionActive: false,
  });

  useEffect(() => {
    if (!running || !autoPulse) return;
    const id = setInterval(() => {
      setT((prev) => {
        const silence = Math.max(0.6, Math.min(0.95, prev.silence + (Math.random() - 0.5) * 0.025));
        const noise = Math.max(0.05, Math.min(0.4, 1 - silence + (Math.random() - 0.5) * 0.02));
        const pulse = Math.round(Math.max(55, Math.min(95, prev.pulse + (Math.random() - 0.5) * 4)));
        return { ...prev, silence, noise, pulse, alignment: computeAlignment(silence, noise) };
      });
    }, 5000);
    return () => clearInterval(id);
  }, [running, autoPulse]);

  function addEvent(source: string, message: string, level: Event["level"] = "INFO") {
    setEvents((e) => [{ time: now(), source, message, level }, ...e].slice(0, 30));
  }

  function runPulse() {
    const silence = Math.max(0.55, Math.min(0.96, t.silence + (Math.random() - 0.5) * 0.07));
    const noise = Math.max(0.05, Math.min(0.45, 1 - silence + (Math.random() - 0.5) * 0.04));
    const pulse = Math.floor(62 + Math.random() * 32);
    const integrity = Math.floor(93 + Math.random() * 7);
    const alignment = computeAlignment(silence, noise);
    setT((p) => ({ ...p, pulse, integrity, silence, noise, alignment }));
    addEvent("PULSE", `Pulse ${pulse}% \u00b7 Silence ${silence.toFixed(2)} \u00b7 ${alignment}`, alignment === "stable" ? "SYNC" : "WARN");
  }

  function runAudit() {
    setT((p) => ({ ...p, integrity: 100, silence: Math.max(p.silence, 0.88), noise: Math.min(p.noise, 0.1), alignment: "stable" }));
    addEvent("AUDIT", "Integrity audit complete. Alignment stable.", "SYNC");
  }

  const nav = ["overview", "sessions", "telemetry"] as const;

  return (
    <>
      <style>{`
        *{box-sizing:border-box} body{margin:0;background:#07090d;color:#e8edf5;font-family:system-ui,sans-serif}
        .app{min-height:100vh}.top{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid #1c2330;position:sticky;top:0;background:rgba(7,9,13,.94)}
        .brand{font-weight:800;letter-spacing:.08em}.chip{font-size:11px;color:#9ba7b8;border:1px solid #2a3342;border-radius:999px;padding:4px 10px}
        .shell{display:grid;grid-template-columns:180px 1fr;min-height:calc(100vh - 56px)}
        .side{border-right:1px solid #1c2330;padding:12px}.side button{display:block;width:100%;text-align:left;background:transparent;border:1px solid transparent;color:#9da9ba;padding:10px;border-radius:8px;margin-bottom:4px;cursor:pointer}
        .side button.active,.side button:hover{background:#10151d;border-color:#273244;color:#f0f4fa}
        .main{padding:20px;max-width:1100px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:16px 0}
        .stat,.card{border:1px solid #1d2735;border-radius:12px;background:#0b0f15;padding:14px}
        .label{font-size:10px;color:#738096;letter-spacing:.12em;text-transform:uppercase}.val{font-size:24px;font-weight:800;margin-top:6px}
        .bar{height:6px;background:#171e29;border-radius:99px;overflow:hidden;margin-top:8px}.bar>span{display:block;height:100%;background:#8191a8}
        .actions{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}
        button.btn{padding:9px 12px;border:1px solid #293648;border-radius:8px;background:#10151d;color:#d7deea;cursor:pointer}
        button.primary{border-color:#4a5d3a;background:#121910;color:#c5d4b8}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.event{font-size:11px;border:1px solid #18212d;border-radius:8px;padding:8px 10px;margin-bottom:6px;color:#7e8b9e}
        .align-stable{color:#9ec49e}.align-drifting{color:#d1b98c}.align-critical{color:#d39a9a}
        @media(max-width:800px){.shell{grid-template-columns:1fr}.stats,.grid{grid-template-columns:1fr 1fr}}
        @media(max-width:520px){.stats,.grid{grid-template-columns:1fr}}
      `}</style>
      <div className="app">
        <header className="top">
          <div className="brand">ESSENTIUM</div>
          <div className="chip">ROOT {t.rootFrequency} Hz \u00b7 {running ? "LIVE" : "PAUSED"}</div>
        </header>
        <div className="shell">
          <aside className="side">
            {nav.map((id) => (
              <button key={id} className={view === id ? "active" : ""} onClick={() => setView(id)}>{id}</button>
            ))}
          </aside>
          <main className="main">
            <h1 style={{ margin: 0, letterSpacing: "-0.03em" }}>{view.toUpperCase()}</h1>
            <p style={{ color: "#8996a9", fontSize: 14 }}>Quiet command layer \u00b7 sessions \u00b7 telemetry \u00b7 0.7 Hz root</p>
            <div className="stats">
              <div className="stat"><div className="label">Pulse</div><div className="val">{t.pulse}%</div></div>
              <div className="stat"><div className="label">Integrity</div><div className="val">{t.integrity}%</div></div>
              <div className="stat"><div className="label">Silence</div><div className="val">{t.silence.toFixed(2)}</div></div>
              <div className="stat"><div className="label">Alignment</div><div className={"val align-" + t.alignment} style={{ fontSize: 16 }}>{t.alignment.toUpperCase()}</div></div>
            </div>

            {view === "overview" && (
              <div className="grid">
                <div className="card">
                  <div className="label">Silence strength</div>
                  <div className="bar"><span style={{ width: t.silence * 100 + "%" }} /></div>
                  <div className="label" style={{ marginTop: 12 }}>Noise floor \u00b7 {t.noise.toFixed(2)}</div>
                  <div className="bar"><span style={{ width: t.noise * 100 + "%" }} /></div>
                </div>
                <div className="card">
                  <div className="label">Command</div>
                  <div className="actions">
                    <button className="btn primary" onClick={() => window.open("./morning-star.html", "_blank")}>Open Morning Star</button>
                    <button className="btn" onClick={runPulse}>Recalculate Pulse</button>
                    <button className="btn" onClick={runAudit}>Audit</button>
                    <button className="btn" onClick={() => setRunning((v) => !v)}>{running ? "Pause" : "Resume"}</button>
                    <button className="btn" onClick={() => setAutoPulse((v) => !v)}>{autoPulse ? "Auto-Pulse Off" : "Auto-Pulse On"}</button>
                  </div>
                </div>
              </div>
            )}

            {view === "sessions" && (
              <div className="grid">
                {[
                  ["Morning Star Session", "14\u201316 min \u00b7 primary ritual", true],
                  ["0.7 Hz Session", "10\u201320 min \u00b7 deep rest", false],
                  ["Silent Session", "8\u201315 min \u00b7 pure presence", false],
                  ["Ghost Session", "12\u201325 min \u00b7 experimental", false],
                ].map(([name, meta, play]) => (
                  <div className="card" key={String(name)}>
                    <strong>{name}</strong>
                    <div style={{ color: "#7e8b9e", fontSize: 13, margin: "8px 0" }}>{meta}</div>
                    {play ? (
                      <button className="btn primary" onClick={() => window.open("./morning-star.html", "_blank")}>Begin</button>
                    ) : (
                      <span style={{ fontSize: 12, color: "#66758a" }}>Structure defined</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {view === "telemetry" && (
              <div>
                {events.map((e, i) => (
                  <div className="event" key={i}>
                    <strong style={{ color: "#a4b0c0" }}>{e.source}</strong> \u00b7 {e.time}<br />{e.message}
                  </div>
                ))}
              </div>
            )}

            <footer style={{ marginTop: 36, borderTop: "1px solid #1c2330", paddingTop: 16, fontSize: 11, color: "#5e6c80" }}>
              ESSENTIUM / DSOUND \u00b7 Kng Drizz \u00b7 Django Sound \u00b7 Ibidun Olamide Theophilus Olarewaju
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
