#!/bin/bash
set -eu

function runServer() {
    cd "$1"
    go run main.go || exit 1
}

# 本スクリプトファイルのディレクトリをセットする
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

# root ディレクトリをセットする
ROOT_DIR="$SCRIPT_DIR/.."

# サーバーを起動する
runServer "$ROOT_DIR"
