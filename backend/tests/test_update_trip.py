import requests

url = "http://127.0.0.1:5000/trip/2"

data = {
    "source": "Hyderabad",
    "destination": "Ooty",
    "start_date": "2026-08-10",
    "end_date": "2026-08-15",
    "budget": 25000,
    "travelers": 2,
    "travel_type": "Family"
}

response = requests.put(url, json=data)

print(response.status_code)
print(response.json())