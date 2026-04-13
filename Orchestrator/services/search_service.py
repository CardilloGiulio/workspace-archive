import os
from pathlib import Path

from config.settings import SEARCH_LIMIT, WORKSPACE_ROOT
from core.paths import ensure_allowed
from core.state import SearchResult


def _visible_dirs(dirs: list[str], root: Path) -> list[str]:
    visible = []
    for name in list(dirs):
        try:
            ensure_allowed(root / name)
            visible.append(name)
        except ValueError:
            continue
    return visible


def find_items(name: str, kind: str) -> list[SearchResult]:
    results: list[SearchResult] = []
    lowered = name.lower().strip()

    for root_str, dirs, files in os.walk(WORKSPACE_ROOT):
        root = Path(root_str)
        dirs[:] = _visible_dirs(dirs, root)

        if kind == "folder":
            candidates = [root / d for d in dirs if lowered in d.lower()]
        else:
            candidates = [root / f for f in files if lowered in f.lower()]

        for candidate in candidates:
            try:
                ensure_allowed(candidate)
                results.append(SearchResult(index=len(results) + 1, kind=kind, path=candidate))
                if len(results) >= SEARCH_LIMIT:
                    return results
            except ValueError:
                continue

    return results
