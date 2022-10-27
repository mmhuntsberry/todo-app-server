DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  todo VARCHAR(255) NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO todos
VALUES (
	null,
    'Walk fish',
    '1'
  );