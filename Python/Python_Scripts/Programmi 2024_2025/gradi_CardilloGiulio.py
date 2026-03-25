celsius = float(input("Inserisci la temperatura in gradi Celsius: "))
fahrenheit = (celsius * 9/5) + 32

if celsius >= 30:
    commento = "Che caldo!"
elif celsius <= 0:
    commento = "Che freddo!"
else:
    commento = "Temperatura piacevole!"

print(f"La temperatura in gradi Celsius è {celsius}°, mentre in gradi Fahrenheit è {fahrenheit}°. {commento}")