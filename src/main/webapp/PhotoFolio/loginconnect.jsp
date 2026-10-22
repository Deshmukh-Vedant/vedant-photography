<%@ page import="java.sql.*"%>
<%
    String user = request.getParameter("user");
    String pass = request.getParameter("pass");

    try {
        Class.forName("com.mysql.cj.jdbc.Driver");
		System.out.println("Driver is Loaded");
		Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/student?useSSL=false","root","vedant");
		System.out.println("Connection is created");

        String sql = "SELECT user FROM web WHERE user = ?";
        String sql2 = "SELECT password FROM web WHERE password = ?";

        PreparedStatement statement = con.prepareStatement(sql);
        statement.setString(1, user);
        ResultSet resultSet = statement.executeQuery();
        boolean userExists = resultSet.next();

        statement = con.prepareStatement(sql2);
        statement.setString(1, pass);
        resultSet = statement.executeQuery();
        boolean passwordCorrect = resultSet.next();

        if (userExists && passwordCorrect) {
            response.sendRedirect("course.jsp");
        } else if (!userExists) {
            out.println("Incorrect user");
        } else if (!passwordCorrect) {
            out.println("Incorrect password");
        } else {
            out.println("Both user and password are incorrect");
        }

        con.close();
    } catch (Exception e) {
       System.out.println("Error ="+e);
    }
%>