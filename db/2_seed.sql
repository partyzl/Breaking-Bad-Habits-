INSERT INTO users (username, email, password_digest)
VALUES

    ('partyzl', 'parth@parth.com', 'password'),
    ('cerise-at', 'cerise@cerise.com', 'password'),
    ('abi-mcp', 'abi@abi.com', 'password'),
    ('kenneth-cwy', 'ken@ken.com', 'password'),
    ('sallan464', 'simon@simon.com', 'password');

INSERT INTO habits (username, habit, selectedDays)
VALUES  

    ('cerise-at', 'running a 5k', '{6}'),
    ('cerise-at', 'going to the gym', '{2,4,6}'),
    ('sallan464', 'waking up at 5', '{1,2,3,4,5}');

INSERT INTO track (habitId, streak, date)
VALUES
    
    (1, 17, '2021-09-01'),
    (2, 12, '2021-08-31'),
    (3, 40, '2021-09-01');