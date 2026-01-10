# Get the user's name as a string
name = input("Enter your name: ")

# Get the user's age as an integer (input() returns a string by default, so we use int() for conversion)
age = int(input("Enter your age: "))

# Print a greeting using an f-string for formatting
print(f"Hello, {name}!")

# Calculate age in five years and print the result
age_in_five_years = age + 5
print(f"In five years, you will be {age_in_five_years} years old.")
