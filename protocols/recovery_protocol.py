import json
import os

STATE_FILE = "protocols/states/recovery_state.json"


class RecoveryProtocol:

    def __init__(self):

        self.state = {
            "protocol": "recovery_protocol",
            "stable_nodes": [],
            "recovered_nodes": [],
            "integrity_score": 0,
            "status": "idle"
        }

        self.initialize()

    # INITIALIZE
    def initialize(self):

        if os.path.exists(STATE_FILE):

            with open(STATE_FILE, "r") as f:
                self.state = json.load(f)

        else:
            self.save_state()

    # SAVE LOCAL STATE
    def save_state(self):

        with open(STATE_FILE, "w") as f:
            json.dump(self.state, f, indent=4)

    # EXECUTE
    def execute(self, local_state, shared_context=None):

        stable_nodes = []

        for name, node in local_state.items():

            if node.get("state") == "stable":

                alias = node.get("protected_alias")

                if alias:
                    stable_nodes.append(
                        f"{name} ({alias})"
                    )

                else:
                    stable_nodes.append(name)

        self.state["stable_nodes"] = stable_nodes

        total_nodes = len(local_state)

        if total_nodes > 0:

            integrity = (
                len(stable_nodes) / total_nodes
            ) * 100

        else:
            integrity = 0

        self.state["integrity_score"] = integrity

        if integrity >= 70:
            self.state["status"] = "recovering"

        elif integrity >= 40:
            self.state["status"] = "unstable"

        else:
            self.state["status"] = "collapse_risk"

        self.save_state()

        return self.export_state()

    # ANALYZE
    def analyze(self):

        print("\n=== RECOVERY PROTOCOL ===")

        print(f"\nIntegrity Score: {self.state['integrity_score']:.2f}%")

        print(f"Status: {self.state['status']}")

        print("\nStable Nodes:")

        for node in self.state["stable_nodes"]:
            print(f" - {node}")

    # EXPORT STATE
    def export_state(self):

        return {
            "protocol": self.state["protocol"],
            "integrity_score": self.state["integrity_score"],
            "status": self.state["status"],
            "stable_nodes": self.state["stable_nodes"]
        }


# STANDALONE TEST
if __name__ == "__main__":

    test_state = {

        "Yetunde": {
            "state": "stable"
        },

        "Wale": {
            "state": "corrupted"
        }
    }

    protocol = RecoveryProtocol()

    protocol.execute(test_state)

    protocol.analyze()
