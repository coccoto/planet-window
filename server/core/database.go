package core

import (
	"fmt"
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

func GetDB() *gorm.DB {
	onceDb.Do(initDB)
	return db
}

func initDB() {
	var err error

	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true&loc=Local",
		os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_HOST"), os.Getenv("DB_DATABASE"),
	)

	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		GetLogger().Error(fmt.Sprintf("Failed to connect to the database. Host: %s, User: %s, Database: %s. Error: %v",
			os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_DATABASE"),
			err,
		))
	}

	GetLogger().Info(fmt.Sprintf("Connected to the database. Host: %s, User: %s, Database: %s",
		os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_DATABASE"),
	))
}

func AutoMigrate() {
	if err := GetDB().AutoMigrate(
		&models.MstPlanet{},
	); err != nil {
		GetLogger().Error(fmt.Sprintf("Failed to migrate the database. Host: %s, User: %s, Database: %s. Error: %v",
			os.Getenv("DB_HOST"), os.Getenv("DB_USER"), os.Getenv("DB_DATABASE"),
			err,
		))
	}
}
