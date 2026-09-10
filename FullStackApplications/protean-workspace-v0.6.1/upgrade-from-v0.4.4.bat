@echo off
setlocal
cd /d "%~dp0"
if "%~1"=="" (
  echo Usage: upgrade-from-v0.4.4.bat "C:\path\to\protean-workspace-v0.4.4"
  exit /b 1
)
set "OLD=%~1"
if not exist "%OLD%\instance" (
  echo No instance folder found at "%OLD%\instance"
  exit /b 1
)
if exist "instance" (
  echo Current instance folder already exists. Nothing was overwritten.
  exit /b 1
)
xcopy "%OLD%\instance" "instance\" /E /I /H /K /Y >nul
if errorlevel 1 (
  echo Could not copy the instance folder.
  exit /b 1
)
echo Protean Workspace v0.4.4 local data copied successfully.
endlocal
