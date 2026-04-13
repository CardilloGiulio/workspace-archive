import subprocess
from pathlib import Path

from config.settings import WORKSPACE_ROOT


def git_status_for_path(path: Path) -> str:
    relative = path.resolve().relative_to(WORKSPACE_ROOT.resolve())

    try:
        check_repo = subprocess.run(
            ["git", "rev-parse", "--is-inside-work-tree"],
            cwd=WORKSPACE_ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        if check_repo.returncode != 0:
            return "Git repository not detected."

        result = subprocess.run(
            ["git", "status", "--porcelain", "--", str(relative)],
            cwd=WORKSPACE_ROOT,
            capture_output=True,
            text=True,
            check=False,
        )

        output = result.stdout.strip()
        if not output:
            return "Clean / tracked with no local changes."

        code = output[:2]
        if "??" in code:
            return "New / untracked."
        if "M" in code:
            return "Modified / updated."
        if "A" in code:
            return "Added."
        if "D" in code:
            return "Deleted in index or working tree."
        if "R" in code:
            return "Renamed."
        return f"Changed: {output}"
    except FileNotFoundError:
        return "Git is not installed or not available in PATH."
