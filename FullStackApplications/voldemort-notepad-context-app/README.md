# Tom Riddle Diary App

A minimal diary-style AI app with:
- FastAPI backend
- plain HTML/CSS/JS frontend
- OpenRouter integration
- a themed diary interface
- Tom Riddle persona instructions in the context folder
- keyword-based retrieval from CSV and raw text files

## Install

```bash
pip install -r requirements.txt
```

## Set your key

### PowerShell
```powershell

```

## Run

```bash
uvicorn main:app --reload
```

Open:
`http://127.0.0.1:8000`

## Character behaviour

The app is configured so the diary replies as Tom Riddle:
- brilliant
- cold
- manipulative
- elegant
- never openly identifying himself as Lord Voldemort

The relevant files are:
- `context/base_context.txt`
- `context/personality.txt`
- `core/ai.py`

## Context system

The app still uses:
- `context/knowledge.csv`
- `context/raw_knowledge.txt`

So the diary persona can still answer with your uploaded study material when needed.
