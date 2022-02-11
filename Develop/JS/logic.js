
var city = "California";
const apiKey = "2af1079754e3b24df48fc135fd674254";

var lat = "";
var lng = "";
console.log(lat, lng);


var getLatLng = function(lat, lng) {
  var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

  fetch(apiUrl);
  
 };

getLatLng();

var getCurrentWeather = function() {
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=${apiKey}`;
    
  fetch(apiUrl);
};
 //getCurrentWeather();

 
 