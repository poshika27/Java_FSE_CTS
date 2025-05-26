class MessagePrinter extends Thread {
    private String message;

    MessagePrinter(String message) {
        this.message = message;
    }

    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(message + " - " + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                // Ignore
            }
        }
    }
}

public class Ex_No_26_ThreadCreation {
    public static void main(String[] args) {
        Thread t1 = new MessagePrinter("Thread 1");
        Thread t2 = new MessagePrinter("Thread 2");

        t1.start();
        t2.start();
    }
}
