import requests
import time

API_KEY = "ca657427b27d0799ade7eee72c89ec56"

AIR_POLLUTION_API = "https://api.openweathermap.org/data/2.5/air_pollution"
HISTORICAL_WEATHER_API = "https://api.openweathermap.org/data/2.5/onecall/timemachine"
GEO_URL = "https://api.openweathermap.org/geo/1.0/direct"

# Define parameters
api_key = "ca657427b27d0799ade7eee72c89ec56"  # Replace with your OpenWeatherMap API key
lat = 37.7749  # Latitude of the location
lon = -122.4194  # Longitude of the location
timestamp = int(time.mktime((2023, 1, 1, 0, 0, 0, 0, 0, 0)))  # Convert date to Unix timestamp
units = "metric"  # Use metric units

# Build the request URL
url = f"https://api.openweathermap.org/data/2.5/onecall/timemachine"
params = {
    "lat": lat,
    "lon": lon,
    "dt": timestamp,
    "units": units,
    "appid": api_key
}

# Make the request
response = requests.get(url, params=params)

# Handle the response
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}, {response.text}")
