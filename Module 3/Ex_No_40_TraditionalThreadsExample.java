public class Ex_No_40_TraditionalThreadsExample {
    public static void main(String[] args) throws InterruptedException {
        long start = System.currentTimeMillis();

        Thread[] threads = new Thread[1000];

        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(() -> {
                System.out.println("Hello from thread!");
            });
            threads[i].start();
        }

        for (Thread t : threads) {
            t.join();
        }

        long end = System.currentTimeMillis();
        System.out.println("Time taken with traditional threads: " + (end - start) + " ms");
    }
}
