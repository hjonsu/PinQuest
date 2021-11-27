DROP TABLE if EXISTS posts CASCADE;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description VARCHAR(140) NOT NULL,
  content_type TEXT NOT NULL,
  content TEXT NOT NULL,
  tag VARCHAR(140) NOT NULL
);

--repeating columns ratings and comments, should just join to get the relevant information
