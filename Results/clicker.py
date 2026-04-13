import time
import pyautogui
import numpy as np
from mss import mss
from pynput import mouse

# ----------------------------
# CONFIG
# ----------------------------

# Minimum number of red pixels required before clicking
RED_PIXEL_THRESHOLD = 50

# Delay between checks
SCAN_INTERVAL = 0.05

# Delay after a click to avoid spam clicking

# Red detection rules
MIN_RED = 180
MAX_GREEN = 80
MAX_BLUE = 80

# Safety: move mouse to top-left corner to stop PyAutoGUI
pyautogui.FAILSAFE = True


def count_red_pixels(img_bgra):
    # mss returns BGRA
    b = img_bgra[:, :, 0]
    g = img_bgra[:, :, 1]
    r = img_bgra[:, :, 2]

    red_mask = (r >= MIN_RED) & (g <= MAX_GREEN) & (b <= MAX_BLUE)
    return np.count_nonzero(red_mask)


def select_four_corners():
    points = []

    print("\nSelect the 4 corners of the area.")
    print("Left click 4 times, one for each corner, in any order.\n")

    def on_click(x, y, button, pressed):
        if pressed and button == mouse.Button.left:
            points.append((x, y))
            print(f"Point {len(points)} recorded: ({x}, {y})")

            if len(points) >= 4:
                return False  # stop listener

    with mouse.Listener(on_click=on_click) as listener:
        listener.join()

    xs = [p[0] for p in points]
    ys = [p[1] for p in points]

    left = min(xs)
    top = min(ys)
    right = max(xs)
    bottom = max(ys)

    region = {
        "left": left,
        "top": top,
        "width": right - left,
        "height": bottom - top,
    }

    print("\nSelected region:")
    print(region)

    return region


def main():
    input("Press Enter to begin selecting the 4 corners...")

    region = select_four_corners()

    print("\nMonitoring started.")
    print("Move mouse to the top-left corner of the screen to abort.")

    last_click_time = 0

    with mss() as sct:
        while True:
            screenshot = sct.grab(region)
            img = np.array(screenshot)

            red_pixels = count_red_pixels(img)

            if red_pixels >= RED_PIXEL_THRESHOLD:
                now = time.time()
                x, y = pyautogui.position()
                pyautogui.click(x, y)
                print(f"Clicked at current mouse position ({x}, {y}) - red pixels: {red_pixels}")
                last_click_time = now

            time.sleep(SCAN_INTERVAL)


if __name__ == "__main__":
    main()