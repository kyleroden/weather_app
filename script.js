'use strict';

function showWeather() {
  const ip_url = "http://ip-api.com/json";
  //use fetch for the lat and long data
  fetch(ip_url, {
    method: 'GET'
  }).then(function(response) {
    return response.json()
  }).then(function(data) {
  	console.log("The Data: ", data);
    const country = data.countryCode;
    const city = data.city;
    const region = data.regionName;
    const lat = Math.floor(data.lat);
    const lon = Math.floor(data.lon);
    const display_city = document.getElementById("city_display");
    display_city.innerHTML = '<p class="lead">' + city + ", " + region + ", " + country + '</p>';
    console.log(`lat: ${lat} lon: ${lon}`)
    //now that we have the lat and long data from the ip api, we can do a fetch on the openweather api
    const weather_url = 'http://api.openweathermap.org/data/2.5/weather?';
    const api_key = "&APPID=4f730fe861842eaff00d58d1122003ea";
    fetch(weather_url + `lat=${lat}&lon=${lon}${api_key}`, {
      method: 'GET'
    }).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(`data from weather api, fetch: ${data}`);
        console.log(`${data.main.temp}`);
        const farenheit_temp = Math.floor(1.8 * (data.main.temp - 273) + 32) + " F";
        const celsius_temp = Math.floor(data.main.temp - 273.15) + " C";
        const weather_description = data.weather[0].description;
        const weather_icon = data.weather[0].icon;
        console.log(weather_icon);
        const current_wind = Math.floor(2.237 * data.wind.speed);
        //populate both divs with temps, and hide one later on button click
        let f_temp = document.getElementById("farenheit_temperature");
        let c_temp = document.getElementById("celsius_temperature");
        let icon_container = document.getElementById("weather_icon_container");
        let description_container = document.getElementById("weather_description");

        f_temp.innerHTML = `<p class='lead temp_text'>${farenheit_temp}</p>`;
        c_temp.innerHTML = `<p class='lead temp_text'>${celsius_temp}</p>`;
        icon_container.innerHTML = `<img src='http://openweathermap.org/img/w/${weather_icon}.png`;
        description_container.innerHTML = `<p class='lead'>${weather_description}</p>`;
      }).catch(function(err) {
        console.log(error.message);
        document.getElementById("weather_display").append("Sorry, there was an error and the weather cannot be displayed.");
      });
  //catching potential error from ip api (which gives lat and lon)
  }).catch(function(err) {
    document.getElementById("weather_display").append("Sorry, there was an error and the weather cannot be displayed.");
    console.log(error.message);
  });
}

function forecast_weather() {
  const location2 = "http://ip-api.com/json";
  const xhr = $.getJSON(location2, function(data) {
    const lat = Math.floor(data.lat);
    const long = Math.floor(data.lon);
    xhr.done(function() {
      const api_url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long;
      const api_key = "&APPID=4f730fe861842eaff00d58d1122003ea";
      $.getJSON(api_url + api_key, function(forecast) {
        //3hr forecast
        const h3_forecast = Math.floor(1.8 * (forecast.list[0].main.temp - 273) + 32) + " F";
        const h3_cel_temp = Math.floor(forecast.list[0].main.temp - 273.15) + " C";
        const tomorrow_forecast = forecast.list[0].weather[0].description;
        const tomorrow_icon = forecast.list[0].weather[0].icon;
        const tomorrow_timestamp = forecast.list[0].dt_txt;
        const tomorrow_time = tomorrow_timestamp.slice(5,-3);
        //24hr forecast
        const h24_forecast = Math.floor(1.8 * (forecast.list[4].main.temp - 273) + 32) + " F";
        const h24_cel_temp = Math.floor(forecast.list[4].main.temp - 273.15) + " C";
        const h24_timestamp = forecast.list[4].dt_txt;
        const h24_time = h24_timestamp.slice(5,-3);
        const h24_forecast_description = forecast.list[4].weather[0].description;
        const h24_icon = forecast.list[4].weather[0].icon;
        //48hr forecast
        const h48_forecast = Math.floor(1.8 * (forecast.list[6].main.temp - 273) + 32) + " F";
        const h48_cel_temp = Math.floor(forecast.list[6].main.temp - 273.15) + " C";
        const h48_timestamp = forecast.list[6].dt_txt;
        const h48_time = h48_timestamp.slice(5,-3);
        const h48_forecast_description = forecast.list[6].weather[0].description;
        const h48_icon = forecast.list[6].weather[0].icon;
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
  showWeather();
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
