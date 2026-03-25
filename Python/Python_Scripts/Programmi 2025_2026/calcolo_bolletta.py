def calcola_bolletta(tariffa, consumo):
    tot = tariffa * consumo
    print("Totale bolletta: ", tot)
    return tot

def applica_sconto(totale):
    prezzoScontato = totale - (totale * 10 / 100)
    print("Prezzo scontato: ", prezzoScontato)
    return prezzoScontato



def main():
    consumo = int(input("Inserisci il consumo in kWh: "))
    tariffa = float(0)
    
    if consumo <= 100:
        tariffa = 0.15
        calcola_bolletta(tariffa, consumo)

    elif consumo <= 300 and consumo > 100:
        tariffa = 0.20
        totale = calcola_bolletta(tariffa, consumo)

    elif consumo > 300:
        tariffa = 0.25
        if consumo >= 500:
            totale = calcola_bolletta(tariffa, consumo)
            applica_sconto(totale)
        else:
            calcola_bolletta(tariffa, consumo)
        
def menu():
    print("Menu Tariffe:")
    print("1. Calcola bolletta")
    print("2. Esci")
    scelta = input("Scegli un'opzione (1-2): ")
    return scelta

if __name__ == "__main__":
    while True:
        scelta = menu()
        if scelta == '1':
            main()
        elif scelta == '2':
            print("Uscita dal programma.")
            break
        else:
            print("Scelta non valida. Riprova.")