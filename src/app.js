function getTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let descriptionElement = document.querySelector("h2");
  descriptionElement.innerHTML = response.data.condition.description;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}
let city = "Paris";
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
timeElement.innerHTML = `${hours}:${minutes}`;
