package models

import (
	"time"
)

type MstPlanet struct {
	PlanetId int `gorm:"primaryKey"`
	PlanetName string `gorm:"not null"`
	PlanetRadius float64 `gorm:"not null"`
	RotationSpeed float64 `gorm:"not null"`
	OrbitSpeed float64 `gorm:"not null"`
	OrbitRadius float64 `gorm:"not null"`
	CreatedAt time.Time `gorm:"autoCreateTime; not null"`
	UpdatedAt time.Time `gorm:"autoUpdateTime; not null"`
}

func (MstPlanet) TableName() string {
    return "mst_planet"
}
