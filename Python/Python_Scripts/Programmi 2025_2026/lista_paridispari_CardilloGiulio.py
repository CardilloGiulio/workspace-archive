def add_to_list_number(number, list):
    list.append(number)
    
def exercise3(listOfNumbers):
    number = int(input("Aggiungi un numero alla tua lista: "))
    add_to_list_number(number, listOfNumbers)
    print("Lista aggiornata:", listOfNumbers)

def controllo_pari_dispari(number):
    if number % 2 == 0:
        return "pari"
    else:
        return "dispari"

def suddividi_lista(listOfNumbers):
    lista_pari = []
    lista_dispari = []
    for number in listOfNumbers:
        if controllo_pari_dispari(number) == "pari":
            lista_pari.append(number)
        else:
            lista_dispari.append(number)
    return lista_pari, lista_dispari

def menu():
    listOfNumbers = []
    while True:
        print("Menu:")
        print("1. Aggiungi un numero alla lista")
        print("2. Suddividi la lista in pari e dispari")
        print("3. Esci")
        choice = input("Scegli un'opzione: ")
        
        if choice == '1':
            exercise3(listOfNumbers)
        
        elif choice == '2':
            lista_pari, lista_dispari = suddividi_lista(listOfNumbers)
            print("Numero di numeri pari:", len(lista_pari))
            print("Numero di numeri dispari:", len(lista_dispari))
            print("Somma dei numeri pari:", sum(lista_pari))
            print("Somma dei numeri dispari:", sum(lista_dispari))
            
        elif choice == '3':
            print("La lista finale è:", listOfNumbers)
            print("Uscita dal programma.")
            break
        
        else:
            print("Scelta non valida, riprova.")
        
menu()