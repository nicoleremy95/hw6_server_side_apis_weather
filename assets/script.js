var apiKey = "9fa65c8a19cf2131654f1622f89351d4";
var newCity = $(".new-city") 



function onPageLoad (){
  var storedCity = JSON.parse(localStorage.getItem("newCityName"));
  if (storedCity !=null){
    // $("#city-search").val(storedCity);
    for (var cityNameNew of storedCity){
      var newCityName = $("<button class='card city-list'>")
      newCityName.text(cityNameNew.city)
      newCityName.attr("data-name", cityNameNew.city)
      newCity.prepend(newCityName)
    }
    // var cityNameInput = $("#city-input").val().trim();
    
 
    
    console.log(newCityName);
    
    console.log("data-name", cityNameInput)
    
  }
}
onPageLoad(); 
function makeRequestCurrent(){
  var cityNameInput = $("#city-input").val().trim();

  var currentQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&appid=" + apiKey + "&units=imperial";
  var weatherContainer = $(".weather-container");
  $.ajax({
    url: currentQueryURL,
    method: "GET"
  }).then(function (response) {
    var cityDiv = $("<div>")

    var now = moment();
    var nowDisplay = now.format("dddd MMM Mo YYYY");

    var cityName = $("<h2>")
    cityName.text(response.name)

    var iconImage = $("<img>")
    var iconCode = response.weather[0].icon
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
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
  
      $.ajax({
        url: uvIndexURL,
        method: "GET"
      }).then(function(response2){
        // console.log(response2)
        var cityUvIndex = $("<h3>")
        var uvIndex = response2.value
        cityUvIndex.text("UV Index: " + uvIndex)
        // console.log(response2.value)
       
        if (uvIndex > 0.00 && uvIndex < 3.00){
          // console.log("low")
          cityUvIndex.addClass("low")
        }
        else if (uvIndex > 8.00){
          // console.log("severe")
          cityUvIndex.addClass("severe")
        } 
        else {
          // console.log("moderate")
          cityUvIndex.addClass("moderate")
        }
        weatherContainer.append(cityUvIndex)
      })

      cityDiv.append(nowDisplay,cityName,temp,wind,humidity)
    
      weatherContainer.html(cityDiv); 
    })
};


function makeRequestForecast(){
  var cityNameInput = $("#city-input").val().trim();
  var forecastQueryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityNameInput}&appid=${apiKey}&units=imperial`;
  var foreCastContainer = $(".fore-cast-container");
  $.ajax({
    url: forecastQueryURL,
    method: "GET"
  }).then(function(response2){
    console.log(response2);

    var cardDiv = $("<div>")

    var forecastDay1 = $("<div class = 'card'>")

    var foreCast = $("<h3>");
    foreCast.text("Forecast");
    
    var dateDay1 = $("<h3>")
    dateDay1.val(response2.list[7].dt_text)
    console.log(response2.list[7].dt_text)

    var tempDay1 = $("<h3>")
    tempDay1.text("Temperature: " + response2.list[7].main.temp + " F")
    console.log(response2.list[7].main.temp)

    var humidityDay1= $("<h3>")
    humidityDay1.text("Humidity: " + response2.list[7].main.humidity + " %")
    console.log(response2.list[7].main.humidity)

    forecastDay1.append(foreCast, dateDay1, tempDay1, humidityDay1)


    var forecastDay2 = $("<div class = 'card'>")

    var foreCast2 = $("<h3>");
    foreCast2.text("Forecast");
    
    var dateDay2 = $("<h3>")
    dateDay2.text(response2.list[15].dt_text)
    console.log(response2.list[15].dt_text)

    var tempDay2 = $("<h3>")
    tempDay2.text("Temperature: " + response2.list[15].main.temp + " F")
    console.log(response2.list[15].main.temp)

    var humidityDay2= $("<h3>")
    humidityDay2.text("Humidity: " + response2.list[15].main.humidity + " %")
    console.log(response2.list[15].main.humidity)

    forecastDay2.append(foreCast2, dateDay2, tempDay2, humidityDay2)


    var forecastDay3 = $("<div class = 'card'>")

    var foreCast3 = $("<h3>");
    foreCast3.text("Forecast");
    
    var dateDay3 = $("<h3>")
    dateDay3.text(response2.list[23].dt_text)
    console.log(response2.list[23].dt_text)

    var tempDay3 = $("<h3>")
    tempDay3.text("Temperature: " + response2.list[23].main.temp + " F")
    console.log(response2.list[23].main.temp)

    var humidityDay3= $("<h3>")
    humidityDay3.text("Humidity: " + response2.list[23].main.humidity + " %")
    console.log(response2.list[23].main.humidity)

    forecastDay3.append(foreCast3, dateDay3, tempDay3, humidityDay3)

    cardDiv.append(forecastDay1, forecastDay2, forecastDay3);

    foreCastContainer.html(cardDiv)
   

    var forecastDay4 = $("<div class = 'card'>")

    var foreCast4 = $("<h3>");
    foreCast4.text("Forecast");
    
    var dateDay4 = $("<h3>")
    dateDay4.text(response2.list[31].dt_text)
    console.log(response2.list[31].dt_text)

    var tempDay4 = $("<h3>")
    tempDay4.text("Temperature: " + response2.list[31].main.temp + " F")
    console.log(response2.list[31].main.temp)

    var humidityDay4= $("<h3>")
    humidityDay4.text("Humidity: " + response2.list[31].main.humidity + " %")
    console.log(response2.list[31].main.humidity)

    forecastDay4.append(foreCast4, dateDay4, tempDay4, humidityDay4)


    var forecastDay5 = $("<div class = 'card'>")

    var foreCast5 = $("<h3>");
    foreCast5.text("Forecast");
    
    var dateDay5 = $("<h3>")
    dateDay5.text(response2.list[39].dt_text)
    console.log(response2.list[39].dt_text)

    var tempDay5 = $("<h3>")
    tempDay5.text("Temperature: " + response2.list[39].main.temp + " F")
    console.log(response2.list[39].main.temp)

    var humidityDay5= $("<h3>")
    humidityDay5.text("Humidity: " + response2.list[39].main.humidity + " %")
    console.log(response2.list[39].main.humidity)

    forecastDay5.append(foreCast5, dateDay5, tempDay5, humidityDay5)


    cardDiv.append(forecastDay1, forecastDay2, forecastDay3, forecastDay4, forecastDay5);

    foreCastContainer.html(cardDiv)
  })
}

function cityNames(){
  var cityNameInput = $("#city-input").val().trim();
  
  //display city name 
  var newCityName = $("<button class='card city-list'>")
 
  newCityName.text(cityNameInput)
  console.log(newCityName);
  newCityName.attr("data-name", cityNameInput)
  console.log("data-name", cityNameInput)
  newCity.prepend(newCityName)
  // console.log(newCityName)

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
// $(document).on("click", ".city-list", makeRequestCurrent, makeRequestForecast)
//   //display city name 
//   var newCityName = $("<button class='card city-list'>")
//   newCityName.text(cityNameInput)
 
//   var cityNameInput = $(this).text(cityNameInput)
  
//   console.log(cityNameInput)
//   // console.log(seeAgain);
//   // makeRequestCurrent(seeAgain);
//   // makeRequestForecast(seeAgain);
//   $("#city-input").val();

 
