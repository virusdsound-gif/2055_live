import time
import json
import random
from datetime import datetime

last_activity = time.time()

def detect_silence():
    return round(time.time() - last_activity, 2)

def keyboard_speed():
    return random.randint(1, 100)

def map_frequency(silence, activity):
    base = 40

    if silence > 20:
        base = 20

    if silence > 60:
        base = 7

    return base + (activity * 0.8)

def play_tone(frequency):
    print(f"♪ Frequency: {round(frequency,2)} Hz")

def log_state(data):
    with open("state/memory.json", "a") as f:
        f.write(json.dumps(data) + "\n")

while True:
    silence = detect_silence()
    activity = keyboard_speed()
    frequency = map_frequency(silence, activity)

    play_tone(frequency)

    state = {
        "time": str(datetime.now()),
        "silence": silence,
        "activity": activity,
        "frequency": frequency
    }

    log_state(state)

    print(state)

    time.sleep(1)
