@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (
  echo Node.js is required. Install Node.js 20.19 or newer, then run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing Vite...
  call npm install || goto :error
)
call npm run dev
goto :eof
:error
echo.
echo The development server could not be started.
pause
exit /b 1
