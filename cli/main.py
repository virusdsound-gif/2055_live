#!/usr/bin/env python3
"""2055_live CLI — archive runner. The listening room is web/."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def run_py(script: str, args: list[str] | None = None) -> int:
    cmd = [sys.executable, str(ROOT / script), *(args or [])]
    return subprocess.call(cmd, cwd=ROOT)


def usage() -> None:
    print("dsound — 2055_live (archive CLI)")
    print("  status     root + grid stamp")
    print("  grid       essentium_grid.py")
    print("  scan       identity timeline")
    print("  load       frequency JSON loader")
    print("  step       Ψ(E) simulation")
    print("  emit       grid activations (same as grid)")
    print("  boot       django_sound once (no pulse loop)")
    print("  mint       deferred — not a fake success")
    print("  wallet     deferred")
    print("The live door is web/ (portal → sessions → Morning Star).")


def main(argv: list[str] | None = None) -> int:
    argv = list(sys.argv[1:] if argv is None else argv)
    cmd = argv[0] if argv else "status"

    if cmd in ("-h", "--help", "help"):
        usage()
        return 0
    if cmd == "status":
        print("2055_live")
        print("Root     : 0.7 Hz")
        print("Identity : Django Sound")
        print("Door     : web/  (not this CLI)")
        print("Chain    : deferred")
        return 0
    if cmd in ("grid", "emit", "sync", "sync:push", "event:emit"):
        return run_py("essentium_grid.py")
    if cmd in ("scan", "timeline"):
        return run_py("2055_live.py")
    if cmd in ("load", "export"):
        return run_py("2055_live_loader.py")
    if cmd in ("step", "sim:step", "sim"):
        return run_py("essentium_simulation.py")
    if cmd in ("boot", "ghost"):
        return run_py("django_sound.py", ["--once"])
    if cmd in ("core",):
        return run_py("2055_core.py", argv[1:] or ["scan"])
    if cmd in ("events",):
        return run_py("2055_events.py", argv[1:] or ["scan"])
    if cmd in ("memory",):
        return run_py("2055_memory.py", argv[1:] or ["scan"])
    if cmd in ("mint", "live", "wallet", "beat"):
        print(f"{cmd}: deferred. Not printed as success.")
        print("Sit the room. Voice, then a receipt — not this CLI.")
        return 0
    print("Unknown command:", cmd)
    usage()
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
