TRUNCATE users RESTART IDENTITY;

INSERT INTO users (username, email, password_digest)
VALUES
('Testy', 'test@testy.com', 'password'),
('Testo', 'test@testo.com', 'wordword');