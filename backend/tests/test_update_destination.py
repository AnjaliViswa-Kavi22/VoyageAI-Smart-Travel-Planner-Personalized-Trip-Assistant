import requests

destination_id = 1

url = f"http://127.0.0.1:5000/destination/{destination_id}"

data = {
    "place_name": "Calangute Beach",
    "description": "Beautiful beach in the Goa",
    "latitude": 15.5439,
    "longitude": 73.7553,
    "rating": 4.9
}

response = requests.put(url, json=data)

print(response.status_code)
print(response.json())