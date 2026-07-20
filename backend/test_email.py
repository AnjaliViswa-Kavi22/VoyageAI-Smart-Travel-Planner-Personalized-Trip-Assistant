import smtplib
from email.message import EmailMessage

EMAIL = "support.voyageai@gmail.com"
PASSWORD = "YOUR_16_CHARACTER_APP_PASSWORD"   # no spaces

msg = EmailMessage()
msg["Subject"] = "SMTP Test"
msg["From"] = EMAIL
msg["To"] = EMAIL
msg.set_content("Hello from VoyageAI!")

try:
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=30) as smtp:
        smtp.login(EMAIL, PASSWORD)
        smtp.send_message(msg)

    print("SUCCESS")

except Exception as e:
    print(e)