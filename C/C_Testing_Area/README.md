# Extreme Basic C Skeleton

This is a tiny C project meant to show the role of each file.

## File roles

```text
c_skeleton_basic/
├── include/
│   └── greeter.h      -> The public interface: says what functions exist.
├── src/
│   ├── main.c         -> The entry point: coordinates the program flow.
│   └── greeter.c      -> The implementation: contains the real function code.
├── Makefile           -> Build instructions: tells the compiler what to compile.
└── README.md          -> Explanation and usage notes.
```

## Mental model

- `main.c` is the **collector/coordinator**.
- `greeter.h` is the **contract/interface**.
- `greeter.c` is the **actual service/module**.
- `Makefile` is the **build recipe**.

In C, the `.h` file does not contain the full service logic. It tells other files what functions are available.
The `.c` file contains the real logic.

## Build and run with Make

From this folder:

```bash
make
./app
```

Or just:

```bash
make run
```

Clean generated files:

```bash
make clean
```

## Build manually without Make

Linux/macOS:

```bash
gcc -Wall -Wextra -std=c11 -Iinclude src/main.c src/greeter.c -o app
./app
```

Windows with MinGW-w64:

```bash
gcc -Wall -Wextra -std=c11 -Iinclude src/main.c src/greeter.c -o app.exe
app.exe
```

## What to edit first

1. Open `src/main.c` and change the program flow.
2. Open `include/greeter.h` and add a new function declaration.
3. Open `src/greeter.c` and implement that function.
4. Add a call to the new function inside `main.c`.

Example idea:

```c
void say_goodbye(const char *name);
```

## Windows users

Use the Windows scripts:

```bat
build.bat
run.bat
clean.bat
```

For more detail, read `README_WINDOWS.md`.
