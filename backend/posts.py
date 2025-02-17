import uuid
from database import leshya_sql

POST_TYPES ={
  # "IMAGE": "image",
  "TEXT": "text",
  "RATING": "rating",
  # "AUDIO": "audio"
}

ACTIVE_POST_TYPES = ["TEXT", "RATING"]


def get_posts():
  return leshya_sql.sql_read(
    """
      SELECT 
        posts.id,
        posts.title, 
        posts.subtitle,
        posts.time_created, 
        users.username, 
        users.profile_image_url,
        COUNT(likes.post_id) AS likes_count
      FROM posts
      INNER JOIN users 
      ON posts.firebase_uid = users.firebase_uid
      LEFT JOIN likes
      ON posts.id = likes.post_id
      GROUP BY (posts.id, users.username, users.profile_image_url)
      ORDER BY posts.time_created DESC
    """
  )


def create_text_post(post):
    leshya_sql.sql_write(
      "INSERT INTO posts ( "
      "  id, "
      "  firebase_uid, "
      "  title, "
      "  subtitle, "
      "  time_created, "
      "  type "
      ") "
      "VALUES "
      f"('{post['id']}', "
      f"'{post['firebase_uid']}', "
      f"'{post['title']}', "
      f"'{post['subtitle']}', "
      f"'{post['time_created']}', "
      f"'{post['type']}')"
    )
    return True
   

def create_rating_post(post):
    rating_id = uuid.uuid4()
    leshya_sql.sql_write(
      "BEGIN;"
      "INSERT INTO posts ( "
      "  id, "
      "  firebase_uid, "
      "  title, "
      "  subtitle, "
      "  time_created, "
      "  type "
      ") "
      "VALUES ( "
      f"'{post['id']}', "
      f"'{post['firebase_uid']}', "
      f"'{post['title']}', "
      f"'{post['subtitle']}', "
      f"'{post['time_created']}', "
      f"'{post['type']}' "
      "); "
      "INSERT INTO ratings ( "
      "  rating_id, "
      "  post_id, "
      "  topic, "
      "  rating "
      ") "
      "VALUES ("
      f"'{rating_id}', "
      f"'{post['id']}', "
      f"'{post['topic']}', "
      f"'{post['rating']}' "
      ")"
      "COMMIT;"
    )


def create_post(post):
    if post['type'] == POST_TYPES['RATING']:
       return create_rating_post(post)

    return create_text_post(post)


def get_posts_by_user(firebase_uid):
  rows = leshya_sql.sql_read(
    "SELECT "
    "  posts.id, "
    "  posts.title, "
    "  posts.subtitle, "
    "  posts.time_created, "
    "  users.username, "
    "  users.profile_image_url "
    "FROM posts "
    "INNER JOIN users "
    "  ON posts.firebase_uid = users.firebase_uid "
    f"WHERE posts.firebase_uid = '{firebase_uid}' "
    "ORDER BY posts.time_created DESC"
  )

  if not rows:
    return []
  
  return rows

