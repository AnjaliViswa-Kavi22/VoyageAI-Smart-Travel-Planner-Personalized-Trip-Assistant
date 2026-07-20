import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ============================
# Database Configuration
# ============================

DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME")
}

# ============================
# SendGrid Configuration
# ============================

# SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")

# FROM_EMAIL = os.getenv("FROM_EMAIL")

# TO_EMAIL = os.getenv("TO_EMAIL")

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

# ============================
# Flask Configuration
# ============================

SECRET_KEY = os.getenv("SECRET_KEY")