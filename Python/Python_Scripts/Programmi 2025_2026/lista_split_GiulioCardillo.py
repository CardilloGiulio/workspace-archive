import string

def add_word(word, lista_parole):
    lista_parole.append(word)

def insert_rhyme(lista_parole):
    filastrocca = input("Inserisci una breve filastrocca:\n> ")

    parole_raw = filastrocca.split()

    for p in parole_raw:
        parola_pulita = p.strip(string.punctuation + " ")
        if parola_pulita != "":
            add_word(parola_pulita, lista_parole)

    print("Lista parole pulite:", lista_parole)

def get_first_last_alphabetical(lista_parole):
    parole_ordinate = sorted(lista_parole)
    return parole_ordinate[0], parole_ordinate[-1]

def get_shortest_longest(lista_parole):
    parola_corta = min(lista_parole, key=len)
    parola_lunga = max(lista_parole, key=len)
    return parola_corta, parola_lunga

def menu():
    lista_parole = []

    while True:
        print("\n=== MENU ===")
        print("1. Inserisci filastrocca e ottieni lista di parole pulite")
        print("2. Stampa prima e ultima parola in ordine alfabetico")
        print("3. Stampa parola più corta e più lunga")
        print("4. Esci")

        scelta = input("Scegli un'opzione: ")

        if scelta == '1':
            insert_rhyme(lista_parole)

        elif scelta == '2':
            if lista_parole:
                prima, ultima = get_first_last_alphabetical(lista_parole)
                print("Prima parola in ordine alfabetico:", prima)
                print("Ultima parola in ordine alfabetico:", ultima)
            else:
                print("Devi prima inserire una filastrocca!")

        elif scelta == '3':
            if lista_parole:
                corta, lunga = get_shortest_longest(lista_parole)
                print("Parola più corta:", corta)
                print("Parola più lunga:", lunga)
            else:
                print("Devi prima inserire una filastrocca!")

        elif scelta == '4':
            print("Lista finale parole:", lista_parole)
            print("Uscita dal programma.")
            break

        else:
            print("Scelta non valida, riprova.")

menu()
