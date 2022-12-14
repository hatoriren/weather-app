function getTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("h2");
  let cityElement = document.querySelector("#city");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.description}.png`
  );

  getForecast(response.data.city);
}

function getForecast(city) {
  let key = "277efc90731af2437305b7o4905bt1d3";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;
  axios.get(url).then(displayForecast);
}

function search(city) {
  let apiKey = "277efc90731af2437305b7o4905bt1d3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#floatingInput");
  search(cityInput.value);
}

function showForecastButton(coordinates) {
  let key = "277efc90731af2437305b7o4905bt1d3";
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${key}&units=metric`;
  axios.get(url).then(displayForecast);
}

function showPosition(position) {
  let apiKey = "277efc90731af2437305b7o4905bt1d3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  showForecastButton(position.coords);
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(getTemperature);
}

function handleClick() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function darkTheme() {
  document.body.style.backgroundImage =
    "url('https://i.ibb.co/r7J7R84/night-city-road-marking-145375-1920x1080.jpg')";
  document.getElementById("city").style.color = "#652F4F";
  document.getElementById("date").style.color = "#652F4F";
  document.getElementById("time").style.color = "#652F4F";
  document.getElementById("small").style.color = "#F0E4CE";
  document.getElementById("name").style.color = "#E08886";
  document.getElementById("all").style.borderColor = "#652F4F";
  document.getElementById("btnPrimary").style.backgroundColor = "#652F4F";
  myLocation.addEventListener(
    "mouseenter",
    function (event) {
      event.target.style.backgroundColor = "#652F4F";
    },
    false
  );
  myLocation.addEventListener(
    "mouseleave",
    function (event) {
      event.target.style.backgroundColor = "#f2eef0";
    },
    false
  );
}
function lightTheme() {
  document.body.style.backgroundImage =
    "url('https://i.ibb.co/wyF8LS8/sea-sky-horizon-145313-1920x1080.jpg')";
  document.getElementById("city").style.color = "#469597";
  document.getElementById("date").style.color = "#469597";
  document.getElementById("time").style.color = "#469597";
  document.getElementById("small").style.color = "#3377b3";
  document.getElementById("name").style.color = "black";
  document.getElementById("all").style.borderColor = "#469597";
  document.getElementById("btnPrimary").style.backgroundColor = "#469597";
  myLocation.addEventListener(
    "mouseenter",
    function (event) {
      event.target.style.backgroundColor = "#469597";
    },
    false
  );
  myLocation.addEventListener(
    "mouseleave",
    function (event) {
      event.target.style.backgroundColor = "#f2eef0";
    },
    false
  );
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
        <div class="weather-forecast-date">${formatDate(forecastDay.time)}</div>
          <img
           src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
             forecastDay.condition.icon
           }.png"
           alt=""
           width="42"
           />
            <div class="weather-temperatures">
              <span class="weather-forecast-max"> ${Math.round(
                forecastDay.temperature.maximum
              )}?? </span>
                <span class="weather-forecast-min"> ${Math.round(
                  forecastDay.temperature.minimum
                )}?? </span>
                </div>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let now = new Date();

let dateElement = document.querySelector("#date");
let timeElement = document.querySelector("#time");

let date = now.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
dateElement.innerHTML = `${date} ${month}, ${day}`;
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
timeElement.innerHTML = `${hours}:${minutes}`;

let form = document.querySelector("#form-floating");
form.addEventListener("submit", handleSubmit);

let myLocation = document.querySelector("#myLocation");
myLocation.addEventListener("click", handleClick);

search("New York");
