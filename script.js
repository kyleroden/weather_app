function show_weather() {
  //get the user's location
  var location = "http://ip-api.com/json";
  var xhr = $.getJSON(location, function(data) {
    var country = data.countryCode;
    var city = data.city;
    var lat = Math.floor(data.lat);
    var long = Math.floor(data.lon);
    var display_city = document.getElementById("city_display");
    display_city.innerHTML = city + " , " + country;

    xhr.done(function() {
      var api_url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long;
      var api_key = "&APPID=4f730fe861842eaff00d58d1122003ea";
      $.getJSON(api_url + api_key, function(weather) {
        var weather_city = weather.main.temp;
        document.getElementById("weather_city_display").innerHTML = weather_city;
      });
    })
  })
}

//get the weather from open weather api
$(document).ready(function() {
  show_weather();
});
