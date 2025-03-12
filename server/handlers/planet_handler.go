package handlers

import (
	"encoding/json"
	"net/http"
	"planet-window/core"
	"planet-window/models"
	"strconv"
)

func GetPlanet(responseWriter http.ResponseWriter, request *http.Request) {
	// JSONヘッダーを設定
	responseWriter.Header().Set("Content-Type", "application/json")

	var mstPlanets []models.MstPlanet
	if err := core.DB.Find(&mstPlanets).Error; err != nil {
		return
	}
	var mstSettings models.MstSetting
	if err := core.DB.Where("setting_name = ?", "planetScaleFactor").First(&mstSettings).Error; err != nil {
		return
	}

	for index := range mstPlanets {
		planetScaleFactor, err := strconv.ParseFloat(mstSettings.SettingValue, 64)
		if err != nil {
			return
		}
		// 惑星の半径を調整する
		mstPlanets[index].PlanetRadius = mstPlanets[index].PlanetRadius * planetScaleFactor
		// 惑星の軌道半径を調整する
		mstPlanets[index].OrbitRadius = mstPlanets[index].OrbitRadius * planetScaleFactor
	}
	result := mstPlanets
	if err := json.NewEncoder(responseWriter).Encode(result); err != nil {
		return
	}
}
