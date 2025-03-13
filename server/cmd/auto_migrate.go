package main

import (
	"log"
	"planet-window/core"
	"planet-window/seeds"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Failed to load .env")
	}
	// データベースを初期化する
	core.InitDB()

	// マイグレーションを実行する
	core.AutoMigrate()
	// シードデータを追加する
	seeds.SeedMstPlanet(core.GetDB())
}
