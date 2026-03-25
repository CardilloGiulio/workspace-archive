def Operazione_Bitwise(operator, n1, n2):
    print("Stai per svolgere la operazione tra i seguenti due numeri: ", n1,",", n2)
    if operator == "&=":
        n1 &= n2
        print("Il valore in base decimale è: ", n1)
        print(f"Il valore in base binario è: {n1:08b}")
    elif operator == "|=":
        n1 |= n2
        print("Il valore in base decimale è: ", n1)
        print(f"Il valore in base binario è: {n1:08b}")
    elif operator == "^=":
        n1 ^= n2
        print("Il valore in base decimale è: ", n1)
        print(f"Il valore in base binario è: {n1:08b}")

def Ask_User_Operator():
    while True:
        print("Seleziona il tuo operatore, scegli il tuo:")
        operator = input("&=, |=, ^=: ")
        if operator == "&=" or operator == "|=" or operator == "^=":
            break
        print("Errore, ritenta")
        
    return operator
    
def main():
    x = 12
    y = 3
    z = 9
    g = 5
    operator = Ask_User_Operator()
    Operazione_Bitwise(operator, x, y)
    Operazione_Bitwise("^=", z, g)
    
    
main()