package seeds

import (
	"planet-window/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func SeedMstSetting(db *gorm.DB) {
	var planets []models.MstSetting = []models.MstSetting{
		{SettingName: "planetScaleFactor", SettingValue: "0.000001"},
	}

	db.Clauses(clause.OnConflict{
        Columns: [] clause.Column{{ Name: "setting_id" }},
        DoUpdates: clause.AssignmentColumns([] string{
            "setting_name", 
            "setting_value", 
        }),
    }).Create(&planets)
}
