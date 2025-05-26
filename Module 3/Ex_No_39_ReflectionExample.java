import java.lang.reflect.Method;

public class Ex_No_39_ReflectionExample {
    public void greet(String name) {
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args) throws Exception {
        Class<?> clazz = Class.forName("Ex_No_39_ReflectionExample");
        Method[] methods = clazz.getDeclaredMethods();

        for (Method m : methods) {
            System.out.println("Method: " + m.getName() + ", Parameters: " + m.getParameterCount());
        }

        Object instance = clazz.getDeclaredConstructor().newInstance();
        Method greetMethod = clazz.getDeclaredMethod("greet", String.class);
        greetMethod.invoke(instance, "Abishek");
    }
}
