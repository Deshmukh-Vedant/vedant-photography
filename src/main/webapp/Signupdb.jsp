<%@ page import="java.sql.*"%>
<%
    String use = request.getParameter("user");
    String pas = request.getParameter("pass");
    String mail = request.getParameter("email");
    String mob = request.getParameter("number");

    String dbUrl = System.getenv("DB_URL") != null ? System.getenv("DB_URL") : "jdbc:mysql://localhost:3306/student?useSSL=false&allowPublicKeyRetrieval=true";
    String dbUser = System.getenv("DB_USER") != null ? System.getenv("DB_USER") : "root";
    String dbPass = System.getenv("DB_PASS") != null ? System.getenv("DB_PASS") : "vedant";

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

        PreparedStatement pst = con.prepareStatement("INSERT INTO web (name, password, email, mobileno) VALUES (?, ?, ?, ?)");
        pst.setString(1, use);
        pst.setString(2, pas);
        pst.setString(3, mail);
        pst.setString(4, mob);

        int i = pst.executeUpdate();
        if (i == 1) {
            response.sendRedirect("Login.jsp?signup=success");
        } else {
            out.println("<h3 style='color:red;'>Failed to register user. <a href='Signup.jsp'>Back</a></h3>");
        }

        pst.close();
        con.close();
    } catch(Exception e1) {
        out.println("<h3 style='color:red;'>Error: " + e1.getMessage() + "</h3><a href='Signup.jsp'>Back</a>");
    }
%>