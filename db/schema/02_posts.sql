DROP TABLE if EXISTS pins CASCADE;

CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description VARCHAR(140) NOT NULL,
  content TEXT NOT NULL,
  tag_id INTEGER REFERENCES tags(id),
  created_at TIMESTAMP DEFAULT NOW(),
  url TEXT
);
