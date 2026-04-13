# Repository Orchestrator

A simple terminal orchestrator for navigating and managing files inside `workspace-archive`.

## Main rules enforced

- The app always starts from `workspace-archive`
- It never allows navigation outside `workspace-archive`
- The `Orchestrator` folder is hidden and blocked
- All generated outputs go to `workspace-archive/Results`
- All logs go to `workspace-archive/Orchestrator/Logs`

## Features

- `help` / `commands`
- `dir`
- `cd <path>`
- `mkdir <name>`
- `find file <name>`
- `find folder <name>`
- `copy <index>`
- `zip <index>`
- `info <index>`
- `git <index>`
- `back`
- `exit`

## Install

```bash
pip install -r requirements.txt
```

## Run

```bash
python main.py
```

## Notes

- `copy`, `zip`, `info`, and `git` act on the latest search results.
- If Git is not available or the folder is not a Git repo, the Git check returns a friendly message.
