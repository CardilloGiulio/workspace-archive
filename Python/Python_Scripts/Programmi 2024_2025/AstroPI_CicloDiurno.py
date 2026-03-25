# Import the libraries
from sense_hat import SenseHat
from time import sleep

# Set up the Sense HAT
sense = SenseHat()
sense.set_rotation(270, False)

# Set up the colour sensor
sense.color.gain = 60 # Set the sensitivity of the sensor
sense.color.integration_cycles = 64 # The interval at which the reading will be taken

# Add colour variables and image
# Colour palette
rgb = sense.color # get the colour from the sensor
gianni = (rgb.red, rgb.green, rgb.blue)
a = (255, 255, 255) # White
b = (105, 105, 105) # DimGray
c = (0, 0, 0) # Black
d = (100, 149, 237) # CornflowerBlue
e = (0, 0, 205) # MediumBlue
f = (25, 25, 112) # MidnightBlue
g = (0, 191, 255) # DeepSkyBlue
h = (0, 255, 255) # Cyan
j = (143, 188, 143) # DarkSeaGreen
k = (46, 139, 87) # SeaGreen
l = (0, 255, 127) # SpringGreen
m = (34, 139, 34) # ForestGreen
n = (154, 205, 50) # YellowGreen
o = (128, 128, 0) # Olive
p = (240, 230, 140) # Khaki
q = (255, 255, 0) # Yellow
r = (184, 134, 11) # DarkGoldenrod
s = (139, 69, 19) # SaddleBrown
t = (255, 140, 0) # DarkOrange
u = (178, 34, 34) # Firebrick
v = (255, 0, 0) # Red
w = (255, 192, 203) # Pink
y = (255, 20, 147) # DeepPink
z = (153, 50, 204) # DarkOrchid


image1 = [
g, g, g, q, q, g, g, g,
g, g, g, q, q, g, g, g,
g, g, g, g, g, g, g, g,
g, g, g, g, g, g, g, g,
g, g, g, g, g, n, g, g,
g, g, g, g, n, n, n, g,
n, gianni, n, n, n, n, n, n,
n, n, n, n, n, gianni, n, n]

image2 = [
d, d, d, d, d, d, d, d,
d, d, p, p, d, d, d, d,
d, d, p, p, d, d, d, d,
d, d, d, d, d, d, d, d,
d, d, d, d, d, j, d, d,
d, d, d, d, j, j, j, d,
j, gianni, j, j, j, j, j, j,
j, j, j, j, j, gianni, j, j]

image3 = [
e, e, e, e, e, e, e, e,
e, e, e, e, e, e, e, e,
e, r, r, e, e, e, e, e,
e, r, r, e, e, e, a, a,
e, e, e, e, e, k, a, a,
e, e, e, e, k, k, k, e,
k, gianni, k, k, k, k, k, k,
k, k, k, k, k, gianni, k, k]

image4 = [
f, f, f, f, f, f, f, f,
f, f, f, f, f, f, f, f,
f, f, f, f, f, a, a, f,
f, f, f, f, f, a, a, f,
t, f, f, f, f, m, f, f,
t, f, f, f, m, m, m, f,
m, gianni, m, m, m, m, m, m,
m, m, m, m, m, gianni, m, m]

image5 = [
f, f, f, f, f, f, f, f,
f, f, f, f, a, a, f, f,
f, f, f, f, a, a, f, f,
f, f, f, f, f, f, f, f,
f, f, f, f, f, m, f, f,
f, f, f, f, m, m, m, f,
m, gianni, m, m, m, m, m, m,
m, m, m, m, m, gianni, m, m]

image6 = [
f, f, f, a, a, f, f, f,
f, f, f, a, a, f, f, f,
f, f, f, f, f, f, f, f,
f, f, f, f, f, f, f, f,
f, f, f, f, f, m, f, f,
f, f, f, f, m, m, m, f,
m, gianni, m, m, m, m, m, m,
m, m, m, m, m, gianni, m, m]

image7 = [
f, f, f, f, f, f, f, f,
f, f, a, a, f, f, f, f,
f, f, a, a, f, f, f, f,
f, f, f, f, f, f, f, f,
f, f, f, f, f, m, f, f,
f, f, f, f, m, m, m, f,
m, gianni, m, m, m, m, m, m,
m, m, m, m, m, gianni, m, m]

image8 = [
e, e, e, e, e, e, e, e,
e, e, e, e, e, e, e, e,
e, a, a, e, e, e, e, e,
e, a, a, e, e, e, r, r,
e, e, e, e, e, k, r, r,
e, e, e, e, k, k, k, e,
k, gianni, k, k, k, k, k, k,
k, k, k, k, k, gianni, k, k]

image9 = [
d, d, d, d, d, d, d, d,
d, d, d, d, d, p, p, d,
d, d, d, d, d, p, p, d,
d, d, d, d, d, d, d, d,
a, d, d, d, d, j, d, d,
a, d, d, d, j, j, j, d,
j, gianni, j, j, j, j, j, j,
j, j, j, j, j, gianni, j, j]
# Display the image
for i in range(2):
    sense.set_pixels(image1)
    sleep(1)
    sense.set_pixels(image2)
    sleep(1)
    sense.set_pixels(image3)
    sleep(1)
    sense.set_pixels(image4)
    sleep(1)
    sense.set_pixels(image5)
    sleep(1)
    sense.set_pixels(image6)
    sleep(1)
    sense.set_pixels(image7)
    sleep(1)
    sense.set_pixels(image8)
    sleep(1)
    sense.set_pixels(image9)
    sleep(1)
    sense.set_pixels(image1)