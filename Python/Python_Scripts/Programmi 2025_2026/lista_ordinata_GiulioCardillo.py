def add_to_list_number(number, list):
    list.append(number)
    
def exercise3(listOfNumbers):
    lenght = len(listOfNumbers)
    if lenght == 5:
        print("Hai raggiunto il numero massimo di elementi alla lista.")
        return
    number = int(input("Aggiungi un numero alla tua lista: "))
    add_to_list_number(number, listOfNumbers)
    print("Lista aggiornata:", listOfNumbers)

def ordina_lista(listOfNumbers):
    listaOrdinataCrescente = sorted(listOfNumbers)
    listOrdinataDecrescente = sorted(listOfNumbers, reverse=True)
    return listaOrdinataCrescente, listOrdinataDecrescente

def menu():
    listOfNumbers = []
    while True:
        print("Menu:")
        print("1. Aggiungi un numero alla lista")
        print("2. Ordina la lista")
        print("3. Esci")
        choice = input("Scegli un'opzione: ")
        
        if choice == '1':
            exercise3(listOfNumbers)
        
        elif choice == '2':
            listaOrdinataCrescente, listaOrdinataDecrescente = ordina_lista(listOfNumbers)
            print("Lista ordinata in ordine crescente:", listaOrdinataCrescente)
            print("Lista ordinata in ordine decrescente:", listaOrdinataDecrescente)
            
        elif choice == '3':
            print("La lista finale è:", listOfNumbers)
            print("Uscita dal programma.")
            break
        
        else:
            print("Scelta non valida, riprova.")
        
menu()