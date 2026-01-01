package core

import (
	"log/slog"
	"os"
	"sync"
)

var (
	logger *slog.Logger
	once   sync.Once
)

func GetLogger() *slog.Logger {
	once.Do(func() {
		logger = slog.New(slog.NewJSONHandler(os.Stdout, nil))
	})
	return logger
}
