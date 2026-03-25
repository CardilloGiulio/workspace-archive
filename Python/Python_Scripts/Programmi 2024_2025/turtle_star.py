import turtle

screen = turtle.Screen()
screen.bgcolor("white") 
screen.title("Stella gialla con Turtle")

star = turtle.Turtle()
star.speed(3)  
star.color("yellow")  
star.fillcolor("yellow") 
star.pensize(2)

star.begin_fill()
for _ in range(5):
    star.forward(150) 
    star.right(144)
star.end_fill()

star.hideturtle()
screen.mainloop()
