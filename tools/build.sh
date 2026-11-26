#!/bin/sh
# 上傳前執行：把 app.js、data.js、style.css 壓成精簡版（.min），網頁會讀精簡版
# 改程式時改原本的 app.js／data.js／style.css，改完再跑一次這個檔
set -e
cd "$(dirname "$0")/.."
E=${ESBUILD:-/opt/npm-tools/node_modules/@esbuild/linux-x64/bin/esbuild}
$E js/app.js  --minify --target=es2019 --charset=utf8 --outfile=js/app.min.js  --log-level=warning
$E js/data.js --minify --target=es2019 --charset=utf8 --outfile=js/data.min.js --log-level=warning
$E css/style.css --minify --charset=utf8 --outfile=css/style.min.css --log-level=warning
echo "精簡版已更新"
