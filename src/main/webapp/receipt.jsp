<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Booking & Payment Receipt - Vedant Photography</title>
    <link rel="stylesheet" href="bootstrap.min.css">
    <style>
        body { background: #0f1115; color: #fff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px 15px; }
        .receipt-card { max-width: 650px; margin: 0 auto; background: #1a1e24; border-radius: 12px; padding: 35px; border: 1px solid #2e3642; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .receipt-header { border-bottom: 2px dashed #3a4454; padding-bottom: 20px; margin-bottom: 25px; text-align: center; }
        .receipt-header h2 { color: #27ae60; font-weight: 700; margin-top: 10px; }
        .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #262c36; }
        .receipt-label { color: #8a99ad; }
        .receipt-value { font-weight: 600; color: #fff; }
        .btn-print { background: #27ae60; color: white; border: none; padding: 10px 24px; border-radius: 6px; font-weight: 600; cursor: pointer; }
        .btn-print:hover { background: #219653; }
        .btn-home { background: transparent; color: #8a99ad; border: 1px solid #414d5e; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-left: 10px; }
        .btn-home:hover { color: #fff; }
    </style>
</head>
<body>
<%
    String method = request.getMethod();
    String cardno = request.getParameter("cardno");
    String date = request.getParameter("dateno");
    String cvv = request.getParameter("cvvno");
    String cardname = request.getParameter("cardno1");

    if (cardno == null) cardno = "4532 **** **** 8921";
    if (cardname == null) cardname = "Valued Customer";

    if ("POST".equalsIgnoreCase(method) && request.getParameter("cardno") != null) {
        String dbUrl = System.getenv("DB_URL") != null ? System.getenv("DB_URL") : "jdbc:mysql://localhost:3306/student?useSSL=false&allowPublicKeyRetrieval=true";
        String dbUser = System.getenv("DB_USER") != null ? System.getenv("DB_USER") : "root";
        String dbPass = System.getenv("DB_PASS") != null ? System.getenv("DB_PASS") : "vedant";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);
            PreparedStatement psmt = con.prepareStatement("INSERT INTO pay (cardno, exdate, cvvno, cardhname) VALUES (?, ?, ?, ?)");
            psmt.setString(1, cardno.length() > 4 ? ("****" + cardno.substring(cardno.length() - 4)) : cardno);
            psmt.setString(2, date != null ? date : "12/28");
            psmt.setString(3, "***");
            psmt.setString(4, cardname);
            psmt.executeUpdate();
            psmt.close();
            con.close();
        } catch (Exception e) {
            // Log but still allow receipt display
            System.out.println("Payment log note: " + e.getMessage());
        }
    }
%>

<div class="receipt-card">
    <div class="receipt-header">
        <img src="vedantlogo.jpeg" width="70" height="70" class="rounded-circle" alt="Vedant Photography">
        <h2>Payment & Booking Receipt</h2>
        <p class="text-muted">Vedant Photography Studios • Shegaon</p>
    </div>

    <div class="receipt-row">
        <span class="receipt-label">Receipt Number:</span>
        <span class="receipt-value">#VP-<%= System.currentTimeMillis() % 1000000 %></span>
    </div>
    <div class="receipt-row">
        <span class="receipt-label">Customer Name:</span>
        <span class="receipt-value"><%= cardname %></span>
    </div>
    <div class="receipt-row">
        <span class="receipt-label">Payment Method:</span>
        <span class="receipt-value">Card ending in <%= cardno.length() > 4 ? cardno.substring(cardno.length() - 4) : "8921" %></span>
    </div>
    <div class="receipt-row">
        <span class="receipt-label">Payment Status:</span>
        <span class="receipt-value" style="color: #2ecc71;">CONFIRMED / PAID</span>
    </div>
    <div class="receipt-row">
        <span class="receipt-label">Date & Time:</span>
        <span class="receipt-value"><%= new java.util.Date().toString() %></span>
    </div>

    <div style="margin-top: 30px; text-align: center;">
        <button class="btn-print" onclick="window.print()">Print Receipt</button>
        <a href="About.jsp" class="btn-home">Explore Gallery</a>
        <a href="Book.jsp" class="btn-home">Book Another</a>
    </div>
</div>

</body>
</html>