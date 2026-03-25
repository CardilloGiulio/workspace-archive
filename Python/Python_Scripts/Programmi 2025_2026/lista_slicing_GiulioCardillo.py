def add_numbers_to_list(lista):
    print("Inserisci 7 numeri da aggiungere alla lista:")
    for i in range(7):
        num = int(input(f"Inserisci il numero {i+1}: "))
        lista.append(num)
    print("Lista iniziale:", lista)

def replace_first_two(lista):
    lista[0] = 100
    lista[1] = 200
    print("Dopo la sostituzione dei primi due elementi:", lista)

def replace_third_fourth(lista):
    nuovo_numero = int(input("Inserisci un numero da inserire al posto del 3° e 4° elemento: "))
    lista[2] = nuovo_numero
    lista[3] = nuovo_numero
    print("Dopo la sostituzione del 3° e 4° elemento:", lista)

def replace_last_elements(lista):
    lista[-1] = 300
    lista.append(500)   # aggiungo 500 dopo il 300
    print("Dopo la sostituzione dell’ultimo elemento e aggiunta di 500:", lista)

def menu():
    lista = []
    while True:
        print("\n=== MENU ===")
        print("1. Inserisci 7 numeri nella lista")
        print("2. Sostituisci i primi due elementi con 100 e 200")
        print("3. Sostituisci il 3° e 4° elemento con un numero scelto dall’utente")
        print("4. Sostituisci l’ultimo elemento con 300 e aggiungi 500 alla lista")
        print("5. Esci")

        scelta = input("Scegli un'opzione: ")

        if scelta == "1":
            add_numbers_to_list(lista)

        elif scelta == "2":
            if len(lista) >= 2:
                replace_first_two(lista)
            else:
                print("La lista non contiene abbastanza numeri.")

        elif scelta == "3":
            if len(lista) >= 4:
                replace_third_fourth(lista)
            else:
                print("La lista non contiene abbastanza numeri.")

        elif scelta == "4":
            if len(lista) >= 1:
                replace_last_elements(lista)
            else:
                print("La lista è vuota, impossibile sostituire l’ultimo elemento.")

        elif scelta == "5":
            print("Lista finale:", lista)
            print("Uscita dal programma.")
            break

        else:
            print("Scelta non valida. Riprova.")

menu()
