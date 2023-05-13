CREATE DATABASE exercise_gym;
USE `exercise_gym`;

CREATE TABLE IF NOT EXISTS `exercise_gym`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `role` ENUM('admin', 'reader') NULL DEFAULT 'reader',
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `verificationCode` VARCHAR(64) NULL DEFAULT NULL,
  `verifiedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `exercise_gym`.`workout` (
  `id` INT UNSIGNED AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `description` VARCHAR(255),
  `image` CHAR(255) NOT NULL,
  `typology` VARCHAR(60),
  `muscle` VARCHAR(60),
  `likes_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
);


CREATE TABLE IF NOT EXISTS `exercise_gym`.`likes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `workout_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`workout_id`) REFERENCES `workout` (`id`)
);


