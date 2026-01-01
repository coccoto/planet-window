FROM node:24-bookworm

# OS をセットアップ
RUN apt update && apt full-upgrade -y && apt autoremove -y && apt clean

WORKDIR /app/client

# 依存関係をインストール
COPY ./package*.json ./
RUN npm ci

# プログラムをコンテナにコピー
COPY ./ ./

# 環境変数を設定
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# アプリケーションをビルド
RUN npm run release

# アプリケーションを実行
CMD ["npm", "run", "start"]
