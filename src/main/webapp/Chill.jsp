<%@ page import="java.sql.*"%>
<%
    String user = request.getParameter("name");
    String pass = request.getParameter("pass");

    String dbUrl = System.getenv("DB_URL") != null ? System.getenv("DB_URL") : "jdbc:mysql://localhost:3306/student?useSSL=false&allowPublicKeyRetrieval=true";
    String dbUser = System.getenv("DB_USER") != null ? System.getenv("DB_USER") : "root";
    String dbPass = System.getenv("DB_PASS") != null ? System.getenv("DB_PASS") : "vedant";

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

        PreparedStatement pst = con.prepareStatement("SELECT * FROM web WHERE (name = ? OR email = ?) AND password = ?");
        pst.setString(1, user);
        pst.setString(2, user);
        pst.setString(3, pass);

        ResultSet rs = pst.executeQuery();
        if (rs.next()) {
            session.setAttribute("currentUser", rs.getString("name"));
            response.sendRedirect("Success.jsp");
        } else {
            out.println("<div style='text-align:center;padding:50px;'><h3>Incorrect user or password</h3><a href='Login.jsp'>Retry</a></div>");
        }

        rs.close();
        pst.close();
        con.close();
    } catch (Exception e) {
        out.println("Error: " + e.getMessage());
    }
%>