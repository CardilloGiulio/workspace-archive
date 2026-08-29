CC = gcc
CFLAGS = -Wall -Wextra -Wpedantic -std=c11 -Iinclude
SRC = src/main.c src/app.c src/db.c src/input.c
TARGET = matrix_db.exe

all:
	$(CC) $(CFLAGS) $(SRC) -o $(TARGET)

clean:
	rm -f $(TARGET)
