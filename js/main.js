var search = document.getElementById('search')
var search1 = document.getElementById('search1')
rvideos = document.getElementById("videos");
main = document.getElementById("main");
var videos =[];
var markers = [];
var direcciones=[];
var map;
var total;
var libro;
var apikey= "AIzaSyCRPFtyEgK6icLaBPsOJ3rwvxwXqNVKy9U";
   function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube" })
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/youtube/v3/rest","https://content.googleapis.com/discovery/v1/apis/books/v1/rest") 
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "775467093246-nrakams63skfe8b2a5rga397jasu0or4.apps.googleusercontent.com"});
  });

function bookSearch(){
  total = search1.value
  deleteMarkers();
 var elementosRemovidos = videos.splice(0, videos.length);
 var elementosRemovidos1 = direcciones.splice(0, direcciones.length);
 document.getElementById('videos').innerHTML='';
 if (search.value == '' || search1.value == '') {
    alert('Ingresa un valor');
  } else{
   $.ajax({
      url:'https://www.googleapis.com/books/v1/volumes?q=' + search.value,
      dataType: 'json',
      orderBy: 'relevance',
      success: function(data){
        for(var i = 0; i < 1; i++){
         libro = data.items[i].volumeInfo.title + ' libro ';
         console.log(libro);
          searchBooksY();
          searchVideosM();
       }       
      },
      type: 'GET'
    });
  }
}
function searchBooksY(){
if(search1.value>15){
  search1 = 15;
    }
    else{
      var request = gapi.client.youtube.search.list({
          part: "snippet",
          type: "video",
          q: libro,
          maxResults:search1.value,
          order: 'date'
    });  
    request.execute(onSearchResponse);
   

    }
    
 } 
function onSearchResponse(response){
    for(var i in response.items) {
       var aux =  response.items[i].id.videoId ;
       var ulr = "https://www.youtube.com/embed/" + aux + "?rel=0";
       direcciones.push(ulr);
       }

       videosM();
} 
function videosM(){
  if(direcciones.length<=15)
  {
     for(var i=0; i<direcciones.length;i++){
       rvideos.innerHTML+= '<iframe width="125" height="125" src="'+direcciones[i]+'"></iframe>';
    }
  }
}


function searchVideosM(){
      var request = gapi.client.youtube.search.list({
          part: "snippet",
          type: "video",
          q: search.value,
          maxResults:search1.value,
          order: 'date'
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
  if(response.items[0].recordingDetails){
      if(response.items[0].recordingDetails.location){
      initialize(response.items[0].recordingDetails.location.latitude, response.items[0].recordingDetails.location.longitude,frame);
      //console.log(response.items[0].recordingDetails.location);
      }
    }
  });
 }
}

function initialize( lat, lng,frame) {
  var latLng = new google.maps.LatLng(lat, lng);
  var originalMapCenter=new google.maps.LatLng(42.3601,-71.0589);
  var map= {
      zoom: 1,
      center: originalMapCenter    
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),map);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
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
  $('#myTable').pageMe({
    pagerSelector:'#myPager',
    activeColor: 'blue',
    prevText:'Anterior',
    nextText:'Siguiente',
    showPrevNext:true,
    hidePageNumbers:false,
    perPage:2
  });
});