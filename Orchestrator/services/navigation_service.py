from pathlib import Path

from core.paths import ensure_allowed, safe_join


def list_directory(current_dir: Path) -> list[Path]:
    items = []
    for item in sorted(current_dir.iterdir(), key=lambda p: (p.is_file(), p.name.lower())):
        try:
            ensure_allowed(item)
            items.append(item)
        except ValueError:
            continue
    return items


def change_directory(current_dir: Path, raw_target: str) -> Path:
    target = safe_join(current_dir, raw_target)
    if not target.exists():
        raise ValueError("Directory does not exist.")
    if not target.is_dir():
        raise ValueError("Target is not a directory.")
    return target


def make_directory(current_dir: Path, folder_name: str) -> Path:
    target = safe_join(current_dir, folder_name)
    target.mkdir(parents=False, exist_ok=False)
    return target
