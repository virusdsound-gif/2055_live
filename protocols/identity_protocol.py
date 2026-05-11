import json
import os

STATE_FILE = "protocols/states/identity_state.json"


class IdentityProtocol:

    def __init__(self):

        self.state = {
            "protocol": "identity_protocol",
            "protected_aliases": {},
            "shielded_nodes": [],
            "identity_conflicts": [],
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

    # SAVE STATE
    def save_state(self):

        with open(STATE_FILE, "w") as f:
            json.dump(self.state, f, indent=4)

    # EXECUTE
    def execute(self, local_state, shared_context=None):

        aliases = {}

        shielded = []

        conflicts = []

        for name, node in local_state.items():

            alias = node.get("protected_alias")

            reason = node.get("alias_reason")

            if alias:

                aliases[name] = {
                    "alias": alias,
                    "reason": reason
                }

                shielded.append(name)

            # IDENTITY CONFLICT DETECTION
            if (
                "corrupted" in node.get("state", "")
                and alias
            ):

                conflicts.append(name)

        self.state["protected_aliases"] = aliases
        self.state["shielded_nodes"] = shielded
        self.state["identity_conflicts"] = conflicts

        if len(conflicts) > 0:

            self.state["status"] = "conflict_detected"

        elif len(shielded) > 0:

            self.state["status"] = "shielding_active"

        else:

            self.state["status"] = "stable"

        self.save_state()

        return self.export_state()

    # ANALYZE
    def analyze(self):

        print("\n=== IDENTITY PROTOCOL ===")

        print(f"\nStatus: {self.state['status']}")

        print("\nProtected Aliases:")

        aliases = self.state["protected_aliases"]

        if aliases:

            for node, data in aliases.items():

                print(
                    f" - {node} "
                    f"→ {data['alias']}"
                )

                print(
                    f"   reason: "
                    f"{data['reason']}"
                )

        else:
            print(" None")

        print("\nIdentity Conflicts:")

        conflicts = self.state["identity_conflicts"]

        if conflicts:

            for node in conflicts:
                print(f" - {node}")

        else:
            print(" None")

    # EXPORT STATE
    def export_state(self):

        return {
            "protocol": self.state["protocol"],
            "status": self.state["status"],
            "protected_aliases":
                self.state["protected_aliases"],
            "shielded_nodes":
                self.state["shielded_nodes"],
            "identity_conflicts":
                self.state["identity_conflicts"]
        }


# STANDALONE TEST
if __name__ == "__main__":

    test_state = {

        "Yetunde": {
            "state": "stable",
            "protected_alias": "Yewande",
            "alias_reason":
                "corruption_shielding"
        },

        "Babatunde": {
            "state": "corrupted_entity"
        }
    }

    protocol = IdentityProtocol()

    protocol.execute(test_state)

    protocol.analyze()
