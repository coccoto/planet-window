package routes

import (
	"planet-window/handlers"

	"github.com/go-chi/chi/v5"
)

func SetupMoonRouter(router *chi.Mux) {
	router.Get("/moon", handlers.GetMoon)
}
