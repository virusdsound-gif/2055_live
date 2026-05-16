import random
import time
import os

while True:
    os.system("clear")

    silence = random.uniform(0.7, 1.0)
    pain = random.uniform(90, 120)
    spirit = random.uniform(180, 220)

    signal = (silence * spirit) / (pain / 100)

    print("====================================")
    print(" ESSENTIUM GRID :: LIVE TELEMETRY")
    print("====================================\n")

    print(f"Silence Layer : {silence:.2f} Hz")
    print(f"Pain Layer    : {pain:.2f} Hz")
    print(f"Spirit Layer  : {spirit:.2f} Hz")
    print(f"\nUnified Signal: {signal:.2f}")

    if signal > 1.5:
        print("\nSTATUS: ASCENDING")
    else:
        print("\nSTATUS: STABILIZING")

    print("\nPress CTRL+C to exit.")

    time.sleep(1)
