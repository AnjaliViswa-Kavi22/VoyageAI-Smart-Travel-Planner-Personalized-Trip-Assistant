from flask import Blueprint, request, jsonify
from database.db import get_db_connection

auth_bp = Blueprint("auth", __name__)

# -------------------------------
# Register User API
# -------------------------------
@auth_bp.route("/register-user", methods=["POST"])
def register_user():
    conn = None
    cursor = None

    try:
        # Get JSON data
        data = request.get_json()

        if not data:
            return jsonify({
                "message": "No data received"
            }), 400

        firebase_uid = data.get("firebase_uid")
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")

        # Validate required fields
        if not firebase_uid or not name or not email:
            return jsonify({
                "message": "Required fields are missing"
            }), 400

        # Connect to database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Check Firebase UID
        cursor.execute(
            "SELECT id FROM users WHERE firebase_uid = %s",
            (firebase_uid,)
        )

        if cursor.fetchone():
            return jsonify({
                "message": "Firebase UID already exists"
            }), 409

        # Check Email
        cursor.execute(
            "SELECT id FROM users WHERE email = %s",
            (email,)
        )

        if cursor.fetchone():
            return jsonify({
                "message": "Email already registered"
            }), 409

        # Insert User
        insert_query = """
        INSERT INTO users (firebase_uid, name, email, phone)
        VALUES (%s, %s, %s, %s)
        """

        cursor.execute(insert_query, (
            firebase_uid,
            name,
            email,
            phone
        ))

        conn.commit()

        return jsonify({
            "message": "User Registered Successfully"
        }), 201

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# -------------------------------
# Get User API
# -------------------------------
@auth_bp.route("/user/<firebase_uid>", methods=["GET"])
def get_user(firebase_uid):
    conn = None
    cursor = None

    try:
        # Connect to database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Search user by Firebase UID
        query = """
        SELECT *
        FROM users
        WHERE firebase_uid = %s
        """

        cursor.execute(query, (firebase_uid,))

        user = cursor.fetchone()

        # User not found
        if not user:
            return jsonify({
                "message": "User not found"
            }), 404

        # Return user details
        return jsonify(user), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()