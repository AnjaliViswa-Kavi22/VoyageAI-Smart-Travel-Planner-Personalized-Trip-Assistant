import requests

itinerary_id = 1

url = f"http://127.0.0.1:5000/itinerary-item/{itinerary_id}"

response = requests.get(url)

print(response.status_code)
print(response.json())