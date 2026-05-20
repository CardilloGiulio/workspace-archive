#include <stdio.h>
#include "greeter.h"

void insert_value_student(int* arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("Inserisci un numero: ");
        scanf("%d", &arr[i]);
    }
}

bool check_condition(int num) {
    return num > 0;
}

void menu() {
    printf("1. Inserisci dati studente\n");
    printf("2. Visualizza tutti i dati\n");
    printf("3. Calcola e visualizza i punteggi totali\n");
    printf("4. Visualizza media dei punteggi per ogni prova\n");
    printf("5. Modifica il punteggio di uno studente\n");
}

int decision() {
    int choice;
    printf("Scegli un'opzione: ");
    scanf("%d", &choice);
    return choice;
}

bool exit_program() {
    return true;
}