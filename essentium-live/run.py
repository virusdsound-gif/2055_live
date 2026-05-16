#!/usr/bin/env python3
"""
Essentium 2055 LIVE Main Runner
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from protocols.loader import bootstrap

if __name__ == "__main__":
    bootstrap()
