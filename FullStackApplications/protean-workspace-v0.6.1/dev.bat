@echo off
setlocal EnableExtensions
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
    call install.bat
    if %ERRORLEVEL% NEQ 0 exit /b %ERRORLEVEL%
)

echo Starting Protean Workspace in development mode...
".venv\Scripts\python.exe" -m uvicorn protean_workspace.main:app --host 127.0.0.1 --port 8000 --reload
