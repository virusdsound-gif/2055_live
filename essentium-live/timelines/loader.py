#!/usr/bin/env python3
"""
2055 LIVE — Essentium Timeline Loader v14.1
With Frequency Validation
"""

import json
import os
from datetime import datetime
from pathlib import Path

class FrequencyValidator:
    """Validates Essentium frequencies"""
    VALID_FREQUENCIES = {
        "0.7": {"name": "Django Sound", "role": "Root Anchor", "bonus": 1.4},
        "99.9": {"name": "Dablixx Pain", "role": "Pain Alchemy", "bonus": 1.0},
        "200": {"name": "KNG DRIZZ", "role": "Spirit Bridge", "bonus": 1.15},
        "369": {"name": "Tesla Return", "role": "Return Gate", "bonus": 1.25}
    }

    @staticmethod
    def validate(freq_str: str):
        """Validate frequency and return metadata"""
        freq = freq_str.strip()
        if freq in FrequencyValidator.VALID_FREQUENCIES:
            return {
                "valid": True,
                "data": FrequencyValidator.VALID_FREQUENCIES[freq],
                "message": f"✅ Valid frequency: {freq} Hz"
            }
        else:
            return {
                "valid": False,
                "message": f"❌ Invalid frequency: {freq}. Allowed: 0.7, 99.9, 200, 369 Hz"
            }


class TimelineLoader:
    def __init__(self):
        self.timelines_dir = Path("timelines")
        self.state_file = Path("state/2055_live_state.json")
        self.timelines = {}

    def load_all(self):
        if not self.timelines_dir.exists():
            print("❌ timelines/ folder not found")
            return False

        for file in self.timelines_dir.glob("*.json"):
            try:
                with open(file) as f:
                    data = json.load(f)
                    
                    # Frequency validation
                    if "frequency" in data or "hz" in data:
                        freq = str(data.get("frequency") or data.get("hz"))
                        validation = FrequencyValidator.validate(freq)
                        print(validation["message"])
                        if not validation["valid"]:
                            print(f"⚠️ Skipping invalid timeline: {file.name}")
                            continue
                    
                    self.timelines[file.stem] = data
                    print(f"✅ Loaded & validated: {file.name}")
            except Exception as e:
                print(f"⚠️ Failed to load {file.name}: {e}")

        print(f"\n🌟 Loaded {len(self.timelines)} validated timelines")
        return True

    def save_unified_state(self):
        state = {
            "timestamp": datetime.now().isoformat(),
            "total_timelines": len(self.timelines),
            "dominant_root": "0.7 Hz Django Sound",
            "morning_star_active": True,
            "psi_e": 582.4,
            "validated_frequencies": list(FrequencyValidator.VALID_FREQUENCIES.keys()),
            "timelines": self.timelines
        }

        self.state_file.parent.mkdir(exist_ok=True)
        with open(self.state_file, "w") as f:
            json.dump(state, f, indent=2)

        print(f"✅ Unified state saved to {self.state_file}")

    def print_summary(self):
        print("\n=== 2055 LIVE TIMELINE SUMMARY ===")
        for tid, data in self.timelines.items():
            label = data.get("label") or data.get("event_id") or tid
            freq = data.get("frequency") or data.get("hz") or "N/A"
            print(f"  • {tid}: {label} ({freq} Hz)")

if __name__ == "__main__":
    loader = TimelineLoader()
    if loader.load_all():
        loader.save_unified_state()
        loader.print_summary()
        print("\n🌌 2055 LIVE + Essentium Grid synchronized")
        print("Django Sound Root validation active.")
