def add_to_list_number(number, list):
    list.append(number)
    
def exercise2(listOfNumbers):
    number = int(input("Aggiungi un numero alla tua lista: "))
    add_to_list_number(number, listOfNumbers)
    print("Lista aggiornata:", listOfNumbers)

def sommamedia(listOfNumbers):
    total = sum(listOfNumbers)
    average = total / len(listOfNumbers) if listOfNumbers else 0
    return total, average

def menu():
    listOfNumbers = []
    while True:
        print("Menu:")
        print("1. Aggiungi un numero alla lista")
        print("0. Esci")
        choice = input("Scegli un'opzione: ")
        
        if choice == '1':
            exercise2(listOfNumbers)
            
        elif choice == '0':
            print("La lista finale è:", listOfNumbers)
            total, average = sommamedia(listOfNumbers)
            print("La somma dei numeri è:", total)
            print("La media dei numeri è:", average)
            print("Uscita dal programma.")
            break
        
        else:
            print("Scelta non valida, riprova.")
        
menu()