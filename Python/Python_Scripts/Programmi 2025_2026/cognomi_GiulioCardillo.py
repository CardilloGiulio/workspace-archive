def inserisci_cognomi():
    stringa = input("Inserisci almeno 5 cognomi separati da virgola: ")
    lista = [c.strip() for c in stringa.split(",")]
    return lista

def lista_maiuscola(lista):
    copia = []
    for cognome in lista:
        copia.append(cognome.upper())
    return copia

def lista_ordinata_maiuscola(lista_maius):
    lista_ordinata = sorted(lista_maius)
    return lista_ordinata

def stampa_liste(originale, maiuscola, ordinata):
    print("\nLista originale:")
    print(originale)

    print("\nLista in maiuscolo:")
    print(maiuscola)

    print("\nLista ordinata in maiuscolo:")
    print(ordinata)
    print()

def menu():
    lista_cognomi = []
    lista_cognomi_maiuscola = []
    lista_ordinata = []

    while True:
        print("Menu:")
        print("1. Inserisci i cognomi")
        print("2. Stampa le liste")
        print("0. Esci")

        scelta = input("Scegli un'opzione: ")

        if scelta == '1':
            lista_cognomi = inserisci_cognomi()
            lista_cognomi_maiuscola = lista_maiuscola(lista_cognomi)
            lista_ordinata = lista_ordinata_maiuscola(lista_cognomi_maiuscola)

        elif scelta == '2':
            if lista_cognomi:
                stampa_liste(lista_cognomi, lista_cognomi_maiuscola, lista_ordinata)
            else:
                print("\nDevi prima inserire i cognomi!\n")

        elif scelta == '0':
            print("Uscita dal programma.")
            break

        else:
            print("Scelta non valida.\n")

menu()
