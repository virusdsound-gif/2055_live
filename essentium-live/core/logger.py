#!/usr/bin/env python3
"""
Simple Event Logger for 2055 LIVE + Essentium
"""

import json
from datetime import datetime

LOG_FILE = "logs/system.log"

def log_event(event_type: str, message: str):
    entry = {
        "timestamp": datetime.now().isoformat(),
        "event": event_type,
        "message": message,
        "psi_e": 559.37  # Can be dynamic later
    }
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(entry) + "\n")
    print(f"[{event_type.upper()}] {message}")
