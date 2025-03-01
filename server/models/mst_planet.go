package models

import "time"

type MstPlanet struct {
	PlanetCode int `gorm:"primaryKey"`
	PlanetName string
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
}
