#include "db.h"

#include <stdio.h>
#include <string.h>

static const char *FIELD_NAMES[DB_COLS] = {
    "id",
    "name",
    "age",
    "city"
};

void db_init(Matrix db) {
    for (int row = 0; row < DB_ROWS; row++) {
        for (int col = 0; col < DB_COLS; col++) {
            db[row][col][0] = '\0';
        }
    }
}

int db_is_valid_row(int row_index) {
    return row_index >= 0 && row_index < DB_ROWS;
}

int db_is_valid_col(int col_index) {
    return col_index >= 0 && col_index < DB_COLS;
}

const char *db_field_name(int col_index) {
    if (!db_is_valid_col(col_index)) {
        return "unknown";
    }

    return FIELD_NAMES[col_index];
}

void db_insert_row(Matrix db, int row_index, Row row_buffer) {
    if (!db_is_valid_row(row_index)) {
        return;
    }

    for (int col = 0; col < DB_COLS; col++) {
        strncpy(db[row_index][col], row_buffer[col], FIELD_SIZE - 1);
        db[row_index][col][FIELD_SIZE - 1] = '\0';
    }
}

void db_update_field(Matrix db, int row_index, int col_index, const char value[FIELD_SIZE]) {
    if (!db_is_valid_row(row_index) || !db_is_valid_col(col_index)) {
        return;
    }

    strncpy(db[row_index][col_index], value, FIELD_SIZE - 1);
    db[row_index][col_index][FIELD_SIZE - 1] = '\0';
}

void db_print(Matrix db) {
    printf("\nTABLE\n");
    printf("row");

    for (int col = 0; col < DB_COLS; col++) {
        printf(" | %s", db_field_name(col));
    }

    printf("\n");

    for (int row = 0; row < DB_ROWS; row++) {
        printf("%d", row);

        for (int col = 0; col < DB_COLS; col++) {
            const char *value = db[row][col][0] == '\0' ? "NULL" : db[row][col];
            printf(" | %s", value);
        }

        printf("\n");
    }

    printf("\n");
}
