import requests

url = "http://127.0.0.1:5000/register-user"

data = {
    "firebase_uid": "abc124",
    "name": "Anjali Viswa",
    "email": "viswa123@gmail.com",
    "phone": "1234567890"
}

response = requests.post(url, json=data)

print(response.status_code)
print(response.json())