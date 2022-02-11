
var city = "";

var getLatLng = function() {
  var googleApiKey = "AIzaSyBkZZKfI_sFMjXqdyCOTguwYqvCrQlZfYg";
  var googleApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=NewYork?&key=${googleApiKey}`;

  fetch(googleApiUrl).then(function(response){
    response.json().then(function(data){
      console.log(data);
    });
  });
 };

getLatLng();

var getCurrentWeather = function() {
    var apiKey = "2af1079754e3b24df48fc135fd674254";
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=${apiKey}`;
    
  fetch(apiUrl);
};
 //getCurrentWeather();

 
 