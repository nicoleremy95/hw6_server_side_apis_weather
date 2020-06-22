var apiKey = "9fa65c8a19cf2131654f1622f89351d4";
//when the user submits the form 
  
function makeRequestCurrent(){
    
  var cityNameInput = $("#city-input").val().trim();
  var currentQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&appid=" + apiKey + "&units=imperial";
  var weatherContainer = $(".weather-container");
    
    //request informatiom 
    $.ajax({
      url: currentQueryURL,
      method: "GET"
    }).then(function (response) {
      console.log(currentQueryURL);
      console.log(response);
      
      var cityDiv = $("<div>")

      var now = moment();
      var nowDisplay = now.format("dddd MMM Mo YYYY");

      var cityName = $("<h2>")
      cityName.text(cityNameInput)

      var temp = $("<h3>")
      temp.text("Temperature: " + response.main.temp + " F");

      var wind = $("<h3>")
      wind.text("Wind Speed: " + response.wind.speed + " MPH");

      var humidity = $("<h3>")
      humidity.text("Humidity: " + response.main.humidity + " %");

      var icon = $("<img>")
      icon.attr("scr", response.weather[0])

      cityDiv.append(nowDisplay,cityName,temp,wind,humidity,icon)
    
      weatherContainer.html(cityDiv); 
      
      // if statement for icon severity 
    });
}

function makeRequestForecast(){
  var cityNameInput = $("#city-input").val().trim();
  var foreCastContainer = $(".fore-cast-container")
  var forecastQueryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput}&appid=${apiKey}&units=imperial`;
  console.log(forecastQueryURL);

  $.ajax({
    url: forecastQueryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);
    var foreCast = $("<h2>");
    foreCast.text("Forecast");
    foreCastContainer.html(foreCast)
  })
}

function cityNames(){
  var cityNameInput = $("#city-input").val().trim();
  var newCity = $(".new-city")
  //display city name 
  var newCityName = $("<div class='card city-list'>")
  newCityName.text(cityNameInput)
  newCity.prepend(newCityName)
  console.log(newCityName)

  //create object with city names 
  var newCities = {
    city: cityNameInput,
  }

  //if there is a value in the array, then turnm into a string and get item
  var cityArray = localStorage.getItem("newCityName")?
  JSON.parse(localStorage.getItem("newCityName")) : [];

  //push object into array 
  cityArray.push(newCities);
   
  //add new city to local storage and turn back into a string 
  localStorage.setItem("newCityName", JSON.stringify(cityArray))
}

$(".searchBtn").click(function (event) {
  event.preventDefault();
  makeRequestCurrent();
  makeRequestForecast();
  cityNames();
  $("#city-input").val("");
});
 

