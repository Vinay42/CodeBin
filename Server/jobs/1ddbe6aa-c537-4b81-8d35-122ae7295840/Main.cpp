#include <iostream>  // Required for cin and cout
using namespace std; // Allows using cout/cin without the std:: prefix

int main() {
    int number;

    // Output: Asking the user for input
    cout << "Enter an integer: ";

    // Input: Reading user entry and storing it in 'number'
    cin >> number;

    // Output: Displaying the result
    cout << "You entered: " << number << endl;

    return 0;
}
