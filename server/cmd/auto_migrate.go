package main

import (
	"planet-window/core"
	"planet-window/seeds"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		core.GetLogger().Error("Failed to load .env")
	}
	// マイグレーションを実行する
	core.AutoMigrate()
	// シードデータを追加する
	seeds.SeedMstPlanet(core.GetDB())
}
