from dataclasses import dataclass, field
from pathlib import Path
from typing import List

from config.settings import WORKSPACE_ROOT


@dataclass
class SearchResult:
    index: int
    kind: str
    path: Path


@dataclass
class AppState:
    current_dir: Path = field(default_factory=lambda: WORKSPACE_ROOT)
    last_results: List[SearchResult] = field(default_factory=list)
