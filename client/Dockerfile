FROM node:24-bookworm

# OS をセットアップ
RUN apt update && apt full-upgrade -y && apt autoremove -y && apt clean

WORKDIR /app/client

# 依存関係をインストール
COPY ./package*.json ./
RUN npm ci

# プログラムをコンテナにコピー
COPY ./ ./

# アプリケーションをビルド
RUN npm run release

# アプリケーションを実行
CMD ["npm", "run", "start"]
