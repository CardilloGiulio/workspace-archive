from pathlib import Path

APP_TITLE = "Repository Orchestrator"

ORCHESTRATOR_DIR = Path(__file__).resolve().parents[1]
WORKSPACE_ROOT = ORCHESTRATOR_DIR.parent
RESULTS_DIR = WORKSPACE_ROOT / "Results"
LOGS_DIR = ORCHESTRATOR_DIR / "Logs"

BLOCKED_NAMES = {"Orchestrator"}
LOG_FILE_NAME = "actions.log"

COPY_CHUNK_SIZE = 1024 * 1024
SEARCH_LIMIT = 200
TIME_FORMAT = "%Y-%m-%d %H:%M:%S"
