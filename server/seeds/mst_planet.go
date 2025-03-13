package seeds

import (
	"planet-window/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func SeedMstPlanet(db *gorm.DB) {

	const sunPlanetRadiusScale = 1.0 / 50000.0
	const otherPlanetRadiusScale = 1.0 / 10000.0
	const rotationSpeedScale = 1.0
	const orbitSpeedScale = 1.0 / 100000.0
	const orbitRadiusScale = 1.0 / 1000000.0
	const moonOrbitRadiusScale = 1.0 / 100000.0

	var planets []models.MstPlanet = []models.MstPlanet{
		{
			PlanetId: 1,
			PlanetName: "sun",
			PlanetRadius: 696340.00 * sunPlanetRadiusScale,
			RotationSpeed: 25.05 * rotationSpeedScale,
			OrbitSpeed: 0.00 * orbitSpeedScale,
			OrbitRadius: 0.00 * orbitRadiusScale,
		},
		{
			PlanetId: 2,
			PlanetName: "mercury",
			PlanetRadius: 2439.70 * otherPlanetRadiusScale,
			RotationSpeed: 58.65 * rotationSpeedScale,
			OrbitSpeed: 47.36 * orbitSpeedScale,
			OrbitRadius: 57910000.00 * orbitRadiusScale,
		},
		{
			PlanetId: 3,
			PlanetName: "venus",
			PlanetRadius: 6051.80 * otherPlanetRadiusScale,
			RotationSpeed: -243.02 * rotationSpeedScale,
			OrbitSpeed: 35.02 * orbitSpeedScale,
			OrbitRadius: 108200000.00 * orbitRadiusScale,
		},
		{
			PlanetId: 4,
			PlanetName: "earth",
			PlanetRadius: 6378.14 * otherPlanetRadiusScale,
			RotationSpeed: 1.00 * rotationSpeedScale,
			OrbitSpeed: 29.78 * orbitSpeedScale,
			OrbitRadius: 149600000.00 * orbitRadiusScale,
		},
		{
			PlanetId: 5,
			PlanetName: "moon",
			PlanetRadius: 1737.40 * otherPlanetRadiusScale,
			RotationSpeed: 27.32 * rotationSpeedScale,
			OrbitSpeed: 1.02 * orbitSpeedScale,
			OrbitRadius: 384400.00 * moonOrbitRadiusScale,
		},
		{
			PlanetId: 6,
			PlanetName: "mars",
			PlanetRadius: 3396.20 * otherPlanetRadiusScale,
			RotationSpeed: 1.03 * rotationSpeedScale,
			OrbitSpeed: 24.08 * orbitSpeedScale,
			OrbitRadius: 227940000.00 * orbitRadiusScale,
		},
		{
			PlanetId: 7,
			PlanetName: "jupiter",
			PlanetRadius: 71492.00 * otherPlanetRadiusScale,
			RotationSpeed: 0.41 * rotationSpeedScale,
			OrbitSpeed: 13.07 * orbitSpeedScale,
			OrbitRadius: 778330000.00 * orbitRadiusScale,
		},
		{
			PlanetId: 8,
			PlanetName: "saturn",
			PlanetRadius: 60268.00 * otherPlanetRadiusScale,
			RotationSpeed: 0.45 * rotationSpeedScale,
			OrbitSpeed: 9.68 * orbitSpeedScale,
			OrbitRadius: 1433500000.00 * orbitRadiusScale,
		},
		{
			PlanetId: 9,
			PlanetName: "uranus",
			PlanetRadius: 25559.00 * otherPlanetRadiusScale,
			RotationSpeed: -0.72 * rotationSpeedScale,
			OrbitSpeed: 6.80 * orbitSpeedScale,
			OrbitRadius: 2872500000.00 * orbitRadiusScale,
		},
		{
			PlanetId: 10,
			PlanetName: "neptune",
			PlanetRadius: 24764.00 * otherPlanetRadiusScale,
			RotationSpeed: 0.67 * rotationSpeedScale,
			OrbitSpeed: 5.43 * orbitSpeedScale,
			OrbitRadius: 4495100000.00 * orbitRadiusScale,
		},
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
