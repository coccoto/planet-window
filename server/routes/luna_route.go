package routes

import (
	"github.com/go-chi/chi/v5"
	"spaceweather/handlers"
)

func SetupLunaRouter(router *chi.Mux) {
	router.Get("/luna/weather", handlers.GetLunaWeather)
}
