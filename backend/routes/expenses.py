from flask import Blueprint, request, jsonify
from database.db import get_db_connection

expenses_bp = Blueprint("expenses", __name__)

@expenses_bp.route("/create-expense", methods=["POST"])
def create_expense():

    conn = None
    cursor = None

    try:
        # Step 1: Get JSON data
        data = request.get_json()

        if not data:
            return jsonify({
                "message": "No data received"
            }), 400

        # Step 2: Extract fields
        trip_id = data.get("trip_id")
        category = data.get("category")
        amount = data.get("amount")
        expense_date = data.get("expense_date")
        description = data.get("description")

        # Step 3: Validate required fields
        if not trip_id or not category or amount is None:
            return jsonify({
                "message": "Trip ID, Category and Amount are required"
            }), 400

        # Step 4: Connect to database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Step 5: Check if trip exists
        query = """
        SELECT trip_id
        FROM trips
        WHERE trip_id = %s
        """

        cursor.execute(query, (trip_id,))
        trip = cursor.fetchone()

        if not trip:
            return jsonify({
                "message": "Trip not found"
            }), 404

        # Step 6: Insert expense
        insert_query = """
        INSERT INTO expenses
        (
            trip_id,
            category,
            amount,
            expense_date,
            description
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
                category,
                amount,
                expense_date,
                description
            )
        )

        conn.commit()

        return jsonify({
            "message": "Expense Created Successfully"
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
            
@expenses_bp.route("/expenses/<int:trip_id>", methods=["GET"])
def get_expenses(trip_id):

    conn = None
    cursor = None

    try:

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT *
        FROM expenses
        WHERE trip_id = %s
        ORDER BY expense_date DESC, expense_id DESC
        """

        cursor.execute(query, (trip_id,))
        expenses = cursor.fetchall()

        if not expenses:
            return jsonify({
                "message": "No expenses found for this trip"
            }), 404

        # Convert Decimal values to float
        for expense in expenses:
            if expense["amount"] is not None:
                expense["amount"] = float(expense["amount"])

        return jsonify(expenses), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()
            
@expenses_bp.route("/expense/<int:expense_id>", methods=["GET"])
def get_expense(expense_id):

    conn = None
    cursor = None

    try:

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT *
        FROM expenses
        WHERE expense_id = %s
        """

        cursor.execute(query, (expense_id,))
        expense = cursor.fetchone()

        if not expense:
            return jsonify({
                "message": "Expense not found"
            }), 404

        # Convert Decimal to float
        if expense["amount"] is not None:
            expense["amount"] = float(expense["amount"])

        return jsonify(expense), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()
            
@expenses_bp.route("/expense/<int:expense_id>", methods=["PUT"])
def update_expense(expense_id):

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
        category = data.get("category")
        amount = data.get("amount")
        expense_date = data.get("expense_date")
        description = data.get("description")

        # Step 3: Validate Required Fields
        if not category or amount is None:
            return jsonify({
                "message": "Category and Amount are required"
            }), 400

        # Step 4: Connect Database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Step 5: Check Expense Exists
        check_query = """
        SELECT *
        FROM expenses
        WHERE expense_id = %s
        """

        cursor.execute(check_query, (expense_id,))
        expense = cursor.fetchone()

        if not expense:
            return jsonify({
                "message": "Expense not found"
            }), 404

        # Step 6: Update Expense
        update_query = """
        UPDATE expenses
        SET
            category = %s,
            amount = %s,
            expense_date = %s,
            description = %s
        WHERE expense_id = %s
        """

        cursor.execute(
            update_query,
            (
                category,
                amount,
                expense_date,
                description,
                expense_id
            )
        )

        conn.commit()

        return jsonify({
            "message": "Expense Updated Successfully"
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
            
@expenses_bp.route("/expense/<int:expense_id>", methods=["DELETE"])
def delete_expense(expense_id):

    conn = None
    cursor = None

    try:

        # Connect to Database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Check if expense exists
        check_query = """
        SELECT *
        FROM expenses
        WHERE expense_id = %s
        """

        cursor.execute(check_query, (expense_id,))
        expense = cursor.fetchone()

        if not expense:
            return jsonify({
                "message": "Expense not found"
            }), 404

        # Delete expense
        delete_query = """
        DELETE FROM expenses
        WHERE expense_id = %s
        """

        cursor.execute(delete_query, (expense_id,))

        # Save changes
        conn.commit()

        return jsonify({
            "message": "Expense Deleted Successfully"
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