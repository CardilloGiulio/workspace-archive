#include "greeter.h"
#include <stdlib.h>

#include <stdio.h>

int main(void) {
    char num1 [10];
    char num2 [10];

    greet("C learner");

    printf("Scrivi due numeri da sommare\n");
    printf("Scrivi il primo numero: \n");
    fgets(num1, sizeof(num1), stdin);
    printf("Scrivi il secondo numero: \n");
    fgets(num2, sizeof(num2), stdin);

    int num1elaborate = (int)strtol(num1, NULL, 10);

    int num2elaborate = (int)strtol(num2, NULL, 10);


    int sum = add(num1elaborate, num2elaborate);

    printf("La somma e': %d\n", sum);

    getchar();



    return 0;
}