CREATE TABLE IF NOT EXISTS  users (
    userId serial PRIMARY KEY,
    userNames varchar(25) NOT NULL,
    passwords varchar(50)
);

CREATE TABLE IF NOT EXISTS habits (
    userId int PRIMARY KEY, 
    habit varchar(100) NOT NULL,
    selectedDays int[],
    streak int, 
    startDate date,
    latestDate date
);
