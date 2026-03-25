import turtle

screen = turtle.Screen()
screen.bgcolor("skyblue") 
screen.title("Stella gialla con Turtle")

star = turtle.Turtle()
star.speed(3)  
star.color("black")  
star.fillcolor("blue") 
star.pensize(2)
star.begin_fill()

for _ in range(4):
    star.forward(150) 
    star.right(90)
star.end_fill()
star.fillcolor("red")
star.begin_fill()

star.left(45)
for i in range(2):
    star.forward(105)
    star.right(90)

star.end_fill()

star.penup()

star.goto(500, -150)
star.pendown()
star.fillcolor("green")
star.begin_fill()
star.right(45)
for _ in range(4):
    star.forward(1000) 
    star.left(90)

star.end_fill()


star.hideturtle()
screen.mainloop()
