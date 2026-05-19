# Makefile
# --------
# Role: build recipe.
# It tells the compiler which files to compile and how to produce the final app.

CC = gcc
CFLAGS = -Wall -Wextra -std=c11 -Iinclude
TARGET = app

SOURCES = src/main.c src/greeter.c

all: $(TARGET)

$(TARGET): $(SOURCES)
	$(CC) $(CFLAGS) $(SOURCES) -o $(TARGET)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET) app.exe
