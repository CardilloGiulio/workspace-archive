from rich.console import Console
from rich.table import Table

from core.paths import display_path
from core.state import AppState


def clear_screen(console: Console) -> None:
    console.clear()


def render_home(console: Console, state: AppState) -> None:
    console.print(f"[bold]workspace root:[/] {display_path(state.current_dir) or '.'}")
    console.print("[dim]Type 'help' to see all commands.[/]")
    if state.last_results:
        table = Table(title="Latest Search Results", show_lines=False)
        table.add_column("#", style="cyan", width=4)
        table.add_column("Type", style="magenta", width=8)
        table.add_column("Path", style="green")
        for item in state.last_results[:10]:
            table.add_row(str(item.index), item.kind, display_path(item.path))
        console.print(table)


def pause(console: Console) -> None:
    console.input("\n[dim]Press Enter to continue...[/]")
