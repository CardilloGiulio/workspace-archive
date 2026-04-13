import pyautogui
import time

print("Move the mouse where you want.")
time.sleep(3)

while True:
    x, y = pyautogui.position()
    print(f"X={x} Y={y}", end="\r")