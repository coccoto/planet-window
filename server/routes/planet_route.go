package routes

import (
	"planet-window/handlers"

	"github.com/go-chi/chi/v5"
)

func SetupPlanetRouter(router *chi.Mux) {
	router.Get("/api/planet", handlers.GetPlanet)
}
