CREATE DATABASE voyageai;
USE voyageai;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trips (
    trip_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    source VARCHAR(100),
    destination VARCHAR(100),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2),
    travelers INT,
    travel_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE destinations (
    destination_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    place_name VARCHAR(150),
    description TEXT,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    rating FLOAT,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id)
);

CREATE TABLE itinerary (
    itinerary_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    day_number INT,
    activity VARCHAR(255),
    activity_time TIME,
    location VARCHAR(150),
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id)
);

CREATE TABLE expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    category VARCHAR(100),
    amount DECIMAL(10,2),
    description TEXT,
    expense_date DATE,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id)
);

CREATE TABLE saved_trips (
    saved_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    trip_id INT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id)
);
