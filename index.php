<!DOCTYPE html>
<html  lang="en">
	<head>
		<title>Api Books Search</title>
	   <!--Compiled and minified CSS -
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css">-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link rel="stylesheet" href="https://cdn.rawgit.com/Dogfalo/materialize/fc44c862/dist/css/materialize.min.css">
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.1.min.js"></script>
    <script src="https://cdn.rawgit.com/Dogfalo/materialize/fc44c862/dist/js/materialize.min.js"></script>
    <script type="text/javascript" src="https://cdn.rawgit.com/pinzon1992/materialize_table_pagination/f9a8478f/js/pagination.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
     <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta charset="UTF-8">
		<link href="css/style.css" rel="stylesheet" type="text/css">
		</head>
<body>
<button id="authorize-button" style="display: none;">Authorize</button>
<button id="signout-button" style="display: none;">Sign Out</button>

<div class="container">	
	<div class="row">
		<div class="input-field col s6 l12">
			<div class="search" style="text-align: center"> 
	  		  <form ><h5 style: "font-size: 5px;">Tecnologías Emergentes</h5><br>
	        	<input id="search" type="text" placeholder="Libro a buscar" style="width:500px;">
	       		<input id="search1" type="text" placeholder="Total de videos" style="width:200px;">
           	<button class="btn waves-effect waves-light grey" type="button" onclick="bookSearch()" class="" id="button" >Search</button>
	     	 </form>
			</div>
		</div>
	</div>
</div>  
<div class="container col s6 l12 " id="grupos">
	 <div class="row">
      <div class="col s6 l12">
        <ul class="tabs">
          <li class="tab col s4"><a class="active" href="#Books"> <img style="width:20px; height: 20px"" src="images/books.png"> Books</a></li>
          <li class="tab col s4"><a href="#videos"><img style="width:20px; height: 20px"" src="images/youtube.png"> Youtube</a></li>
          <li class="tab col s4"><a href="#map-canvas"><img style="width:20px; height: 20px"" src="images/maps.ico">Maps/Twitter<img style="width:20px; height: 20px"" src="images/twitter.png"></a></li>
      <!--    <li class="tab col s3"><a href="#twitter"><img style="width:20px; height: 20px"" src="images/twitter.png"> Twitter</a></li>-->
        </ul>
      </div>
      <div class="col s12">
        <div id="Books" class="col s3 l3">
        </div>
        <div id="modal1" class="modal">
          <div class="modal-content">
            <h4 id="h4"></h4>
            <h5 id="h5"></h5>
            <p id="p" align="text-align:justify"></p>
          </div>
        <div class="modal-footer">
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
        </div>
        <div id="videos" class="col s7" >
        
        </div>
        <div id="map-canvas" class="col s12">
        </div>
     </div>
   </div>
</div>
<!--Google Map-->
    <script src="https://maps.googleapis.com/maps/api/js"></script> <script async defer src="https://apis.google.com/js/api.js"
      onload="this.onload=function(){};handleClientLoad()"
      onreadystatechange="if (this.readyState === 'complete') this.onload()">
    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAb93lwXp_erla39AnETaxC8WWivSkVS-Q&callback=initialize">
   	</script>
  	<script src="https://apis.google.com/js/api.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</body>
</html>