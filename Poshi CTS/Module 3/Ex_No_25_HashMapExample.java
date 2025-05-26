import java.util.HashMap;
import java.util.Scanner;

public class Ex_No_25_HashMapExample {
    public static void main(String[] args) {
        HashMap<Integer, String> students = new HashMap<>();
        Scanner sc = new Scanner(System.in);

        System.out.println("Add student entries (ID and Name). Type ID as -1 to stop.");
        while (true) {
            System.out.print("Enter ID: ");
            int id = sc.nextInt();
            sc.nextLine(); // consume newline
            if (id == -1) break;

            System.out.print("Enter Name: ");
            String name = sc.nextLine();
            students.put(id, name);
        }

        System.out.print("Enter ID to search: ");
        int searchId = sc.nextInt();

        if (students.containsKey(searchId)) {
            System.out.println("Name: " + students.get(searchId));
        } else {
            System.out.println("ID not found.");
        }
    }
}
