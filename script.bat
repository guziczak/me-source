@echo off

:: Delete all files and directories in ..\me\, including hidden ones
echo Deleting all files and directories in ..\me\

SETLOCAL
SET "sourcedir=..\me\"
SET "keepfile=script.bat"
SET "keepdir=.git"
FOR /d %%a IN ("%sourcedir%\*") DO IF /i NOT "%%~nxa"=="%keepdir%" RD /S /Q "%%a"
FOR %%a IN ("%sourcedir%\*") DO IF /i NOT "%%~nxa"=="%keepfile%" DEL "%%a"

del /S /Q docs\browser\*

:: Build the project with the specified configuration
echo Building the project
call ng build --configuration production --output-path docs --base-href "https://guziczak.github.io/me/" --deploy-url=https://guziczak.github.io/me/
set BUILD_EXIT_CODE=%ERRORLEVEL%
echo Build command finished with exit code %BUILD_EXIT_CODE%

:: Check if the build was successful before moving the files
if %BUILD_EXIT_CODE% EQU 0 (
    echo Build succeeded, moving files
    :: Move the built files to the specified directory
    move docs\browser\*.* ..\me\
    del /S /Q ..\me\assets\
    mkdir ..\me\assets
    Robocopy docs\browser\assets ..\me\assets /E /MOVE
) else (
    echo Build failed, not moving files
)
@REM pause