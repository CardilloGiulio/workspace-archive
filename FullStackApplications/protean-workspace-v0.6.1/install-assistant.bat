@echo off
setlocal EnableExtensions
cd /d "%~dp0"

echo ========================================
echo   Protean Virtual Assistant - Installer
echo ========================================
echo.

where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js was not found in PATH.
  echo Install Node.js 20 or newer, then run this file again.
  pause
  exit /b 1
)
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: npm was not found in PATH.
  pause
  exit /b 1
)

node -e "const m=Number(process.versions.node.split('.')[0]); process.exit(m>=20?0:1)"
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Virtual Assistant requires Node.js 20 or newer.
  node --version
  pause
  exit /b 1
)

if not exist "src\protean_workspace\assistant_shell\package.json" (
  echo ERROR: Assistant shell files are missing. Re-extract the complete Protean ZIP.
  pause
  exit /b 1
)

echo Installing pinned Electron runtime...
pushd "src\protean_workspace\assistant_shell"
call npm install --no-audit --no-fund
set "RESULT=%ERRORLEVEL%"
popd
if not "%RESULT%"=="0" (
  echo ERROR: Electron installation failed.
  pause
  exit /b %RESULT%
)

echo.
echo Virtual Assistant desktop runtime is ready.
pause
exit /b 0
