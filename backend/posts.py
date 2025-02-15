from database import leshya_sql

POST_TYPES ={
  # "IMAGE": "image",
  "TEXT": "text",
  # "AUDIO": "audio"
}

ACTIVE_POST_TYPES = ["TEXT"]


def get_posts():
  return leshya_sql.sql_read(
    """
      SELECT 
        posts.id, 
        posts.title, 
        posts.subtitle, 
        posts.time_created, 
        users.username, 
        users.profile_image_url
      FROM posts
      INNER JOIN users 
      ON posts.firebase_uid = users.firebase_uid
      ORDER BY posts.time_created DESC
    """
  )

def create_post(post):
    leshya_sql.sql_write(
      "INSERT INTO posts ( "
      "  id, "
      "  firebase_uid, "
      "  title, "
      "  subtitle, "
      "  time_created "
      ") "
      "VALUES "
      f"('{post['id']}', "
      f"'{post['firebase_uid']}', "
      f"'{post['title']}', "
      f"'{post['subtitle']}', "
      f"'{post['time_created']}')"
    )
    return True

def get_posts_by_user(firebase_uid):
  rows = leshya_sql.sql_read(
    f"SELECT * FROM posts "
    # f"WHERE firebase_uid = '{firebase_uid}' "
    f"ORDER BY time_created DESC"
  )

  if not rows:
    return []
  
  return rows

