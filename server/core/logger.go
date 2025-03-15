package core

import (
	"log/slog"
	"sync"
	"os"
	"gopkg.in/natefinch/lumberjack.v2"
)

var (
	logger *slog.Logger
	once sync.Once
)

func GetLogger() *slog.Logger {
	once.Do(initLogger)
	return logger
}

func initLogger() {
	logFile := &lumberjack.Logger{
		Filename: os.Getenv("LOG_FILE_PATH"),
		MaxSize: 1, // 最大サイズ (MB)
		MaxBackups: 10, // 最大バックアップファイル数
		Compress: true, // 圧縮
	}
	logger = slog.New(slog.NewJSONHandler(logFile, nil))
}
