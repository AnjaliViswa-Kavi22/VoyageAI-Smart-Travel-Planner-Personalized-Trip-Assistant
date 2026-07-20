import requests

url = "http://127.0.0.1:5000/create-expense"

data = {
    "trip_id": 2,
    "category": "Food",
    "amount": 500.00,
    "expense_date": "2026-07-18",
    "description": "Lunch at restaurant"
}

response = requests.post(url, json=data)

print(response.status_code)
print(response.json())