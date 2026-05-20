#ifndef GREETER_H
#define GREETER_H
#define CODES 0
#define NAMES 1
#define surnames 2
#define totals 3

#define THEORY 0
#define PRATICAL 1
#define BONUS 2


void insert_value_student(int* arr, int size);

void print_all_values(int* arr, int size);

bool check_condition(int num);

void menu();

int decision();

bool exit_program();



#endif
