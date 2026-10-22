<%@ page import="java.sql.*" %>
<%
    String user = request.getParameter("name");
    String bookingId = request.getParameter("booking_id");

    String dbUrl = System.getenv("DB_URL") != null ? System.getenv("DB_URL") : "jdbc:mysql://localhost:3306/student?useSSL=false&allowPublicKeyRetrieval=true";
    String dbUser = System.getenv("DB_USER") != null ? System.getenv("DB_USER") : "root";
    String dbPass = System.getenv("DB_PASS") != null ? System.getenv("DB_PASS") : "vedant";

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

        int deleted = 0;
        if (bookingId != null && !bookingId.trim().isEmpty()) {
            PreparedStatement pst = con.prepareStatement("DELETE FROM bookdb WHERE name = ?");
            pst.setString(1, bookingId);
            deleted = pst.executeUpdate();
            pst.close();
        } else if (user != null && !user.trim().isEmpty()) {
            PreparedStatement pst = con.prepareStatement("DELETE FROM web WHERE name = ? OR email = ?");
            pst.setString(1, user);
            pst.setString(2, user);
            deleted = pst.executeUpdate();
            pst.close();
        }

        con.close();
        if (deleted > 0) {
            response.sendRedirect("Home.jsp?msg=deleted");
        } else {
            out.println("<div style='text-align:center;padding:50px;'><h3>Record not found or already deleted.</h3><a href='Home.jsp'>Home</a></div>");
        }
    } catch(Exception e1) {
        out.println("<div style='text-align:center;color:red;padding:50px;'><h3>Error: " + e1.getMessage() + "</h3><a href='Home.jsp'>Home</a></div>");
    }
%>