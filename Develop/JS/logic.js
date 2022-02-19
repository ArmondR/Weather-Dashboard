

const apiKey = "2af1079754e3b24df48fc135fd674254";


// selecting Dom Elements
var formEl = document.querySelector("#city-search");
var currentEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector(".forecast");
var forecastHeaderEl = document.querySelector("#forecast-type");
var currentcontainerEl = document.querySelector("#current-container");
var historyEl = document.querySelector(".search-list");

var addCityHistory = function(city) {
  // holds value of city input
  var cities;

  // checks local storage to see if there is anything in it and if not create empty array to hold info
  if(localStorage.getItem("history") !== null){
    var historyString = localStorage.getItem("history");
    cities = JSON.parse(historyString);
  }else{
    cities = [];
  }
  // adds city input to array
  cities.push(city);
  console.log (cities);

  // saves array as a string to local storage with key as "history"
  localStorage.setItem("history",JSON.stringify(cities));
};

var getCityHistory = function() {
  // clears DOM list elements before creating new one 
  historyEl.textContent = "";

  var cities;
  if(localStorage.getItem("history") !== null){
    var historyString = localStorage.getItem("history");
    cities = JSON.parse(historyString);
  }else{
    cities = [];
  }

  // loop through cities array and populates information into a list
  for(var i = 0; i < cities.length; i++) {
    var cityHistory = document.createElement("li");
    cityHistory.textContent = cities[i];

    historyEl.appendChild(cityHistory);
  };
};


var getLatLng = function(city) {

  var apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

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

    currentcontainerEl.className = "border bg-light";
    
    var city = document.querySelector("input[name='search-name']").value.trim();

    var currentWeatherIcon = document.createElement("img");
    currentWeatherIcon.setAttribute("SameSite", "None");
    currentWeatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);

    var searched = document.createElement("h1");
    searched.className = "mx-2";
    searched.textContent = city + " " + moment.unix(data.current.dt).format("(MM/D/YYYY)");

    // create elements to be appended to current temp container
      var currentTemp = document.createElement("p");
      currentTemp.className = "mx-2";
      currentTemp.textContent = "Temp: " + data.current.temp + "°F";

      var currentWnd = document.createElement("p");
      currentWnd.className = "mx-2";
      currentWnd.textContent = "Wind: " + data.current.wind_speed + " MPH";

      var currentHumid = document.createElement("p");
      currentHumid.className = "mx-2";
      currentHumid.textContent = "Humidity: " + data.current.humidity + " %";

      // UV handler
      var currentUv = document.createElement("p");
      currentUv.className = "mx-2";
      currentUv.textContent = "UV Index: "
      var uviValue = document.createElement("span");
      //uvi.className = "uv-indicator"
      uviValue.textContent = data.current.uvi;
      currentUv.appendChild(uviValue);

      // updates uv based on level
      if(uviValue.textContent <= 2){
        uviValue.className = "bg-success px-3 rounded text-light"
      }
      else if(uviValue.textContent > 2 && uviValue.textContent <= 7) {
        uviValue.className = "bg-warning px-3 rounded text-light"
      } 
      else if(uviValue.textContent > 7){
        uviValue.className = "bg-danger px-3 rounded text-light"
      };

      // append new elements to the container 
      currentEl.appendChild(searched);
      searched.appendChild(currentWeatherIcon);
      currentEl.appendChild(currentTemp);
      currentEl.appendChild(currentWnd);
      currentEl.appendChild(currentHumid);
      currentEl.appendChild(currentUv);
      formEl.reset()
      fiveDayForecast(data);
    });
  });
};

var fiveDayForecast = function(data) {
forecastEl.innerHTML = "";
forecastHeaderEl.textContent = "5-Day Forecast:"
forecastHeaderEl.className = "mt-2"
console.log(data);
  for(var i = 0; i < 5; i++) {

    var fiveDayContainers = document.createElement("div");
    fiveDayContainers.className = "col bg-dark m-2 text-light";

    var date = document.createElement("span");
    date.className = "m-2"
    date.textContent = moment.unix(data.daily[i].dt).format("MM/D/YYYY");

    var weatherImgEl = document.createElement("img");
    weatherImgEl.className = "weatherIcon"
    weatherImgEl.setAttribute("SameSite","None");
    weatherImgEl.setAttribute("src", `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`)
    
    var temp = document.createElement("p");
    temp.className = "m-2 forecast-info"
    temp.textContent = "Temp: " + data.daily[i].temp.day + "°F";

    var wind = document.createElement("p");
    wind.className = "m-2 forecast-info"
    wind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";

    var humidity = document.createElement("p");
    humidity.className = "m-2 forecast-info"
    humidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

   fiveDayContainers.appendChild(date);
   fiveDayContainers.appendChild(weatherImgEl);
   fiveDayContainers.appendChild(temp);
   fiveDayContainers.appendChild(wind);
   fiveDayContainers.appendChild(humidity);

    forecastEl.appendChild(fiveDayContainers);

  };
}
 
// submit event listener
 formEl.addEventListener("submit", function(event) {
   event.preventDefault();

  var city = document.querySelector("input[name='search-name']").value.trim();
  getLatLng(city);
  addCityHistory(city);
  getCityHistory();
   });

// loads whatever is saved in local storage to list element.
   getCityHistory();
 