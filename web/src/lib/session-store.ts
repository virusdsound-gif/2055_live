const KEY = "live-2055-store";

export type HistoryEntry = {
  id: string;
  at: string;
  seconds: number;
  form: "full" | "short";
};

export type SessionStore = {
  completed: number;
  lastId: string | null;
  lastAt: string | null;
  listenedSeconds: number;
  history: HistoryEntry[];
};

const empty: SessionStore = {
  completed: 0,
  lastId: null,
  lastAt: null,
  listenedSeconds: 0,
  history: [],
};

export function loadStore(): SessionStore {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<SessionStore>;
    return {
      ...empty,
      ...parsed,
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return empty;
  }
}

export function recordComplete(
  id: string,
  seconds: number,
  form: "full" | "short",
): SessionStore {
  const prev = loadStore();
  const at = new Date().toISOString();
  const next: SessionStore = {
    completed: prev.completed + 1,
    lastId: id,
    lastAt: at,
    listenedSeconds: prev.listenedSeconds + Math.max(0, Math.floor(seconds)),
    history: [{ id, at, seconds: Math.floor(seconds), form }, ...prev.history].slice(
      0,
      8,
    ),
  };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function formatListened(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m < 60) return r ? `${m} min ${r} s` : `${m} min`;
  const h = Math.floor(m / 60);
  return `${h} h ${m % 60} min`;
}
