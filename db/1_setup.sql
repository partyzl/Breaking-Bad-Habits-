CREATE TABLE IF NOT EXISTS  users (
    username varchar(25) NOT NULL UNIQUE,
    password_digest varchar(500),
    email varchar(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS habits (
    habitId serial UNIQUE,
    username varchar(25) NOT NULL,
    habit varchar(100) NOT NULL,
    selectedDays int ARRAY,
    FOREIGN KEY(username) references users(username)
);

CREATE TABLE IF NOT EXISTS track (
    habitId int,
    streak int NOT NULL,
    date date NOT NULL,
    FOREIGN KEY(habitId) references habits(habitId)
);
