import json

TIMELINE_FILE = "memory/timeline_memory.json"


class Engine:

    def __init__(self):

        self.timeline_state = {}

        self.load_timeline()

    # LOAD TIMELINE
    def load_timeline(self):

        try:

            with open(TIMELINE_FILE, "r") as f:

                self.timeline_state = json.load(f)

        except Exception as e:

            print(f"\nTimeline Load Error: {e}")

            self.timeline_state = {}

    # SHOW TIMELINE
    def show_timeline(self):

        print(
            "\n=== 2055 LIVE :: "
            "FEDERATED IDENTITY TRACK ==="
        )

        for name, node in (
            self.timeline_state.items()
        ):

            print(f"\n[{name}]")

            for key, value in node.items():

                print(f"{key}: {value}")

    # ANALYZE EQUATIONS
    def analyze_equations(self):

        print("\n=== IDENTITY EQUATIONS ===")

        print("\nImade != Iremide")

        print(
            "Yetunde = lineage(Imade)"
        )

        print(
            "Yewande = "
            "protected_alias(Yetunde)"
        )

        print(
            "Iremide = "
            "corrupted_branch(Yetunde)"
        )

        print(
            "Wale = "
            "corrupted_descendant(Iremide)"
        )

        print("Wale != Kpoi")

        print(
            "Wale impersonates Kpoi"
        )

        print(
            "Babatunde = corruption(Ω)"
        )

        print("Ω != Babatunde")

        print(
            "Obi Cubana != Raji"
        )

    # ENGINE LOOP
    def run(self):

        while True:

            print(
                "\n=== 2055 CORE ENGINE ==="
            )

            print("1. Show Timeline")
            print("2. Analyze Equations")
            print("3. Exit")

            choice = input("\nSelect: ")

            if choice == "1":

                self.show_timeline()

            elif choice == "2":

                self.analyze_equations()

            elif choice == "3":

                print(
                    "\n2055 Engine Shutdown."
                )

                break

            else:

                print(
                    "\nInvalid command."
                )


if __name__ == "__main__":

    engine = Engine()

    engine.run()
