from flask import Blueprint, request, jsonify
from database.db import get_db_connection

itinerary_bp = Blueprint("itinerary", __name__)


@itinerary_bp.route("/create-itinerary", methods=["POST"])
def create_itinerary():

    conn = None
    cursor = None

    try:
        # Step 1: Receive JSON
        data = request.get_json()

        if not data:
            return jsonify({
                "message": "No data received"
            }), 400

        # Step 2: Extract Fields
        trip_id = data.get("trip_id")
        day_number = data.get("day_number")
        activity = data.get("activity")
        activity_time = data.get("activity_time")
        location = data.get("location")

        # Step 3: Validate Required Fields
        if not trip_id or not day_number or not activity or not activity_time:
            return jsonify({
                "message": "Trip ID, Day Number, Activity and Activity Time are required"
            }), 400

        # Step 4: Connect Database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Step 5: Check Trip Exists
        query = "SELECT trip_id FROM trips WHERE trip_id=%s"
        cursor.execute(query, (trip_id,))
        trip = cursor.fetchone()

        if not trip:
            return jsonify({
                "message": "Trip not found"
            }), 404

        # Step 6: Insert Itinerary
        insert_query = """
        INSERT INTO itinerary
        (
            trip_id,
            day_number,
            activity,
            activity_time,
            location
        )
        VALUES
        (
            %s, %s, %s, %s, %s
        )
        """

        cursor.execute(
            insert_query,
            (
                trip_id,
                day_number,
                activity,
                activity_time,
                location
            )
        )

        conn.commit()

        return jsonify({
            "message": "Itinerary Created Successfully"
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
            
@itinerary_bp.route("/itinerary/<int:trip_id>", methods=["GET"])
def get_itinerary(trip_id):

    conn = None
    cursor = None

    try:

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT *
        FROM itinerary
        WHERE trip_id=%s
        ORDER BY day_number, activity_time
        """

        cursor.execute(query, (trip_id,))
        itinerary = cursor.fetchall()

        if not itinerary:
            return jsonify({
                "message": "No itinerary found"
            }), 404
        for item in itinerary:
            if item["activity_time"]:
                item["activity_time"] = str(item["activity_time"])

        return jsonify(itinerary), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()
            
@itinerary_bp.route("/itinerary-item/<int:itinerary_id>", methods=["GET"])
def get_itinerary_item(itinerary_id):

    conn = None
    cursor = None

    try:

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT *
        FROM itinerary
        WHERE itinerary_id = %s
        """

        cursor.execute(query, (itinerary_id,))
        itinerary = cursor.fetchone()

        if not itinerary:
            return jsonify({
                "message": "Itinerary item not found"
            }), 404

        # Convert TIME to string
        if itinerary["activity_time"]:
            itinerary["activity_time"] = str(itinerary["activity_time"])

        return jsonify(itinerary), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()
            
@itinerary_bp.route("/itinerary/<int:itinerary_id>", methods=["PUT"])
def update_itinerary(itinerary_id):

    conn = None
    cursor = None

    try:

        data = request.get_json()

        day_number = data.get("day_number")
        activity = data.get("activity")
        activity_time = data.get("activity_time")
        location = data.get("location")

        if not day_number or not activity or not activity_time:
            return jsonify({
                "message": "Day Number, Activity and Activity Time are required"
            }), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM itinerary WHERE itinerary_id=%s",
            (itinerary_id,)
        )

        itinerary = cursor.fetchone()

        if not itinerary:
            return jsonify({
                "message": "Itinerary item not found"
            }), 404

        update_query = """
        UPDATE itinerary
        SET
            day_number=%s,
            activity=%s,
            activity_time=%s,
            location=%s
        WHERE itinerary_id=%s
        """

        cursor.execute(
            update_query,
            (
                day_number,
                activity,
                activity_time,
                location,
                itinerary_id
            )
        )

        conn.commit()

        return jsonify({
            "message": "Itinerary Updated Successfully"
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
            
@itinerary_bp.route("/itinerary/<int:itinerary_id>", methods=["DELETE"])
def delete_itinerary(itinerary_id):

    conn = None
    cursor = None

    try:

        # Connect to Database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Check if itinerary exists
        query = """
        SELECT *
        FROM itinerary
        WHERE itinerary_id = %s
        """

        cursor.execute(query, (itinerary_id,))
        itinerary = cursor.fetchone()

        if not itinerary:
            return jsonify({
                "message": "Itinerary not found"
            }), 404

        # Delete itinerary
        delete_query = """
        DELETE FROM itinerary
        WHERE itinerary_id = %s
        """

        cursor.execute(delete_query, (itinerary_id,))

        # Save changes
        conn.commit()

        return jsonify({
            "message": "Itinerary Deleted Successfully"
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