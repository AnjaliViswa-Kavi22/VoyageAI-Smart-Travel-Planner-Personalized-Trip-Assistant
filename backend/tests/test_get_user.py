import requests

firebase_uid = "abc123"

url = f"http://127.0.0.1:5000/user/{firebase_uid}"

response = requests.get(url)

print(response.status_code)
print(response.json())