# workspace-archive

A personal **workspace archive**: a collection of projects, experiments, and ideas built over time.  
This repository acts both as a **backup** and as a **timeline of learning**, from school assignments to personal prototypes.

---

## What you’ll find here

This is a **multi-project archive**, organised by technology and context. Expect the contents to vary in scope and completeness (some are polished, others are quick experiments).

Top-level folders currently include: :contentReference[oaicite:2]{index=2}

- **C#** — C# projects (console / .NET / experiments)
- **Html** — standalone web pages and small front-end exercises
- **Next.js/compito-vacanze** — a Next.js project (holiday assignment)
- **Packet Tracer/2025_2026** — Cisco Packet Tracer labs/activities for the 2025–2026 period
- **Python** — Python scripts and exercises
- **Stage/Extra-Net/En** — internship/stage-related material (English)
- **Unity** — Unity projects / prototypes

> Tip: each subfolder is effectively its own project with its own setup/run instructions.

---

## How to use this repo

### Browse
If you’re here to explore:
1. Open a folder by topic (C#, Python, Unity, etc.)
2. Look for a `README.md`, `docs/`, or a project file like:
   - `.sln` / `.csproj` (C#)
   - `package.json` (Node/Next.js)
   - `.pkt` (Packet Tracer)
   - `requirements.txt` / `.py` (Python)
   - `Assets/` + `ProjectSettings/` (Unity)

### Run something locally (general guidance)

Because this is an archive, there isn’t one single “run command” for everything. Here are common starting points:

#### C#
- Open the folder in **Visual Studio** / **Rider**
- Or run via CLI (example):
  - `dotnet build`
  - `dotnet run`

#### HTML
- Open `index.html` in a browser  
  *(or use a small local server if needed)*

#### Next.js
- Go into `Next.js/compito-vacanze`
- Typical flow:
  - `npm install`
  - `npm run dev`

#### Python
- Use a virtual environment if you see dependencies
- Run scripts with:
  - `python <script>.py`

#### Unity
- Open the folder in **Unity Hub**
- Make sure you use the expected Unity version if it’s specified in `ProjectSettings/`

---

## Repo structure

```txt
workspace-archive/
├─ C#/
├─ Html/
├─ Next.js/
│  └─ compito-vacanze/
├─ Packet Tracer/
│  └─ 2025_2026/
├─ Python/
├─ Stage/
│  └─ Extra-Net/
│     └─ En/
└─ Unity/
