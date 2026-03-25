def add_friend(name, lista_amici):
    lista_amici.append(name)

def insert_friends(lista_amici):
    print("Inserisci 5 nomi di amici:")
    for i in range(5):
        nome = input(f"Inserisci il nome {i+1}: ")
        add_friend(nome, lista_amici)
    print("Lista amici aggiornata:", lista_amici)

def create_string_from_list(lista_amici):
    return ", ".join(lista_amici)

def menu():
    lista_amici = []
    
    while True:
        print("\n=== MENU ===")
        print("1. Inserisci 5 amici nella lista")
        print("2. Crea una stringa separata da virgole con tutti gli amici")
        print("3. Esci")
        
        scelta = input("Scegli un'opzione: ")

        if scelta == '1':
            insert_friends(lista_amici)

        elif scelta == '2':
            if len(lista_amici) == 5:
                stringa_amici = create_string_from_list(lista_amici)
                print("Stringa degli amici:", stringa_amici)
            else:
                print("Devi prima inserire 5 amici nella lista!")

        elif scelta == '3':
            print("Lista finale degli amici:", lista_amici)
            print("Uscita dal programma.")
            break

        else:
            print("Scelta non valida, riprova.")

menu()
