<html>
<head>
	<title>grid</title>
	<style > 
	#body{
						background-image:url("planbackground.jpg");
						background-repeat:no-repeat;
						background-size:cover;
						} 
#container{
	display: grid;
	grid-template-columns:300px 300px 300px ;
	gap: 20px 30px;
	margin-left: 200px;
	margin-top:40px;
}
#div1{
	border:1px solid black;
	height: 200px;
	background-color: orange;
}
#div2{
	border:1px solid black;
	
	background-color: deepskyblue;
}
#div3{
	border:1px solid black;

	background-color: coral;
}
#div4{
	border:1px solid black;
	height: 200px;
	background-color: black;
}
#div5{
	border:1px solid black;
	
	background-color: blueviolet;
}

#div6{
	border:1px solid black;
	
	background-color: lightblue;
}
#her{
	margin-left:450px;	
}
#his{
height: 200px;
width:300px;
}
#hero{
margin-top:-50px;
	margin-left:1110px;	
}
			
</style>
</head>
<body id="body">
<div id="her" ><caption> <h1>BEST ONLINE COURSE</h1></caption></div>
<div id="hero"> <form action="Home.jsp" >

	<input type="submit" value="Logout">
</form>
</div>
<div id="container">
	<div id="div1"> <a href="sign.jsp"><img id="his" alt="photoshop" src="photoshoplogo.jpg"></a></div>
	<div id="div2"> <a href="sign.jsp"><img id="his" alt="msexel" src="Msexcellogo.png"> </a></div>
	<div id="div3"><a href="sign.jsp"> <img id="his" alt="digitalmarketing" src="digitalmarketing.png"></a> </div>
	<div id="div4"> <a href="sign.jsp"><img id="his" alt="wondersharefilmora" src="WondershareFilmora.jpg"></a></div>
	<div id="div5"> <a href="sign.jsp"><img id="his" alt="adobeillustrater" src="adobeillustrater.png"></a></div>
	<div id="div6"> <a href="sign.jsp"><img id="his" alt="premiere" src="premiere.png"></a></div>

</div>
											
</body>
</html>