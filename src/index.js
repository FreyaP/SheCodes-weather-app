function formatDate() {
  let now = new Date();
  let year = now.getFullYear();
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  function minutesDisplay() {
    if (minutes < 10) {
      return `0${minutes}`;
    } else {
      return `${minutes}`;
    }
  }
  let formatMinutes = minutesDisplay();

  let today = document.querySelector("#today");
  today.innerHTML = `${day} ${date} ${month}, ${year} ${hour}:${formatMinutes}`;
}
formatDate();

function getCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `30`;
}

let followCelsius = document.querySelector("#celsius");
followCelsius.addEventListener("click", getCelsius);

function getFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `86`;
}
let followFahrenheit = document.querySelector("#fahrenheit");
followFahrenheit.addEventListener("click", getFahrenheit);

//Homework - search city and current location weather
function displayWeather(response) {
  document.querySelector("h1").innerHTML = `${response.data.name}`;

  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;

  document.querySelector(
    "#weather-description"
  ).innerHTML = `${response.data.weather[0].description}`;

  document.querySelector("#temp-high").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}`;

  document.querySelector("#temp-low").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}`;

  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}`;

  document.querySelector(
    "#humidity-value"
  ).innerHTML = `${response.data.main.humidity}`;
}

function findLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = `8c8f09ab6406d1fc43401acc75ad7253`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

let submitCity = document.querySelector("#city-form");
submitCity.addEventListener("submit", findLocation);

function findCurrentLocation(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `8c8f09ab6406d1fc43401acc75ad7253`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(findCurrentLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);

searchCity("Vancouver");
