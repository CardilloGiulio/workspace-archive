WIFI = 1 << 0
RISCALDAMENTO = 1 << 1
ALLARME = 1 << 2
LUCI = 1 << 3

stato = 0

def attiva_dispositivo(dispositivo):
    global stato
    stato |= dispositivo
    return stato

def disattiva_dispositivo(dispositivo):
    global stato
    stato &= ~dispositivo
    return stato

def toggle_dispositivo(dispositivo):
    global stato
    stato ^= dispositivo
    return stato

def is_attivo(dispositivo):
    return (stato & dispositivo) != 0

def stampa_stato():
    print(f"WiFi: {'ON' if is_attivo(WIFI) else 'OFF'}")
    print(f"Riscaldamento: {'ON' if is_attivo(RISCALDAMENTO) else 'OFF'}")
    print(f"Allarme: {'ON' if is_attivo(ALLARME) else 'OFF'}")
    print(f"Luci: {'ON' if is_attivo(LUCI) else 'OFF'}")
    print(f"Stato decimale: {stato}")
    print(f"Stato binario (8 bit): {format(stato, '08b')}\n")

def servizi_attivi():
    attivi = []
    if is_attivo(WIFI):
        attivi.append("WiFi")
    if is_attivo(RISCALDAMENTO):
        attivi.append("Riscaldamento")
    if is_attivo(ALLARME):
        attivi.append("Allarme")
    if is_attivo(LUCI):
        attivi.append("Luci")
    return attivi

def menu():
    while True:
        print("Menu:")
        print("1. Attiva dispositivo")
        print("2. Disattiva dispositivo")
        print("3. Toggle dispositivo")
        print("4. Mostra stato")
        print("5. Esci")

        scelta = input("Scegli un'opzione: ")

        if scelta == '1':
            disp = int(input("Inserisci il numero del dispositivo da attivare (0-3): "))
            if 0 <= disp <= 3:
                attiva_dispositivo(1 << disp)
            else:
                print("Dispositivo non valido.")

        elif scelta == '2':
            disp = int(input("Inserisci il numero del dispositivo da disattivare (0-3): "))
            if 0 <= disp <= 3:
                disattiva_dispositivo(1 << disp)
            else:
                print("Dispositivo non valido.")

        elif scelta == '3':
            disp = int(input("Inserisci il numero del dispositivo da toggle (0-3): "))
            if 0 <= disp <= 3:
                toggle_dispositivo(1 << disp)
            else:
                print("Dispositivo non valido.")

        elif scelta == '4':
            stampa_stato()

        elif scelta == '5':
            print("Uscita dal programma.")
            break

        else:
            print("Opzione non valida.")

if __name__ == "__main__":
    attiva_dispositivo(WIFI | LUCI)
    stampa_stato()

    print("Allarme attivo" if is_attivo(ALLARME) else "Allarme disattivo")
    attiva_dispositivo(RISCALDAMENTO)

    disattiva_dispositivo(WIFI)
    toggle_dispositivo(ALLARME)
    
    stato &= ~stato
    attiva_dispositivo(RISCALDAMENTO | ALLARME)

    print(f"Stato finale decimale: {stato}")
    print(f"Stato finale binario (8 bit): {format(stato, '08b')}")

    attivi = servizi_attivi()
    print("Servizi attivi: " + (", ".join(attivi) if attivi else "Nessuno"))