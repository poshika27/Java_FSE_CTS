import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class Ex_No_33_JDBCDelete {
    private static final String URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String USER = "root";
    private static final String PASS = "password";

    public static void deleteStudent(int id) {
        String sql = "DELETE FROM students WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            int rows = pstmt.executeUpdate();
            System.out.println(rows + " row(s) deleted.");
        } catch (Exception e) {
            System.out.println("Delete error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        deleteStudent(101);
    }
}
