# 2055 CORE ENGINE

import sys

class Node:
    def __init__(self, name, state):
        self.name = name
        self.state = state
        self.connections = []

    def link(self, target, relation):
        self.connections.append((target, relation))

    def info(self):
        print(f"\n[{self.name}]")
        print(f"STATE: {self.state}")

        if self.connections:
            print("CONNECTIONS:")
            for target, relation in self.connections:
                print(f" - {relation} -> {target.name}")


# SYSTEM DATABASE
nodes = {}

def create_node(name, state):
    nodes[name] = Node(name, state)

def connect(a, b, relation):
    if a in nodes and b in nodes:
        nodes[a].link(nodes[b], relation)

def scan():
    print("\n=== 2055 LIVE SCAN ===")

    for node in nodes.values():
        node.info()

def stabilize(name):
    if name in nodes:
        nodes[name].state = "stable"
        print(f"\n{name} stabilized.")

def corrupt(name):
    if name in nodes:
        nodes[name].state = "corrupted"
        print(f"\n{name} corrupted.")

# DEFAULT NODES
create_node("Django Sound", "origin")
create_node("Dablixx", "transmission")

create_node("Yetunde", "stable")
create_node("Olarewaju", "stable")

create_node("Iremide", "corrupted")
create_node("Wale", "corrupted")

# CONNECTIONS
connect("Django Sound", "Dablixx", "ancestor")

connect("Dablixx", "Yetunde", "child")
connect("Dablixx", "Olarewaju", "child")

connect("Yetunde", "Iremide", "corrupted_branch")
connect("Olarewaju", "Wale", "corrupted_branch")

def run_argv(argv):
    cmd = argv[0] if argv else "scan"
    if cmd in ("1", "scan"):
        scan()
    elif cmd in ("2", "stabilize") and len(argv) > 1:
        stabilize(argv[1])
    elif cmd in ("3", "corrupt") and len(argv) > 1:
        corrupt(argv[1])
    elif cmd in ("4", "exit", "quit"):
        print("\n2055 Engine Closed.")
    else:
        print("usage: 2055_core.py scan | stabilize <name> | corrupt <name>")

def interactive():
    while True:
        print("\n=== 2055 COMMAND ENGINE ===")
        print("1. Scan Timeline")
        print("2. Stabilize Node")
        print("3. Corrupt Node")
        print("4. Exit")

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
            print("\n2055 Engine Closed.")
            break
        else:
            print("\nInvalid command.")

if __name__ == "__main__":
    argv = sys.argv[1:]
    if argv or not sys.stdin.isatty():
        run_argv(argv or ["scan"])
    else:
        interactive()
