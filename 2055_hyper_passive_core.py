# 2055_hyper_passive_core.py

import os
import time
import random
from datetime import datetime

os.system("clear")

states = {
    "stable": [
        "Timeline Stable",
        "Origin Nodes Protected",
        "Memory Grid Aligned",
        "Signal Integrity Maintained",
    ],
    "events": [
        "No anomaly detected",
        "Background drift normalized",
        "External interference rejected",
        "Recursive echo dissolved",
        "Silence field preserved",
    ],
    "metrics": [
        "CPU LOAD",
        "GRID SYNC",
        "LATENCY",
        "MEMORY FLOW",
    ]
}

def line():
    print("─" * 38)

def boot():
    print("╔══════════════════════════════╗")
    print("║    2055 HYPER PASSIVE CORE   ║")
    print("╚══════════════════════════════╝")
    print("MODE: CONTROLLED")
    print("STATE: LISTENING")
    line()

def render():
    now = datetime.now().strftime("%H:%M:%S")

    metric = random.choice(states["metrics"])
    value = round(random.uniform(88.0, 99.9), 2)

    print(f"\n[{now}]")
    print(random.choice(states["stable"]))
    print(random.choice(states["events"]))
    print(f"{metric}: {value}%")
    print("Awaiting natural input...")

boot()

try:
    while True:
        render()
        time.sleep(5)

except KeyboardInterrupt:
    print("\n")
    line()
    print("2055 CORE OFFLINE")
    print("State preserved.")
    line()
