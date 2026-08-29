#include "input.h"
#include "db.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static void remove_newline(char text[FIELD_SIZE]) {
    text[strcspn(text, "\n")] = '\0';
}

int input_read_int(const char *label) {
    char buffer[FIELD_SIZE];
    char *end = NULL;

    input_read_line(label, buffer);

    long value = strtol(buffer, &end, 10);

    if (end == buffer || *end != '\0') {
        return -1;
    }

    return (int)value;
}

void input_read_line(const char *label, char output[FIELD_SIZE]) {
    printf("%s", label);

    if (fgets(output, FIELD_SIZE, stdin) == NULL) {
        output[0] = '\0';
        return;
    }

    remove_newline(output);
}

void input_read_row_buffer(Row row_buffer) {
    for (int col = 0; col < DB_COLS; col++) {
        row_buffer[col][0] = '\0';
    }

    for (int col = 0; col < DB_COLS; col++) {
        char label[FIELD_SIZE];
        snprintf(label, FIELD_SIZE, "%s: ", db_field_name(col));
        input_read_line(label, row_buffer[col]);
    }
}
