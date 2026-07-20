import requests

url = "http://127.0.0.1:5000/create-destination"

data = {
    "trip_id": 3,
    "place_name": "Baga Beach",
    "description": "One of the most famous beaches in Goa",
    "latitude": 15.5553,
    "longitude": 73.7517,
    "rating": 4.7
}

response = requests.post(url, json=data)

print(response.status_code)
print(response.json())