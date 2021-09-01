TRUNCATE users, habits, track RESTART IDENTITY;

INSERT INTO users (username, email, password_digest)
VALUES
('Testy', 'test@testy.com', 'password'),
('Testo', 'test@testo.com', 'wordword');

INSERT INTO habits (username, habit, selectedDays)
VALUES  

    ('Testy', 'running a 5k', 6),
    ('Testy', 'going to the gym', [2,4,6]),
    ('Testo', 'waking up at 5', [1,2,3,4,5]);

INSERT INTO track (habitId, streak, date)
VALUES
    
    (1, 17, '01 Sep 2021'),
    (2, 12, '31 Aug 2021'),
    (3, 40, '01 Sep 2021');