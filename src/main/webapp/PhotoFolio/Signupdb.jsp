<%@ page import="java.sql.*"%>
<%
   String use=request.getParameter("user");
   String pas=request.getParameter("pass");
   String mail=request.getParameter("email");
   String mob=request.getParameter("number");
 
  try
	{
	  Class.forName("com.mysql.cj.jdbc.Driver");
		System.out.println("Driver is Loaded");
		Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/student","root",
			"vedant");
		System.out.println("Connection is created");
		String sql="INSERT INTO web VALUES(?,?,?,?)";
		PreparedStatement pst=con.prepareStatement(sql);
		pst.setString(1,use);
		pst.setString(2,pas);
		pst.setString(3,mail);
		pst.setString(4,mob);
		int i=pst.executeUpdate();
		if(i==1)
			{
			response.sendRedirect("Login.jsp");
		  	out.println("record is save ");
			}
		  else
		{
			out.println("Record does not save");
		}
	}
	catch(Exception e1)
	{
		out.println("Error="+e1);
	}
%>