import requests
from requests.auth import HTTPBasicAuth
from datetime import datetime

# Replace these with your Meteomatics API credentials
username = 'kumar_devika'
password = 'zNY663k0bB'

def get_weather_data(latitude, longitude, year, data_type):
    current_time = datetime.utcnow()
    formatted_time = current_time.strftime(f'{year}-%m-%dT%H:%M:%SZ')

    # Define parameters based on the requested data type
    if data_type == 'temperature':
        parameters = 't_2m:C'  # Temperature at 2 meters in degrees Celsius
    elif data_type == 'humidity':
        parameters = 'relative_humidity_2m:p'  # Relative humidity at 2 meters in percentage
    elif data_type=='precipitation':
        parameters = 'precip_1h:mm'
    elif data_type == 'carbon_emissions':
        parameters='tc_ch4:ugm2'
    else:
        print("Invalid data type. Choose 'temperature' or 'humidity'.")
        return None

    # Construct the API URL for the current weather data
    url = f"https://api.meteomatics.com/{formatted_time}/{parameters}/{latitude},{longitude}/json"

    # Make the API request
    response = requests.get(url, auth=HTTPBasicAuth(username, password))

    # Check if the request was successful
    if response.status_code == 200:
        # Extract data value from the response
        weather_data = response.json()
        return weather_data['data'][0]['coordinates'][0]['dates'][0]['value']  # Extracting value
    else:
        print("Failed to retrieve data:")
        print(f"Status Code: {response.status_code}")
        print(response.text)
        return None

# Example usage
latitude = 52.520551  # Latitude for Berlin
longitude = 13.461804  # Longitude for Berlin
year = 2023  # Specify the year

# Get temperature
temperature = get_weather_data(latitude, longitude, year, 'temperature')
if temperature is not None:
    print(f"Current temperature in Berlin: {temperature}°C")

# Get humidity
humidity = get_weather_data(latitude, longitude, year, 'humidity')
if humidity is not None:
    print(f"Current humidity in Berlin: {humidity}%")

# Get air quality
precipitation = get_weather_data(latitude, longitude, year, 'precipitation')
if precipitation is not None:
    print(f"Current air quality in Berlin: {precipitation}μg/m^3")
carbon=get_weather_data(latitude, longitude, year, 'carbon_emissions')
if carbon is not None:
    print(f"Carbon emissions in Berlin: {carbon}ppm")
