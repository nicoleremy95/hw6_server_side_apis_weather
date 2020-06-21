

var apiKey = "9fa65c8a19cf2131654f1622f89351d4";

var cityName = $("input").text();

var queryURL= "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="  + apiKey;
 console.log(queryURL);

//  $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {

//     console.log(response);

//     })



$(".searchBtn").click(function(event){
    event.preventDefault;

})

