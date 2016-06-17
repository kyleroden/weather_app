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
        document.getElementById("farenheit_temperature").innerHTML = "<p class='lead temp_text'>" + farenheit_temp + "</p>";
        document.getElementById("celsius_temperature").innerHTML = "<p class='lead temp_text'>" + celsius_temp + "</p>";
        //document.getElementById("wind_display").innerHTML = current_wind;
        document.getElementById("weather_icon_container").innerHTML = "<img src='http://openweathermap.org/img/w/" + weather_icon + ".png'>";
        document.getElementById("weather_description").innerHTML = "<p class='lead'>" + weather_description + "</p>";
      });
    })
    xhr.fail(function(){
      console.log("api call failed");
      document.getElementById("weather_display").append("Sorry, there was an error and the weather cannot be displayed.");
    });
  })
}

function forecast_weather() {
  var location2 = "http://ip-api.com/json";
  var xhr = $.getJSON(location2, function(data) {
    var lat = Math.floor(data.lat);
    var long = Math.floor(data.lon);
    xhr.done(function() {
      var api_url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long;
      var api_key = "&APPID=4f730fe861842eaff00d58d1122003ea";
      $.getJSON(api_url + api_key, function(forecast) {
        //3hr forecast
        var h3_forecast = Math.floor(1.8 * (forecast.list[0].main.temp - 273) + 32) + " F";
        var h3_cel_temp = Math.floor(forecast.list[0].main.temp - 273.15) + " C";
        var tomorrow_forecast = forecast.list[0].weather[0].description;
        var tomorrow_icon = forecast.list[0].weather[0].icon;
        var tomorrow_timestamp = forecast.list[0].dt_txt;
        var tomorrow_time = tomorrow_timestamp.slice(5,-3);
        //24hr forecast
        var h24_forecast = Math.floor(1.8 * (forecast.list[4].main.temp - 273) + 32) + " F";
        var h24_cel_temp = Math.floor(forecast.list[4].main.temp - 273.15) + " C";
        var h24_timestamp = forecast.list[4].dt_txt;
        var h24_time = h24_timestamp.slice(5,-3);
        var h24_forecast_description = forecast.list[4].weather[0].description;
        var h24_icon = forecast.list[4].weather[0].icon;
        //48hr forecast
        var h48_forecast = Math.floor(1.8 * (forecast.list[6].main.temp - 273) + 32) + " F";
        var h48_cel_temp = Math.floor(forecast.list[6].main.temp - 273.15) + " C";
        var h48_timestamp = forecast.list[6].dt_txt;
        var h48_time = h48_timestamp.slice(5,-3);
        var h48_forecast_description = forecast.list[6].weather[0].description;
        var h48_icon = forecast.list[6].weather[0].icon;
        //write 3hr data
        document.getElementById("3hr_temperature_forecast").innerHTML = "<p class='lead temp_text'>" + h3_forecast + "</p>";
        document.getElementById("3hr_icon_container").innerHTML = "<img src='http://openweathermap.org/img/w/" + tomorrow_icon + ".png'>";
        document.getElementById("3hr_forecast_description").innerHTML = "<p class='lead'>" + tomorrow_forecast + "</p>";
        document.getElementById("first_forecast_time").innerHTML = "<p class='small'>" + tomorrow_time + "</p>";
        document.getElementById("3hr_celsius_temperature").innerHTML = "<p class='lead temp_text'>" + h3_cel_temp + "</p>";
        //write 24hr data
        document.getElementById("24hr_temperature_forecast").innerHTML = "<p class='lead temp_text'>" + h24_forecast + "</p>";
        document.getElementById("24hr_icon_container").innerHTML = "<img src='http://openweathermap.org/img/w/" + h24_icon + ".png'>";
        document.getElementById("second_forecast_time").innerHTML = "<p class='small'>" + h24_time + "</p>";
        document.getElementById("tomorrow_forecast_description").innerHTML = "<p class='lead'>" + h24_forecast_description + "</p>";
        document.getElementById("24hr_celsius_temperature").innerHTML = "<p class='lead temp_text'>" + h24_cel_temp + "</p>";
        //write 48hr data
        document.getElementById("48hr_temperature_forecast").innerHTML = "<p class='lead temp_text'>" + h48_forecast + "</p>";
        document.getElementById("48hr_icon_container").innerHTML = "<img src='http://openweathermap.org/img/w/" + h48_icon + ".png'>";
        document.getElementById("third_forecast_time").innerHTML = "<p class='small'>" + h48_time + "</p>";
        document.getElementById("9pm_forecast_description").innerHTML = "<p class='lead'>" + h48_forecast_description + "</p>";
        document.getElementById("48hr_celsius_temperature").innerHTML = "<p class='lead temp_text'>" + h48_cel_temp + "</p>";


      });
    });
  });
}
//get the weather from open weather api
$(document).ready(function() {
  show_weather();
  forecast_weather();
});

//Toggle farenheit / celsius
function temp_scale_changer() {
if ($(".cel_temp").hasClass("hide")) {
  $(".faren_temp").toggleClass("hide");
  $(".cel_temp").toggleClass("show");
} else {
  $(".cel_temp").toggleClass("hide");
}
}
