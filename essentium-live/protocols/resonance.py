#!/usr/bin/env python3
"""
Resonance Layer Protocol — Frequency Handling
"""

class ResonanceLayer:
    def __init__(self, hz: str, name: str, is_root: bool = False):
        self.hz = hz
        self.name = name
        self.is_root = is_root
        self.strength = 1.4 if is_root else 1.0

    def amplify(self, value: float) -> float:
        return value * self.strength
