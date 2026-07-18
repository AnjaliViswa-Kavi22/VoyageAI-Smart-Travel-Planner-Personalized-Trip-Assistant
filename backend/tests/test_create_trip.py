import requests

url = "http://127.0.0.1:5000/create-trip"

data = {
    "user_id": 1,
    "source": "London",
    "destination": "Kerala",
    "start_date": "2026-08-12",
    "end_date": "2026-08-18",
    "budget": 300000,
    "travelers": 3,
    "travel_type": "Friends"
}

response = requests.post(url, json=data)

print(response.status_code)
print(response.json())