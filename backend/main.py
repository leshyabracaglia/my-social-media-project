from flask import Flask, jsonify
from flask_cors import CORS
import posts
import psycopg2
import json

conn = psycopg2.connect(
    database="postgres",
    user="leshya",
    password="password",
    host="0.0.0.0",
    port="5432",
)
cursor = conn.cursor()

# create the app
app = Flask(__name__)
CORS(app)


@app.route('/api/get_posts', methods=['GET'])
def get_posts():
    all_posts = posts.get_posts()
    return jsonify(posts=all_posts)


@app.route('/api/test_db')
def test_db():
    try:
        print(2)
        hi = cursor.execute("SELECT * FROM posts")
        print('hi', hi)
        # db.session.query(text('1')).from_statement(text('CREATE TABLE posts (id TEXT PRIMARY KEY, title TEXT, subtitle TEXT, author TEXT, date TEXT, type TEXT)')).all()
        return jsonify(hi=hi)
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

if __name__ == '__main__':
    app.run(debug=True)