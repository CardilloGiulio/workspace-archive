def add_to_list_name(name, list):
    list.append(name)
    
def check_name_in_list(name, listOfNames):
    if name in listOfNames:
        return True 
    else:
        return False

def exercise4(listOfNames):
    name = input("Aggiungi un nome alla tua lista: ")
    if check_name_in_list(name, listOfNames):
        print(f"Il nome {name} è già presente nella lista.")
        return
    
    position = int(input("Dove vuoi aggiungerlo? (numero di posizione): "))
    listOfNames.insert(position, name)
    add_to_list_name(name, listOfNames)
    print("Lista aggiornata:", listOfNames)


def menu():
    listOfNames = ["Marco", "Luca", "Giulia", "Sara", "Anna"]
    while True:
        print("Menu:")
        print("1. Aggiungi un nome alla lista")
        print("2. Esci")
        choice = input("Scegli un'opzione: ")
        
        if choice == '1':
            exercise4(listOfNames)
            
        elif choice == '2':
            print("La lista finale è:", listOfNames)
            print("Uscita dal programma.")
            break
        
        else:
            print("Scelta non valida, riprova.")
        
menu()