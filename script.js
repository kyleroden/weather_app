'use strict';

//all functions and variables in one scope, after dom is loaded
document.addEventListener('DOMContentLoaded', function(){
//url for ip-api which gets user coords
const ip_url = "http://ip-api.com/json";
//url for the current weather api
const weather_url = 'http://api.openweathermap.org/data/2.5/weather?';
//url for forecast weather api
const forecast_url = "http://api.openweathermap.org/data/2.5/forecast?"
//....uh....
const api_key = "&APPID=4f730fe861842eaff00d58d1122003ea";

function showWeather() {
    //use fetch for the lat and long data
    fetch(ip_url, {
      method: 'GET'
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      const country = data.countryCode;
      const city = data.city;
      const region = data.regionName;
      const lat = Math.floor(data.lat);
      const lon = Math.floor(data.lon);
      const display_city = document.getElementById("city_display");
      //now that we have the lat and long data from the ip api, we can do a fetch on the openweather api
      const api_key = "&APPID=4f730fe861842eaff00d58d1122003ea";
      //display the city, state/region and country given by the ip api (based on lat/lon)
      display_city.innerHTML = `<p class="lead">${city}, ${region}, ${country}</p>`;
      //second api call to the current weather api
      fetch(weather_url + `lat=${lat}&lon=${lon}${api_key}`, {
        method: 'GET'
      }).then(function(response) {
          return response.json();
        }).then(function(data) {
          const farenheit_temp = Math.floor(1.8 * (data.main.temp - 273) + 32) + " F";
          const celsius_temp = Math.floor(data.main.temp - 273.15) + " C";
          const weather_description = data.weather[0].description;
          const weather_icon = data.weather[0].icon;
          const current_wind = Math.floor(2.237 * data.wind.speed);
          //populate both divs with temps, and hide one later on button click
          let f_temp = document.getElementById("farenheit_temperature");
          let c_temp = document.getElementById("celsius_temperature");
          let icon_container = document.getElementById("weather_icon_container");
          let description_container = document.getElementById("weather_description");

          f_temp.innerHTML = `<p class='lead temp_text'>${farenheit_temp}</p>`;
          c_temp.innerHTML = `<p class='lead temp_text'>${celsius_temp}</p>`;
          icon_container.innerHTML = `<img src='http://openweathermap.org/img/w/${weather_icon}.png'>`;
          description_container.innerHTML = `<p class='lead'>${weather_description}</p>`;
          //catch for current weather api
        }).catch(function(error) {
          console.log(error.message);
          document.getElementById("weather_display").append("Sorry, there was an error and the weather cannot be displayed.");
        });
    //catching potential error from ip api (which gives lat and lon)
    }).catch(function(error) {
      document.getElementById("weather_display").append("Sorry, there was an error and the weather cannot be displayed.");
      console.log(error.message);
    });
  }
function forecastWeather() {
  fetch(ip_url, {
    method: 'GET'
      }).then(function(response) {
         return response.json();
      }).then(function(ip_data) {
        const lat = Math.floor(ip_data.lat);
        const lon = Math.floor(ip_data.lon);
        //now make the call to the forecast api
        fetch(forecast_url + `lat=${lat}&lon=${lon}${api_key}`, {
          method: 'GET'
        }).then(function(response) {
          return response.json();
        }).then(function(forecast_data){
          console.log("Forecast api data: ", forecast_data);
          //3hr forecast
          const h3_forecast = Math.floor(1.8 * (forecast_data.list[0].main.temp - 273) + 32) + " F";
          const h3_cel_temp = Math.floor(forecast_data.list[0].main.temp - 273.15) + " C";
          const first_forecast = forecast_data.list[0].weather[0].description;
          const first_forecast_icon = forecast_data.list[0].weather[0].icon;
          const first_forecast_timestamp = forecast_data.list[0].dt_txt;
          const first_forecast_time = first_forecast_timestamp.slice(5,-3);
          let first_forecast_hrs = first_forecast_time.slice(6,8);//hour (2 digits)
          let first_forecast_div = document.getElementById("first_forecast_time");
          //convert from military /unix time
          if(first_forecast_hrs > 12) {
            first_forecast_hrs = first_forecast_hrs % 12;//
            let first_hrs_str = first_forecast_hrs.toString();
            //first_hrs_str.trim();
            first_hrs_str += " PM";
            first_forecast_div.innerHTML = "<p class='small'>" + first_hrs_str + "</p>";
          } else {
            let first_hrs_str = first_forecast_hrs.toString();
            //first_hrs_str.trim();
            first_hrs_str += " AM";
            first_forecast_div.innerHTML = "<p class='small'>" + first_hrs_str + "</p>";
          }

          //24hr forecast
          const h24_forecast = Math.floor(1.8 * (forecast_data.list[4].main.temp - 273) + 32) + " F";
          const h24_cel_temp = Math.floor(forecast_data.list[4].main.temp - 273.15) + " C";
          const h24_timestamp = forecast_data.list[4].dt_txt;
          const h24_time = h24_timestamp.slice(5,-3);
          let fifth_forecast_hrs = h24_time.slice(6,8);
          let fifth_forecast_div = document.getElementById("fifth_forecast_time");
          if (fifth_forecast_hrs > 12) {
            fifth_forecast_hrs = fifth_forecast_hrs % 12;
            let fifth_hrs_str = fifth_forecast_hrs.toString();
            fifth_hrs_str += " PM";
            fifth_forecast_div.innerHTML = "<p class='small'>" + fifth_hrs_str + "</p>";
          } else { //the time should be AM
            let fifth_hrs_str = fifth_forecast_hrs.toString();
            fifth_hrs_str += " AM";
            fifth_forecast_div.innerHTML = "<p class='small'>" + fifth_hrs_str + "</p>";
          }
          const h24_forecast_description = forecast_data.list[4].weather[0].description;
          const h24_icon = forecast_data.list[4].weather[0].icon;

          //48hr forecast
          const h48_forecast = Math.floor(1.8 * (forecast_data.list[6].main.temp - 273) + 32) + " F";
          const h48_cel_temp = Math.floor(forecast_data.list[6].main.temp - 273.15) + " C";
          const h48_timestamp = forecast_data.list[6].dt_txt;
          const h48_time = h48_timestamp.slice(5,-3);
          let seventh_forecast_hrs = h48_time.slice(6,8);
          let seventh_forecast_div = document.getElementById("seventh_forecast_time");

          if(seventh_forecast_hrs > 12) {
            seventh_forecast_hrs = seventh_forecast_hrs % 12;
            let seventh_hrs_str = seventh_forecast_hrs.toString();
            seventh_hrs_str += " PM";
            seventh_forecast_div.innerHTML = "<p class='small'>" + seventh_hrs_str + "</p>";
          } else {
            let seventh_hrs_str = seventh_forecast_hrs.toString();
            seventh_hrs_str += " AM";
            seventh_forecast_div.innerHTML = "<p class='small'>" + seventh_hrs_str + "</p>";
          }
          const h48_forecast_description = forecast_data.list[6].weather[0].description;
          const h48_icon = forecast_data.list[6].weather[0].icon;
          //write 3hr data
          document.getElementById("3hr_temperature_forecast").innerHTML = "<p class='lead temp_text'>" + h3_forecast + "</p>";
          document.getElementById("3hr_icon_container").innerHTML = "<img src='http://openweathermap.org/img/w/" + first_forecast_icon + ".png'>";
          document.getElementById("3hr_forecast_description").innerHTML = "<p class='lead'>" + first_forecast + "</p>";
          //document.getElementById("first_forecast_time").innerHTML = "<p class='small'>" + first_forecast_time + "</p>";
          document.getElementById("3hr_celsius_temperature").innerHTML = "<p class='lead temp_text'>" + h3_cel_temp + "</p>";
          //write 24hr data
          document.getElementById("24hr_temperature_forecast").innerHTML = "<p class='lead temp_text'>" + h24_forecast + "</p>";
          document.getElementById("24hr_icon_container").innerHTML = "<img src='http://openweathermap.org/img/w/" + h24_icon + ".png'>";
          //document.getElementById("fifth_forecast_time").innerHTML = "<p class='small'>" + h24_time + "</p>";
          document.getElementById("tomorrow_forecast_description").innerHTML = "<p class='lead'>" + h24_forecast_description + "</p>";
          document.getElementById("24hr_celsius_temperature").innerHTML = "<p class='lead temp_text'>" + h24_cel_temp + "</p>";
          //write 48hr data
          document.getElementById("48hr_temperature_forecast").innerHTML = "<p class='lead temp_text'>" + h48_forecast + "</p>";
          document.getElementById("48hr_icon_container").innerHTML = "<img src='http://openweathermap.org/img/w/" + h48_icon + ".png'>";
          document.getElementById("third_forecast_time").innerHTML = "<p class='small'>" + h48_time + "</p>";
          document.getElementById("9pm_forecast_description").innerHTML = "<p class='lead'>" + h48_forecast_description + "</p>";
          document.getElementById("48hr_celsius_temperature").innerHTML = "<p class='lead temp_text'>" + h48_cel_temp + "</p>";

        }).catch(function(error) {
        console.log("error from forecastWeather: ", error.message);
    });
  }).catch(function(error) {
    console.log("error from forecastWeather function, ip-api");
  });
}
  //run the scripts
  showWeather();
  forecastWeather();
});



function temp_scale_changer() {
  const celsius_temps = document.querySelectorAll('.cel_temp');
  const faren_temps = document.querySelectorAll('.faren_temp');

  celsius_temps.forEach(function(c_temp){
    if(c_temp.classList) {
      c_temp.classList.toggle('hide');
    } else {
      let classes = c_temp.className.split(' ');
      let existingIndex = classes.indexOf('hide');

      if(existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push('hide');
      }
      c_temp.className = classes.join(' ');
    }
  });

  faren_temps.forEach(function(f_temp){
    if(f_temp.classList) {
      f_temp.classList.toggle('hide');
    } else {
      let classes = f_temp.className.split(' ');
      let existingIndex = classes.indexOf('hide');

      if(existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push('hide');
      }
      f_temp.className = classes.join(' ');
    }
  });
}
