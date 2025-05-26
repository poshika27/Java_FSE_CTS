import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class Ex_No_22_FileWriting {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter text to write to file: ");
        String text = sc.nextLine();

        try (FileWriter writer = new FileWriter("output.txt")) {
            writer.write(text);
            System.out.println("Data written to output.txt");
        } catch (IOException e) {
            System.out.println("An error occurred while writing to the file.");
        }
    }
}
