package main

import (
	"log"
	"net/http"
	"planet-window/core"
	"planet-window/routes"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
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
    // CORS ヘッダーを設定する
	router.Use(cors.Handler(cors.Options{
        AllowedOrigins: []string{"http://localhost:18050"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	}))

	// ルーティングを設定する
	routes.SetupPlanetRouter(router)

	// HTTP サーバーを起動する
	const PORT string = ":18040"
	http.ListenAndServe(PORT, router)
}
