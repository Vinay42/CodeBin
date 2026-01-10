#include <iostream>
#include <thread>   // Required for std::this_thread::sleep_for
#include <chrono>   // Required for std::chrono::seconds

int main() {
    int user_input;

    // 1. Take input from the user
    std::cout << "Please enter an integer: ";
    if (!(std::cin >> user_input)) { // Check if input is valid
        std::cerr << "Invalid input. Exiting." << std::endl;
        return 1;
    }
    std::cout << "Input received: " << user_input << std::endl;

    // 2. Wait for 5 seconds
    std::cout << "Waiting for 5 seconds before execution..." << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(5));

    // 3. Execute code after the delay
    std::cout << "\n5 seconds have passed. Executing code now." << std::endl;
    std::cout << "The result of (input * 2) is: " << user_input * 2 << std::endl;

    return 0;
}
