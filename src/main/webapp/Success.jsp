<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Login Successful - Vedant Photography</title>
    <link rel="stylesheet" type="text/css" href="bootstrap.min.css">
    <script src="bootstrap.bundle.min.js"></script>
    <style>
        body {
            background-color: #0d0f12;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            text-align: center;
        }
        .card-box {
            background: #1a1e24;
            padding: 50px 40px;
            border-radius: 16px;
            border: 1px solid #2e3642;
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            max-width: 450px;
        }
        h2 { color: #2ecc71; margin-bottom: 15px; font-weight: 700; }
        p { color: #a0aec0; margin-bottom: 25px; }
    </style>
</head>
<body>
    <div class="card-box">
        <div class="spinner-border text-success mb-3" style="width: 3.5rem; height: 3.5rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <h2>LOGIN SUCCESSFUL!</h2>
        <p>Welcome back! Redirecting you to the photography portfolio...</p>
        <a href="About.jsp" class="btn btn-outline-light btn-sm">Click here if not redirected automatically</a>
    </div>
    <script>
        setTimeout(function(){
            window.location.href = 'About.jsp';
        }, 1800);
    </script>
</body>
</html>