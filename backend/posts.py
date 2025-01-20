import uuid
from database import leshya_sql

POST_TYPES ={
  # "IMAGE": "image",
  "TEXT": "text",
  # "AUDIO": "audio"
}

ACTIVE_POST_TYPES = ["TEXT"]

# DEFAULT_POST = {
#     "id": uuid.uuid4(),
#     "title": "Default Post",
#     "subtitle": "This is a default post",
#     "author": "Default Author",
#     "date": "2024-01-01",
#     "type": "text"
# }


def get_posts():
    return leshya_sql.sql_read("SELECT * FROM posts")

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
