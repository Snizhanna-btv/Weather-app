function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

// Feature #1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Feature #2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// feature #2

let form = document.querySelector("#search-form");

function showTemperature(response) {
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
}

function searchCity(actualCity) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${actualCity}&appid=c66d23310349377a45e61445f0813304&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function enterCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input");
  let actualCity = newCity.value;
  searchCity(actualCity);
}

form.addEventListener("submit", enterCity);

let scanLocation = document.querySelector("#current-location");

function getCurrentWeather(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c66d23310349377a45e61445f0813304&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function scancity() {
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

scanLocation.addEventListener("click", scancity);
