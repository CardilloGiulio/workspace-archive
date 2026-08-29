#ifndef INPUT_H
#define INPUT_H

#include "config.h"

int input_read_int(const char *label);
void input_read_line(const char *label, char output[FIELD_SIZE]);
void input_read_row_buffer(Row row_buffer);

#endif
