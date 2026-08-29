# C Matrix DB Table Skeleton

This is a minimal C console application where the matrix behaves like a tiny fixed-size SQL-style table.

## Concept

```text
DB matrix row <- temporary row array <- user input
```

The matrix has rows and columns:

```text
row | id | name | age | city
```

Each row is treated like a record/object.
Each column is treated like a field.
An empty string is displayed as `NULL`.

## Commands

```text
1) POST row     Insert a full temporary row array into a specific matrix row
2) PATCH field  Insert/update only one field in a specific row and column
3) PRINT table  Show the matrix as a table
0) EXIT
```

## Direct build command on Windows/MSYS2

```bash
gcc -Wall -Wextra -Wpedantic -std=c11 -Iinclude src/main.c src/app.c src/db.c src/input.c -o matrix_db.exe
```

Run:

```bash
./matrix_db.exe
```

## Build with make

```bash
make
```

## Structure

```text
include/config.h  Shared constants and matrix/row/field types
include/db.h      DB abstraction functions
include/input.h   Input abstraction functions
include/app.h     Application entry point
src/main.c        Starts the app
src/app.c         Menu orchestration only
src/db.c          Matrix/table logic only
src/input.c       User input logic only
```

## SOLID-style separation

- `main.c` only starts the application.
- `app.c` orchestrates the menu.
- `input.c` reads and cleans user input.
- `db.c` owns all matrix/table operations.
- The temporary array is local and delivered immediately into a chosen matrix row.
- Empty fields are intentionally stored as empty strings and shown as `NULL`.
