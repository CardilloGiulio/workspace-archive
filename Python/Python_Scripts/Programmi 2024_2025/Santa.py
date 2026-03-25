import turtle


# Imposta lo schermo
screen = turtle.Screen()
screen.bgcolor("black")  # Colore dello sfondo
screen.title("Animazione Natalizia")

santa = turtle.Turtle()
santa.speed(1)  # Velocità della tartaruga
santa.pensize(2)

def draw_circle(color, radius, x, y):
    """Draw a filled circle at a given position."""
    santa.penup()
    santa.goto(x, y)
    santa.pendown()
    santa.fillcolor(color)
    santa.begin_fill()
    santa.circle(radius)
    santa.end_fill()

def draw_rectangle(color, width, height, x, y):
    """Draw a filled rectangle at a given position."""
    santa.penup()
    santa.goto(x, y)
    santa.pendown()
    santa.fillcolor(color)
    santa.begin_fill()
    for _ in range(2):
        santa.forward(width)
        santa.left(90)
        santa.forward(height)
        santa.left(90)
    santa.end_fill()

def draw_triangle(color, x, y, side_length):
    """Draw a filled triangle at a given position."""
    santa.penup()
    santa.goto(x, y)
    santa.pendown()
    santa.fillcolor(color)
    santa.begin_fill()
    for _ in range(3):
        santa.forward(side_length)
        santa.left(120)
    santa.end_fill()

def draw_santa_claus():
    """Draw a simple representation of Santa Claus."""
    # Draw Santa's hat
    draw_triangle("red", -50, 100, 100)  # The hat
    draw_circle("white", 10, 0, 125)     # The top of the hat

    # Draw Santa's face
    draw_circle("pink", 30, 0, 70)       # The face
    draw_circle("white", 10, -15, 80)    # Left eye
    draw_circle("white", 10, 15, 80)     # Right eye
    draw_circle("black", 5, -15, 80)     # Left pupil
    draw_circle("black", 5, 15, 80)      # Right pupil
    draw_circle("red", 5, 0, 60)         # The nose

    # Draw Santa's beard
    draw_circle("white", 20, 0, 50)      # Beard top part
    draw_rectangle("white", 60, 20, -30, 30)  # Beard bottom part

    # Draw Santa's body
    draw_rectangle("red", 80, 100, -40, -70)  # The body
    draw_rectangle("black", 80, 10, -40, -70) # The belt
    draw_circle("yellow", 10, 0, -75)         # The belt buckle

    # Draw Santa's legs
    draw_rectangle("red", 30, 40, -35, -170)  # Left leg
    draw_rectangle("red", 30, 40, 5, -170)    # Right leg
    draw_rectangle("black", 30, 10, -35, -210)  # Left boot
    draw_rectangle("black", 30, 10, 5, -210)    # Right boot

    # Draw Santa's arms
    draw_rectangle("red", 20, 60, -60, -50)   # Left arm
    draw_rectangle("red", 20, 60, 40, -50)    # Right arm
    draw_circle("white", 10, -70, -50)        # Left hand
    draw_circle("white", 10, 50, -50)         # Right hand
while True:
    # Esegui la funzione per disegnare Babbo Natale
    draw_santa_claus()

    # Mantieni aperta la finestra
    turtle.done()
