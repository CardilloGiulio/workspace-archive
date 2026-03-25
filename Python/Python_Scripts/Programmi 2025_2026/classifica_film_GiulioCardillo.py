def chiedi_quanti_film():
    numero = int(input("Quanti film vuoi inserire? "))
    return numero

def inserisci_film(lista, quanti):
    for i in range(quanti):
        titolo = input("Inserisci il titolo del film: ")
        lista.append(titolo)
    print("Film aggiunti!\n")

def stampa_classifica(lista):
    print("Classifica film (ordine di inserimento):\n")
    
    for i, film in enumerate(lista, start=1):
        print(str(i) + ". " + film)
    
    print()

def stampa_alfabetica_stringa(lista):
    lista_ordinata = sorted(lista)
    stringa = ", ".join(lista_ordinata)
    print("Film in ordine alfabetico (stringa):")
    print(stringa + "\n")

def menu():
    lista_film = []
    quanti = 0

    while True:
        print("Menu:")
        print("1. Inserisci numero film")
        print("2. Inserisci titoli")
        print("3. Stampa classifica")
        print("4. Stampa stringa in ordine alfabetico")
        print("0. Esci")

        scelta = input("Scegli un'opzione: ")

        if scelta == '1':
            quanti = chiedi_quanti_film()

        elif scelta == '2':
            if quanti > 0:
                inserisci_film(lista_film, quanti)
            else:
                print("Prima devi indicare quanti film inserire!\n")

        elif scelta == '3':
            if lista_film:
                stampa_classifica(lista_film)
            else:
                print("Nessun film inserito.\n")

        elif scelta == '4':
            if lista_film:
                stampa_alfabetica_stringa(lista_film)
            else:
                print("Nessun film inserito.\n")

        elif scelta == '0':
            print("Uscita dal programma.")
            break

        else:
            print("Scelta non valida.\n")

menu()
