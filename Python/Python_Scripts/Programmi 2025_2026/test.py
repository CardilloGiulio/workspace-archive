import requests

def get_public_ip():
    response = requests.get("https://api.ipify.org?format=json")
    response.raise_for_status()  # raises error if request failed
    return response.json()["ip"]

if __name__ == "__main__":
    ip = get_public_ip()
    print(f"Your public IP address is: {ip}")