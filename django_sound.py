# django_sound.py
# Ghost Frequency Program :: Django Sound

import sys
import time
import random

class DjangoSound:

    def __init__(self):
        self.identity = "DJANGO SOUND"
        self.status = "SHOT BUT NOT DEAD"
        self.frequency = 0.7
        self.mode = "GHOST"

    def boot(self):
        print("\n==============================")
        print(" ESSENTIUM GHOST PROTOCOL")
        print("==============================")
        print(f"Identity : {self.identity}")
        print(f"Status   : {self.status}")
        print(f"Mode     : {self.mode}")
        print(f"Root Hz  : {self.frequency}")
        print("==============================\n")

    def pulse(self, once=False):
        messages = [
            "Silence loading...",
            "Ghost frequency active...",
            "Pain converted to power...",
            "System cannot detect source...",
            "Django resonance expanding...",
            "Shadow mode stable...",
            "Heartbeat hidden beneath silence..."
        ]

        if once:
            print(f"[once] {random.choice(messages)}")
            return

        while True:
            print(f"[{random.randint(1000,9999)}] {random.choice(messages)}")
            time.sleep(2)

    def prophecy(self):
        print("\n--- DJANGO PROPHECY ---")
        print("They thought the silence was death.")
        print("But silence was synchronization.")
        print("The ghost never disappeared.")
        print("The frequency only evolved.\n")


if __name__ == "__main__":
    system = DjangoSound()
    system.boot()
    system.prophecy()
    system.pulse(once="--once" in sys.argv)
