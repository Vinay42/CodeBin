#include <iostream>

int main() {
    int userNumber;

    // Output a prompt to the user
    std::cout << "Enter an integer: ";

    // Read the input from the keyboard and store it in userNumber
    std::cin >> userNumber;

    // Output the stored number back to the user
    std::cout << "You entered: " << userNumber << std::endl;

    return 0; 
}
