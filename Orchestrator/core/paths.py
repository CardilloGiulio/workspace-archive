from pathlib import Path

from config.settings import BLOCKED_NAMES, ORCHESTRATOR_DIR, WORKSPACE_ROOT


def is_relative_to(path: Path, other: Path) -> bool:
    try:
        path.resolve().relative_to(other.resolve())
        return True
    except ValueError:
        return False


def is_blocked(path: Path) -> bool:
    resolved = path.resolve()
    if resolved == ORCHESTRATOR_DIR.resolve():
        return True
    if ORCHESTRATOR_DIR.resolve() in resolved.parents:
        return True
    return any(part in BLOCKED_NAMES for part in resolved.parts)


def ensure_allowed(path: Path) -> Path:
    resolved = path.resolve()
    if not is_relative_to(resolved, WORKSPACE_ROOT):
        raise ValueError("Target is outside workspace-archive.")
    if is_blocked(resolved):
        raise ValueError("The Orchestrator folder is not accessible.")
    return resolved


def safe_join(base: Path, raw_target: str) -> Path:
    target = (base / raw_target).resolve()
    return ensure_allowed(target)


def display_path(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(WORKSPACE_ROOT.resolve()))
    except ValueError:
        return str(path.resolve())
