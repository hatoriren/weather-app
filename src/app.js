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
}

let city = "Kyiv";
let apiKey = "277efc90731af2437305b7o4905bt1d3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(getTemperature);

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
let days = ["Sun", "Mon", "Thue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
dateElement.innerHTML = `${date} ${month}, ${day}`;
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
timeElement.innerHTML = `${hours}:${minutes}`;
