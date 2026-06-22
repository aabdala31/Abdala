@echo off
setlocal enabledelayedexpansion

for /R %%f in (*.png *.PNG *.jpg *.jpeg *.JPG *.JPEG) do (
    echo Convirtiendo %%f

    magick "%%f" ^
        -quality 70 ^
        "%%~dpf%%~nf.webp"
)

echo.
echo Conversion finalizada.
pause