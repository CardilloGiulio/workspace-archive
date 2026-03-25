def inserisci_voto():
    voto = float(input("Inserisci un voto (0 per terminare): "))
    return voto

def aggiorna_statistiche(lista):
    minimo = min(lista)
    massimo = max(lista)
    media = sum(lista) / len(lista)
    
    print("\nStatistiche attuali:")
    print("Voto minimo:", minimo)
    print("Voto massimo:", massimo)
    print("Media:", media)
    print()

def stampa_finale(lista):
    crescente = sorted(lista)
    decrescente = sorted(lista, reverse=True)

    print("\n--- RISULTATI FINALI ---\n")
    print("Lista crescente:", crescente)
    print("Lista decrescente:", decrescente)
    print("Lista inserita:", lista)
    print()

def menu():
    voti = []
    
    while True:
        print("Menu:")
        print("1. Inserisci voti")
        print("0. Esci")
        
        scelta = input("Scegli un'opzione: ")

        if scelta == '1':
            while True:
                voto = inserisci_voto()

                if voto == 0:
                    break

                voti.append(voto)
                aggiorna_statistiche(voti)

            stampa_finale(voti)

        elif scelta == '0':
            print("Uscita dal programma.")
            break

        else:
            print("Scelta non valida.\n")

menu()
