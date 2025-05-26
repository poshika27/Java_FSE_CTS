import java.util.concurrent.*;

public class Ex_No_41_ExecutorServiceCallable {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(5);

        Callable<String> task1 = () -> "Result from Task 1";
        Callable<String> task2 = () -> "Result from Task 2";

        Future<String> future1 = executor.submit(task1);
        Future<String> future2 = executor.submit(task2);

        System.out.println(future1.get());
        System.out.println(future2.get());

        executor.shutdown();
    }
}
