package core

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"planet-window/models"
)

func InitDB() {
	var dsn string = fmt.Sprintf("%s:%s@tcp(%s)/%s",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_DATABASE"))

	var db *gorm.DB
	var err error
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database. Error: " + err.Error())
	}

	log.Printf("Connection to the database was successful. Host: %s User: %s Database: %s",
		os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_DATABASE"))

	// migration
	if err := db.AutoMigrate(&models.MstPlanet{}); err != nil {
		log.Fatal("Failed to migrate database. Error: " + err.Error())
	}
}
