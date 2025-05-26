import java.io.*;
import java.net.*;

public class Ex_No_35_TCPServer {
    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(5000);
        System.out.println("Server started. Waiting for client...");

        Socket client = server.accept();
        System.out.println("Client connected.");

        BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
        PrintWriter out = new PrintWriter(client.getOutputStream(), true);

        BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));

        String clientMsg, serverMsg;
        while ((clientMsg = in.readLine()) != null) {
            System.out.println("Client: " + clientMsg);
            System.out.print("You: ");
            serverMsg = userInput.readLine();
            out.println(serverMsg);
            if (serverMsg.equalsIgnoreCase("bye")) break;
        }

        client.close();
        server.close();
    }
}
