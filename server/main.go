package main

import (
	"log"
	"net/http"
	"planet-window/core"
	"planet-window/routes"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("The .env file is not configured.")
	}

	// データベースを初期化する
	core.InitDB()

	// ルーターを初期化する
	router := chi.NewRouter()

	// ミドルウェアを設定する
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)

	// ルーティングを設定する
	routes.SetupMoonRouter(router)

	// HTTP サーバーを起動する
	http.ListenAndServe(":3000", router)
	log.Println("3000")
}
