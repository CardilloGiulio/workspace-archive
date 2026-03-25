def main():
    byte1 = int(input("Inserire primo byte: "))
    byte2 = int(input("Inserire secondo byte: "))
    byte3 = int(input("Inserire terzo byte: "))
    byte4 = int(input("Inserire quarto byte: "))

    if 1 <= byte1 <= 126:
        ip_class = 'A'
    elif 128 <= byte1 <= 191:
        ip_class = 'B'
    elif 192 <= byte1 <= 223:
        ip_class = 'C'
    elif 224 <= byte1 <= 239:
        ip_class = 'D'
    elif 240 <= byte1 <= 254:
        ip_class = 'E'
    else:
        ip_class = 'Invalid'

    b1 = format(byte1, '08b')
    b2 = format(byte2, '08b')
    b3 = format(byte3, '08b')
    b4 = format(byte4, '08b')

    ip_binary = b1 + "." + b2 + "." + b3 + "." + b4

    print("Classe IP:", ip_class)
    print("Indirizzo IP in binario:", ip_binary)

main()
