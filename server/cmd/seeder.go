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
		log.Fatal("The .env file is not configured.")
	}
	// データベースを初期化する
	core.InitDB()
	// シードデータを追加する
	seeds.SeedMstPlanet(core.DB)
}
