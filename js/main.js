var apikey= "AIzaSyCRPFtyEgK6icLaBPsOJ3rwvxwXqNVKy9U";
var discoveryDocs = ["https://content.googleapis.com/discovery/v1/apis/youtube/v3/rest","https://content.googleapis.com/discovery/v1/apis/books/v1/rest"];
var clientId = '775467093246-nrakams63skfe8b2a5rga397jasu0or4.apps.googleusercontent.com';
var scopes = 'https://www.googleapis.com/auth/youtube';
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var search = document.getElementById('search')
var Books = document.getElementById('Books')
var search1 = document.getElementById('search1')
rvideos = document.getElementById("videos");
var videos =[];
var markers = [];
var direcciones=[];
var titulos=[];
var descripcion=[];
var autores =[];
var coordenadasT =[];
var map;
var libro;  
var nextPageToken, prevPageToken;

//>>Inicio de Sesión
  function handleClientLoad() {
      gapi.load('client:auth2', initClient);
     }
  function initClient() {
      gapi.client.init({
          apiKey: apikey,
          discoveryDocs: discoveryDocs,
          clientId: clientId,
          scope: scopes
        }).then(function () {
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
    }
 function handleAuthClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    }
 function handleSignoutClick(event) {
     gapi.auth2.getAuthInstance().signOut();
   }

//>>Función Busca libros
function bookSearch(){
deleteMarkers();
var elementosRemovidos = videos.splice(0, videos.length);
var elementosRemovidos1 = direcciones.splice(0, direcciones.length);
var elementosRemovido = titulos.splice(0, titulos.length);
var elementosRemovid = descripcion.splice(0, descripcion.length);
var elementosRemovi = autores.splice(0, autores.length);
document.getElementById('videos').innerHTML='';
document.getElementById('Books').innerHTML='';
if (search.value == '' || search1.value == '') {
    alert('Espacios vacios');
  } else{
   $.ajax({
      url:'https://www.googleapis.com/books/v1/volumes?q=' + search.value + '&maxResults=14',
      dataType: 'json',
      orderBy: 'relevance',
      success: function(data){
        for(var i = 0; i <data.items.length; i++){
         libro = data.items[1].volumeInfo.title + ' libro ';
         if(data.items[i].volumeInfo){
          if(data.items[i].volumeInfo.imageLinks){
          Books.innerHTML +='<img  class="modal-trigger mediana" id="'+ i +'" href="#modal1" src="'+ data.items[i].volumeInfo.imageLinks.thumbnail + '" onclick="reemplazar('+ i +');">'
            titulos.push(data.items[i].volumeInfo.title)
            autores.push(data.items[i].volumeInfo.authors)
            descripcion.push(data.items[i].volumeInfo.description)
            }
            else{
          Books.innerHTML +='<img  class="modal-trigger mediana" id="'+ i +'" href="#modal1" src="https://placehold.it/200x260/eeeeee/999999" onclick="reemplazar('+ i +');">'            
            titulos.push(data.items[i].volumeInfo.title)
            autores.push(data.items[i].volumeInfo.authors)
            descripcion.push(data.items[i].volumeInfo.description)
            }
          }
         }
         searchBooksY();
         searchVideosM(); 
      },
      type: 'GET'
    });
  }
}
//>>función reemplaza el contenido del modal
function reemplazar(valor) {
  for(var i=0; i<=titulos.length; i++){
    if(valor==i){
       $("#h4").text(titulos[i]);
       if(descripcion[i] !== undefined ){
        $("#p").text(descripcion[i]);
     }      
      else{
       $("#p").text("Descripción no disponible");
      }
        if( autores[i] !== undefined){
        $("#h5").text("Autor: " + autores[i]);   
        }else{
        $("#h5").text("Autor no disponible"); 
        }  
    }
  }
}

function searchBooksY(){
  var request = gapi.client.youtube.search.list({
    part: "snippet",
    type: "video",
    q: libro,
    maxResults:search1.value,
    order: 'relevance'
   });  
   request.execute(onSearchResponse);
  }

function onSearchResponse(response){
    for(var i in response.items) {
       var aux =  response.items[i].id.videoId;
       var ulr = "https://www.youtube.com/embed/" + aux + "?rel=0";
       direcciones.push(ulr);
    }

       videosM();
} 
function videosM(){
  if(direcciones.length<=12){
    for(var i=0; i<direcciones.length;i++){  
 rvideos.innerHTML+= '<iframe width="180" height="150" src="' +direcciones[i] +'"></iframe>'  
 }
  }
  else{
    if(direcciones.length<=30){
      for(var i=0; i<direcciones.length;i++){  
 rvideos.innerHTML+= '<iframe width="150" height="100" src="' +direcciones[i] +'"></iframe>'  
 }}else{
  if(direcciones.length<=40){
      for(var i=0; i<direcciones.length;i++){  
 rvideos.innerHTML+= '<iframe width="100" height="60" src="' +direcciones[i] +'"></iframe>'  
 }
  }

 }
  }
 
 realizaProceso(search.value);
}

function searchVideosM(){
      var request = gapi.client.youtube.search.list({
          part: "snippet",
          type: "video",
          q: search.value,
          maxResults:search1.value,
          order: 'relevance'
    });  
    request.execute(onSearchResponse1);

   
}
function onSearchResponse1(response){
   for(var i in response.items) {
       var idv =  response.items[i].id.videoId ;
       videos.push(idv);
  $.ajax({
      url:"https://www.googleapis.com/youtube/v3/videos",
      method:'GET',
      data:{
      key: apikey,
      part:'snippet,player,recordingDetails',
      id:idv,
      dataType: "text",
    }
}).done(function(response){
  var frame = response.items[0].player.embedHtml;
   frame.width=50;
   frame.height=50;
  if(response.items[0].recordingDetails){
      if(response.items[0].recordingDetails.location){
      initialize(response.items[0].recordingDetails.location.latitude, response.items[0].recordingDetails.location.longitude,frame,"http://download.seaicons.com/icons/designbolts/cute-social-media/32/Youtube-icon.png");
      //console.log(response.items[0].recordingDetails.location);
      }
    }
  });
      
 }
}
function realizaProceso(search){
        var parametros = {
                "valorCaja1" : search,
        };
        $.ajax({
                data:  parametros,
                url:   'twitter.php',
                type:  'post',
                success:  function (response) {
                        $("#twitter1").html(response);
                        var obj = JSON.parse(response);
                        console.log(obj);
                        twitterF(obj);

                }
        });
}
function twitterF(response){
console.log(response);
for (var i = 0; i <=response.statuses.length; i++) {
  var texto = '<img style="width:30px; height: 30px" src= "'+ response.statuses[i].user.profile_background_image_url + '"class="circle">' + response.statuses[i].text
   if(response.statuses[i].geo !== undefined && response.statuses[i].geo !== null){
    if(response.statuses[i].geo.coordinates){
       console.log(response.statuses[i].geo.coordinates);
       initialize(response.statuses[i].geo.coordinates[0],response.statuses[i].geo.coordinates[1], texto,"https://icon-icons.com/icons2/730/PNG/32/twitter_icon-icons.com_62765.png");
      }else{
    console.log("No tiene");
      }
    }else{
    console.log("No tiene");
  }
}
}

function initialize( lat, lng,frame,icon) {
  var latLng = new google.maps.LatLng(lat, lng);
  var originalMapCenter=new google.maps.LatLng(42.3601,-71.0589);
  var map= {
      zoom: 1,
      center: originalMapCenter    
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),map);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: icon
  });

  var InfoWindow =new google.maps.InfoWindow({
    content:frame
  })
  google.maps.event.addListener(marker, 'click', function(){InfoWindow.open(map,marker);});
  markers.push(marker);
  setMapOnAll(map);
 }
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

function clearMarkers() {
  setMapOnAll(null);
}
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
     

 $(document).ready(function(){
 $('.tabs').tabs();
  });
  
  var elem = document.querySelector('.modal');
  $(document).ready(function(){
    $('.modal').modal();
  });
    
