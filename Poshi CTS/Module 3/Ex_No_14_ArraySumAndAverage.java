import java.util.Scanner;

public class Ex_No_14_ArraySumAndAverage {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] numbers = new int[5];
        int sum = 0;

        System.out.println("Enter 5 numbers:");
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = sc.nextInt();
            sum += numbers[i];
        }

        double average = (double) sum / numbers.length;
        System.out.println("Sum: " + sum);
        System.out.println("Average: " + average);
    }
}
