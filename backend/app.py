from flask import Flask
from routes.auth import auth_bp
from routes.trips import trips_bp

app = Flask(__name__)

app.register_blueprint(auth_bp)
app.register_blueprint(trips_bp)

@app.route("/")
def home():
    return "VoyageAI Backend Running"

if __name__ == "__main__":
    app.run(debug=True)