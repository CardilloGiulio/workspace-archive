@echo off
setlocal EnableExtensions
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
    echo Protean Workspace is not installed yet.
    echo Running install.bat first...
    call install.bat
    if %ERRORLEVEL% NEQ 0 exit /b %ERRORLEVEL%
)

echo Starting Protean Workspace at http://127.0.0.1:8000
echo Press Ctrl+C in this window to stop the server.
echo.
start "" "http://127.0.0.1:8000"
".venv\Scripts\python.exe" -m uvicorn protean_workspace.main:app --host 127.0.0.1 --port 8000
