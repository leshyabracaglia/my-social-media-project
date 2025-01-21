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
