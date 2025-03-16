package handlers

import (
	"encoding/json"
	"net/http"
	"planet-window/core"
	"planet-window/dto"
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

func getPlanetData() ([]models.MstPlanet, error) {
	var mstPlanets []models.MstPlanet
	err := core.GetDB().Find(&mstPlanets).Error
	return mstPlanets, err
}

func GetPlanet(responseWriter http.ResponseWriter, request *http.Request) {
	// JSON ヘッダーを設定する
	responseWriter.Header().Set("Content-Type", "application/json")

	// データを取得する
	var mstPlanets, err = getPlanetData()
	if err != nil {
		responseWriter.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(responseWriter).Encode(dto.Response{
			Status: "error",
			Data: nil,
		})
		return
	}
	// データを整形して返す
	result := make(map[string]PlanetData)
	for _, planet := range mstPlanets {
		result[planet.PlanetName] = PlanetData{
			PlanetId: planet.PlanetId,
			PlanetName: planet.PlanetName,
			PlanetRadius: planet.PlanetRadius,
			RotationSpeed: planet.RotationSpeed,
			OrbitSpeed: planet.OrbitSpeed,
			OrbitRadius: planet.OrbitRadius,
		}
	}
	responseWriter.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(responseWriter).Encode(dto.Response{
		Status: "success",
		Data: result,
	}); err != nil {
		responseWriter.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(responseWriter).Encode(dto.Response{
			Status: "error",
			Data: nil,
		})
	}
}
