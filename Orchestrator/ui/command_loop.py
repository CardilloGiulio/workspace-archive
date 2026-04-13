from rich.console import Console
from rich.panel import Panel
from rich.table import Table

from core.paths import display_path
from core.state import AppState
from services.file_ops_service import copy_with_progress, result_message, zip_with_progress
from services.git_service import git_status_for_path
from services.info_service import get_info
from services.logger_service import log_action
from services.navigation_service import change_directory, list_directory, make_directory
from services.search_service import find_items
from ui.progress_view import run_with_progress

HELP_TEXT = """\
help / commands
dir
cd <folder>        | cd ..
mkdir <name>
find file <name>
find folder <name>
copy <index>
zip <index>
info <index>
git <index>
back
exit
"""


def _pick_result(state: AppState, raw_index: str):
    if not raw_index.isdigit():
        raise ValueError("You must provide a numeric result index.")
    index = int(raw_index)
    for item in state.last_results:
        if item.index == index:
            return item
    raise ValueError("Result index not found. Run a search first.")


def _dir(console: Console, state: AppState) -> None:
    items = list_directory(state.current_dir)
    table = Table(title=f"Directory: {display_path(state.current_dir) or '.'}")
    table.add_column("Type", width=8)
    table.add_column("Name", style="green")
    for item in items:
        table.add_row("DIR" if item.is_dir() else "FILE", item.name)
    console.print(table)
    log_action("dir", f"Listed directory {display_path(state.current_dir)}")


def _find(console: Console, state: AppState, kind: str, query: str) -> None:
    results = find_items(query, kind)
    state.last_results = results
    if not results:
        console.print(f"[yellow]No {kind} found for:[/] {query}")
        log_action("find", f"No {kind} found for '{query}'")
        return

    table = Table(title=f"Found {len(results)} {kind}(s)")
    table.add_column("#", width=4)
    table.add_column("Path", style="green")
    for item in results:
        table.add_row(str(item.index), display_path(item.path))
    console.print(table)
    log_action("find", f"Found {len(results)} {kind}(s) for '{query}'")


def handle_command(console: Console, state: AppState, raw: str) -> bool:
    parts = raw.split()
    command = parts[0].lower()

    try:
        if command in {"help", "commands"}:
            console.print(Panel.fit(HELP_TEXT, title="Commands"))
            log_action("help", "Displayed commands")
            return False

        if command == "exit":
            return True

        if command == "dir":
            _dir(console, state)
            return False

        if command == "cd":
            if len(parts) < 2:
                raise ValueError("Usage: cd <folder> or cd ..")
            state.current_dir = change_directory(state.current_dir, " ".join(parts[1:]))
            console.print(f"[green]Current directory:[/] {display_path(state.current_dir) or '.'}")
            log_action("cd", f"Changed directory to {display_path(state.current_dir)}")
            return False

        if command == "back":
            state.current_dir = change_directory(state.current_dir, "..")
            console.print(f"[green]Current directory:[/] {display_path(state.current_dir) or '.'}")
            log_action("cd", f"Moved back to {display_path(state.current_dir)}")
            return False

        if command == "mkdir":
            if len(parts) < 2:
                raise ValueError("Usage: mkdir <name>")
            created = make_directory(state.current_dir, " ".join(parts[1:]))
            console.print(f"[green]Created:[/] {display_path(created)}")
            log_action("mkdir", f"Created directory {display_path(created)}")
            return False

        if command == "find":
            if len(parts) < 3:
                raise ValueError("Usage: find file <name> or find folder <name>")
            kind = parts[1].lower()
            if kind not in {"file", "folder"}:
                raise ValueError("Use 'file' or 'folder'.")
            query = " ".join(parts[2:])
            _find(console, state, kind, query)
            return False

        if command == "copy":
            if len(parts) < 2:
                raise ValueError("Usage: copy <index>")
            item = _pick_result(state, parts[1])
            total = item.path.stat().st_size if item.path.is_file() else sum(p.stat().st_size for p in item.path.rglob("*") if p.is_file())
            target = run_with_progress(console, "Copying", total, lambda cb: copy_with_progress(item.path, cb))
            console.print(f"[green]{result_message('Copy', item.path, target)}[/]")
            log_action("copy", f"Copied {display_path(item.path)} to {target}")
            return False

        if command == "zip":
            if len(parts) < 2:
                raise ValueError("Usage: zip <index>")
            item = _pick_result(state, parts[1])
            total = item.path.stat().st_size if item.path.is_file() else sum(p.stat().st_size for p in item.path.rglob("*") if p.is_file())
            target = run_with_progress(console, "Zipping", total, lambda cb: zip_with_progress(item.path, cb))
            console.print(f"[green]{result_message('Zip', item.path, target)}[/]")
            log_action("zip", f"Zipped {display_path(item.path)} to {target}")
            return False

        if command == "info":
            if len(parts) < 2:
                raise ValueError("Usage: info <index>")
            item = _pick_result(state, parts[1])
            info = get_info(item.path)
            table = Table(title=f"Info for #{item.index}")
            table.add_column("Field", style="cyan")
            table.add_column("Value", style="green")
            for key, value in info.items():
                table.add_row(key, str(value))
            console.print(table)
            log_action("info", f"Displayed info for {display_path(item.path)}")
            return False

        if command == "git":
            if len(parts) < 2:
                raise ValueError("Usage: git <index>")
            item = _pick_result(state, parts[1])
            status = git_status_for_path(item.path)
            console.print(Panel.fit(status, title=f"Git status for #{item.index}"))
            log_action("git", f"Checked git status for {display_path(item.path)} -> {status}")
            return False

        raise ValueError("Unknown command. Type 'help' to see available commands.")

    except Exception as exc:
        console.print(f"[bold red]Error:[/] {exc}")
        log_action("error", f"{command}: {exc}")
        return False
