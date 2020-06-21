


//when the user submits the form 
$(".searchBtn").click(function(event){
    event.preventDefault;
    var apiKey = "9fa65c8a19cf2131654f1622f89351d4";
    var cityNameInput = $("#city-input").val().trim();
    var queryURL= "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&appid=" + apiKey + "&units=imperial"
    // var weatherContainer = $("#weather-container");
    console.log(queryURL);
    
    console.log('hi')
   
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        
        // var results = response.data; 

        })
       
})

