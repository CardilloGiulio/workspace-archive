#include <stdio.h>
#include "greeter.h"

void display_menu() {
    printf("Welcome to the Greeter Program!\n");
    printf("1. Calculate Sum numbers\n");
    printf("2. Exit\n");
}

int get_user_choice() {
    int choice;
    printf("Enter your choice: ");
    scanf("%d", &choice);
    return choice;
}

int exit_program() {
    printf("Exiting the program. Goodbye!\n");
    return 1;
}