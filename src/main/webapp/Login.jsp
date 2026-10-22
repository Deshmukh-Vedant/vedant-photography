<html>
<head>
	<title> My Web Page</title>
	<style > 
		#body{
			background-image: url("lion.jpg");
			background-repeat: no-repeat;
			background-size: cover;
		}
		#login{
			width: 300px;
			height: 400px;
			background: black;
			margin-top: 120px;
			margin-left: 140px;
			border-width: 1px;
			border-style: solid;
			border-color: white;
			border-radius: 20px 20px;
			opacity: 0.3;
		}
		#img{
			width: 100px;
			height:100px;
			margin-left: 100px;
			margin-top: 10px;
		}
		h2{
			text-align: center;
			margin-top: 10px;
			color:white;
		}
		#input1{
				margin-left: 50px;
				padding: 7px;
				border-right-style: none;
				border-left-style: none;
				border-top-style: none;
				border-color: black;
				margin-top: 20px; 
		}
			#input2{
				margin-left: 50px;
				padding: 7px;
				border-right-style: none;
				border-left-style: none;
				border-top-style: none;
				border-color: black;
				margin-top: 20px; 
		}
				#wtc{
					margin-left: 100px;
					padding: 7px;
					margin-top: 20px;
					width: 100px;
				}
				#wtc:hover{
					background-color: orange;
					color: white;
					border-radius: 10px;
				}
				#nav{
						height: 50px;
						background-color: orange;
						margin-top: -530px;
						margin-left: 0px;
						border-radius: 0px 10px ; 
						}
					ul{
						list-style: none;
						line-height: 50px;
						margin-left: 50px;
						}
					ul li{
						padding: 18px;
						display: inline;
						}
			
					ul li a{
						text-decoration: none;
						}
					ul li a:hover{
						background-color: white;
						color: black;
						padding: 8px;
						border-radius: 10px;
						bo
						}
	</style>
</head>
<body  id="body">
	<div id="login">
		<form action="Check.jsp" method="post">
		<img src="usericon3.png" id="img">
		<h2 > CUSTOMER LOGIN </h2>
		<input type="text" name="name" placeholder="enter user " required id="input1">
		<input type="text" name="pass" placeholder="enter password " required id="input2">
		<input type="submit" value="submit" id="wtc">
</form>
	</div>
<div id="nav">
											<ul>
												<li>
													<a href="Home.jsp">Home</a>
												</li>
												<li>
													<a href="Signup.jsp">Sign up</a>
												</li>
												<li>
													<a href="Login.jsp">Login</a>
												</li>
												<li>
													<a href="About.jsp">About</a>
												</li>
												<li>
													<a href="Contact.jsp">Contact</a>
												</li>
												
											</ul>
										</div>
</body>
</html>