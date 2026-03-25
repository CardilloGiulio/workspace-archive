def get_input(listOfGroceries):
    for i in range(7):
        cost = float(input("Seleziona il costo del prodotto: "))
        listOfGroceries.append(cost)

def get_cheapest_and_highest_price(list):
    sortedList = list.sort()
    cheapestPrice = list.pop(0)
    sortedList = list.sort(reverse = True)
    mostValuablePrice = list.pop(0)
    return cheapestPrice, mostValuablePrice

def results(list, cheapest, valuable):
    print("Your final list is: ", list)
    summation = sum(list)
    print("The sum of all your costs is: ", summation)
    print("Your cheapest value was: ", cheapest)
    print("Your most valuable cost was: ", valuable)
    print("Returning to menu...")

def menu():
    while True:
        print("1. Execute Exercise 1")
        print("2. Exit the program")
        index = int(input("Select one of the two option: "))
        if index > 0 and index < 3:
            break
        else:
            print("Valore errato, riprova")

    return index

def main():
    listOfGroceries =  []
    while True:
        choice = menu()
        if choice == 1:
            get_input(listOfGroceries)
            cheapest, valuable = get_cheapest_and_highest_price(listOfGroceries)
            results(listOfGroceries, cheapest, valuable)

        elif choice == 2:
            print("Exiting program...")
            break

main()