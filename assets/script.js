
 
  
  //when the user submits the form 
  $(".searchBtn").click(function (event) {
    event.preventDefault();
    
    var apiKey = "9fa65c8a19cf2131654f1622f89351d4";
    var cityNameInput = $("#city-input").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&appid=" + apiKey + "&units=imperial";
    var weatherContainer = $(".weather-container");
    var newCity = $(".new-city");

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);
      
      //display city weather info 
      var cityDiv = $("<div class='city-card'>")

      var cityName = $("<h2>")
      cityName.text(cityNameInput)

      var temp = $("<h3>")
      temp.text(response.main.temp);

      var wind = $("<h3>")
      wind.text(response.wind.speed);

      var humidity = $("<h3>")
      humidity.text(response.main.humidity);

      cityDiv.append(cityName,temp,wind,humidity)
    
      weatherContainer.html(cityDiv);

      //display city name 
      var cityNewName = $("<div>")
      cityNewName.text(cityNameInput)
      newCity.prepend(cityNewName)
      console.log(cityNewName)
    });

  });


