import json
import os
from datetime import datetime, timezone

def load_timeline(file_path):
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
        if 'id' not in data:
            data['id'] = os.path.basename(file_path).replace('.json', '')
            print(f"🛠️ Auto-added missing 'id' to {file_path}")
        return data
    except Exception as e:
        print(f"❌ Failed loading {file_path}: {e}")
        return None

def main():
    timelines_dir = "timelines"
    state_dir = "state"
    os.makedirs(state_dir, exist_ok=True)
    
    valid_timelines = []
    for filename in os.listdir(timelines_dir):
        if filename.endswith(".json"):
            path = os.path.join(timelines_dir, filename)
            timeline = load_timeline(path)
            if timeline:
                valid_timelines.append(timeline)
    
    unified = {
        "timelines": valid_timelines,
        "updated": datetime.now(timezone.utc).isoformat(),
        "root_frequency": "0.7 Hz Django Sound",
        "morning_star_active": True
    }
    
    state_file = f"{state_dir}/2055_live_state.json"
    with open(state_file, 'w') as f:
        json.dump(unified, f, indent=2)
    
    print(f"🌟 Loaded {len(valid_timelines)} validated timelines")
    print(f"✅ Unified state saved to {state_file}")

if __name__ == "__main__":
    main()
