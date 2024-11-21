from flask import Flask, jsonify
from flask_cors import CORS
import posts


app = Flask(__name__)
CORS(app)

@app.route('/api/get_posts', methods=['GET'])
def get_posts():
    all_posts = posts.get_posts()
    print('all_posts', all_posts)
    return jsonify({'posts': all_posts})

if __name__ == '__main__':
    app.run(debug=True)