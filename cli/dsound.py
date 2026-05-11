#!/usr/bin/env python3

import sys
import subprocess

COMMANDS = {
    "sim:step": "Simulation step executed.",
    "event:emit": "Morning Star emitted.",
    "sync:push": "Synchronization push complete."
}

def main():

    if len(sys.argv) < 2:
        print("Usage:")
        print("  sim:step")
        print("  event:emit --type morning_star")
        print("  sync:push")
        return

    cmd = sys.argv[1]

    if cmd == "sim:step":
        print(COMMANDS["sim:step"])

    elif cmd == "event:emit":
        print(COMMANDS["event:emit"])

    elif cmd == "sync:push":
        print(COMMANDS["sync:push"])

    else:
        print("Unknown command:", cmd)

if __name__ == "__main__":
    main()
