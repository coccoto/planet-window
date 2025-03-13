#!/bin/bash
set -eu

function runGoServer() {
    cd "$1"
    go run main.go || exit 1
}

function runNodeServer() {
    cd "$1"
    npm run start || exit 1
}

# 本スクリプトファイルのディレクトリをセットする
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

# server ディレクトリをセットする
SERVER_DIR="$SCRIPT_DIR/../server"
# client ディレクトリをセットする
CLIENT_DIR="$SCRIPT_DIR/../client"

# サーバーを並列実行する
runGoServer "$SERVER_DIR" &
runNodeServer "$CLIENT_DIR" &
