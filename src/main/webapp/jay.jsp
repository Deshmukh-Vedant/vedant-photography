<%@ page import="java.sql.*"%>
<%
    String use = request.getParameter("name");
    String mail = request.getParameter("email");
    String sub = request.getParameter("subject");
    String mes = request.getParameter("message");

    String dbUrl = System.getenv("DB_URL") != null ? System.getenv("DB_URL") : "jdbc:mysql://localhost:3306/student?useSSL=false&allowPublicKeyRetrieval=true";
    String dbUser = System.getenv("DB_USER") != null ? System.getenv("DB_USER") : "root";
    String dbPass = System.getenv("DB_PASS") != null ? System.getenv("DB_PASS") : "vedant";

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);

        String sql = "INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)";
        PreparedStatement pst = con.prepareStatement(sql);
        pst.setString(1, use);
        pst.setString(2, mail);
        pst.setString(3, sub);
        pst.setString(4, mes);

        int i = pst.executeUpdate();
        if (i == 1) {
            response.sendRedirect("Contact.jsp?sent=success");
        } else {
            out.println("<h3 style='color:red;'>Failed to send message. <a href='Contact.jsp'>Back</a></h3>");
        }

        pst.close();
        con.close();
    } catch(Exception e1) {
        out.println("<h3 style='color:red;'>Error: " + e1.getMessage() + "</h3><a href='Contact.jsp'>Back</a>");
    }
%>