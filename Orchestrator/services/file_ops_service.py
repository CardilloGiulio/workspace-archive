import shutil
import time
import zipfile
from pathlib import Path
from typing import Callable

from config.settings import COPY_CHUNK_SIZE, RESULTS_DIR
from core.paths import display_path

ProgressCallback = Callable[[int, int], None]


def unique_target(path: Path) -> Path:
    if not path.exists():
        return path
    stem = path.stem
    suffix = path.suffix
    counter = 1
    while True:
        candidate = path.with_name(f"{stem}_{counter}{suffix}")
        if not candidate.exists():
            return candidate
        counter += 1


def folder_size(path: Path) -> int:
    total = 0
    for child in path.rglob("*"):
        if child.is_file():
            total += child.stat().st_size
    return total


def copy_with_progress(source: Path, progress: ProgressCallback | None = None) -> Path:
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)

    if source.is_file():
        target = unique_target(RESULTS_DIR / source.name)
        total = source.stat().st_size
        copied = 0
        with source.open("rb") as src, target.open("wb") as dst:
            while True:
                chunk = src.read(COPY_CHUNK_SIZE)
                if not chunk:
                    break
                dst.write(chunk)
                copied += len(chunk)
                if progress:
                    progress(copied, total)
        shutil.copystat(source, target, follow_symlinks=True)
        return target

    target_dir = unique_target(RESULTS_DIR / source.name)
    target_dir.mkdir(parents=True, exist_ok=False)
    total = folder_size(source)
    copied = 0

    for item in source.rglob("*"):
        relative = item.relative_to(source)
        destination = target_dir / relative
        if item.is_dir():
            destination.mkdir(parents=True, exist_ok=True)
            continue

        destination.parent.mkdir(parents=True, exist_ok=True)
        with item.open("rb") as src, destination.open("wb") as dst:
            while True:
                chunk = src.read(COPY_CHUNK_SIZE)
                if not chunk:
                    break
                dst.write(chunk)
                copied += len(chunk)
                if progress:
                    progress(copied, total)
        shutil.copystat(item, destination, follow_symlinks=True)

    return target_dir


def zip_with_progress(source: Path, progress: ProgressCallback | None = None) -> Path:
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    zip_name = unique_target(RESULTS_DIR / f"{source.name}.zip")

    if source.is_file():
        total = source.stat().st_size
        with zipfile.ZipFile(zip_name, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            archive.write(source, arcname=source.name)
            if progress:
                progress(total, total)
        return zip_name

    files = [p for p in source.rglob("*") if p.is_file()]
    total = sum(p.stat().st_size for p in files)
    processed = 0

    with zipfile.ZipFile(zip_name, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for file_path in files:
            arcname = str(Path(source.name) / file_path.relative_to(source))
            archive.write(file_path, arcname=arcname)
            processed += file_path.stat().st_size
            if progress:
                progress(processed, total)

    return zip_name


def estimate_eta(start_time: float, completed: int, total: int) -> float | None:
    if completed <= 0 or total <= 0:
        return None
    elapsed = time.time() - start_time
    rate = completed / elapsed if elapsed > 0 else 0
    if rate <= 0:
        return None
    remaining = total - completed
    return max(0.0, remaining / rate)


def result_message(action: str, source: Path, target: Path) -> str:
    return f"{action} completed: {display_path(source)} -> {target}"
