
 
  
  //when the user submits the form 
  $(".searchBtn").click(function (event) {
    event.preventDefault();
    
    var apiKey = "9fa65c8a19cf2131654f1622f89351d4";
    var cityNameInput = $("#city-input").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&appid=" + apiKey + "&units=imperial";
    var weatherContainer = $(".weather-container");
    var newCity = $(".new-city");
    // var addNewCity = $("<div>")
    // var city = cityNameInput.val();

    // addNewCity.prepend()

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);
      
      
      var cityDiv = $("<div>")

      var temp = response.main.temp;
      cityDiv.append(temp);
      console.log(temp)

      var wind = response.wind.speed;
      cityDiv.append(wind)
      console.log(wind)


      var humidity = response.main.humidity;
      cityDiv.append(humidity)
      console.log(humidity)

      weatherContainer.append(cityDiv)


    });

  });


