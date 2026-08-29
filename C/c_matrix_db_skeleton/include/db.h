#ifndef DB_H
#define DB_H

#include "config.h"

void db_init(Matrix db);
int db_is_valid_row(int row_index);
int db_is_valid_col(int col_index);
const char *db_field_name(int col_index);
void db_insert_row(Matrix db, int row_index, Row row_buffer);
void db_update_field(Matrix db, int row_index, int col_index, const char value[FIELD_SIZE]);
void db_print(Matrix db);

#endif
