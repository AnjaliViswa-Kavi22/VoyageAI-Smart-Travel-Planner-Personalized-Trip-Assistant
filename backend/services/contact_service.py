# from sendgrid import SendGridAPIClient
# from sendgrid.helpers.mail import Mail
# from config import SENDGRID_API_KEY, FROM_EMAIL, TO_EMAIL


# def send_contact_email(name, email, phone, subject, message):

#     html_content = f"""
#     <html>
#     <body>

#         <h2>📩 New Contact Form Submission</h2>

#         <p><strong>Name:</strong> {name}</p>
#         <p><strong>Email:</strong> {email}</p>
#         <p><strong>Phone:</strong> {phone}</p>
#         <p><strong>Subject:</strong> {subject}</p>

#         <hr>

#         <h3>Message</h3>

#         <p>{message}</p>

#     </body>
#     </html>
#     """

#     mail = Mail(
#         from_email=FROM_EMAIL,
#         to_emails=TO_EMAIL,
#         subject=f"VoyageAI Contact - {subject}",
#         html_content=html_content
#     )

#     mail.reply_to = email

#     try:
#         sg = SendGridAPIClient(SENDGRID_API_KEY)
#         response = sg.send(mail)
#         return response.status_code

#     except Exception as e:
#         print("SendGrid Error:", e)
#         return None

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from config import EMAIL_USER, EMAIL_PASSWORD


def send_contact_email(name, email, phone, subject, message):

    server = None

    try:

        print("===================================")
        print("Starting Gmail SMTP SSL...")
        print("Email User:", EMAIL_USER)
        print("===================================")

        # Create Email
        msg = MIMEMultipart("alternative")

        msg["From"] = EMAIL_USER
        msg["To"] = EMAIL_USER
        msg["Subject"] = f"VoyageAI Contact - {subject}"
        msg["Reply-To"] = email

        html = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">

            <h2>📩 New Contact Form Submission</h2>

            <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                    <td><b>Name</b></td>
                    <td>{name}</td>
                </tr>

                <tr>
                    <td><b>Email</b></td>
                    <td>{email}</td>
                </tr>

                <tr>
                    <td><b>Phone</b></td>
                    <td>{phone}</td>
                </tr>

                <tr>
                    <td><b>Subject</b></td>
                    <td>{subject}</td>
                </tr>

                <tr>
                    <td><b>Message</b></td>
                    <td>{message}</td>
                </tr>
            </table>

        </body>
        </html>
        """

        msg.attach(MIMEText(html, "html"))

        print("Connecting to Gmail SMTP SSL...")

        server = smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=30)

        print("Connected Successfully")

        print("Logging into Gmail...")

        server.login(EMAIL_USER, EMAIL_PASSWORD)

        print("Login Successful")

        print("Sending Email...")

        server.send_message(msg)

        print("Email Sent Successfully")
        print("===================================")

        return 200

    except smtplib.SMTPAuthenticationError as e:

        print("SMTP Authentication Error")
        print(e)

        return None

    except smtplib.SMTPException as e:

        print("SMTP Error")
        print(e)

        return None

    except Exception as e:

        print("General Error")
        print(e)

        return None

    finally:

        if server:
            try:
                server.quit()
                print("SMTP Connection Closed")
            except:
                pass