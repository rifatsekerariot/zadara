@echo off
chcp 65001 >nul
title GitHub'a Yukleme Sihirbazi
echo ==========================================
echo   PROJE GITHUB YUKLEME ARACI
echo ==========================================
echo.

:: 1. Repo Adresini İste
set /p repo_url="Lutfen GitHub Repo Adresini Yapistirin (Orn: https://github.com/kullanici/proje.git): "

if "%repo_url%"=="" (
    echo Hata: Repo adresi bos olamaz!
    pause
    exit /b
)

:: 2. Git Kontrolü ve Init
if not exist .git (
    echo.
    echo [BILGI] Git repo olusturuluyor...
    git init
) else (
    echo.
    echo [BILGI] Mevcut Git repo algilandi.
)

:: 3. Dosyalari Ekle ve Commit Et
echo.
echo [ISLEM] Dosyalar staging alanina aliniyor...
git add .

echo [ISLEM] Commit olusturuluyor...
git commit -m "Zadara-VMware Wrapper Projesi: Ilk Yukleme"

:: 4. Remote Ayarla (Varsa sil, yeniden ekle)
git remote remove origin 2>nul
git remote add origin %repo_url%

:: 5. Push İşlemi
echo.
echo [ISLEM] Kodlar GitHub'a gonderiliyor (Push)...
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [HATA] Yukleme sirasinda bir hata olustu. Lutfen repo adresini veya internet baglantinizi kontrol edin.
) else (
    echo.
    echo ==========================================
    echo   ISLEM BASARIYLA TAMAMLANDI!
    echo ==========================================
)

pause
