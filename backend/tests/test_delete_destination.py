import requests

destination_id = 1

url = f"http://127.0.0.1:5000/destination/{destination_id}"

response = requests.delete(url)

print(response.status_code)
print(response.json())