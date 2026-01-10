import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your name: ");
        System.out.flush();

        if (sc.hasNextLine()) {
            String name = sc.nextLine();
            System.out.println("Hello " + name);
        } else {
            System.out.println("No input received");
        }
    }
}
