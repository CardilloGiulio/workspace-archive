#!/usr/bin/env python3
"""
Message Counter from .txt files inside input_to_scan

Input:
    Folder named input_to_scan, placed in the same directory as this Python file.

Target:
    Count messages in every .txt file.

Filter:
    Count only lines that begin with:
        day/month/year, hour:minutes

Supported examples:
    20/05/2026, 09:04
    20/05/26, 9:04
    1/2/2026 14:30

Architecture:
    - Small menu
    - Separate functions
    - One main() orchestrator at the end
    - Dependency-free progress bar
    - Scans .txt files one by one
"""

from __future__ import annotations

import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path


# -----------------------------
# Configuration / Models
# -----------------------------

INPUT_FOLDER_NAME = "input_to_scan"

MESSAGE_START_PATTERN = re.compile(
    r"^\s*\d{1,2}/\d{1,2}/\d{2,4},?\s+\d{1,2}:\d{2}\b"
)


@dataclass
class ScanResult:
    file_path: Path
    total_lines: int
    scanned_bytes: int
    matched_messages: int


@dataclass
class FolderScanResult:
    folder_path: Path
    files_scanned: int
    total_lines: int
    total_messages: int
    file_results: list[ScanResult]


# -----------------------------
# Terminal UI
# -----------------------------

def clear_screen() -> None:
    """Clear the terminal screen."""
    os.system("cls" if os.name == "nt" else "clear")


def print_header() -> None:
    """Print the application header."""
    print("=" * 70)
    print("TXT MESSAGE COUNTER")
    print("=" * 70)
    print(f"Input folder: {INPUT_FOLDER_NAME}")
    print("Counts only messages that begin with:")
    print("day/month/year, hour:minutes")
    print("Example: 20/05/2026, 09:04")
    print("=" * 70)


def pause() -> None:
    """Wait for the user before continuing."""
    input("\nPress ENTER to continue...")


def print_menu() -> None:
    """Print the main menu."""
    print("\nMENU")
    print(f"1) Scan all .txt files inside '{INPUT_FOLDER_NAME}'")
    print("2) Exit")


def read_menu_choice() -> str:
    """Read the user's menu choice."""
    return input("\nChoose an option: ").strip()


def render_progress_bar(
    scanned_bytes: int,
    total_bytes: int,
    matched_messages: int,
    width: int = 30,
) -> None:
    """
    Render a progress bar showing:
    - percentage of current file scanned
    - scanned bytes
    - total bytes
    - filtered/matched messages found in the current file
    """
    if total_bytes <= 0:
        percent = 100
        filled = width
    else:
        percent = min(100, int((scanned_bytes / total_bytes) * 100))
        filled = min(width, int((scanned_bytes / total_bytes) * width))

    bar = "#" * filled + "-" * (width - filled)

    print(
        f"\rScanning: [{bar}] {percent:3d}% "
        f"| {scanned_bytes}/{total_bytes} bytes "
        f"| filtered messages: {matched_messages}",
        end="",
        flush=True,
    )


# -----------------------------
# Path Management
# -----------------------------

def get_script_directory() -> Path:
    """
    Return the directory where this Python file is located.

    This is better than using the current terminal directory,
    because the script will always look beside itself.
    """
    return Path(__file__).resolve().parent


def get_input_folder_path() -> Path:
    """Return the expected input_to_scan folder path."""
    return get_script_directory() / INPUT_FOLDER_NAME


def validate_input_folder(folder_path: Path) -> None:
    """
    Validate that input_to_scan exists and is a directory.

    Raises:
        FileNotFoundError
        NotADirectoryError
    """
    if not folder_path.exists():
        raise FileNotFoundError(
            f"The folder '{INPUT_FOLDER_NAME}' does not exist.\n"
            f"Create it here:\n{folder_path}"
        )

    if not folder_path.is_dir():
        raise NotADirectoryError(
            f"'{INPUT_FOLDER_NAME}' exists, but it is not a folder:\n{folder_path}"
        )


def find_txt_files(folder_path: Path) -> list[Path]:
    """
    Find only .txt files directly inside input_to_scan.

    It does not scan subfolders.
    """
    return sorted(
        file_path
        for file_path in folder_path.iterdir()
        if file_path.is_file() and file_path.suffix.lower() == ".txt"
    )


# -----------------------------
# Message Detection
# -----------------------------

def is_message_start(line: str) -> bool:
    """
    Return True if the line begins with:
        day/month/year, hour:minutes

    The comma after the year is optional to allow slightly different exports.
    """
    return bool(MESSAGE_START_PATTERN.match(line))


# -----------------------------
# File Scanning
# -----------------------------

def get_file_size(file_path: Path) -> int:
    """Return file size in bytes."""
    return file_path.stat().st_size


def count_messages_in_txt(file_path: Path) -> ScanResult:
    """
    Scan one .txt file line by line and count messages matching the required format.

    The file is read in text mode with utf-8.
    Encoding errors are replaced so that the scan does not crash
    on imperfect exported files.
    """
    total_bytes = get_file_size(file_path)
    scanned_bytes = 0
    total_lines = 0
    matched_messages = 0

    print(f"\nFile: {file_path.name}")
    render_progress_bar(scanned_bytes, total_bytes, matched_messages)

    with file_path.open("r", encoding="utf-8", errors="replace") as file:
        for line in file:
            total_lines += 1

            # Approximate bytes scanned.
            # This is good enough for a terminal progress bar.
            scanned_bytes += len(line.encode("utf-8", errors="replace"))

            if is_message_start(line):
                matched_messages += 1

            render_progress_bar(
                min(scanned_bytes, total_bytes),
                total_bytes,
                matched_messages,
            )

    print()  # finish progress bar line

    return ScanResult(
        file_path=file_path,
        total_lines=total_lines,
        scanned_bytes=min(scanned_bytes, total_bytes),
        matched_messages=matched_messages,
    )


def scan_txt_files_one_by_one(folder_path: Path, txt_files: list[Path]) -> FolderScanResult:
    """
    Scan all .txt files one by one and collect their results.
    """
    file_results: list[ScanResult] = []

    for index, file_path in enumerate(txt_files, start=1):
        print("\n" + "-" * 70)
        print(f"Processing file {index} of {len(txt_files)}")
        result = count_messages_in_txt(file_path)
        file_results.append(result)

    total_lines = sum(result.total_lines for result in file_results)
    total_messages = sum(result.matched_messages for result in file_results)

    return FolderScanResult(
        folder_path=folder_path,
        files_scanned=len(file_results),
        total_lines=total_lines,
        total_messages=total_messages,
        file_results=file_results,
    )


# -----------------------------
# Output
# -----------------------------

def print_file_result(result: ScanResult) -> None:
    """Print the result for one file."""
    print(
        f"{result.file_path.name} "
        f"| lines: {result.total_lines} "
        f"| messages: {result.matched_messages}"
    )


def print_folder_scan_result(result: FolderScanResult) -> None:
    """Print the final result of the folder scan."""
    print("\n" + "=" * 70)
    print("FINAL RESULT")
    print("=" * 70)
    print(f"Folder: {result.folder_path}")
    print(f"Files scanned: {result.files_scanned}")
    print(f"Total lines scanned: {result.total_lines}")
    print(f"Total messages counted: {result.total_messages}")

    print("\nDETAIL BY FILE")
    print("-" * 70)

    for file_result in result.file_results:
        print_file_result(file_result)

    print("=" * 70)


def print_error(error: Exception) -> None:
    """Print an error message in a readable way."""
    print("\nERROR")
    print("-" * 70)
    print(error)
    print("-" * 70)


# -----------------------------
# Application Actions
# -----------------------------

def run_folder_scan_flow() -> None:
    """
    Flow for:
    - locating input_to_scan
    - validating the folder
    - finding .txt files
    - scanning them one by one
    - printing the final result
    """
    try:
        folder_path = get_input_folder_path()
        validate_input_folder(folder_path)

        txt_files = find_txt_files(folder_path)

        if not txt_files:
            print(
                f"\nNo .txt files found inside:\n{folder_path}\n\n"
                "Add one or more .txt files and run the scan again."
            )
            pause()
            return

        print(f"\nFound {len(txt_files)} .txt file(s) inside:")
        print(folder_path)

        result = scan_txt_files_one_by_one(folder_path, txt_files)
        print_folder_scan_result(result)

    except Exception as error:
        print_error(error)

    pause()


def run_menu_loop() -> None:
    """Run the main menu loop."""
    while True:
        clear_screen()
        print_header()
        print_menu()

        choice = read_menu_choice()

        if choice == "1":
            run_folder_scan_flow()
        elif choice == "2":
            print("\nGoodbye.")
            break
        else:
            print("\nInvalid option.")
            pause()


# -----------------------------
# Main Orchestrator
# -----------------------------

def main() -> None:
    """
    Main orchestrator.

    This is intentionally kept small:
    it delegates the work to the menu loop.
    """
    try:
        run_menu_loop()
    except KeyboardInterrupt:
        print("\n\nInterrupted by user.")
        sys.exit(0)


if __name__ == "__main__":
    main()
