package routes

import (
	"planet-window/handlers"

	"github.com/go-chi/chi/v5"
)

func SetupLunaRouter(router *chi.Mux) {
	router.Get("/luna/weather", handlers.GetLunaWeather)
}
