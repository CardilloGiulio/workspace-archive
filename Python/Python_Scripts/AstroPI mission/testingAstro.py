directory = "C:\\Code\\workspace-archive\\Python\\Python_Scripts\\AstroPI mission"

def read_astro_file():
    with open(directory + "\\astro.txt", "r") as file:
        lines = file.readlines()
        for line in lines:
            print(line.strip())

def write_astro_file():
    with open(directory + "\\astro.txt", "w") as file:
        file.write("Astronomy is the study of celestial objects and phenomena.\n")
        file.write("It includes the study of stars, planets, galaxies, and the universe as a whole.\n")
        file.write("Astronomers use telescopes and other instruments to observe and analyze celestial bodies.\n")

def append_custom_string_to_astro_file(custom_string):
    with open(directory + "\\astro.txt", "a") as file:
        file.write(custom_string + "\n")

def clear_astro_file():
    with open(directory + "\\astro.txt", "w") as file:
        file.write("")

def menu():
    while True:
        print("Menu:")
        print("1. Read astro.txt")
        print("2. Write to astro.txt")
        print("3. Append custom string to astro.txt")
        print("4. Clear astro.txt")
        print("5. Exit")
        
        choice = input("Enter your choice: ")
        
        if choice == '1':
            read_astro_file()
        elif choice == '2':
            write_astro_file()
        elif choice == '3':
            custom_string = input("Enter the string to append: ")
            append_custom_string_to_astro_file(custom_string)
        elif choice == '4':
            clear_astro_file()
        elif choice == '5':
            print("Exiting the program.")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    menu()