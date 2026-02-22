@echo off
title تثبيت برنامج قطع الغيار
color 0A

cd /d "%~dp0"

echo ==========================================
echo    تثبيت برنامج ادارة قطع الغيار
echo ==========================================
echo.

echo [1/3] جاري تثبيت المكتبات...
call npm install
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [خطأ] فشل تثبيت المكتبات. تأكد من تثبيت Node.js
    pause
    exit /b 1
)

echo.
echo [2/3] جاري بناء البرنامج...
call npm run build
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [خطأ] فشل بناء البرنامج.
    pause
    exit /b 1
)

echo.
echo [3/3] جاري انشاء حساب المدير...
call npm run seed
if %errorlevel% neq 0 (
    echo [تنبيه] الحساب موجود مسبقا.
)

echo.
color 0A
echo ==========================================
echo    تم التثبيت بنجاح!
echo.
echo    اسم المستخدم : admin
echo    كلمة المرور  : admin123
echo.
echo    لتشغيل البرنامج انقر مرتين على start.bat
echo    تصغير النافذة فقط ولا تغلقها
echo ==========================================
echo.
pause
