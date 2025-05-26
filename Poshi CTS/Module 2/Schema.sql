CREATE DATABASE IF NOT EXISTS EVENTMANAGEMENTSYSTEM;
USE EVENTMANAGEMENTSYSTEM;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    city VARCHAR(100) NOT NULL,
    registration_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS Events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    city VARCHAR(100) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    status ENUM('upcoming', 'completed', 'cancelled') DEFAULT 'upcoming',
    organizer_id INT,
    FOREIGN KEY (organizer_id) REFERENCES Users(user_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    CHECK (start_date < end_date)
);

-- 3. Sessions Table
CREATE TABLE IF NOT EXISTS Sessions (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    speaker_name VARCHAR(100) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CHECK (start_time < end_time)
);

-- 4. Registrations Table
CREATE TABLE IF NOT EXISTS Registrations (
    registration_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE (user_id, event_id)
);

-- 5. Feedback Table
CREATE TABLE IF NOT EXISTS Feedback (
    feedback_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    feedback_date DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 6. Resources Table
CREATE TABLE IF NOT EXISTS Resources (
    resource_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    resource_type ENUM('pdf', 'image', 'link') NOT NULL,
    resource_url VARCHAR(255) NOT NULL,
    uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES Events(event_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
