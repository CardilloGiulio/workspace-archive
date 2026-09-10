@echo off
setlocal
cd /d "%~dp0"
if "%~1"=="" (
  echo Usage: upgrade-from-v0.4.2.bat "C:\path\to\protean-workspace-v0.4.2"
  exit /b 1
)
if not exist "%~1\instance" (
  echo No instance folder found at: %~1\instance
  exit /b 1
)
if exist "instance" (
  echo This Protean Workspace copy already has an instance folder.
  echo Move or back it up before importing v0.4.2 data.
  exit /b 1
)
xcopy "%~1\instance" "instance\" /E /I /H /Y >nul
if errorlevel 1 (
  echo Upgrade copy failed.
  exit /b 1
)
echo Existing account, encrypted provider key, preferences and chat history copied successfully.
endlocal
