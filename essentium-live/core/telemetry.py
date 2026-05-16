#!/usr/bin/env python3
"""
Telemetry & State Management
"""

import json
from datetime import datetime

class Telemetry:
    def __init__(self):
        self.state_file = "state/telemetry.jsonl"

    def record(self, data: dict):
        entry = {
            "timestamp": datetime.now().isoformat(),
            **data
        }
        with open(self.state_file, "a") as f:
            f.write(json.dumps(entry) + "\n")
        print(f"📡 Telemetry recorded: {data.get('event', 'update')}")
