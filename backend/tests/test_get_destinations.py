import requests

trip_id = 2

url = f"http://127.0.0.1:5000/destinations/{trip_id}"

response = requests.get(url)

print(response.status_code)
print(response.json())