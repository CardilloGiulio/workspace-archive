@echo off
setlocal EnableExtensions
cd /d "%~dp0"

echo ========================================
echo   Protean Workspace - v0.2 Data Import
echo ========================================
echo.

if exist "instance\protean_workspace.db" (
    echo Protean Workspace already has an instance database.
    echo No files were changed.
    pause
    exit /b 0
)
if exist "instance\riddle_studio.db" (
    echo A legacy v0.2 database is already present in this Protean instance folder.
    echo Protean Workspace will reuse and migrate it automatically.
    pause
    exit /b 0
)

set "OLDROOT=%~1"
if not "%OLDROOT%"=="" goto :check

if exist "..\riddle-studio-v0.2.1\instance\riddle_studio.db" set "OLDROOT=..\riddle-studio-v0.2.1"
if not "%OLDROOT%"=="" goto :check
if exist "..\riddle-studio-v0.2\instance\riddle_studio.db" set "OLDROOT=..\riddle-studio-v0.2"

:check
if "%OLDROOT%"=="" goto :usage
if not exist "%OLDROOT%\instance\riddle_studio.db" goto :usage

mkdir "instance" >nul 2>&1
xcopy "%OLDROOT%\instance\*" "instance\" /E /I /Y >nul
if %ERRORLEVEL% GEQ 2 goto :failed

echo Imported local data from:
echo   %OLDROOT%\instance
echo.
echo This includes chat history, account/session data, and encrypted provider credentials.
echo Protean Workspace will add the 0.3 preference migration on next start.
echo You may need to sign in again because the browser cookie name changed with the product rename.
echo.
pause
exit /b 0

:usage
echo Could not automatically find the previous installation.
echo.
echo Run this file with the old project folder as an argument, for example:
echo   upgrade-from-v0.2.bat "C:\Code\...\riddle-studio-v0.2.1"
echo.
echo No files were changed.
pause
exit /b 1

:failed
echo ERROR: Could not copy the old instance directory.
pause
exit /b 1
