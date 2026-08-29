#ifndef CONFIG_H
#define CONFIG_H

#define DB_ROWS 5
#define DB_COLS 4
#define FIELD_SIZE 32

typedef char Field[FIELD_SIZE];
typedef Field Row[DB_COLS];
typedef Row Matrix[DB_ROWS];

typedef enum {
    FIELD_ID = 0,
    FIELD_NAME = 1,
    FIELD_AGE = 2,
    FIELD_CITY = 3
} FieldIndex;

#endif
