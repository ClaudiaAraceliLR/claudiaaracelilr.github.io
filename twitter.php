<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

//Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "971811195069124609-cK4Ka3crJmdsFGDPxqvLyJrxmmU9dpB",
    'oauth_access_token_secret' => "W7mR6GAoWMutrPxyB1XQJ0MEYy7APa1tG4rrhyTSEmSi8",
    'consumer_key' => "aeXoxiMysNMANCJTL0N7IypId",
    'consumer_secret' => "Xr8xZhAm0yqHMcsKJ8HnUDCdediSlLi3woezAjvVxn2lvmWBfL"
);
$url = 'https://api.twitter.com/1.1/search/tweets.json';
$requestMethod = 'GET';
$resultado = $_POST['valorCaja1'];
$resultado =str_replace(" ", "", $resultado);
$getfield = '?q=#'. $resultado.'&count=100';  //aquí sustituyo por el alias que toque
$twitter = new TwitterAPIExchange($settings);
$twitter1 = $twitter->setGetfield($getfield)
               ->buildOauth($url, $requestMethod)
             ->performRequest(true);
echo $twitter1;
//$obj = json_decode($twitter1); 
// debug_to_console( $obj);
?> 

