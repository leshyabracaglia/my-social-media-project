from flask import Flask, jsonify, request
from flask_cors import CORS
import posts
import users


# create the app
app = Flask(__name__)
CORS(app)

# TODO: add docstrings to functions

@app.route('/api/get_posts', methods=['GET'])
def get_posts():
    all_posts = posts.get_posts()
    return jsonify(all_posts=all_posts)


@app.route('/api/create_post', methods=['POST'])
def create_post():
    data = request.get_json()
    success = posts.create_post(data)
    return jsonify(success=success)


@app.route('/api/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    print(data)
    users.create_user(data)
    return jsonify("ok")


@app.route('/api/is_username_taken', methods=['POST'])
def is_username_taken():
    data = request.get_json()
    username = data['username']
    is_taken = users.is_username_taken(username)
    return jsonify(is_taken=is_taken)


@app.route('/api/update_user', methods=['POST'])
def update_user():
    data = request.get_json()
    users.update_user(data)
    return jsonify("ok")


if __name__ == '__main__':
    app.run(debug=True)