from datetime import datetime
from pathlib import Path

BASE_DIR = Path("output")
FILE_OUT = BASE_DIR / "lista_maiusc.txt"
FILE_LOG = BASE_DIR / "debug.log"


def ensure_environment():
    BASE_DIR.mkdir(parents=True, exist_ok=True)
    FILE_OUT.touch(exist_ok=True)
    FILE_LOG.touch(exist_ok=True)


def log_event(action, detail=""):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"{ts} | {action}" + (f" | {detail}" if detail else "")
    with open(FILE_LOG, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def input_names(stop_word="stop"):
    names = []
    log_event("INPUT_START")
    while True:
        s = input("Inserisci un nome (oppure 'stop'): ").strip()
        if not s:
            continue
        if s.lower() == stop_word:
            log_event("INPUT_STOP", f"count={len(names)}")
            return names
        names.append(s)
        log_event("INPUT_ADD", s)


def to_upper(names):
    result = [n.upper() for n in names]
    log_event("CONVERT_UPPER", f"count={len(result)}")
    return result


def write_lines(lines):
    with open(FILE_OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    log_event("WRITE_FILE", f"count={len(lines)}")


def read_lines():
    with open(FILE_OUT, "r", encoding="utf-8") as f:
        lines = [line.strip() for line in f]
    log_event("READ_FILE", f"count={len(lines)}")
    return lines


def print_block(title, lines):
    print(f"\n{title}")
    print("-" * len(title))
    if not lines:
        print("(vuoto)")
        return
    for i, line in enumerate(lines, 1):
        print(f"{i}. {line}")


def create_flow():
    names = input_names()
    upper_names = to_upper(names)
    write_lines(upper_names)
    print_block("File creato", [str(FILE_OUT)])
    print_block("Contenuto (MAIUSCOLO)", read_lines())


def view_flow():
    lines = read_lines()
    print_block("Contenuto (MAIUSCOLO)", lines)


def menu():
    while True:
        print("\n=== MENU ===")
        print("1) Crea file e stampa")
        print("2) Leggi file")
        print("0) Esci")
        choice = input("Scelta: ").strip()
        log_event("MENU", choice)

        if choice == "1":
            create_flow()
        elif choice == "2":
            view_flow()
        elif choice == "0":
            log_event("EXIT")
            break
        else:
            print("Scelta non valida")


def main():
    ensure_environment()
    log_event("START")
    menu()


if __name__ == "__main__":
    main()