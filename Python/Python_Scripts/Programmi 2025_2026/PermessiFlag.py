CUCINA  = 0b0001
SALOTTO = 0b0010
CAMERA  = 0b0100
BAGNO   = 0b1000

stato = 0b0000

def accendi(luce):
    global stato
    stato |= luce


def spegni(luce):
    global stato
    stato &= ~luce


def controlla(nome, luce):
    if stato & luce:
        print(f"{nome}: ACCESA")
    else:
        print(f"{nome}: SPENTA")
def main():
    while True:
        print("\nMENU")
        print("1 Accendi luci")
        print("2 Spegni luci")
        print("3 Controlla luci")
        print("4 Exit")

        scelta = input("Scelta: ")

        if scelta == "1":
            accendi(CUCINA)
            accendi(CAMERA)
            print("Accese cucina e camera")

        elif scelta == "2":
            spegni(CUCINA)
            print("Spenta cucina")

        elif scelta == "3":
            controlla("Cucina", CUCINA)
            controlla("Salotto", SALOTTO)
            controlla("Camera", CAMERA)
            controlla("Bagno", BAGNO)

        elif scelta == "4":
            print("Uscita")
            break

        else:
            print("Scelta non valida")
            
if __name__ == "__main__":
    main()