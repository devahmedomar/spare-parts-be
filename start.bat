@echo off
title برنامج ادارة قطع الغيار - لا تغلق هذه النافذة
color 0A

cd /d "%~dp0"

echo ==========================================
echo    برنامج ادارة قطع الغيار
echo    البرنامج يعمل على: http://localhost:5000
echo    تصغير النافذة فقط - لا تغلقها
echo ==========================================
echo.

npm run dev
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [خطأ] فشل تشغيل البرنامج.
    echo تأكد من تشغيل install.bat اولا
    pause
)
