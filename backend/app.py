from flask import Flask
from flask_cors import CORS

from config import SECRET_KEY

from routes.auth import auth_bp
from routes.trips import trips_bp
from routes.destinations import destinations_bp
from routes.itinerary import itinerary_bp
from routes.expenses import expenses_bp
from routes.contact import contact_bp

app = Flask(__name__)

# Secret Key
app.config["SECRET_KEY"] = SECRET_KEY

# Enable CORS
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(trips_bp)
app.register_blueprint(destinations_bp)
app.register_blueprint(itinerary_bp)
app.register_blueprint(expenses_bp)
app.register_blueprint(contact_bp)

@app.route("/")
def home():
    return {
        "status": "success",
        "message": "VoyageAI Backend Running 🚀"
    }

if __name__ == "__main__":
    app.run(debug=True)