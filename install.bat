@echo off
title تثبيت برنامج قطع الغيار
color 0A
echo ==========================================
echo    تثبيت برنامج ادارة قطع الغيار
echo ==========================================
echo.

echo [1/5] جاري تثبيت المكتبات...
call npm install
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [خطأ] فشل تثبيت المكتبات. تأكد من تثبيت Node.js
    pause
    exit /b 1
)

echo.
echo [2/5] جاري بناء البرنامج...
call npm run build
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [خطأ] فشل بناء البرنامج.
    pause
    exit /b 1
)

echo.
echo [3/5] جاري انشاء حساب المدير...
call npm run seed
if %errorlevel% neq 0 (
    echo [تنبيه] الحساب موجود مسبقا.
)

echo.
echo [4/5] جاري تثبيت مدير العمليات PM2...
call npm install -g pm2 pm2-windows-startup
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [خطأ] فشل تثبيت PM2.
    pause
    exit /b 1
)

echo.
echo [5/5] جاري ضبط التشغيل التلقائي عند بدء Windows...
call pm2 start dist/src/index.js --name spare-parts
call pm2 save
call pm2-startup install
if %errorlevel% neq 0 (
    echo [تنبيه] تعذر ضبط التشغيل التلقائي، استخدم start.bat يدويا.
)

echo.
color 0A
echo ==========================================
echo    تم التثبيت بنجاح!
echo.
echo    اسم المستخدم : admin
echo    كلمة المرور  : admin123
echo.
echo    البرنامج يعمل الان في الخلفية تلقائيا
echo    ولا حاجة لفتح اي نافذة يدويا
echo ==========================================
echo.
pause
