package core

import (
	"fmt"
	"log"
	"os"
	"sync"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"planet-window/models"
)

var (
	db *gorm.DB
	onceDb sync.Once
)

func InitDB() {
	onceDb.Do(func() {
		var err error

		dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true&loc=Local",
			os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_HOST"), os.Getenv("DB_DATABASE"),
		)

		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err != nil {
			log.Fatalf("Failed to connect to the database. Host: %s, User: %s, Database: %s. Error: %v",
				os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_DATABASE"),
				err,
			)
		}

		log.Printf("Connected to the database. Host: %s, User: %s, Database: %s",
			os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_DATABASE"),
		)
	})
}

func GetDB() *gorm.DB {
	if db == nil {
		log.Fatal("Database not initialized. Call InitDB() before using GetDB().")
	}
	return db
}

func AutoMigrate() {
	if err := GetDB().AutoMigrate(
		&models.MstPlanet{},
	); err != nil {
		log.Fatalf("Failed to migrate the database. Host: %s, User: %s, Database: %s. Error: %v",
			os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_DATABASE"),
			err,
		)
	}
}
