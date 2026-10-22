<%@ page import="java.sql.*"%>
<%
    String user = request.getParameter("user");
    String pass = request.getParameter("pass");

    String dbUrl = System.getenv("DB_URL") != null ? System.getenv("DB_URL") : "jdbc:mysql://localhost:3306/student?useSSL=false&allowPublicKeyRetrieval=true";
    String dbUser = System.getenv("DB_USER") != null ? System.getenv("DB_USER") : "root";
    String dbPass = System.getenv("DB_PASS") != null ? System.getenv("DB_PASS") : "vedant";

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

        PreparedStatement statement = con.prepareStatement("SELECT * FROM web WHERE (name = ? OR email = ?) AND password = ?");
        statement.setString(1, user);
        statement.setString(2, user);
        statement.setString(3, pass);

        ResultSet resultSet = statement.executeQuery();
        if (resultSet.next()) {
            session.setAttribute("currentUser", user);
            response.sendRedirect("About.jsp");
        } else {
            out.println("<div style='text-align:center;padding:50px;font-family:sans-serif;'><h2>Invalid username or password</h2><a href='Login.jsp'>Back to Login</a></div>");
        }

        resultSet.close();
        statement.close();
        con.close();
    } catch (Exception e) {
        out.println("<div style='text-align:center;color:red;'>Error: " + e.getMessage() + "</div>");
    }
%>