from flask import Flask, jsonify, request
from flask_cors import CORS
import posts


# create the app
app = Flask(__name__)
CORS(app)


@app.route('/api/get_posts', methods=['GET'])
def get_posts():
    all_posts = posts.get_posts()
    return jsonify(all_posts=all_posts)


@app.route('/api/create_post', methods=['POST'])
def create_post():
    data = request.get_json()
    success = posts.create_post(data)
    return jsonify(success=success)


if __name__ == '__main__':
    app.run(debug=True)