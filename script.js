function show_weather() {
  //get the user's location
  var location = "http://ip-api.com/json";
  var xhr = $.getJSON(location, function(data) {
    var country = data.countryCode;
    var city = data.city;
    var region = data.regionName;
    var lat = Math.floor(data.lat);
    var long = Math.floor(data.lon);
    var display_city = document.getElementById("city_display");
    display_city.innerHTML = '<p class="lead">' + city + ", " + region + ", " + country + '</p>';
    //after gettin JSON response,
    xhr.done(function() {
      var api_url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long;
      var api_key = "&APPID=4f730fe861842eaff00d58d1122003ea";
      $.getJSON(api_url + api_key, function(weather) {
        var farenheit_temp = Math.floor(1.8 * (weather.main.temp - 273) + 32) + " F";
        var celsius_temp = Math.floor(weather.main.temp - 273.15) + " C";
        var weather_description = weather.weather[0].description;
        var weather_icon = weather.weather[0].icon;
        var current_wind = Math.floor(2.237 * weather.wind.speed);
        //populate both divs with temps, and hide one later on button click
        document.getElementById("farenheit_temperature").innerHTML = "<p class='lead'>" + farenheit_temp + "</p>";
        document.getElementById("celsius_temperature").innerHTML = "<p class='lead'>" + celsius_temp + "</p>";
        //document.getElementById("wind_display").innerHTML = current_wind;
        document.getElementById("weather_icon_container").innerHTML = "<img src='http://openweathermap.org/img/w/" + weather_icon + ".png'>";
          document.getElementById("weather_description").innerHTML = "<p class='lead'>" + weather_description + "</p>";
      });
    })
  })
}

//get the weather from open weather api
$(document).ready(function() {
  show_weather();
});

//Toggle farenheit / celsius
function temp_scale_changer() {
  if ($("#celsius_temperature").hasClass("hide")) {
    $("#farenheit_temperature").toggleClass("hide");
    $("#celsius_temperature").toggleClass("show");
  } else {
    $("#celsius_temperature").toggleClass("hide");
  }
}
