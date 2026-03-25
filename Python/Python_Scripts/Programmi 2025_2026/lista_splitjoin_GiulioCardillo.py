def aggiungi_cantante(lista):
    cantante = input("Inserisci un cantante o gruppo musicale: ")
    lista.append(cantante)
    print("Aggiunto!\n")

def stampa_classifica(lista):
    print("Classifica musicale:\n")
    i = 1
    for nome in lista:
        print(str(i) + ". " + nome)
        i += 1
    print()

def stampa_stringa_alfabetica(lista):
    lista_ordinata = sorted(lista)
    stringa = ""
    for nome in lista_ordinata:
        stringa += nome + ", "
    print("Stringa in ordine alfabetico:")
    print(stringa + "\n")

def menu():
    classifica = []
    
    while True:
        print("Menu:")
        print("1. Aggiungi cantante in classifica")
        print("2. Stampa classifica con numeri")
        print("3. Stampa come stringa in ordine alfabetico")
        print("0. Esci")
        
        scelta = input("Scegli un'opzione: ")
        
        if scelta == '1':
            aggiungi_cantante(classifica)
        
        elif scelta == '2':
            if classifica:
                stampa_classifica(classifica)
            else:
                print("La classifica è vuota.\n")
        
        elif scelta == '3':
            if classifica:
                stampa_stringa_alfabetica(classifica)
            else:
                print("La classifica è vuota.\n")
        
        elif scelta == '0':
            print("Uscita dal programma.")
            break
        
        else:
            print("Scelta non valida.\n")

menu()
