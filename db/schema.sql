\c postgres
DROP DATABASE IF EXISTS movie_db;

CREATE DATABASE movie_db;

\c movie_db

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  movie_name VARCHAR(100)
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER NOT NULL,
  review TEXT NOT NULL,
  FOREIGN KEY (movie_id)
  REFERENCES movies(id)
  ON DELETE CASCADE
);
