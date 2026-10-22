<%@ page import="java.sql.*"%>
<%
    String name = request.getParameter("username");
    String pass = request.getParameter("pass");
    String age = request.getParameter("age");
    String city = request.getParameter("city");
    String email = request.getParameter("email");
    String occasion = request.getParameter("occasion");
    String course = request.getParameter("course");
    String fees = request.getParameter("fees");

    String dbUrl = System.getenv("DB_URL") != null ? System.getenv("DB_URL") : "jdbc:mysql://localhost:3306/student?useSSL=false&allowPublicKeyRetrieval=true";
    String dbUser = System.getenv("DB_USER") != null ? System.getenv("DB_USER") : "root";
    String dbPass = System.getenv("DB_PASS") != null ? System.getenv("DB_PASS") : "vedant";

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

        String sql = "INSERT INTO bookdb (name, pass, age, city, email, occasion, course, fees) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        PreparedStatement pst = con.prepareStatement(sql);
        pst.setString(1, name);
        pst.setString(2, pass);
        pst.setInt(3, (age != null && !age.trim().isEmpty()) ? Integer.parseInt(age.trim()) : 0);
        pst.setString(4, city);
        pst.setString(5, email);
        pst.setString(6, occasion);
        pst.setString(7, course);
        pst.setString(8, fees);

        int i = pst.executeUpdate();
        if (i == 1) {
            response.sendRedirect("Books.jsp?user=" + java.net.URLEncoder.encode(name != null ? name : "", "UTF-8"));
        } else {
            out.println("<h3 style='color:red;'>Booking could not be saved. <a href='Book.jsp'>Back</a></h3>");
        }

        pst.close();
        con.close();
    } catch(Exception e) {
        out.println("<h3 style='color:red;'>Error saving booking: " + e.getMessage() + "</h3><a href='Book.jsp'>Back</a>");
    }
%>