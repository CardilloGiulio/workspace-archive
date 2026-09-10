from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path


class AssistantDesktopLaunchError(RuntimeError):
    pass


class AssistantDesktopLauncher:
    """Launch the sandboxed Electron presentation shell.

    This infrastructure component knows how to spawn the local desktop renderer only.
    It has no provider credential, prompt, database, or character-state authority.
    """

    def __init__(self, shell_dir: Path) -> None:
        self._shell_dir = shell_dir

    def available(self) -> bool:
        return self._electron_command() is not None

    def launch(self, *, base_url: str, session_token: str) -> None:
        command = self._electron_command()
        if command is None:
            raise AssistantDesktopLaunchError(
                "Virtual Assistant desktop runtime is not installed. Run install-assistant.bat once, then try again."
            )
        env = os.environ.copy()
        env["PROTEAN_ASSISTANT_BASE_URL"] = base_url.rstrip("/")
        env["PROTEAN_ASSISTANT_TOKEN"] = session_token
        try:
            subprocess.Popen(
                [str(command), str(self._shell_dir)],
                cwd=str(self._shell_dir),
                env=env,
                stdin=subprocess.DEVNULL,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                creationflags=(
                    subprocess.CREATE_NO_WINDOW | subprocess.DETACHED_PROCESS
                    if sys.platform == "win32"
                    else 0
                ),
                close_fds=True,
            )
        except OSError as exc:
            raise AssistantDesktopLaunchError("Could not start the Virtual Assistant desktop window") from exc

    def _electron_command(self) -> Path | None:
        if sys.platform == "win32":
            candidate = self._shell_dir / "node_modules" / ".bin" / "electron.cmd"
        else:
            candidate = self._shell_dir / "node_modules" / ".bin" / "electron"
        return candidate if candidate.exists() else None
