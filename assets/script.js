var apiKey = "9fa65c8a19cf2131654f1622f89351d4";

var storedCity = JSON.parse(localStorage.getItem("newCityName"));
var newCity = $(".new-city") 

if (storedCity !=null){
  $("#city-search").val(storedCity);
}
  
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
      cityName.text(response.name)

      var iconImage = $("<img>")
      var iconCode = response.weather[0].icon
      console.log(iconCode);
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
      console.log(iconUrl);
      iconImage.attr("src", iconUrl)
      cityName.append(iconImage)

      var temp = $("<h3>")
      temp.text("Temperature: " + response.main.temp + " F");

      var wind = $("<h3>")
      wind.text("Wind Speed: " + response.wind.speed + " MPH");

      var humidity = $("<h3>")
      humidity.text("Humidity: " + response.main.humidity + " %");

      var lat = response.coord.lat
      var lon = response.coord.lon
      var uvIndexURL= "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon
      console.log(uvIndexURL)
      $.ajax({
        url: uvIndexURL,
        method: "GET"
      }).then(function(response2){
        console.log(response2)
        var cityUvIndex = $("<h3>")
        var uvIndex = response2.value
        cityUvIndex.text("UV Index: " + uvIndex)
        console.log(response2.value)
       
        if (uvIndex > 0.00 && uvIndex < 3.00){
          console.log("low")
          cityUvIndex.addClass("low")
        }
        else if (uvIndex > 8.00){
          console.log("severe")
          cityUvIndex.addClass("severe")
        } 
        else {
          console.log("moderate")
          cityUvIndex.addClass("moderate")
        }
        weatherContainer.append(cityUvIndex)
      })

      cityDiv.append(nowDisplay,cityName,temp,wind,humidity)
    
      weatherContainer.html(cityDiv); 
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

    // var date = $("<h3>")
    // date.text(response.)
  })
}

function cityNames(){
  var cityNameInput = $("#city-input").val().trim();
  var newCity = $(".new-city")
  //display city name 
  var newCityName = $("<button class='card city-list'>")
  newCityName.text(cityNameInput)
  newCityName.attr("data-name", cityNameInput)
  newCity.prepend(newCityName)
  console.log(newCityName)

  //create object with city names 
  var newCities = {
    city: cityNameInput,
  }

  //if there is a value in the array, then turnm into an object and get item
  var cityArray = localStorage.getItem("newCityName")?
  JSON.parse(window.localStorage.getItem("newCityName")) : [];

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


// TODO: upon the click of a city, it displays the same information again
//create the card city-list into buttons and add a data-nanme attr to each. Then use the $(.this) like an event target 
$("<button class='card city-list'>").click(function(event){
  event.preventDefault();
  console.log("hi")
  var seeAgain = $(this).attr("data-name")
  console.log(seeAgain);
  makeRequestCurrent(seeAgain);
  makeRequestForecast(seeAgain);
  $("#city-input").val();
})
 
