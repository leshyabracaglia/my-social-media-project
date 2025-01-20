CREATE TABLE posts (
  id UUID PRIMARY KEY,
  firebase_uid TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  time_created TIMESTAMP
);

CREATE INDEX idx_firebase_uid ON posts(firebase_uid);