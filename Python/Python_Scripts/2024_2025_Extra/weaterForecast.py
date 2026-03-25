import requests

API_KEY = "ca657427b27d0799ade7eee72c89ec56"
WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"

def get_weather_data_by_zip(zip_code, country_code):
    response = requests.get(
        WEATHER_URL,
        params={"zip": f"{zip_code},{country_code}", "appid": API_KEY, "units": "metric"}
    )
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 404:
        print("Errore: Codice postale o paese non trovato. Controlla i dati inseriti.")
    else:
        print(f"Errore nella richiesta meteo: {response.status_code} - {response.text}")
    return None

def display_menu():
    print("\nQuale informazione desideri visualizzare?")
    print("1. Temperatura")
    print("2. Umidità")
    print("3. Descrizione del meteo")
    print("4. Velocità del vento")
    print("5. Nome della città")
    print("6. Mostra tutto")
    print("7. Esci")

def display_weather_data(weather_data, choice):
    if weather_data:
        if choice == "1":
            print(f"Temperatura: {weather_data['main']['temp']}°C")
        elif choice == "2":
            print(f"Umidità: {weather_data['main']['humidity']}%")
        elif choice == "3":
            print(f"Descrizione: {weather_data['weather'][0]['description'].capitalize()}")
        elif choice == "4":
            print(f"Velocità del vento: {weather_data['wind']['speed']} m/s")
        elif choice == "5":
            print(f"Città: {weather_data['name']}")
        elif choice == "6":
            print(f"Temperatura: {weather_data['main']['temp']}°C")
            print(f"Umidità: {weather_data['main']['humidity']}%")
            print(f"Descrizione: {weather_data['weather'][0]['description'].capitalize()}")
            print(f"Velocità del vento: {weather_data['wind']['speed']} m/s")
            print(f"Città: {weather_data['name']}")
        elif choice == "7":
            print("Grazie per aver usato il sistema meteo. Arrivederci!")
        else:
            print("Scelta non valida. Riprova.")
    else:
        print("Impossibile mostrare i dati meteo.")

def main():
    print("Benvenuto nel sistema meteo globale!")
    zip_code = input("Inserisci il codice postale (ZIP): ").strip()
    country_code = input("Inserisci il codice paese (esempio: 'us', 'it', 'fr'): ").strip() or "us"

    if not zip_code or not country_code:
        print("Errore: Devi fornire un codice postale e un codice paese validi.")
        return

    weather_data = get_weather_data_by_zip(zip_code, country_code)
    if weather_data:
        while True:
            display_menu()
            choice = input("Inserisci il numero della tua scelta: ").strip()
            if choice == "7":
                print("Grazie per aver usato il sistema meteo. Arrivederci!")
                break
            display_weather_data(weather_data, choice)

if __name__ == "__main__":
    main()