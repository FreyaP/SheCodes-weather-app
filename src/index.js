function formatDate(timestamp) {
  let now = new Date(timestamp);

  let date = now.getDate();
  let days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
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

  let today = `${day} ${date} ${month}, ${hour}:${formatMinutes}`;
  return `${today}`;
}

function getCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(celsiustemp);
  followFahrenheit.classList.remove("hidden");
  followCelsius.classList.add("hidden");
}

let followCelsius = document.querySelector("#celsius");
followCelsius.addEventListener("click", getCelsius);

function getFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `${Math.round((celsiustemp * 9) / 5 + 32)}`;
  followFahrenheit.classList.add("hidden");
  followCelsius.classList.remove("hidden");
}
let followFahrenheit = document.querySelector("#fahrenheit");
followFahrenheit.addEventListener("click", getFahrenheit);

celsiustemp = null;

function displayWeather(response) {
  celsiustemp = response.data.main.temp;

  document.querySelector("h1").innerHTML = `${response.data.name}`;

  document.querySelector("#today").innerHTML = `${formatDate(
    response.data.dt * 1000
  )}`;

  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;

  document.querySelector(
    "#weather-description"
  ).innerHTML = `${response.data.weather[0].main}`;

  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}`;

  document.querySelector(
    "#humidity-value"
  ).innerHTML = `${response.data.main.humidity}`;

  let weatherIcon = document.querySelector("#todayIcon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document
    .querySelector("#todayIcon")
    .setAttribute("alt", `${response.data.weather[0].description}`);

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&
exclude=minutely,hourly,current&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function findLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  let day = days[date.getDay()];
  return `${day}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 1; index < 7; index++) {
    forecast = response.data.daily[index];
    forecastElement.innerHTML += `<div class="row forecast">
          <div class="col-5">
            <h6>${formatDay(forecast.dt * 1000)}</h6>
          </div>
          <div class="col-4">
            <img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="Snow" width="50px" />
          </div>
          <div class="col-3">
            <p><strong>${Math.round(
              forecast.temp.max
            )}°</strong> <small>${Math.round(forecast.temp.min)}°</small></p>
          </div>
        </div>`;
  }
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}
let apiKey = `8c8f09ab6406d1fc43401acc75ad7253`;

let submitCity = document.querySelector("#city-form");
submitCity.addEventListener("submit", findLocation);

function findCurrentLocation(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(findCurrentLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);

searchCity("Vancouver");
