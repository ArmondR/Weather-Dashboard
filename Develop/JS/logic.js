

const apiKey = "2af1079754e3b24df48fc135fd674254";


// selecting search form
var formEl = document.querySelector("#city-search");
var currentEl = document.querySelector("#current-weather");




var getLatLng = function(event) {
  event.preventDefault();

  // capture city Input to get lat and lon of searched city
  var city = document.querySelector("input[name='search-name']").value.trim();

  var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

  fetch(apiUrl).then(function(response){
    response.json().then(function(data){
       lat = data[0].lat;
       lon = data[0].lon;
      //console.log(data);
      console.log(lat);
      console.log(lon);
      getCurrentWeather(lat, lon);
    });
  }); 
//formEl.reset();
 };



var getCurrentWeather = function(lat, lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    // `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=${apiKey}`

  fetch(apiUrl).then(function(response){
    response.json().then(function(data){
      console.log(data);

// clear container element before appending new information
    currentEl.innerHTML = "";
    var city = document.querySelector("input[name='search-name']").value.trim();
    var searched = document.createElement("h1");
    searched.textContent = city;

    // create elements to be appended to current temp container
      var currentTemp = document.createElement("p");
      currentTemp.textContent = "Temp: " + data.current.temp + "°F";

      var currentWnd = document.createElement("p");
      currentWnd.textContent = "Wind: " + data.current.wind_speed + " MPH";

      var currentHumid = document.createElement("p");
      currentHumid.textContent = "Humidity: " + data.current.humidity + " %";

      var currentUv = document.createElement("p");
      currentUv.textContent = "UV Index: " + data.current.uvi;

      // append new elements to the container 
      currentEl.appendChild(searched);
      currentEl.appendChild(currentTemp);
      currentEl.appendChild(currentWnd);
      currentEl.appendChild(currentHumid);
      currentEl.appendChild(currentUv);
      formEl.reset()
    });
  });
};
 

 formEl.addEventListener("submit", getLatLng);
 