def calcolatrice():
    print("Benvenuto nella calcolatrice 2000!")
    strumento = input("Dimmi il tipo di calcolo che vuoi fare (addizione, sottrazione, moltiplicazione, divisione): ").lower()
    n1 = int(input("Dimmi il tuo primo numero: "))
    n2 = int(input("Dimmi il tuo secondo numero: "))
    risultato = n1  # Initialize the result with the first number.
    risultato2 = 0
    risposta = input("Vuoi aggiungere altri numeri? (si/no): ").lower()
    
    if risposta == "si":
        risposta2 = int(input("Dimmi quanti altri numeri vuoi aggiungere: "))
        
        for i in range(risposta2):
            numero = int(input(f"Dimmi il prossimo numero ({i+1} di {risposta2}): "))
            if strumento == "addizione":
                risultato += numero
            elif strumento == "sottrazione":
                risultato -= numero
            elif strumento == "moltiplicazione":
                if risultato == 0:
                    risultato = numero
                else:
                    risultato *= numero
            elif strumento == "divisione":
                if numero == 0:
                    print("Errore: Divisione per zero non permessa!")
                    return
                risultato /= numero
    else:
        print("Sto calcolando!!")

    # Esegui il calcolo in base al tipo di operazione
    if strumento == "addizione":
        risultato2 = risultato + n2
    elif strumento == "sottrazione":
        risultato2 = risultato - n2
    elif strumento == "moltiplicazione":
        risultato2 = risultato * n2
    elif strumento == "divisione":
        if n2 == 0:
            print("Errore: Divisione per zero non permessa!")
            return
        risultato2 = risultato / n2
    else:
        print("Operazione non riconosciuta. Per favore scegli tra addizione, sottrazione, moltiplicazione e divisione.")
        return

    print(f"Il tuo risultato è: {risultato2}")

calcolatrice()

