import time
import pyautogui
import numpy as np
from mss import mss
from pynput import mouse, keyboard

# ----------------------------
# CONFIG
# ----------------------------

MIN_RED_RATIO = 0.08

# Ignore red atmosphere / flashing
MAX_RED_RATIO = 0.70

# Fastest reaction: 1 frame
REQUIRED_VALID_FRAMES = 1

# Must drop below this before another press can happen
RESET_RED_RATIO = 0.03

# Faster scan
SCAN_INTERVAL = 0.001

# Minimum delay after pressing
KEY_PRESS_COOLDOWN = 0.03

# Turn this off for speed
PRINT_HITS = False

# Red detection rules
MIN_RED = 180
MAX_GREEN = 80
MAX_BLUE = 80

TOGGLE_KEY = "1"

pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0
pyautogui.MINIMUM_DURATION = 0
pyautogui.MINIMUM_SLEEP = 0


def count_red_pixels(img_bgra):
    return np.count_nonzero(
        (img_bgra[:, :, 2] >= MIN_RED) &
        (img_bgra[:, :, 1] <= MAX_GREEN) &
        (img_bgra[:, :, 0] <= MAX_BLUE)
    )


def select_four_corners():
    points = []

    print("\nSelect the 4 corners of the detection area.")
    print("Left click 4 times, one for each corner, in any order.\n")

    def on_click(x, y, button, pressed):
        if pressed and button == mouse.Button.left:
            points.append((x, y))
            print(f"Point {len(points)} recorded: ({x}, {y})")

            if len(points) >= 4:
                return False

    with mouse.Listener(on_click=on_click) as listener:
        listener.join()

    xs = [p[0] for p in points]
    ys = [p[1] for p in points]

    left = min(xs)
    top = min(ys)
    right = max(xs)
    bottom = max(ys)

    width = right - left
    height = bottom - top

    if width <= 0 or height <= 0:
        raise ValueError("Invalid area selected.")

    region = {
        "left": left,
        "top": top,
        "width": width,
        "height": height,
    }

    print("\nSelected detection region:")
    print(region)
    print(f"Area size: {width} x {height} = {width * height} pixels")

    return region


def select_key_to_press():
    selected_key = []

    print("\nNow press the key the script should simulate when red is detected.")
    print(f"The key '{TOGGLE_KEY}' cannot be selected because it is used to toggle the detector.\n")

    def on_press(key):
        try:
            key_char = key.char.lower()

            if key_char == TOGGLE_KEY:
                print(f"'{TOGGLE_KEY}' is reserved for ON/OFF toggle. Choose another key.")
                return

            selected_key.append(key_char)
            print(f"Selected simulated key: {key_char}")
            return False

        except AttributeError:
            print("Please choose a normal keyboard key, like x, z, a, etc.")

    with keyboard.Listener(on_press=on_press) as listener:
        listener.join()

    return selected_key[0]


def main():
    input("Press Enter to begin selecting the 4 corners...")

    region = select_four_corners()
    key_to_press = select_key_to_press()

    total_area_pixels = region["width"] * region["height"]

    detector_enabled = False
    last_key_press_time = 0.0

    valid_frame_count = 0
    waiting_for_reset = False

    print("\nSetup complete.")
    print(f"Detection area: {region}")
    print(f"Total selected area pixels: {total_area_pixels}")
    print(f"Minimum red ratio: {MIN_RED_RATIO * 100:.1f}%")
    print(f"Maximum red ratio: {MAX_RED_RATIO * 100:.1f}%")
    print(f"Reset red ratio: {RESET_RED_RATIO * 100:.1f}%")
    print(f"Required valid frames: {REQUIRED_VALID_FRAMES}")
    print(f"Simulated key when red is detected: {key_to_press}")
    print(f"\nPress {TOGGLE_KEY} to turn detector ON/OFF.")
    print("Move mouse to the top-left corner of the screen to abort.")
    print("Press Ctrl+C in the terminal to stop completely.\n")

    def on_key_press(key):
        nonlocal detector_enabled
        nonlocal valid_frame_count
        nonlocal waiting_for_reset

        try:
            if key.char == TOGGLE_KEY:
                detector_enabled = not detector_enabled
                valid_frame_count = 0
                waiting_for_reset = False

                print("Detector ON" if detector_enabled else "Detector OFF")

        except AttributeError:
            pass

    keyboard_listener = keyboard.Listener(on_press=on_key_press)
    keyboard_listener.start()

    try:
        with mss() as sct:
            while True:
                if detector_enabled:
                    screenshot = sct.grab(region)
                    img = np.asarray(screenshot)

                    red_pixels = count_red_pixels(img)
                    red_ratio = red_pixels / total_area_pixels

                    if waiting_for_reset:
                        if red_ratio <= RESET_RED_RATIO:
                            waiting_for_reset = False
                            valid_frame_count = 0

                        time.sleep(SCAN_INTERVAL)
                        continue

                    valid_red = MIN_RED_RATIO <= red_ratio <= MAX_RED_RATIO

                    if valid_red:
                        valid_frame_count += 1
                    else:
                        valid_frame_count = 0

                    if valid_frame_count >= REQUIRED_VALID_FRAMES:
                        now = time.perf_counter()

                        if now - last_key_press_time >= KEY_PRESS_COOLDOWN:
                            pyautogui.press(key_to_press, _pause=False)

                            if PRINT_HITS:
                                print(
                                    f"Pressed key '{key_to_press}' "
                                    f"- red pixels: {red_pixels} "
                                    f"- red area: {red_ratio * 100:.1f}%"
                                )

                            last_key_press_time = now
                            waiting_for_reset = True
                            valid_frame_count = 0

                    time.sleep(SCAN_INTERVAL)

                else:
                    time.sleep(0.01)

    except KeyboardInterrupt:
        print("\nScript stopped by user.")

    finally:
        keyboard_listener.stop()


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("\nERROR:")
        print(e)

    input("\nPress Enter to close...")