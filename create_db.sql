# Create database script for Berties books

# Create the database
CREATE DATABASE IF NOT EXISTS berties_books;
USE berties_books;

# Create the tables
CREATE TABLE IF NOT EXISTS books (
    id     INT AUTO_INCREMENT,
    name   VARCHAR(50),
    price  DECIMAL(5, 2),
    PRIMARY KEY(id));

# Create the application user
CREATE USER IF NOT EXISTS 'berties_books_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON berties_books.* TO 'berties_books_app'@'localhost';

# Users table to store registered users (username, names, email, hashed password)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    hashedPassword VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

# Audit table to record login attempts (successful and failed)
CREATE TABLE IF NOT EXISTS audit (
    id INT AUTO_INCREMENT,
    username VARCHAR(50),
    success TINYINT(1) NOT NULL,
    event_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    message VARCHAR(255),
    PRIMARY KEY(id)
);
