public class Ex_No_30_PatternMatchingSwitch {
    public static void checkObjectType(Object obj) {
        if (obj == null) {
            System.out.println("Null object");
        } else if (obj instanceof Integer i) {
            System.out.println("Integer with value " + i);
        } else if (obj instanceof String s) {
            System.out.println("String with value " + s);
        } else if (obj instanceof Double d) {
            System.out.println("Double with value " + d);
        } else {
            System.out.println("Unknown type");
        }
    }

    public static void main(String[] args) {
        checkObjectType(123);
        checkObjectType("Hello");
        checkObjectType(45.67);
        checkObjectType(null);
        checkObjectType(true);
    }
}
