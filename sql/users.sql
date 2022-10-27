DROP TABLE IF EXISTS users, usersAddress, usersContact;

CREATE TABLE users (
  -- id VARCHAR(255) PRIMARY KEY NOT NULL,
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users
VALUES (
	null,
    'Test',
    'test@test.com',
    'test123'
  );