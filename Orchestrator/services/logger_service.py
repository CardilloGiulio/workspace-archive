from datetime import datetime

from config.settings import LOG_FILE_NAME, LOGS_DIR, TIME_FORMAT


def log_action(action_type: str, message: str) -> None:
    LOGS_DIR.mkdir(parents=True, exist_ok=True)
    log_path = LOGS_DIR / LOG_FILE_NAME
    stamp = datetime.now().strftime(TIME_FORMAT)
    line = f"[{stamp}] [{action_type.upper()}] {message}\n"
    with log_path.open("a", encoding="utf-8") as handle:
        handle.write(line)
