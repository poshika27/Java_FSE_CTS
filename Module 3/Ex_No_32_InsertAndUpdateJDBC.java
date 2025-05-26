import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class Ex_No_32_InsertAndUpdateJDBC {
    private static final String URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String USER = "root";
    private static final String PASS = "password";

    public static void insertStudent(int id, String name) {
        String sql = "INSERT INTO students (id, name) VALUES (?, ?)";

        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.setString(2, name);
            int rows = pstmt.executeUpdate();
            System.out.println(rows + " row(s) inserted.");
        } catch (Exception e) {
            System.out.println("Insert error: " + e.getMessage());
        }
    }

    public static void updateStudentName(int id, String newName) {
        String sql = "UPDATE students SET name = ? WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, newName);
            pstmt.setInt(2, id);
            int rows = pstmt.executeUpdate();
            System.out.println(rows + " row(s) updated.");
        } catch (Exception e) {
            System.out.println("Update error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        insertStudent(101, "John");
        updateStudentName(101, "John Smith");
    }
}
