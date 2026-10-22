<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Booking Confirmed - Vedant Photography</title>
<link rel="stylesheet" href="bootstrap.min.css">
<style>
    body {
        background: #0d0f12;
        color: #fff;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    .success-card {
        background: #1a1e24;
        border: 1px solid #2e3642;
        border-radius: 16px;
        max-width: 500px;
        width: 100%;
        padding: 40px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    }
    .check-icon {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: #27ae60;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        margin-bottom: 20px;
    }
    h2 { color: #2ecc71; font-weight: 700; margin-bottom: 12px; }
    p { color: #94a3b8; font-size: 15px; margin-bottom: 30px; }
    .btn-action {
        display: inline-block;
        padding: 10px 22px;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        margin: 5px;
    }
    .btn-green { background: #27ae60; color: #fff; }
    .btn-green:hover { background: #219653; color: #fff; }
    .btn-outline { border: 1px solid #475569; color: #cbd5e1; }
    .btn-outline:hover { background: #334155; color: #fff; }
</style>
</head>
<body>
<div class="success-card">
    <div class="check-icon">&#10003;</div>
    <h2>BOOKED SUCCESSFULLY!</h2>
    <p>Thank you for choosing Vedant Photography. Your session request has been received. Our team will contact you shortly to confirm the appointment.</p>
    
    <div>
        <a href="receipt.jsp" class="btn-action btn-green">View Receipt</a>
        <a href="About.jsp" class="btn-action btn-outline">Explore Gallery</a>
        <a href="Home.jsp" class="btn-action btn-outline">Home</a>
    </div>
</div>
</body>
</html>