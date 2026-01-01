FROM golang:1.24-bookworm

# OS をセットアップ
RUN apt update && apt full-upgrade -y && apt autoremove -y && apt clean

WORKDIR /app/server

# 依存関係をインストール
COPY ./go.mod ./go.sum ./
RUN go mod download

# プログラムをコンテナにコピー
COPY ./ ./

# アプリケーションをビルド
RUN go build -o ./dist/app

# GitHub リポジトリ連携
LABEL org.opencontainers.image.source=https://github.com/coccoto/planet-window

# アプリケーションを実行
CMD ["./dist/app"]
