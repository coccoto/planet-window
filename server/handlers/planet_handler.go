package handlers

import (
	"encoding/json"
	"net/http"
	"planet-window/core"
	"planet-window/models"
)

type PlanetData struct {
    PlanetId int `json:"planetId"`
	PlanetName string `json:"planetName"`
    PlanetRadius float64 `json:"planetRadius"`
    RotationSpeed float64 `json:"rotationSpeed"`
    OrbitSpeed float64 `json:"orbitSpeed"`
    OrbitRadius float64 `json:"orbitRadius"`
}

func GetPlanet(responseWriter http.ResponseWriter, request *http.Request) {
	// JSON ヘッダーを設定する
	responseWriter.Header().Set("Content-Type", "application/json")

	result := make(map[string]PlanetData)

	var mstPlanets []models.MstPlanet
	if err := core.GetDB().Find(&mstPlanets).Error; err != nil {
		return
	}

	for index := range mstPlanets {
		planetData := PlanetData{
			PlanetId: mstPlanets[index].PlanetId,
			PlanetName: mstPlanets[index].PlanetName,
			PlanetRadius: mstPlanets[index].PlanetRadius,
			RotationSpeed: mstPlanets[index].RotationSpeed,
			OrbitSpeed: mstPlanets[index].OrbitSpeed,
			OrbitRadius: mstPlanets[index].OrbitRadius,
		}
		result[mstPlanets[index].PlanetName] = planetData
	}
	if err := json.NewEncoder(responseWriter).Encode(result); err != nil {
		return
	}
}
