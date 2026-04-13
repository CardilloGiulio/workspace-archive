import time

from rich.console import Console
from rich.progress import BarColumn, Progress, TextColumn, TimeElapsedColumn, TimeRemainingColumn

from services.file_ops_service import estimate_eta


def run_with_progress(console: Console, title: str, total: int, worker):
    start = time.time()
    safe_total = max(total, 1)

    with Progress(
        TextColumn("[bold blue]{task.description}"),
        BarColumn(),
        TextColumn("{task.percentage:>3.0f}%"),
        TimeElapsedColumn(),
        TimeRemainingColumn(),
        console=console,
        transient=True,
    ) as progress:
        task_id = progress.add_task(title, total=safe_total)

        def callback(completed: int, real_total: int) -> None:
            target_total = max(real_total, 1)
            progress.update(task_id, total=target_total, completed=min(completed, target_total))
            eta = estimate_eta(start, completed, real_total)
            if eta is not None:
                progress.update(task_id, description=f"{title} (ETA {eta:.1f}s)")

        return worker(callback)
