@echo off
setlocal EnableExtensions
cd /d "%~dp0"

echo ========================================
echo        Protean Workspace - Installer
echo ========================================
echo.

if not exist "pyproject.toml" (
    echo ERROR: pyproject.toml was not found next to install.bat.
    echo Project directory: %CD%
    echo Please re-extract the complete ZIP and run install.bat from there.
    pause
    exit /b 1
)

where py >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    set "PYTHON_CMD=py"
) else (
    where python >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Python was not found in PATH.
        echo Install Python 3.11 or newer, then run this installer again.
        pause
        exit /b 1
    )
    set "PYTHON_CMD=python"
)

%PYTHON_CMD% -c "import sys; raise SystemExit(0 if sys.version_info >= (3,11) else 1)"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Protean Workspace requires Python 3.11 or newer.
    %PYTHON_CMD% --version
    pause
    exit /b 1
)

if not exist ".venv\Scripts\python.exe" (
    echo [1/4] Creating virtual environment...
    %PYTHON_CMD% -m venv .venv
    if %ERRORLEVEL% NEQ 0 goto :failed
) else (
    echo [1/4] Virtual environment already exists.
)

echo [2/4] Updating pip...
".venv\Scripts\python.exe" -m pip install --upgrade pip
if %ERRORLEVEL% NEQ 0 goto :failed

echo [3/4] Installing Protean Workspace and development tools...
".venv\Scripts\python.exe" -m pip install -e ".[dev]"
if %ERRORLEVEL% NEQ 0 goto :failed

echo [4/4] Installing Virtual Assistant desktop runtime...
where npm >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    pushd "src\protean_workspace\assistant_shell"
    call npm install --no-audit --no-fund
    if errorlevel 1 (
        popd
        echo WARNING: The normal Workspace is installed, but the Virtual Assistant Electron runtime failed to install.
        echo Run install-assistant.bat later to retry only that step.
    ) else (
        popd
    )
) else (
    echo WARNING: npm was not found. Normal Workspace is installed.
    echo Install Node.js 20+ and run install-assistant.bat to enable Virtual Assistant.
)

echo.
echo ========================================
echo Installation complete.
echo Run start.bat to launch Protean Workspace.
echo ========================================
echo.
pause
exit /b 0

:failed
echo.
echo ERROR: Installation failed. See the messages above.
pause
exit /b 1
