
var city = "New York";

var getCurrentWeather = function() {
    var apiKey = "2af1079754e3b24df48fc135fd674254";
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?q=${city}&units={imperial}&appid=${apiKey}`;
    
    // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}
  fetch(apiUrl);
};
 getCurrentWeather();