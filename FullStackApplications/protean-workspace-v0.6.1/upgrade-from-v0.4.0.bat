@echo off
setlocal
cd /d "%~dp0"

if "%~1"=="" (
  echo Usage: upgrade-from-v0.4.0.bat "C:\path\to\protean-workspace-v0.4.0"
  echo.
  echo This copies only the old instance folder so accounts, encrypted provider keys,
  echo preferences and chat history are preserved.
  pause
  exit /b 1
)

set "OLD=%~1"
if not exist "%OLD%\instance" (
  echo ERROR: No instance folder found at "%OLD%\instance"
  pause
  exit /b 1
)

if exist "%~dp0instance" (
  echo ERROR: This v0.4.1 folder already has an instance folder.
  echo Move or back it up first to avoid overwriting local data.
  pause
  exit /b 1
)

xcopy "%OLD%\instance" "%~dp0instance\" /E /I /H /K /Y >nul
if errorlevel 1 (
  echo ERROR: Copy failed.
  pause
  exit /b 1
)

echo Upgrade data copied successfully.
echo Start Protean Workspace v0.4.1 normally.
pause
