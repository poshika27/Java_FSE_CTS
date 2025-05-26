import java.io.*;
import java.net.*;

public class Ex_No_35_TCPClient {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 5000);
        System.out.println("Connected to server.");

        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

        BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));

        String serverMsg, clientMsg;
        while (true) {
            System.out.print("You: ");
            clientMsg = userInput.readLine();
            out.println(clientMsg);
            if (clientMsg.equalsIgnoreCase("bye")) break;

            serverMsg = in.readLine();
            System.out.println("Server: " + serverMsg);
        }

        socket.close();
    }
}
