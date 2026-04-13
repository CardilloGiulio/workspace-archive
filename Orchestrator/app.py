from rich.console import Console
from rich.panel import Panel

from config.settings import APP_TITLE
from core.state import AppState
from services.logger_service import log_action
from ui.screen import clear_screen, pause, render_home
from ui.command_loop import handle_command

console = Console()


def run() -> None:
    state = AppState()
    log_action("startup", "Orchestrator started")

    while True:
        clear_screen(console)
        console.print(Panel.fit(APP_TITLE, style="bold cyan"))
        render_home(console, state)

        try:
            raw = console.input("\n[bold green]command> [/]").strip()
        except (EOFError, KeyboardInterrupt):
            console.print("\n[bold yellow]Closing orchestrator...[/]")
            log_action("shutdown", "Closed with keyboard interrupt")
            break

        if not raw:
            continue

        should_exit = handle_command(console, state, raw)
        if should_exit:
            log_action("shutdown", "Orchestrator closed")
            break

        pause(console)
