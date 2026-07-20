from flask import Blueprint, request, jsonify
from database.db import get_db_connection

destinations_bp = Blueprint("destinations", __name__)


@destinations_bp.route("/create-destination", methods=["POST"])
def create_destination():

    conn = None
    cursor = None

    try:

        # Step 1: Receive JSON Data
        data = request.get_json()

        if not data:
            return jsonify({
                "message": "No data received"
            }), 400

        # Step 2: Extract Fields
        trip_id = data.get("trip_id")
        place_name = data.get("place_name")
        description = data.get("description")
        latitude = data.get("latitude")
        longitude = data.get("longitude")
        rating = data.get("rating")

        # Step 3: Validate Required Fields
        if not trip_id or not place_name:
            return jsonify({
                "message": "Trip ID and Place Name are required"
            }), 400

        # Step 4: Connect to Database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Step 5: Check Whether Trip Exists
        query = "SELECT trip_id FROM trips WHERE trip_id = %s"
        cursor.execute(query, (trip_id,))
        trip = cursor.fetchone()

        if not trip:
            return jsonify({
                "message": "Trip not found"
            }), 404

        # Step 6: Insert Destination
        insert_query = """
        INSERT INTO destinations
        (
            trip_id,
            place_name,
            description,
            latitude,
            longitude,
            rating
        )
        VALUES
        (
            %s, %s, %s, %s, %s, %s
        )
        """

        cursor.execute(
            insert_query,
            (
                trip_id,
                place_name,
                description,
                latitude,
                longitude,
                rating
            )
        )

        # Step 7: Save Changes
        conn.commit()

        # Step 8: Success Response
        return jsonify({
            "message": "Destination Created Successfully"
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
            
@destinations_bp.route("/destinations/<int:trip_id>", methods=["GET"])
def get_destinations(trip_id):

    conn = None
    cursor = None

    try:
        # Connect to Database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Get all destinations for the trip
        query = """
        SELECT *
        FROM destinations
        WHERE trip_id = %s
        """

        cursor.execute(query, (trip_id,))
        destinations = cursor.fetchall()

        # If no destinations found
        if not destinations:
            return jsonify({
                "message": "No destinations found for this trip"
            }), 404

        return jsonify(destinations), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@destinations_bp.route("/destination/<int:destination_id>", methods=["GET"])
def get_destination(destination_id):

    conn = None
    cursor = None

    try:
        # Connect to Database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Get destination by ID
        query = """
        SELECT *
        FROM destinations
        WHERE destination_id = %s
        """

        cursor.execute(query, (destination_id,))
        destination = cursor.fetchone()

        if not destination:
            return jsonify({
                "message": "Destination not found"
            }), 404

        return jsonify(destination), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()
            
@destinations_bp.route("/destination/<int:destination_id>", methods=["PUT"])
def update_destination(destination_id):

    conn = None
    cursor = None

    try:
        data = request.get_json()

        place_name = data.get("place_name")
        description = data.get("description")
        latitude = data.get("latitude")
        longitude = data.get("longitude")
        rating = data.get("rating")

        if not place_name:
            return jsonify({
                "message": "Place Name is required"
            }), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Check if destination exists
        query = "SELECT * FROM destinations WHERE destination_id=%s"
        cursor.execute(query, (destination_id,))
        destination = cursor.fetchone()

        if not destination:
            return jsonify({
                "message": "Destination not found"
            }), 404

        update_query = """
        UPDATE destinations
        SET
            place_name=%s,
            description=%s,
            latitude=%s,
            longitude=%s,
            rating=%s
        WHERE destination_id=%s
        """

        cursor.execute(
            update_query,
            (
                place_name,
                description,
                latitude,
                longitude,
                rating,
                destination_id
            )
        )

        conn.commit()

        return jsonify({
            "message": "Destination Updated Successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            
@destinations_bp.route("/destination/<int:destination_id>", methods=["DELETE"])
def delete_destination(destination_id):

    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM destinations WHERE destination_id=%s"
        cursor.execute(query, (destination_id,))
        destination = cursor.fetchone()

        if not destination:
            return jsonify({
                "message": "Destination not found"
            }), 404

        delete_query = "DELETE FROM destinations WHERE destination_id=%s"
        cursor.execute(delete_query, (destination_id,))

        conn.commit()

        return jsonify({
            "message": "Destination Deleted Successfully"
        }), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()