from pathlib import Path
import csv


BASE_DIR = Path(__file__).resolve().parent.parent
CONTEXT_DIR = BASE_DIR / "context"


def main():
    raw_path = CONTEXT_DIR / "raw_knowledge.txt"
    out_path = CONTEXT_DIR / "knowledge.csv"

    if not raw_path.exists():
        print("raw_knowledge.txt not found.")
        return

    text = raw_path.read_text(encoding="utf-8")
    lines = text.splitlines()

    current_module = ""
    current_topic = ""
    rows = []

    for line in lines:
        stripped = line.strip()

        if stripped.startswith("MODULE "):
            current_module = stripped.replace("MODULE ", "", 1)
            continue

        if stripped.startswith("TOPIC "):
            current_topic = stripped
            continue

        if stripped.startswith("- ") and current_topic:
            rows.append({
                "module": current_module,
                "topic": current_topic,
                "concept": stripped[2:82],
                "definition": stripped[2:],
                "must_know": "",
                "example": "",
                "security_note": "",
                "command": "",
                "common_mistake": "",
            })

    if not rows:
        print("No rows extracted.")
        return

    with out_path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(
            file,
            fieldnames=["module","topic","concept","definition","must_know","example","security_note","command","common_mistake"]
        )
        writer.writeheader()
        writer.writerows(rows)

    print(f"Wrote {len(rows)} rows to {out_path}")


if __name__ == "__main__":
    main()
