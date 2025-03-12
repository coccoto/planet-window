package seeds

import (
	"planet-window/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func SeedMstPlanet(db *gorm.DB) {
	var planets []models.MstPlanet = []models.MstPlanet{
		{PlanetId: 1, PlanetName: "sun", PlanetRadius: 695700, RotationSpeed: 609.12, OrbitSpeed: 0, OrbitRadius: 0},
		{PlanetId: 2, PlanetName: "mercury", PlanetRadius: 2439.7, RotationSpeed: 1407.6, OrbitSpeed: 47.87, OrbitRadius: 57.91},
		{PlanetId: 3, PlanetName: "venus", PlanetRadius: 6051.8, RotationSpeed: -5832.5, OrbitSpeed: 35.02, OrbitRadius: 108.2},
		{PlanetId: 4, PlanetName: "earth", PlanetRadius: 6371, RotationSpeed: 23.93, OrbitSpeed: 29.78, OrbitRadius: 149.6},
		{PlanetId: 5, PlanetName: "moon", PlanetRadius: 1737.4, RotationSpeed: 655.7, OrbitSpeed: 1.02, OrbitRadius: 0.384},
		{PlanetId: 6, PlanetName: "mars", PlanetRadius: 3389.5, RotationSpeed: 24.62, OrbitSpeed: 24.07, OrbitRadius: 227.9},
		{PlanetId: 7, PlanetName: "jupiter", PlanetRadius: 69911, RotationSpeed: 9.93, OrbitSpeed: 13.07, OrbitRadius: 778.5},
		{PlanetId: 8, PlanetName: "saturn", PlanetRadius: 58232, RotationSpeed: 10.66, OrbitSpeed: 9.69, OrbitRadius: 1434},
		{PlanetId: 9, PlanetName: "uranus", PlanetRadius: 25362, RotationSpeed: -17.24, OrbitSpeed: 6.81, OrbitRadius: 2871},
		{PlanetId: 10, PlanetName: "neptune", PlanetRadius: 24622, RotationSpeed: 16.11, OrbitSpeed: 5.43, OrbitRadius: 4495},
	}

	db.Clauses(clause.OnConflict{
        Columns: [] clause.Column{{ Name: "planet_id" }},
        DoUpdates: clause.AssignmentColumns([] string{
            "planet_name", 
            "planet_radius", 
            "rotation_speed", 
            "orbit_speed", 
            "orbit_radius",
        }),
    }).Create(&planets)
}
