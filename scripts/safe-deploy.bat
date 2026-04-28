@echo off
REM scripts/safe-deploy.bat — Windows wrapper for safe-deploy.sh
REM Usage: double-click, or run from any cmd window
setlocal

REM cd to repo root (parent of scripts/)
cd /d "%~dp0\.."

REM Run via git-bash if available, else fallback to plain bash
where bash >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Khong tim thay 'bash'. Cai Git for Windows: https://git-scm.com/download/win
  exit /b 1
)

bash scripts/safe-deploy.sh
exit /b %errorlevel%
