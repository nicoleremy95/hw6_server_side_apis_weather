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
        cityUvIndex.text("UV Index: " + response2.value)
       
        if (cityUvIndex < 3.00){
          console.log("low")
          cityUvIndex.addClass("low")
        }
        else if (cityUvIndex > 8.00){
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
 

