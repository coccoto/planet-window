package models

import (
	"time"
)

type MstPlanet struct {
	PlanetId int `gorm:"primaryKey"` // 惑星ID
	PlanetName string `gorm:"not null"` // 惑星名
	PlanetRadius float64 `gorm:"not null"` // 半径
	RotationSpeed float64 `gorm:"not null"` // 自転速度
	OrbitSpeed float64 `gorm:"not null"` // 公転速度
	OrbitRadius float64 `gorm:"not null"` // 公転半径
	CreatedAt time.Time `gorm:"autoCreateTime; not null"`
	UpdatedAt time.Time `gorm:"autoUpdateTime; not null"`
}

func (MstPlanet) TableName() string {
    return "mst_planet"
}
