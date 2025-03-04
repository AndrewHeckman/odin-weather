import "../css/styles.css";
import getData from "./data.js";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faCloudRain,
  faSnowflake,
  faCloudMeatball,
  faCloudShowersHeavy,
  faCloudBolt,
  faDroplet,
  faWind,
  faGauge,
  faDownLeftAndUpRightToCenter,
  faSun,
  faEye,
  faMoon
} from "@fortawesome/free-solid-svg-icons";

library.add([
  faMagnifyingGlass,
  faCloudRain,
  faSnowflake,
  faCloudMeatball,
  faCloudShowersHeavy,
  faCloudBolt,
  faDroplet,
  faWind,
  faGauge,
  faDownLeftAndUpRightToCenter,
  faSun,
  faEye,
  faMoon
]);

const searchIcon = icon(faMagnifyingGlass);
const rainIcon = icon(faCloudRain);
const snowIcon = icon(faSnowflake);
const sleetIcon = icon(faCloudShowersHeavy);
const dropIcon = icon(faDroplet);
const windIcon = icon(faWind);
const pressureIcon = icon(faDownLeftAndUpRightToCenter);
const sunIcon = icon(faSun);
const eyeIcon = icon(faEye);
const moonIcon = icon(faMoon);

document.addEventListener("DOMContentLoaded", async () => {
  let data = await getData();
  populateInfo(data);
  document.getElementById("search-button").appendChild(searchIcon.node[0]);
  document.querySelectorAll(".humidity-icon").forEach((element) => {
    element.appendChild(dropIcon.node[0]);
  });
  document.querySelectorAll(".wind-icon").forEach((element) => {
    element.appendChild(windIcon.node[0]);
  });
  document.querySelectorAll(".pressure-icon").forEach((element) => {
    element.appendChild(pressureIcon.node[0]);
  });
  document.querySelectorAll(".dew-icon").forEach((element) => {
    element.appendChild(dropIcon.node[0]);
  });
  document.querySelectorAll(".uv-icon").forEach((element) => {
    element.appendChild(sunIcon.node[0]);
  });
  document.querySelectorAll(".visibility-icon").forEach((element) => {
    element.appendChild(eyeIcon.node[0]);
  });
  document.querySelectorAll(".moon-icon").forEach((element) => {
    element.appendChild(moonIcon.node[0]);
  });
  document.querySelectorAll(".sunrise-icon").forEach((element) => {
    element.appendChild(sunIcon.node[0]);
  });
  document.querySelectorAll(".sunset-icon").forEach((element) => {
    element.appendChild(sunIcon.node[0]);
  });
  document.getElementById("search-button").addEventListener("click", search);
  document.getElementById("search-input").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      search();
    }
  });
});

function populateInfo(data) {
  populateWeekInfo(data);
  populateCurrentInfo(data);
  populateDetails(data);
  populateHourlyInfo(data);
  document.querySelectorAll(".rain-icon").forEach((element) => {
    element.replaceChildren(rainIcon.node[0]);
  });
  document.querySelectorAll(".snow-icon").forEach((element) => {
    element.replaceChildren(snowIcon.node[0]);
  });
  document.querySelectorAll(".sleet-icon").forEach((element) => {
    element.replaceChildren(sleetIcon.node[0]);
  });
  show();
}

function populateWeekInfo(data) {
  for (let i = 1; i < 15; i++) {
    let day = data.days[i];

    document.getElementById(`day-${i}-date`).textContent =
      day.dateTime.substring(5);
    document.getElementById(`day-${i}-icon`).src = day.iconSrc.src;
    document.getElementById(`day-${i}-icon`).alt = day.iconSrc.alt;
    document.getElementById(`day-${i}-high`).textContent = day.high;
    document.getElementById(`day-${i}-low`).textContent = day.low;
    document.getElementById(`day-${i}-precipitation`).textContent =
      day.precipitationProbability;

    if (day.precipitationTypeString === "rain") {
      document.getElementById(`day-${i}-precipitation-icon`).classList.remove("snow-icon");
      document.getElementById(`day-${i}-precipitation-icon`).classList.remove("sleet-icon");
      document.getElementById(`day-${i}-precipitation-icon`).classList.add("rain-icon");
    }
    else if (day.precipitationTypeString === "snow") {
      document.getElementById(`day-${i}-precipitation-icon`).classList.remove("rain-icon");
      document.getElementById(`day-${i}-precipitation-icon`).classList.remove("sleet-icon");
      document.getElementById(`day-${i}-precipitation-icon`).classList.add("snow-icon");
    }
    else {
      document.getElementById(`day-${i}-precipitation-icon`).classList.remove("rain-icon");
      document.getElementById(`day-${i}-precipitation-icon`).classList.remove("snow-icon");
      document.getElementById(`day-${i}-precipitation-icon`).classList.add("sleet-icon");
    }
  }
}

function populateCurrentInfo(data) {
  document.getElementById("location").textContent = data.city;
  document.getElementById("date").textContent = data.dateTimeString;
  document.getElementById("desc").textContent = data.description;
  document.querySelector("body").style.backgroundImage =
    `url(${data.backgroundSrc.src})`;
  document.getElementById("img-attr-name").textContent =
    data.backgroundSrc.nameText;
  document.getElementById("img-attr-name").href = data.backgroundSrc.nameLink;
  document.getElementById("img-attr-src").href = data.backgroundSrc.srcLink;
  document.getElementById("current-feels").textContent = data.feelsLike;
  document.getElementById("current-conditions").textContent = data.conditions;
  document.getElementById("current-high").textContent = data.high;
  document.getElementById("current-low").textContent = data.low;
  document.getElementById("current-icon").src = data.iconSrc.src;
  document.getElementById("current-icon").alt = data.iconSrc.alt;
}

function populateDetails(data) {
  document.getElementById("precipitation").textContent =
    data.precipitationProbability;
  document.getElementById("humidity").textContent = data.humidity;
  document.getElementById("wind-speed").textContent = data.windSpeed;
  document.getElementById("wind-direction").textContent =
    data.windDirectionString;
  document.getElementById("pressure").textContent = data.pressure;
  document.getElementById("dew-point").textContent = data.dewPoint;
  document.getElementById("uv-index").textContent = data.uvIndex;
  document.getElementById("visibility").textContent = data.visibility;
  document.getElementById("moon-phase").textContent = data.moonPhase;
  document.getElementById("sunrise").textContent = data.sunrise;
  document.getElementById("sunset").textContent = data.sunset;

  if (data.precipitationTypeString === "snow") {
    document.getElementById("details-precipitation-icon").classList.remove("rain-icon");
    document.getElementById("precipitation-icon").classList.add("snow-icon");
  }
  else if (data.precipitationTypeString != "rain") {
    document.getElementById("details-precipitation-icon").classList.remove("rain-icon");
    document.getElementById("precipitation-icon").classList.add("sleet-icon");
  }
}

function populateHourlyInfo(data) {
  let hourIndex = parseInt(data.dateTime.substring(0, 2)) + 1;
  let dayIndex = 0;

  for (let i = 1; i < 13; i++) {
    if (hourIndex === 24) {
      hourIndex = 0;
      dayIndex++;
    }
    let hour = data.days[dayIndex].hours[hourIndex];
    document.getElementById(`hour-${i}-time`).textContent = hour.dateTimeString;
    document.getElementById(`hour-${i}-icon`).src = hour.iconSrc.src;
    document.getElementById(`hour-${i}-icon`).alt = hour.iconSrc.alt;
    document.getElementById(`hour-${i}-temp`).textContent = hour.feelsLike;
    document.getElementById(`hour-${i}-precipitation`).textContent =
      hour.precipitationProbability;

    if (hour.precipitationTypeString === "rain") {
      document.getElementById(`hour-${i}-precipitation-icon`).classList.remove("snow-icon");
      document.getElementById(`hour-${i}-precipitation-icon`).classList.remove("sleet-icon");
      document.getElementById(`hour-${i}-precipitation-icon`).classList.add("rain-icon");
    }
    else if (hour.precipitationTypeString === "snow") {
      document.getElementById(`hour-${i}-precipitation-icon`).classList.remove("rain-icon");
      document.getElementById(`hour-${i}-precipitation-icon`).classList.remove("sleet-icon");
      document.getElementById(`hour-${i}-precipitation-icon`).classList.add("snow-icon");
    }
    else {
      document.getElementById(`hour-${i}-precipitation-icon`).classList.remove("rain-icon");
      document.getElementById(`hour-${i}-precipitation-icon`).classList.remove("snow-icon");
      document.getElementById(`hour-${i}-precipitation-icon`).classList.add("sleet-icon");
    }

    hourIndex++;
  }
}

function hide() {
  document.getElementById("location-info").classList.add("hidden");
  document.getElementById("home").classList.add("hidden");
  document.getElementById("img-attr").classList.add("hidden");
  document.getElementById("loading").classList.remove("hidden");
}

function show() {
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("location-info").classList.remove("hidden");
  document.getElementById("desc").classList.remove("hidden");
  document.getElementById("home").classList.remove("hidden");
  document.getElementById("img-attr").classList.remove("hidden");
}

async function search() {
  hide();
  const search = document.getElementById("search-input").value;
  document.getElementById("search-input").value = "";
  let data = await getData(search);
  populateInfo(data);
}
