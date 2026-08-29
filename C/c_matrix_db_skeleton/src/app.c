#include "app.h"

#include "config.h"
#include "db.h"
#include "input.h"

#include <stdio.h>

static void print_menu(void) {
    printf("1) POST row\n");
    printf("2) PATCH field\n");
    printf("3) PRINT table\n");
    printf("0) EXIT\n");
}

static void post_row(Matrix db) {
    Row row_buffer;
    int row_index = input_read_int("Target row index: ");

    if (!db_is_valid_row(row_index)) {
        printf("Invalid row. Use 0 to %d.\n\n", DB_ROWS - 1);
        return;
    }

    printf("Insert values. Press ENTER to keep a field NULL.\n");
    input_read_row_buffer(row_buffer);
    db_insert_row(db, row_index, row_buffer);
}

static void patch_field(Matrix db) {
    char value[FIELD_SIZE];
    int row_index = input_read_int("Target row index: ");
    int col_index = input_read_int("Target column index: ");

    if (!db_is_valid_row(row_index)) {
        printf("Invalid row. Use 0 to %d.\n\n", DB_ROWS - 1);
        return;
    }

    if (!db_is_valid_col(col_index)) {
        printf("Invalid column. Use 0 to %d.\n\n", DB_COLS - 1);
        return;
    }

    printf("Column %d is '%s'. Press ENTER to set NULL.\n", col_index, db_field_name(col_index));
    input_read_line("Value: ", value);
    db_update_field(db, row_index, col_index, value);
}

void app_run(void) {
    Matrix db;
    int running = 1;

    db_init(db);

    while (running) {
        print_menu();

        int choice = input_read_int("Choice: ");

        switch (choice) {
            case 1:
                post_row(db);
                break;
            case 2:
                patch_field(db);
                break;
            case 3:
                db_print(db);
                break;
            case 0:
                running = 0;
                break;
            default:
                printf("Unknown option.\n\n");
                break;
        }
    }
}
