@echo off
title برنامج ادارة قطع الغيار
color 0A
echo ==========================================
echo    برنامج ادارة قطع الغيار
echo ==========================================
echo.

pm2 describe spare-parts >nul 2>&1
if %errorlevel% == 0 (
    echo البرنامج يعمل بالفعل في الخلفية
    echo.
    echo حالة البرنامج:
    pm2 status spare-parts
) else (
    echo جاري تشغيل البرنامج في الخلفية...
    pm2 start dist/src/index.js --name spare-parts
    pm2 save
    echo.
    echo تم تشغيل البرنامج بنجاح في الخلفية
)

echo.
echo    البرنامج يعمل على: http://localhost:5000
echo    يمكنك اغلاق هذه النافذة بامان
echo ==========================================
echo.
pause
