package core

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"planet-window/models"
)

var DB *gorm.DB

func InitDB() {
	var err error

	var dsn string = fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_DATABASE"))

	if DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{}); err != nil {
		log.Fatal("Failed to connect to database. Error: " + err.Error())
	}

	log.Printf("Connection to the database was successful. Host: %s User: %s Database: %s",
		os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_DATABASE"))
}

func AutoMigrate() {
	// migration
	if err := DB.AutoMigrate(
		&models.MstPlanet{},
	); err != nil {
	log.Fatal("Failed to migrate database. Error: " + err.Error())
}
}


