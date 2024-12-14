CREATE DATABASE ghost_of_tsushima
use database ghost_of_tsushima

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Buat tabel user_profiles
CREATE TABLE user_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name VARCHAR(100),
    bio TEXT,
    birthday DATE,
    country VARCHAR(50),
    phone VARCHAR(20),
    profile_picture VARCHAR(255) DEFAULT 'assets/img/6522516.png',
    FOREIGN KEY (user_id) REFERENCES users(id)
);