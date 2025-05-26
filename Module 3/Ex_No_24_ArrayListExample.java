import java.util.ArrayList;
import java.util.Scanner;

public class Ex_No_24_ArrayListExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<String> names = new ArrayList<>();
        String input;

        System.out.println("Enter names (type 'exit' to stop):");
        while (true) {
            input = sc.nextLine();
            if (input.equalsIgnoreCase("exit")) break;
            names.add(input);
        }

        System.out.println("Names entered:");
        for (String name : names) {
            System.out.println(name);
        }
    }
}
