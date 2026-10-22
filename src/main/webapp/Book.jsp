<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Book Photography Session - Vedant Photography</title>
	<link rel="stylesheet" href="bootstrap.min.css">
	<script src="bootstrap.bundle.min.js"></script>
	<style>
		body {
			background-color: #0b0c10;
			color: #333;
			min-height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 30px 15px;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		}
		.booking-card {
			max-width: 460px;
			width: 100%;
			background-color: #ffffff;
			border: 2px solid #27ae60;
			border-radius: 16px;
			padding: 30px;
			box-shadow: 0 10px 30px rgba(0,0,0,0.5);
		}
		.booking-card h2 {
			text-align: center;
			font-weight: 700;
			color: #111;
			margin-bottom: 20px;
		}
		.form-group {
			margin-bottom: 12px;
		}
		.form-label {
			font-weight: 600;
			font-size: 14px;
			color: #444;
			margin-bottom: 4px;
			display: block;
		}
		.form-control, .form-select {
			width: 100%;
			padding: 9px 12px;
			border: 1px solid #ccc;
			border-radius: 8px;
			font-size: 14px;
		}
		.btn-book {
			width: 100%;
			background-color: #111;
			color: #fff;
			padding: 12px;
			border-radius: 8px;
			border: none;
			font-weight: 700;
			font-size: 15px;
			margin-top: 15px;
			cursor: pointer;
			transition: background 0.2s;
		}
		.btn-book:hover {
			background-color: #27ae60;
		}
		.nav-back {
			text-align: center;
			margin-top: 15px;
		}
		.nav-back a {
			color: #777;
			text-decoration: none;
			font-size: 13px;
		}
		.nav-back a:hover {
			color: #111;
		}
	</style>
</head>
<body>
<div class="booking-card">
	<form action="bookdb.jsp" method="post">
		<div style="text-align: center; margin-bottom: 15px;">
			<img src="vedantlogo.jpeg" width="75" height="75" class="rounded-circle" style="object-fit:cover; border:2px solid #27ae60;" alt="Logo">
		</div>
		<h2>Book Photography</h2>
		
		<div class="form-group">
			<label class="form-label">Username:</label>
			<input type="text" name="username" class="form-control" required placeholder="Enter Your Name">
		</div>
		<div class="form-group">
			<label class="form-label">Password / Security PIN:</label>
			<input type="password" name="pass" class="form-control" required placeholder="Enter Password">
		</div>
		<div class="form-group">
			<label class="form-label">Age:</label>
			<input type="number" name="age" class="form-control" required placeholder="Enter Age">
		</div>
		<div class="form-group">
			<label class="form-label">City:</label>
			<input type="text" name="city" class="form-control" required placeholder="Enter City">
		</div>
		<div class="form-group">
			<label class="form-label">Email:</label>
			<input type="email" name="email" class="form-control" required placeholder="Enter Email Address">
		</div>
		<div class="form-group">
			<label class="form-label">Occasion / Category:</label>
			<select name="occasion" class="form-select" required>
				<option value="">---Select Occasion---</option>
				<option value="Marriage">Marriage</option>
				<option value="Pre-wedding">Pre-wedding</option>
				<option value="Baby-shower">Baby-shower</option>
				<option value="Nature">Nature</option>
				<option value="Sports">Sports</option>
				<option value="Travel">Travel</option>
			</select>
		</div>
		<div class="form-group">
			<label class="form-label">Package & Prices:</label>
			<select name="course" class="form-select" required>
				<option value="">---Select Package---</option>
				<option value="Marriage 55,500Rs/-">Marriage - ₹55,500</option>
				<option value="Pre-wedding 6,200Rs/-">Pre-wedding - ₹6,200</option>
				<option value="Baby-shower 3,000Rs/-">Baby-shower - ₹3,000</option>
				<option value="Nature 1,600Rs/-">Nature - ₹1,600</option>
				<option value="Sports 1,200Rs/-">Sports - ₹1,200</option>
				<option value="Travel 1,120Rs/-">Travel - ₹1,120</option>
			</select>
		</div>
		<div class="form-group">
			<label class="form-label">Payment Mode:</label>
			<select name="fees" class="form-select" required>
				<option value="Online Mode">Online Mode</option>
				<option value="Offline Mode">Offline Mode</option>
			</select>
		</div>
		
		<button type="submit" class="btn-book">Confirm Booking</button>
		
		<div class="nav-back">
			<a href="About.jsp">← Back to Gallery</a> &bull; <a href="Home.jsp">Home</a>
		</div>
	</form>
</div>
</body>
</html>