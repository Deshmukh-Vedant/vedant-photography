<%@ page import ="java.sql.*"%>
<html>
	<head>
		<title>SignUp Page</title>
		
			<style>
					#body{
						background-image:url("img3.jpeg");
						background-repeat:no-repeat;
						background-size:cover;
						}
					#cust{
						width:350px;
						height:400px;
						background:white;
						margin-left:150px;
						margin-top:160px;
						border-color:black;
						border-style:solid;
						border-width:1px;
						border-radius:20px 20px;
						}
					#img{
						width:100px;
						height:100px;
						margin-top:-70;
						margin-left:140px;
						}
					#h2{
						margin-top:10px;
						text-align:center;
						 }
					#h5{
						
						margin-left:50px
						 }
					
					#input1{
						margin-left:10px;
						border-top-style:none;
						border-left-style:none;
						border-right-style:none;
						}
					#input2{
						margin-left:10px;			
						border-top-style:none;
						border-left-style:none;
						border-right-style:none;
						}
					#input3{
						margin-left:10px;
						border-top-style:none;
						border-left-style:none;
						border-right-style:none;
						}
					#input4{
						margin-left:10px;
						border-top-style:none;
						border-left-style:none;
						border-right-style:none;
						}
					#sub{
						margin-left:85px;
						padding:10px;
						
						width:200px;
						}
						#sub:hover{
						background-color:black;
						color-white;
						border-radius:20px;
						}
					#nav{
						height: 50px;
						background-color: orange;
						margin-top: -560px;
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
					<body id="body">
						<div id="cust">
							<form action="Signupdb.jsp" method="post">
							<i class="fa-duotone fa-user-plus"></i>
							<img src="usericon5.png" id="img">
							<h2 id="h2">CREATE NEW ACCOUNT</h2>
							<h5 id="h5">Customer name:<input type="text" name="user" placeholder="Enter Customer" required id="input1"></h5>
							<h5 id="h5">Customer pass:<input type="password" name="pass" placeholder="Enter passward" required id="input2"></h5>
							<h5 id="h5">Customer E-mail:<input type="email" name="email" placeholder="Enter e-mail" required id="input3"></h5>
							<h5 id="h5">Customer ph_no:<input type="text" name="number" placeholder="Enter Mobile_no" required id="input4"></h5>
							<br>
							<input type="submit" value="Create Account" id="sub">
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
													<a href="#">About</a>
												</li>
												<li>
													<a href="#">Service</a>
												</li>
											</ul>
										</div>
								</body>
	</head>
</html>
