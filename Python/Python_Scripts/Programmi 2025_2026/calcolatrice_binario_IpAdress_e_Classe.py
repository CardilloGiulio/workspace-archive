def get_ip_class(first_byte):
    if 1 <= first_byte <= 126:
        return 'A'
    elif 128 <= first_byte <= 191:
        return 'B'
    elif 192 <= first_byte <= 223:
        return 'C'
    elif 224 <= first_byte <= 239:
        return 'D'
    elif 240 <= first_byte <= 254:
        return 'E'
    else:
        return 'Invalid'

def ip_to_binary(byte1, byte2, byte3, byte4):
    return f"{byte1:08b}.{byte2:08b}.{byte3:08b}.{byte4:08b}"

def ask_input():
    byte1 = int(input("Inserire primo byte: "))
    byte2 = int(input("Inserire secondo byte: "))
    byte3 = int(input("Inserire terzo byte: "))
    byte4 = int(input("Inserire quarto byte: "))
    return byte1, byte2, byte3, byte4

def main():
    byte1, byte2, byte3, byte4 = ask_input()
    
    ip_class = get_ip_class(byte1)
    ip_binary = ip_to_binary(byte1, byte2, byte3, byte4)
    
    print(f"Classe IP: {ip_class}")
    print(f"Indirizzo IP in binario: {ip_binary}")

main()