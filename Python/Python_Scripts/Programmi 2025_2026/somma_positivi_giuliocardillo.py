def somma_positivi(lista):
    somma = 0
    for numero in lista:
        if numero > 0:
            somma += numero
    return somma

lista_numeri = []

def prendiInput(lista_numeri):
    while True:
        numero = int(input("Inserisci un numero (0 per terminare): "))
        if numero == 0:
            break
        elif numero < 0:
            print("Numero negativo ignorato.")
            continue
        elif numero > 0:
            lista_numeri.append(numero)
    return lista_numeri

def main():
    prendiInput(lista_numeri)
    totale = somma_positivi(lista_numeri)
    print("La somma dei numeri positivi è:", totale)

def menu():
    print("Menu:")
    print("1. Calcola somma dei numeri positivi")
    print("2. Esci")
    scelta = input("Scegli un'opzione (1-2): ")
    return scelta

if __name__ == "__main__":
    while True:
        scelta = menu()
        if scelta == '1':
            main()
        elif scelta == '2':
            print("Uscita dal programma.")
            break
        else:
            print("Scelta non valida. Riprova.")