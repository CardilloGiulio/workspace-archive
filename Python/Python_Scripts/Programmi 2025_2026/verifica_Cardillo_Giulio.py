# Import libraries
import random

# Exercise 1
def numbers_before_n(n):
    return list(range(n))

def sum_of_list(numbers_list):
    return sum(numbers_list)

def number_of_even_numbers_in_list(numbers_list):
    return len([number for number in numbers_list if number % 2 == 0])

def exercise1():
    n = int(input("Enter a positive integer n: "))
    numbers_list = numbers_before_n(n)
    
    number_even_numbers = number_of_even_numbers_in_list(numbers_list)
    total_sum = sum_of_list(numbers_list)
    
    print(f"Number of even numbers before {n}: {number_even_numbers}")
    print(f"Numbers before {n}: {numbers_list}")
    print(f"Sum of all numbers: {total_sum}")

# Exercise 2

def add_new_number(numbers_list, new_number):
    numbers_list.append(new_number)
    return numbers_list

def count_even_numbers(numbers_list):
    return sum(1 for number in numbers_list if number % 2 == 0)

def find_maximum_number(numbers_list):
    return max(numbers_list)

def count_numbers_greater_than_50(numbers_list):
    return sum(1 for number in numbers_list if number > 50)

def check_if_number_isnt_0(number):
    return number != 0

def check_if_number_is_positive(number):
    return number > 0

def sum__step_by_step_all_numbers_in_list(numbers_list):
    total_sum = 0
    for number in numbers_list:
        total_sum += number
        print(f"Current sum: {total_sum}")
    return total_sum

def exercise2():
    numbers = []
    while True:
        user_input = int(input("Enter a positive number (0 to stop): "))
        if not check_if_number_isnt_0(user_input):
            break
        if not check_if_number_is_positive(user_input):
            print("Please enter a positive number.")
            continue
        add_new_number(numbers, user_input)
        
        print(f"Total even numbers: {count_even_numbers(numbers)}")
        print(f"Maximum number: {find_maximum_number(numbers)}")
        print(f"Numbers greater than 50: {count_numbers_greater_than_50(numbers)}")
        total_sum = sum__step_by_step_all_numbers_in_list(numbers)
        print(f"Final sum of all numbers: {total_sum}")

# Exercise 3

def launch_dice():
    return random.randint(1, 6)

def roll_the_dice(target_number):
    roll_count = 0
    list_of_rolls = []
    
    while True:
        roll = launch_dice()
        print(f"Dice rolled: {roll}")
        list_of_rolls.append(roll)
        roll_count += 1
        if roll_count == target_number:
            break
    return list_of_rolls

def total_sum_of_rolls(rolls):
    return sum(rolls)

def highest_roll(rolls):
    return max(rolls)

def avarage_of_rolls(rolls):
    return sum(rolls) / len(rolls)
    
def percentage_six(rolls):
    return (rolls.count(6) / len(rolls)) * 100
    
def exercise3():
    target_number = int(input("Enter the number of dice rolls: "))
    rolls = roll_the_dice(target_number)
    
    print(f"Dice rolls: {rolls}")
    print(f"Number of sixes rolled: {rolls.count(6)}")
    print(f"Total sum of rolls: {total_sum_of_rolls(rolls)}")
    print(f"Highest roll: {highest_roll(rolls)}")
    print(f"Average of rolls: {avarage_of_rolls(rolls)}")
    print(f"Percentage of sixes: {percentage_six(rolls):.2f}%")

# Menu to decice which exercise to run

def display_menu():
    print("Select an exercise to run:")
    print("1. Exercise 1 - Even and full sum of numbers before a given number")
    print("2. Exercise 2 - Analyze a list of positive numbers")
    print("3. Exercise 3 - Dice Rolling Simulation")
    print("4. Exit")
    choice = input("Enter your choice (1-4): ")
    return choice

# Main execution

def main():
    while True:
        choice = display_menu()
        if choice == '1':
            exercise1()
        elif choice == '2':
            exercise2()
        elif choice == '3':
            exercise3()
        elif choice == '4':
            print("Exiting the program.")
            break
        else:
            print("Invalid choice. Please select a valid option.")

main()