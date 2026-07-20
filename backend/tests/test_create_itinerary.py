import requests

url = "http://127.0.0.1:5000/create-itinerary"

data = {
    "trip_id": 2,
    "day_number": 1,
    "activity": "Visit Baga Beach",
    "activity_time": "09:00:00",
    "location": "Goa"
}

response = requests.post(url, json=data)

print(response.status_code)
print(response.json())