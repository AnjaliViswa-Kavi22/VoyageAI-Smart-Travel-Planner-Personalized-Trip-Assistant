from flask import Blueprint, request, jsonify
from database.db import get_db_connection

trips_bp = Blueprint("trips", __name__)

@trips_bp.route("/create-trip", methods=["POST"])
def create_trip():

    conn = None
    cursor = None

    try:
        # Step 1: Receive JSON data
        data = request.get_json()

        if not data:
            return jsonify({
                "message": "No data received"
            }), 400

        # Step 2: Extract data
        user_id = data.get("user_id")
        source = data.get("source")
        destination = data.get("destination")
        start_date = data.get("start_date")
        end_date = data.get("end_date")
        budget = data.get("budget")
        travelers = data.get("travelers")
        travel_type = data.get("travel_type")

        # Step 3: Validate required fields
        if not user_id or not source or not destination:
            return jsonify({
                "message": "User ID, Source and Destination are required"
            }), 400

        # Step 4: Connect to MySQL
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Step 5: Check whether user exists
        query = "SELECT id FROM users WHERE id = %s"
        cursor.execute(query, (user_id,))
        user = cursor.fetchone()

        if not user:
            return jsonify({
                "message": "User not found"
            }), 404

        # Step 6: Insert trip into database
        insert_query = """
        INSERT INTO trips
        (
            user_id,
            source,
            destination,
            start_date,
            end_date,
            budget,
            travelers,
            travel_type
        )
        VALUES
        (
            %s, %s, %s, %s, %s, %s, %s, %s
        )
        """

        cursor.execute(
            insert_query,
            (
                user_id,
                source,
                destination,
                start_date,
                end_date,
                budget,
                travelers,
                travel_type
            )
        )

        # Step 7: Save changes
        conn.commit()

        # Step 8: Success response
        return jsonify({
            "message": "Trip Created Successfully"
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
            
            
@trips_bp.route("/trips/<int:user_id>", methods=["GET"])
def get_trips(user_id):

    conn = None
    cursor = None

    try:

        # Step 1: Connect to MySQL
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Step 2: SQL Query
        query = """
        SELECT *
        FROM trips
        WHERE user_id = %s
        """

        # Step 3: Execute Query
        cursor.execute(query, (user_id,))

        # Step 4: Fetch all trips
        trips = cursor.fetchall()

        # Step 5: Return trips
        return jsonify(trips), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()
            
@trips_bp.route("/trip/<int:trip_id>", methods=["GET"])
def get_trip(trip_id):

    conn = None
    cursor = None

    try:

        # Step 1: Connect to MySQL
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Step 2: SQL Query
        query = """
        SELECT *
        FROM trips
        WHERE trip_id = %s
        """

        # Step 3: Execute Query
        cursor.execute(query, (trip_id,))

        # Step 4: Fetch one trip
        trip = cursor.fetchone()

        # Step 5: Check if trip exists
        if not trip:
            return jsonify({
                "message": "Trip not found"
            }), 404

        # Step 6: Return trip
        return jsonify(trip), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()
            
@trips_bp.route("/trip/<int:trip_id>", methods=["PUT"])
def update_trip(trip_id):

    conn = None
    cursor = None

    try:

        # Step 1: Receive JSON data
        data = request.get_json()

        if not data:
            return jsonify({
                "message": "No data received"
            }), 400

        # Step 2: Extract data
        source = data.get("source")
        destination = data.get("destination")
        start_date = data.get("start_date")
        end_date = data.get("end_date")
        budget = data.get("budget")
        travelers = data.get("travelers")
        travel_type = data.get("travel_type")

        # Step 3: Connect to MySQL
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Step 4: Check if trip exists
        query = "SELECT trip_id FROM trips WHERE trip_id = %s"
        cursor.execute(query, (trip_id,))
        trip = cursor.fetchone()

        if not trip:
            return jsonify({
                "message": "Trip not found"
            }), 404

        # Step 5: Update trip
        update_query = """
        UPDATE trips
        SET
            source = %s,
            destination = %s,
            start_date = %s,
            end_date = %s,
            budget = %s,
            travelers = %s,
            travel_type = %s
        WHERE trip_id = %s
        """

        cursor.execute(
            update_query,
            (
                source,
                destination,
                start_date,
                end_date,
                budget,
                travelers,
                travel_type,
                trip_id
            )
        )

        # Step 6: Save changes
        conn.commit()

        # Step 7: Success response
        return jsonify({
            "message": "Trip Updated Successfully"
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
            
@trips_bp.route("/trip/<int:trip_id>", methods=["DELETE"])
def delete_trip(trip_id):

    conn = None
    cursor = None

    try:

        # Step 1: Connect to MySQL
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Step 2: Check whether the trip exists
        query = "SELECT trip_id FROM trips WHERE trip_id = %s"
        cursor.execute(query, (trip_id,))
        trip = cursor.fetchone()

        if not trip:
            return jsonify({
                "message": "Trip not found"
            }), 404

        # Step 3: Delete the trip
        delete_query = "DELETE FROM trips WHERE trip_id = %s"
        cursor.execute(delete_query, (trip_id,))

        # Step 4: Save changes
        conn.commit()

        # Step 5: Success response
        return jsonify({
            "message": "Trip Deleted Successfully"
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