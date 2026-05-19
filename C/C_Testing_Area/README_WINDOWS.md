# Basic C Skeleton for Windows

This is the same tiny C project, but with Windows-friendly scripts.

## Files and roles

```text
include/greeter.h   -> interface / contract
src/greeter.c       -> implementation of the greeter module
src/main.c          -> entry point and coordinator
build.bat           -> compiles the project with GCC / MinGW-w64
run.bat             -> runs the compiled app
clean.bat           -> removes build output
build_msvc.bat      -> optional Visual Studio compiler build script
.vscode/tasks.json  -> optional VS Code build/run tasks
Makefile            -> still useful on Linux, macOS, WSL, or Git Bash with make
```

## Recommended Windows setup

Install one of these:

1. **MSYS2 / MinGW-w64** for `gcc`
2. **Visual Studio Community** for `cl`
3. **WSL** if you prefer Linux-style commands on Windows

The simplest for this project is **GCC / MinGW-w64**.

## Build with GCC on Windows

Open Command Prompt or PowerShell inside this folder and run:

```bat
build.bat
```

Then run:

```bat
run.bat
```

You should see:

```text
Hello, C learner!
```

## Clean

```bat
clean.bat
```

## Manual GCC command

The script basically runs this:

```bat
gcc src\main.c src\greeter.c -Iinclude -Wall -Wextra -o build\app.exe
```

Meaning:

```text
src\main.c       -> program entry point
src\greeter.c    -> module implementation
-Iinclude        -> tells compiler where to find .h files
-o build\app.exe -> output executable
```

## Optional: build with Visual Studio compiler

Open **Developer Command Prompt for VS** inside this folder and run:

```bat
build_msvc.bat
```

This uses Microsoft `cl` instead of GCC.
