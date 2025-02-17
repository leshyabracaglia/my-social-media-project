from database import leshya_sql

def create_user(user_data):
  leshya_sql.sql_write(
      "INSERT INTO users ( "
      "  firebase_uid, "
      "  email, "
      "  time_created, "
      "  username "
      ") "
      "VALUES ( "
      f" '{user_data['firebase_uid']}', "
      f" '{user_data['email']}', "
      f" '{user_data['time_created']}', "
      f" '{user_data['username']}' "
      ")"
  )
    

def get_user(firebase_uid):
  return leshya_sql.sql_read(
    f"SELECT * FROM users WHERE firebase_uid = '{firebase_uid}'"
  )


def is_username_taken(username):
  rows = leshya_sql.sql_read(
    f"SELECT * FROM users WHERE username = '{username}'"
  )
  if rows and len(rows) > 0:
    return True
  return False


def update_user(user_data):
  leshya_sql.sql_write(
    "UPDATE users SET "
    f"  username = '{user_data['username']}', "
    f"  profile_image_url = '{user_data['profile_image_url']}' "
    f"WHERE firebase_uid = '{user_data['firebase_uid']}'"
  )
