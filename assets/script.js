
//when the user submits the form 
  $(".searchBtn").click(function (event) {
    event.preventDefault();
    
    var apiKey = "9fa65c8a19cf2131654f1622f89351d4";
    var cityNameInput = $("#city-input").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&appid=" + apiKey + "&units=imperial";
    var weatherContainer = $(".weather-container");
    // var foreCastContainer = $(".fore-cast-container")
    var newCity = $(".new-city")

    

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);
      
      //display city weather info 
      var cityDiv = $("<div class='city-search'>")
      // var foreCast = $("<div class='")

      var now = moment();
      var nowDisplay = now.format("dddd MMM Mo YYYY");

      var cityName = $("<h2>")
      cityName.text(cityNameInput + " " + nowDisplay )

      var temp = $("<h3>")
      temp.text("Temperature: " + response.main.temp + " F");

      var wind = $("<h3>")
      wind.text("Wind Speed: " + response.wind.speed + " MPH");

      var humidity = $("<h3>")
      humidity.text("Humidity: " + response.main.humidity + " %");

      cityDiv.append(cityName,temp,wind,humidity)
    
      weatherContainer.html(cityDiv);

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

    });

  });


