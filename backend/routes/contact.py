from flask import Blueprint, request, jsonify
from services.contact_service import send_contact_email

contact_bp = Blueprint("contact", __name__)


@contact_bp.route("/contact", methods=["POST"])
def contact():

    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone", "Not Provided")
        category = data.get("category", "General Question")
        subject = data.get("subject")
        message = data.get("message")

        # Validation
        if not name or not email or not subject or not message:
            return jsonify({
                "success": False,
                "message": "Please fill all required fields."
            }), 400

        # Add category to message
        full_message = f"""
Category: {category}

{message}
"""

        status = send_contact_email(
            name=name,
            email=email,
            phone=phone,
            subject=subject,
            message=full_message
        )

        if status in [200, 202]:
            return jsonify({
                "success": True,
                "message": "Message sent successfully."
            }), 200

        return jsonify({
            "success": False,
            "message": "Unable to send email."
        }), 500

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500