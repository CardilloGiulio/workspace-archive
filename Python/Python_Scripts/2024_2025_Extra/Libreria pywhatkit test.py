import pywhatkit as pwk
import pyautogui



phone_number = "+393475155338"
message = "hehehe"
timer = 0
while timer < 4:
    pwk.sendwhatmsg_instantly(phone_number, message)
    pyautogui.press("enter")
    timer = timer + 1
    print(timer)