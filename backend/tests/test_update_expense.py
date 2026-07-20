import requests

expense_id = 1

url = f"http://127.0.0.1:5000/expense/{expense_id}"

data = {
    "category": "Food",
    "amount": 750,
    "expense_date": "2026-07-18",
    "description": "Lunch and Snacks"
}

response = requests.put(url, json=data)

print(response.status_code)
print(response.json())