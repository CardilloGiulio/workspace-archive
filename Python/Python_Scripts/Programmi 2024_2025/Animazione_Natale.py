import turtle
import random

# Imposta lo schermo
screen = turtle.Screen()
screen.bgcolor("burlywood")  # Colore dello sfondo
screen.title("Animazione Natalizia")
screen.tracer(0)  # Disabilita l'aggiornamento automatico dello schermo

# Configura la tartaruga
santa = turtle.Turtle()
santa.speed(3)  # Velocità moderata della tartaruga
santa.pensize(2)

def draw_rectangle(x, y, width, height, color):
    santa.penup()
    santa.goto(x, y)
    santa.pendown()
    santa.color(color)
    santa.begin_fill()
    for _ in range(2):
        santa.forward(width)
        santa.left(90)
        santa.forward(height)
        santa.left(90)
    santa.end_fill()
    screen.update()  # Update screen after drawing each rectangle

def draw_santa_claus():
    # Corpo
    santa.penup()
    santa.goto(0, -250)
    santa.pendown()
    santa.color("peachpuff")
    santa.begin_fill()
    santa.circle(150)
    santa.end_fill()
    screen.update()  # Update after drawing the body

    # Giacca rossa
    draw_rectangle(-150, -250, 300, 200, "red")

    # Rifinitura bianca
    draw_rectangle(-150, -50, 300, 20, "white")

    # Cintura nera
    draw_rectangle(-150, -150, 300, 20, "black")
    draw_rectangle(-30, -150, 60, 20, "yellow")  # Fibra gialla al centro della cintura

    # Dettagli pantaloni
    draw_rectangle(-125, -400, 50, 20, "white")  # Rifinitura sinistra
    draw_rectangle(75, -400, 50, 20, "white")  # Rifinitura destra

    # Braccia
    draw_rectangle(-200, -150, 50, 100, "red")  # Braccio sinistro
    draw_rectangle(-200, -150, 50, 30, "black")  # Guanto sinistro
    draw_rectangle(150, -150, 50, 100, "red")  # Braccio destro
    draw_rectangle(150, -150, 50, 30, "black")  # Guanto destro

    # Gambe e stivali
    draw_rectangle(-75, -400, 50, 150, "red")  # Gamba sinistra
    draw_rectangle(-75, -350, 50, 50, "black")  # Stivale sinistro
    draw_rectangle(25, -400, 50, 150, "red")  # Gamba destra
    draw_rectangle(25, -350, 50, 50, "black")  # Stivale destro

    # Barba
    santa.penup()
    santa.goto(0, 0)
    santa.pendown()
    santa.color("white")
    santa.begin_fill()
    santa.circle(70)
    santa.end_fill()
    screen.update()

    # Disegna il viso
    santa.penup()
    santa.goto(0, 20)
    santa.pendown()
    santa.color("peachpuff")
    santa.begin_fill()
    santa.circle(50)
    santa.end_fill()
    screen.update()

    # Barba Dettagli
    whereToGoOrizonatal = 0
    whereToGoUp = 10
    for i in range(7):
        santa.penup()
        santa.goto(whereToGoOrizonatal, whereToGoUp)
        santa.pendown()
        santa.color("white")
        santa.begin_fill()
        santa.circle(10)
        santa.end_fill()
        screen.update()
        whereToGoOrizonatal -= 10
        whereToGoUp += 5

    whereToGoOrizonatal = 0
    whereToGoUp = 10
    for i in range(7):
        santa.penup()
        santa.goto(whereToGoOrizonatal, whereToGoUp)
        santa.pendown()
        santa.color("white")
        santa.begin_fill()
        santa.circle(10)
        santa.end_fill()
        screen.update()
        whereToGoOrizonatal += 10
        whereToGoUp += 5

    # Disegna il cappello rosso
    santa.penup()
    santa.goto(-50, 100)
    santa.pendown()
    santa.color("red")
    santa.begin_fill()
    santa.goto(0, 250)
    screen.update()
    santa.goto(50, 100)
    screen.update()
    santa.goto(-50, 100)
    santa.end_fill()
    screen.update()

    # Pompon bianco del cappello
    santa.penup()
    santa.goto(0, 250)
    santa.pendown()
    santa.color("white")
    santa.begin_fill()
    santa.circle(15)
    santa.end_fill()
    screen.update()

    # Occhio sinistro
    santa.penup()
    santa.goto(-20, 80)
    santa.pendown()
    santa.color("black")
    santa.begin_fill()
    santa.circle(5)
    santa.end_fill()
    screen.update()

    # Occhio destro
    santa.penup()
    santa.goto(20, 80)
    santa.pendown()
    santa.begin_fill()
    santa.circle(5)
    santa.end_fill()
    screen.update()

    # Sorriso
    santa.penup()
    santa.goto(-20, 60)
    santa.pendown()
    santa.setheading(-60)
    santa.circle(20, 120)
    screen.update()

# Creazione e movimento della neve
def create_snowflakes(num):
    snowflakes = []
    for _ in range(num):
        snowflake = turtle.Turtle()
        snowflake.shape("circle")
        snowflake.color("white")
        snowflake.penup()
        snowflake.speed(0)
        snowflake.goto(random.randint(-400, 400), random.randint(-400, 400))
        snowflakes.append(snowflake)
    return snowflakes

def move_snowflakes(snowflakes):
    for snowflake in snowflakes:
        snowflake.sety(snowflake.ycor() - 5)
        if snowflake.ycor() < -400:
            snowflake.hideturtle()
            snowflake.goto(random.randint(-400, 400), 400)
            snowflake.showturtle()

# Inizializza la neve
snowflakes = create_snowflakes(50)

def main():
    draw_santa_claus()
    while True:
        move_snowflakes(snowflakes)
        screen.update()

main()
