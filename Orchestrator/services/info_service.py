from datetime import datetime
from pathlib import Path

from core.paths import display_path


def format_size(num_bytes: int) -> str:
    units = ["B", "KB", "MB", "GB", "TB"]
    size = float(num_bytes)
    for unit in units:
        if size < 1024 or unit == units[-1]:
            return f"{size:.2f} {unit}"
        size /= 1024
    return f"{num_bytes} B"


def get_size(path: Path) -> int:
    if path.is_file():
        return path.stat().st_size
    total = 0
    for child in path.rglob("*"):
        if child.is_file():
            total += child.stat().st_size
    return total


def get_info(path: Path) -> dict:
    size_bytes = get_size(path)
    modified = datetime.fromtimestamp(path.stat().st_mtime).strftime("%Y-%m-%d %H:%M:%S")
    return {
        "path": display_path(path),
        "type": "folder" if path.is_dir() else "file",
        "modified": modified,
        "size_bytes": size_bytes,
        "size_human": format_size(size_bytes),
    }
