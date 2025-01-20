from flask import Flask, jsonify, request
from flask_cors import CORS
from database import SQL

# create the app
app = Flask(__name__)
CORS(app)

sql = SQL()

@app.route('/api/get_posts', methods=['GET'])
def get_posts():
    posts = sql.sql_read("SELECT * FROM posts")
    return jsonify(posts=posts)


@app.route('/api/create_post', methods=['POST'])
def create_post():
    data = request.get_json()
    print(data)
    return jsonify("ok")

if __name__ == '__main__':
    app.run(debug=True)