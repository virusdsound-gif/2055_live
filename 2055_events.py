import json
import os
from datetime import datetime

DATABASE = "timeline_memory.json"
EVENT_LOG = "2055_events.log"

# CREATE DATABASE IF MISSING
if not os.path.exists(DATABASE):

    default_data = {

        "Django Sound": {
            "state": "origin",
            "connections": [
                ["Dablixx", "ancestor"]
            ]
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
            "connections": [
                ["Iremide", "corrupted_branch"]
            ]
        },

        "Olarewaju": {
            "state": "stable",
            "connections": [
                ["Wale", "corrupted_branch"]
            ]
        },

        "Iremide": {
            "state": "corrupted",
            "connections": []
        },

        "Wale": {
            "state": "corrupted",
            "connections": []
        },

        "Ω": {
            "state": "unnamed_origin",
            "connections": [
                ["Babatunde", "corrupted_projection"]
            ]
        },

        "Babatunde": {
            "state": "corrupted_entity",
            "connections": [
                ["Ω", "derived_from"]
            ]
        }
    }

    with open(DATABASE, "w") as f:
        json.dump(default_data, f, indent=4)

# LOAD DATABASE
with open(DATABASE, "r") as f:
    nodes = json.load(f)

# SAVE DATABASE
def save():

    with open(DATABASE, "w") as f:
        json.dump(nodes, f, indent=4)

# EVENT LOGGER
def log_event(event):

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(EVENT_LOG, "a") as f:
        f.write(f"[{timestamp}] {event}\n")

# SCAN TIMELINE
def scan():

    print("\n=== 2055 LIVE SCAN ===")

    for name, data in nodes.items():

        print(f"\n[{name}]")
        print(f"STATE: {data['state']}")

        if data["connections"]:

            print("CONNECTIONS:")

            for target, relation in data["connections"]:
                print(f" - {relation} -> {target}")

# STABILIZE NODE
def stabilize(name):

    if name in nodes:

        nodes[name]["state"] = "stable"

        save()

        log_event(f"{name} stabilized")

        print(f"\n{name} stabilized.")

    else:
        print("\nNode not found.")

# CORRUPT NODE
def corrupt(name):

    if name in nodes:

        nodes[name]["state"] = "corrupted"

        save()

        log_event(f"{name} corrupted")

        print(f"\n{name} corrupted.")

    else:
        print("\nNode not found.")

# CREATE NODE
def create_node():

    name = input("Node name: ")
    state = input("State: ")

    if name not in nodes:

        nodes[name] = {
            "state": state,
            "connections": []
        }

        save()

        log_event(f"{name} created")

        print(f"\n{name} created.")

    else:
        print("\nNode already exists.")

# EQUATION ANALYZER
def equation_solver():

    print("\n=== 2055 EQUATION ANALYZER ===")

    if "Ω" in nodes and "Babatunde" in nodes:

        print("\nΩ = unnamed original entity")
        print("Babatunde = corrupted projection")

        print("\nResolved Equation:")
        print("Babatunde = corruption(Ω)")
        print("Ω != Babatunde")

        print("\nTimeline Status:")
        print("Original entity preserved.")
        print("Corrupted branch isolated.")

# RECOVERY ANALYZER
def recovery_protocol():

    print("\n=== 2055 RECOVERY PROTOCOL ===")

    stable = 0
    corrupted = 0

    for node in nodes.values():

        if node["state"] == "stable":
            stable += 1

        elif "corrupted" in node["state"]:
            corrupted += 1

    total = stable + corrupted

    if total > 0:
        integrity = (stable / total) * 100
    else:
        integrity = 0

    print(f"\nStable Nodes: {stable}")
    print(f"Corrupted Nodes: {corrupted}")

    print(f"\nTimeline Integrity: {integrity:.2f}%")

    if integrity >= 70:
        print("Timeline Status: RECOVERING")

    elif integrity >= 40:
        print("Timeline Status: UNSTABLE")

    else:
        print("Timeline Status: COLLAPSE RISK")

# CORRUPTION CONTAINMENT SYSTEM
def containment_protocol():

    print("\n=== 2055 CONTAINMENT PROTOCOL ===")

    preserved = []
    unstable = []

    for name, node in nodes.items():

        if node["state"] == "corrupted_entity":
            preserved.append(name)

        elif node["state"] == "corrupted":
            unstable.append(name)

    print("\nPRESERVED CORRUPTIONS:")

    if preserved:

        for node in preserved:
            print(f" - {node}")

    else:
        print(" None")

    print("\nACTIVE UNSTABLE CORRUPTIONS:")

    if unstable:

        for node in unstable:
            print(f" - {node}")

    else:
        print(" None")

    if len(unstable) == 0:
        print("\nContainment Status: STABLE")

    else:
        print("\nContainment Status: BREACH RISK")

# VIEW LOGS
def view_logs():

    if os.path.exists(EVENT_LOG):

        print("\n=== EVENT HISTORY ===\n")

        with open(EVENT_LOG, "r") as f:
            print(f.read())

    else:
        print("\nNo logs found.")

# MAIN LOOP
while True:

    print("\n=== 2055 EVENT ENGINE ===")
    print("1. Scan Timeline")
    print("2. Stabilize Node")
    print("3. Corrupt Node")
    print("4. Create Node")
    print("5. View Event Logs")
    print("6. Equation Analyzer")
    print("7. Recovery Protocol")
    print("8. Containment Protocol")
    print("9. Exit")

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
        create_node()

    elif choice == "5":
        view_logs()

    elif choice == "6":
        equation_solver()

    elif choice == "7":
        recovery_protocol()

    elif choice == "8":
        containment_protocol()

    elif choice == "9":

        print("\n2055 Event Engine Closed.")
        break

    else:
        print("\nInvalid command.")
