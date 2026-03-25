def gestisci_posti(tipo_veicolo, alimentazione):
    Posti = input(f"Quanti posti ha la tua {tipo_veicolo} ({alimentazione})? ")
    print("1. Monoposto")
    print("2. Biposto")
    if Posti in ["Monoposto", "Biposto"]:
        print("Sto elaborando i dati...")
        return True
    else:
        print("Non hai selezionato una delle opzioni, scegline una correttamente.")
        return False

print("Benvenuto Utente, rispondi alle seguenti domande per la creazione del tuo veicolo digitale")
condizione = False

while not condizione:
    print("Che veicolo è? scegli tra le seguenti opzioni")
    print("1. Moto")
    print("2. Bicicletta")
    print("3. Automobile")
    Veicolo = input().capitalize()

    if Veicolo == "Moto":
        print("Da cosa è alimentato? scegli tra le seguenti opzioni:")
        print("1. Benzina")
        print("2. Elettricità")
        print("3. Ibrida")
        AlimentazioneMoto = input().capitalize()
        
        if AlimentazioneMoto in ["Benzina", "Elettricità", "Ibrida"]:
            condizione = gestisci_posti("Moto", AlimentazioneMoto)
        else:
            print("Non hai selezionato una delle opzioni, riprova.")

    elif Veicolo == "Bicicletta":
        print("Da cosa è alimentato? scegli tra le seguenti opzioni:")
        print("1. Benzina")
        print("2. Elettricità")
        print("3. Ibrida")
        AlimentazioneBici = input().capitalize()
        if AlimentazioneBici in ["Benzina", "Elettricità", "Ibrida"]:
            print("Sto elaborando i dati...")
            condizione = True
        else:
            print("Non hai selezionato una delle opzioni, riprova.")

    elif Veicolo == "Automobile":
        print("Da cosa è alimentato? scegli tra le seguenti opzioni:")
        print("1. Benzina")
        print("2. Elettricità")
        print("3. Ibrida")
        AlimentazioneAuto = input().capitalize()
        
        if AlimentazioneAuto in ["Benzina", "Elettricità", "Ibrida"]:
            try:
                PostiAuto = int(input("Quanti posti ha la tua automobile? "))
                if PostiAuto < 9:
                    print("Sto elaborando i dati...")
                    condizione = True
                else:
                    print(f"Limite di posti superato! Un'auto non può avere {PostiAuto} posti!")
            except ValueError:
                print("Inserisci un numero valido per i posti.")
        else:
            print("Non hai selezionato una delle opzioni, riprova.")

    else:
        print("Non hai selezionato una delle opzioni, riprova.")