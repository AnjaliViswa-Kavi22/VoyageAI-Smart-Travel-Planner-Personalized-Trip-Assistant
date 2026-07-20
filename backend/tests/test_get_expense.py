import requests

expense_id = 1

url = f"http://127.0.0.1:5000/expense/{expense_id}"

response = requests.get(url)

print(response.status_code)
print(response.json())