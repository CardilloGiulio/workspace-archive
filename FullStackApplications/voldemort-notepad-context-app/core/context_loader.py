import csv
import re
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
CONTEXT_DIR = BASE_DIR / "context"


def load_text_file(filename: str) -> str:
    path = CONTEXT_DIR / filename
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8").strip()


def load_csv_rows(filename: str) -> list[dict]:
    path = CONTEXT_DIR / filename
    if not path.exists():
        return []

    with path.open("r", encoding="utf-8-sig", newline="") as file:
        return list(csv.DictReader(file))


def tokenize(text: str) -> set[str]:
    return {
        token.lower()
        for token in re.findall(r"[A-Za-z0-9_./:-]+", text)
        if len(token) > 2
    }


def score_text(query_words: set[str], text: str) -> int:
    lowered = text.lower()
    return sum(1 for word in query_words if word in lowered)


def find_relevant_csv_rows(user_message: str, rows: list[dict], limit: int = 8) -> list[dict]:
    query_words = tokenize(user_message)
    scored = []

    for row in rows:
        text = " ".join(str(value) for value in row.values())
        score = score_text(query_words, text)
        if score > 0:
            scored.append((score, row))

    scored.sort(key=lambda item: item[0], reverse=True)
    return [row for _, row in scored[:limit]]


def split_raw_text_into_chunks(text: str, max_chars: int = 1600) -> list[str]:
    if not text.strip():
        return []

    blocks = []
    current = []

    for line in text.splitlines():
        if line.startswith("TOPIC ") or line.startswith("MODULE ") or line.startswith("======================================================================"):
            if current:
                blocks.append("\n".join(current).strip())
                current = []

        current.append(line)

        if sum(len(part) for part in current) > max_chars:
            blocks.append("\n".join(current).strip())
            current = []

    if current:
        blocks.append("\n".join(current).strip())

    return [block for block in blocks if block]


def find_relevant_text_chunks(user_message: str, raw_text: str, limit: int = 4) -> list[str]:
    query_words = tokenize(user_message)
    scored = []

    for chunk in split_raw_text_into_chunks(raw_text):
        score = score_text(query_words, chunk)
        if score > 0:
            scored.append((score, chunk))

    scored.sort(key=lambda item: item[0], reverse=True)
    return [chunk for _, chunk in scored[:limit]]


def build_context(user_message: str) -> str:
    base_context = load_text_file("base_context.txt")
    personality = load_text_file("personality.txt")
    raw_text = load_text_file("raw_knowledge.txt")
    rows = load_csv_rows("knowledge.csv")

    relevant_rows = find_relevant_csv_rows(user_message, rows)
    relevant_chunks = find_relevant_text_chunks(user_message, raw_text)

    parts = []

    if base_context:
        parts.append(base_context)

    if personality:
        parts.append(personality)

    if relevant_rows:
        csv_parts = ["CSV KNOWLEDGE:"]
        for row in relevant_rows:
            csv_parts.append(
                f"Module: {row.get('module', '')}\n"
                f"Topic: {row.get('topic', '')}\n"
                f"Concept: {row.get('concept', '')}\n"
                f"Definition: {row.get('definition', '')}\n"
                f"MustKnow: {row.get('must_know', '')}\n"
                f"Example: {row.get('example', '')}\n"
                f"SecurityNote: {row.get('security_note', '')}\n"
                f"Command: {row.get('command', '')}\n"
                f"CommonMistake: {row.get('common_mistake', '')}"
            )
        parts.append("\n\n".join(csv_parts))

    if relevant_chunks:
        text_parts = ["RAW KNOWLEDGE EXCERPTS:"]
        for i, chunk in enumerate(relevant_chunks, start=1):
            text_parts.append(f"Excerpt {i}:\n{chunk}")
        parts.append("\n\n".join(text_parts))

    return "\n\n".join(parts)
