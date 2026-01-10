#include <iostream>

int main() {
    int userNumber;

    // Output: Prompts the user to enter a number
    std::cout << "Enter a whole number: ";

    // Input: Reads the number entered by the user
    std::cin >> userNumber;

    // Output: Displays the number the user entered
    std::cout << "You entered: " << userNumber << std::endl;

    return 0;
}
