CREATE TABLE posts (
  id UUID PRIMARY KEY,
  firebase_uid TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  time_created TIMESTAMP,
  type TEXT
);

CREATE INDEX idx_firebase_uid ON posts(firebase_uid);

CREATE TABLE users (
  firebase_uid TEXT PRIMARY KEY,
  tagline TEXT,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  profile_image_url TEXT,
  time_created TIMESTAMP,
  username TEXT
)

CREATE TABLE likes (
  post_id UUID PRIMARY KEY,
  firebase_uid TEXT NOT NULL,
  time_liked TIMESTAMP
);

CREATE TABLE ratings (
  rating_id UUID PRIMARY KEY,
  post_id UUID,
  topic TEXT,
  rating INT
);
