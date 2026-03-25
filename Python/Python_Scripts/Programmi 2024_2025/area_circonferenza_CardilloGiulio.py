import math

print("Benvenuto! Questo programma calcola l'area e la circonferenza di un cerchio.")
raggio = float(input("Per favore, inserisci il raggio del cerchio: "))

area = math.pi * raggio ** 2
circonferenza = 2 * math.pi * raggio

print("\nEcco i risultati per il cerchio con raggio {:.2f}:".format(raggio))
print(f"🌟 Area del cerchio: {area:.2f}")
print(f"🌟 Circonferenza del cerchio: {circonferenza:.2f}")


if raggio >= 10:
    commento = "È un cerchio piuttosto grande!"
elif raggio <= 1:
    commento = "È un cerchio molto piccolo!"
else:
    commento = "Una misura perfetta!"

print(f"\n{commento}")