var apiKey = "9fa65c8a19cf2131654f1622f89351d4";
var newCity = $(".new-city") 

//do this on page load to throw city button back on page 
function onPageLoad (){
  var storedCity = JSON.parse(localStorage.getItem("newCityName"));
  if (storedCity !=null){
    for (var cityNameNew of storedCity){
      var newCityName = $("<button class='card city-list btn'>")
      newCityName.text(cityNameNew.city)
      newCityName.attr("data-name", cityNameNew.city)
      newCity.prepend(newCityName)
    } 
  }
}
onPageLoad(); 

//request the current conditions for the city 
function makeRequestCurrent(city){
  var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
  var weatherContainer = $(".weather-container");
  $.ajax({
    url: currentQueryURL,
    method: "GET"
  }).then(function (responseCurrent) {
    var cityDiv = $("<div>")
    
    var nowDisplay = moment().format("dddd MM D YYYY");
    console.log(nowDisplay);
    
    var cityName = $("<h2>")
    cityName.text(responseCurrent.name)

    var iconImage = $("<img>")
    var iconCode = responseCurrent.weather[0].icon
    var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"
    iconImage.attr("src", iconUrl)
    cityName.append(iconImage)

    var temp = $("<h3>")
    temp.text("Temperature: " + responseCurrent.main.temp + " F");

    var wind = $("<h3>")
    wind.text("Wind Speed: " + responseCurrent.wind.speed + " MPH");

    var humidity = $("<h3>")
    humidity.text("Humidity: " + responseCurrent.main.humidity + " %");

    var lat = responseCurrent.coord.lat
    var lon = responseCurrent.coord.lon
    var uvIndexURL= "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon
  
      $.ajax({
        url: uvIndexURL,
        method: "GET"
      }).then(function(responseUV){
        var cityUvIndex = $("<h3>")
        var uvIndex = responseUV.value
        cityUvIndex.text("UV Index: " + uvIndex)
       
        if (uvIndex > 0.00 && uvIndex < 3.00){
          cityUvIndex.addClass("low")
        }
        else if (uvIndex > 8.00){
          cityUvIndex.addClass("severe")
        } 
        else {
          cityUvIndex.addClass("moderate")
        }
        weatherContainer.append(cityUvIndex)
      })

      cityDiv.append(nowDisplay,cityName,temp,wind,humidity)
    
      weatherContainer.html(cityDiv); 
    })
};

//request the forecast data for the city 
function makeRequestForecast(city){
  var forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  
  $.ajax({
    url: forecastQueryURL,
    method: "GET"
  }).then(function(responseForecast){
    console.log(responseForecast);
    var cardDiv = $("<div class= 'row' >")
    var foreCastContainer = $(".fore-cast-container");
    var days = [7, 15, 23, 31, 39]
      days.forEach(function(day){ 
      var foreCast = $("<h3>");
      foreCast.text("Forecast");

      var iconImageDay = $("<img>")
      var iconCodeDay = responseForecast.list[day].weather[0].icon
      console.log(responseForecast.list[day].weather[0].icon)
      var iconUrlForecast = "https://openweathermap.org/img/w/" + iconCodeDay + ".png"
      iconImageDay.attr("src", iconUrlForecast)
      foreCast.append(iconImageDay)
      
      var justDate = responseForecast.list[day].dt_txt.split(" ")
      var dateDay = $("<h3>")
      dateDay.text(justDate[0])
      console.log(responseForecast.list[day].dt_txt)

      var tempDay = $("<h3>")
      tempDay.text("Temperature: " + responseForecast.list[day].main.temp + " F")
      console.log("Temperature: " + responseForecast.list[day].main.temp + " F")

      var humidityDay= $("<h3>")
      humidityDay.text("Humidity: " + responseForecast.list[day].main.humidity + " %")
      console.log("Humidity: " + responseForecast.list[day].main.humidity + " %")
 
      var forecastDay = $("<div class = 'card forecast'>")
      forecastDay.append(foreCast, dateDay, tempDay, humidityDay)
      
      cardDiv.append(forecastDay);
      foreCastContainer.html(cardDiv)   
    });
  })
}

//create cities into buttons 
function cityNames(city){
  //display city name 
  var newCityName = $("<button class='card city-list btn'>")
  
  newCityName.text(city);
  newCityName.attr("data-name", city);
  newCity.prepend(newCityName);

  //create object with city names 
  var newCities = {
    city: city,
  };

  //if there is a value in the array, then turnm into an object and get item
  var cityArray = localStorage.getItem("newCityName")?
  JSON.parse(window.localStorage.getItem("newCityName")) : [];

  //push object into array 
  cityArray.push(newCities);
   
  //add new city to local storage and turn back into a string 
  localStorage.setItem("newCityName", JSON.stringify(cityArray));
}

//on search button click, run these functions 
$(".searchBtn").click(function (event) {
  event.preventDefault();
  var cityNameInput = $("#city-input").val().trim();
  makeRequestCurrent(cityNameInput);
  makeRequestForecast(cityNameInput);
  cityNames(cityNameInput);
  $("#city-input").val("");
});

//on a click of any button with the class of city-list run these functions 
$(".city-list").click(function(){
  var cityNameInput = $(this).attr("data-name");
  console.log("hi")
  makeRequestCurrent(cityNameInput);
  makeRequestForecast(cityNameInput);
})


