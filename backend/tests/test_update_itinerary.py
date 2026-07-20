import requests

itinerary_id = 1

url = f"http://127.0.0.1:5000/itinerary/{itinerary_id}"

data = {
    "day_number": 2,
    "activity": "Fort Aguada Visit",
    "activity_time": "10:30:00",
    "location": "North Goa"
}

response = requests.put(url, json=data)

print(response.status_code)
print(response.json())