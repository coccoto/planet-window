package models

import (
	"time"
)

type MstSetting struct {
	SettingName string `gorm:"primaryKey"`
	SettingValue string `gorm:"not null"`
	CreatedAt time.Time `gorm:"autoCreateTime; not null"`
	UpdatedAt time.Time `gorm:"autoUpdateTime; not null"`
}

func (MstSetting) TableName() string {
    return "mst_setting"
}
