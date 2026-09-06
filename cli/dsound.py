#!/usr/bin/env python3
"""Back-compat entry. Real commands live in cli/main.py."""

from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from main import main

if __name__ == "__main__":
    raise SystemExit(main())
