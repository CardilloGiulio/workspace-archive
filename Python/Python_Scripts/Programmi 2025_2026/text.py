eta = input("Quanti anni hai?")
if int(eta) <= 18:
    print ("Non puoi bere alcolici")
else:
    print ("Cosa vuoi ordinare?")
    output = input("inserisci il tuo ordine:")
    if output == ("vino"):
        print ("Tieni")
    else:
        print("qualcos'altro?")