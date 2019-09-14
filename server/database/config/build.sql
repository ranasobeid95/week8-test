ROLLBACK;
BEGIN;

DROP TABLE IF EXISTS users,city CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE
);
CREATE TABLE city (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  country TEXT NOT NULL
);

INSERT INTO city (name, country) VALUES
  ('Gaza', 'Palestine'),
  ('London', 'UK'),
  ('New York', 'USA');
COMMIT;


  

