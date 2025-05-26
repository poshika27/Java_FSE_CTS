import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Ex_No_31_BasicJDBCConnection {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/testdb"; // Adjust DB name and credentials
        String user = "root";
        String password = "password";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM students");

            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id") + ", Name: " + rs.getString("name"));
            }

            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            System.out.println("Database error: " + e.getMessage());
        }
    }
}
