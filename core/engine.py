import json

from protocols.recovery_protocol import RecoveryProtocol
from protocols.identity_protocol import IdentityProtocol

TIMELINE_FILE = "memory/timeline_memory.json"


class Engine:

    def __init__(self):

        self.timeline_state = {}

        self.protocol_registry = {}

        self.load_timeline()

        self.initialize_protocols()

    # LOAD TIMELINE
    def load_timeline(self):

        try:

            with open(TIMELINE_FILE, "r") as f:
                self.timeline_state = json.load(f)

        except FileNotFoundError:

            self.timeline_state = {}

    # INITIALIZE PROTOCOLS
    def initialize_protocols(self):

        self.protocol_registry["recovery"] = RecoveryProtocol()
        self.protocol_registry["identity"] = IdentityProtocol()
    # EXECUTE PROTOCOLS
    def execute_protocols(self):

        protocol_exports = {}

        for name, protocol in self.protocol_registry.items():

            result = protocol.execute(
                self.timeline_state
            )

            protocol_exports[name] = result

        return protocol_exports

    # ANALYZE SYSTEM
    def analyze_system(self):

        print("\n=== 2055 ENGINE ANALYSIS ===")

        exports = self.execute_protocols()

        for protocol_name, state in exports.items():

            print(f"\n[{protocol_name.upper()}]")

            for key, value in state.items():

                print(f"{key}: {value}")

    # ENGINE LOOP
    def run(self):

        while True:

            print("\n=== 2055 CORE ENGINE ===")
            print("1. Analyze System")
            print("2. Exit")

            choice = input("\nSelect: ")

            if choice == "1":

                self.analyze_system()

            elif choice == "2":

                print("\n2055 Engine Shutdown.")
                break

            else:
                print("\nInvalid command.")


# ENTRY POINT
if __name__ == "__main__":

    engine = Engine()

    engine.run()
