@echo off
setlocal
cd /d "%~dp0"

if "%~1"=="" (
  echo Usage: upgrade-from-v0.3.1.bat "C:\path\to\protean-workspace-v0.3.1"
  echo.
  echo This copies only the old instance folder so accounts, encrypted provider keys,
  echo preferences and chat history are preserved. The database migration runs on startup.
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
  echo ERROR: This v0.3.3 folder already has an instance folder.
  echo Move or back it up first to avoid overwriting local data.
  pause
  exit /b 1
)

echo Copying local workspace data from:
echo   %OLD%\instance
echo to:
echo   %~dp0instance
xcopy "%OLD%\instance" "%~dp0instance\" /E /I /H /K /Y >nul
if errorlevel 1 (
  echo ERROR: Copy failed.
  pause
  exit /b 1
)

echo.
echo Upgrade data copied successfully.
echo Start Protean Workspace v0.3.3 normally; additive database migrations will run automatically.
pause
