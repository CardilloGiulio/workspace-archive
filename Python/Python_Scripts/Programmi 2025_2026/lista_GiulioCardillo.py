def add_to_list_number(number, list):
    list.append(number)
    
def exercise1(listOfNumbers):
    if len(listOfNumbers) == 5:
        print("La lista ha raggiunto la dimensione massima di 5 numeri.")
        return
    number = int(input("Aggiungi un numero alla tua lista: "))
    add_to_list_number(number, listOfNumbers)
    print("Lista aggiornata:", listOfNumbers)
def menu():
    listOfNumbers = []
    while True:
        print("Menu:")
        print("1. Aggiungi un numero alla lista")
        print("2. Esci")
        choice = input("Scegli un'opzione: ")
        
        if choice == '1':
            exercise1(listOfNumbers)
            
        elif choice == '2':
            print("Uscita dal programma.")
            break
        
        else:
            print("Scelta non valida, riprova.")
        
menu()