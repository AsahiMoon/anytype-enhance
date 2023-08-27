@echo off
echo  please close anytype first

set anytype_path=C:\Users\%username%\AppData\Local\Programs\anytype\resources
set extract=%anytype_path%\extract

@REM 备份app.asar
if exist %anytype_path%\app.asar.bak (
    echo bak is exist
) else (
    copy %anytype_path%\app.asar %anytype_path%\app.asar.bak
)


@REM 解压app.asar
call asar extract %anytype_path%\app.asar %extract% 

@REM 放入插件和替换index.html
xcopy extensions\ %extract%\dist\extensions\ /s /e /y
copy .\index.html %extract%\dist\index.html /y

@REM 压缩app.asar
call asar pack %anytype_path%\extract %anytype_path%\app.asar

echo finish
Pause