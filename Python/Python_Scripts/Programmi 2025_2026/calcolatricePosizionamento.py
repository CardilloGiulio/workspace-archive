DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def calcolatrice_daBaseADecimale():
    base = int(input("Inserisci la base di partenza (2-36): "))
    if not (2 <= base <= 36):
        raise ValueError("La base deve essere compresa tra 2 e 36.")

    num_str = input(f"Inserisci un numero in base {base}: ").upper()

    for ch in num_str:
        if ch not in DIGITS[:base]:
            raise ValueError(f"Carattere non valido '{ch}' per la base {base}.")

    value = int(num_str, base)
    print(f"Il numero {num_str} (base {base}) vale {value} in base 10.")


def calcolatrice_daDecimaleABase():
    value = int(input("Inserisci un numero in base 10: "))
    base = int(input("Inserisci la base di destinazione (2-36): "))
    if not (2 <= base <= 36):
        raise ValueError("La base deve essere compresa tra 2 e 36.")

    result = ""
    n = value
    while n > 0:
        result = DIGITS[n % base] + result
        n //= base

    print(f"Il numero {value} in base 10 vale {result} in base {base}.")


def main():
    while True:
        print("Calcolatrice di posizionamento")
        print("0. Esci")
        print("1. Converti da base N a base 10")
        print("2. Converti da base 10 a base N")
        choice = input("Scegli un'opzione (0, 1 o 2): ")

        if choice == '1':
            calcolatrice_daBaseADecimale()
        elif choice == '2':
            calcolatrice_daDecimaleABase()
        elif choice == '0':
            print("Uscita...")
            break
        else:
            print("Opzione non valida.")
        
if __name__ == "__main__": 
    main()