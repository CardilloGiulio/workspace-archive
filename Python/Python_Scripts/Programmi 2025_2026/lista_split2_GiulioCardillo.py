def crea_lista_spesa(stringa_spesa):
    lista = [item.strip() for item in stringa_spesa.split(",")]
    return lista

def stampa_ordinata(lista):
    lista_ordinata = sorted(lista)
    print("Lista della spesa in ordine alfabetico:\n")
    
    i = 1
    for item in lista_ordinata:
        print(str(i) + ". " + item)
        i += 1

def menu():
    stringa_spesa = "pane, latte, burro, marmellata, farina, cacao, pollo, maionese, biscotti, uova"
    lista_spesa = []

    while True:
        print("Menu:")
        print("1. Genera lista della spesa")
        print("2. Stampa elenco numerato in ordine alfabetico")
        print("0. Esci")
        
        scelta = input("Scegli un'opzione: ")
        
        if scelta == '1':
            lista_spesa = crea_lista_spesa(stringa_spesa)
            print("\nLista generata correttamente!\n")

        elif scelta == '2':
            if lista_spesa:
                stampa_ordinata(lista_spesa)
            else:
                print("\nPrima devi generare la lista!\n")

        elif scelta == '0':
            print("Uscita dal programma.")
            break
        else:
            print("Scelta non valida, riprova.\n")

menu()