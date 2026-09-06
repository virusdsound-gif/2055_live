import json
import os
import sys

DATABASE = "timeline_memory.json"

# DEFAULT SYSTEM
default_data = {
    "Django Sound": {
        "state": "origin",
        "connections": [["Dablixx", "ancestor"]]
    },

    "Dablixx": {
        "state": "transmission",
        "connections": [
            ["Yetunde", "child"],
            ["Olarewaju", "child"]
        ]
    },

    "Yetunde": {
        "state": "stable",
        "connections": [["Iremide", "corrupted_branch"]]
    },

    "Olarewaju": {
        "state": "stable",
        "connections": [["Wale", "corrupted_branch"]]
    },

    "Iremide": {
        "state": "corrupted",
        "connections": []
    },

    "Wale": {
        "state": "corrupted",
        "connections": []
    }
}

# CREATE DATABASE IF MISSING
if not os.path.exists(DATABASE):
    with open(DATABASE, "w") as f:
        json.dump(default_data, f, indent=4)

# LOAD DATABASE
with open(DATABASE, "r") as f:
    nodes = json.load(f)

# SAVE FUNCTION
def save():
    with open(DATABASE, "w") as f:
        json.dump(nodes, f, indent=4)

# SCAN FUNCTION
def scan():
    print("\n=== 2055 LIVE MEMORY SCAN ===")

    for name, data in nodes.items():

        print(f"\n[{name}]")
        print(f"STATE: {data['state']}")

        if data["connections"]:
            print("CONNECTIONS:")

            for target, relation in data["connections"]:
                print(f" - {relation} -> {target}")

# STABILIZE
def stabilize(name):

    if name in nodes:
        nodes[name]["state"] = "stable"
        save()

        print(f"\n{name} stabilized and saved.")

    else:
        print("\nNode not found.")

# CORRUPT
def corrupt(name):

    if name in nodes:
        nodes[name]["state"] = "corrupted"
        save()

        print(f"\n{name} corrupted and saved.")

    else:
        print("\nNode not found.")

# ADD NEW NODE
def add_node():

    name = input("New node name: ")
    state = input("State: ")

    if name not in nodes:

        nodes[name] = {
            "state": state,
            "connections": []
        }

        save()

        print(f"\n{name} created.")

    else:
        print("\nNode already exists.")

def run_argv(argv):
    cmd = argv[0] if argv else "scan"
    if cmd in ("1", "scan"):
        scan()
    elif cmd in ("2", "stabilize") and len(argv) > 1:
        stabilize(argv[1])
    elif cmd in ("3", "corrupt") and len(argv) > 1:
        corrupt(argv[1])
    elif cmd in ("4", "add") and len(argv) > 2:
        print("add: interactive only")
    elif cmd in ("5", "exit", "quit"):
        print("\n2055 Memory Engine Closed.")
    else:
        print("usage: 2055_memory.py scan | stabilize <name> | corrupt <name>")

if __name__ == "__main__":
    argv = sys.argv[1:]
    if argv or not sys.stdin.isatty():
        run_argv(argv or ["scan"])
    else:
        while True:

            print("\n=== 2055 MEMORY ENGINE ===")
            print("1. Scan Timeline")
            print("2. Stabilize Node")
            print("3. Corrupt Node")
            print("4. Add Node")
            print("5. Exit")

            choice = input("\nSelect: ")

            if choice == "1":
                scan()

            elif choice == "2":
                name = input("Node name: ")
                stabilize(name)

            elif choice == "3":
                name = input("Node name: ")
                corrupt(name)

            elif choice == "4":
                add_node()

            elif choice == "5":
                print("\n2055 Memory Engine Closed.")
                break

            else:
                print("\nInvalid command.")
