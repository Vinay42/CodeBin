#include <iostream>
#include <string>

// use the standard namespace to avoid writing std:: before cin and cout
using namespace std;

int main() {
    // Declare a variable to store user input
    int userNumber;

    // Output prompt to the user
    cout << "Enter a whole number: ";

    // Read input from the keyboard and store it in the 'userNumber' variable
    cin >> userNumber;

    // Output the stored value back to the user
    cout << "You entered: " << userNumber << endl;

    // Indicate successful program termination
    return 0;
}