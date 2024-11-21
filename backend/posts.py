import uuid

POST_TYPES ={
  "IMAGE": "image",
  "TEXT": "text",
  "AUDIO": "audio"
}

ACTIVE_POST_TYPES = ["TEXT"]

DEFAULT_POST = {
    "id": uuid.uuid4(),
    "title": "Default Post",
    "subtitle": "This is a default post",
    "author": "Default Author",
    "date": "2024-01-01",
    "type": "TEXT"
}

DEFAULT_POSTS = [DEFAULT_POST] * 3

def get_posts():
    return DEFAULT_POSTS
