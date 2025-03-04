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
  faMoon,
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
  faMoon,
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

let units = "f";

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
  document.querySelectorAll(".unit-button").forEach((element) => {
    element.addEventListener("click", unitSwitch);
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
    if (units === "f") {
      document.getElementById(`day-${i}-high`).textContent = day.high;
      document.getElementById(`day-${i}-low`).textContent = day.low;
    } else if (units === "c" || units === "h") {
      document.getElementById(`day-${i}-high`).textContent = fToC(day.high);
      document.getElementById(`day-${i}-low`).textContent = fToC(day.low);
    }
    document.getElementById(`day-${i}-precipitation`).textContent =
      day.precipitationProbability;

    if (day.precipitationTypeString === "rain") {
      document
        .getElementById(`day-${i}-precipitation-icon`)
        .classList.remove("snow-icon");
      document
        .getElementById(`day-${i}-precipitation-icon`)
        .classList.remove("sleet-icon");
      document
        .getElementById(`day-${i}-precipitation-icon`)
        .classList.add("rain-icon");
    } else if (day.precipitationTypeString === "snow") {
      document
        .getElementById(`day-${i}-precipitation-icon`)
        .classList.remove("rain-icon");
      document
        .getElementById(`day-${i}-precipitation-icon`)
        .classList.remove("sleet-icon");
      document
        .getElementById(`day-${i}-precipitation-icon`)
        .classList.add("snow-icon");
    } else {
      document
        .getElementById(`day-${i}-precipitation-icon`)
        .classList.remove("rain-icon");
      document
        .getElementById(`day-${i}-precipitation-icon`)
        .classList.remove("snow-icon");
      document
        .getElementById(`day-${i}-precipitation-icon`)
        .classList.add("sleet-icon");
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
  document.getElementById("current-conditions").textContent = data.conditions;
  if (units === "f") {
    document.getElementById("current-feels").textContent = data.feelsLike;
    document.getElementById("current-high").textContent = data.high;
    document.getElementById("current-low").textContent = data.low;
  } else if (units === "c" || units === "h") {
    document.getElementById("current-feels").textContent = fToC(data.feelsLike);
    document.getElementById("current-high").textContent = fToC(data.high);
    document.getElementById("current-low").textContent = fToC(data.low);
  }
  document.getElementById("current-icon").src = data.iconSrc.src;
  document.getElementById("current-icon").alt = data.iconSrc.alt;
}

function populateDetails(data) {
  document.getElementById("precipitation").textContent =
    data.precipitationProbability;
  document.getElementById("humidity").textContent = data.humidity;
  document.getElementById("wind-direction").textContent =
    data.windDirectionString;
  document.getElementById("uv-index").textContent = data.uvIndex;
  document.getElementById("moon-phase").textContent = data.moonPhase;
  document.getElementById("sunrise").textContent = data.sunrise;
  document.getElementById("sunset").textContent = data.sunset;
  if (units === "f") {
    document.getElementById("wind-speed").textContent = data.windSpeed + " mph";
    document.getElementById("pressure").textContent =
      mbToIn(data.pressure) + " in";
    document.getElementById("dew-point").textContent = data.dewPoint;
    document.getElementById("visibility").textContent = data.visibility + " mi";
  } else if (units === "c") {
    document.getElementById("wind-speed").textContent =
      miToKm(data.windSpeed) + " km/h";
    document.getElementById("pressure").textContent = data.pressure + " mb";
    document.getElementById("dew-point").textContent = fToC(data.dewPoint);
    document.getElementById("visibility").textContent =
      miToKm(data.visibility) + " km";
  } else if (units === "h") {
    document.getElementById("wind-speed").textContent = data.windSpeed + " mph";
    document.getElementById("pressure").textContent = data.pressure + " mb";
    document.getElementById("dew-point").textContent = fToC(data.dewPoint);
    document.getElementById("visibility").textContent = data.visibility + " mi";
  }

  if (data.precipitationTypeString === "snow") {
    document
      .getElementById("details-precipitation-icon")
      .classList.remove("rain-icon");
    document.getElementById("precipitation-icon").classList.add("snow-icon");
  } else if (data.precipitationTypeString != "rain") {
    document
      .getElementById("details-precipitation-icon")
      .classList.remove("rain-icon");
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
    if (units === "f") {
      document.getElementById(`hour-${i}-temp`).textContent = hour.feelsLike;
    } else if (units === "c" || units === "h") {
      document.getElementById(`hour-${i}-temp`).textContent = fToC(
        hour.feelsLike,
      );
    }
    document.getElementById(`hour-${i}-precipitation`).textContent =
      hour.precipitationProbability;

    if (hour.precipitationTypeString === "rain") {
      document
        .getElementById(`hour-${i}-precipitation-icon`)
        .classList.remove("snow-icon");
      document
        .getElementById(`hour-${i}-precipitation-icon`)
        .classList.remove("sleet-icon");
      document
        .getElementById(`hour-${i}-precipitation-icon`)
        .classList.add("rain-icon");
    } else if (hour.precipitationTypeString === "snow") {
      document
        .getElementById(`hour-${i}-precipitation-icon`)
        .classList.remove("rain-icon");
      document
        .getElementById(`hour-${i}-precipitation-icon`)
        .classList.remove("sleet-icon");
      document
        .getElementById(`hour-${i}-precipitation-icon`)
        .classList.add("snow-icon");
    } else {
      document
        .getElementById(`hour-${i}-precipitation-icon`)
        .classList.remove("rain-icon");
      document
        .getElementById(`hour-${i}-precipitation-icon`)
        .classList.remove("snow-icon");
      document
        .getElementById(`hour-${i}-precipitation-icon`)
        .classList.add("sleet-icon");
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

function unitSwitch(event) {
  let newUnits = event.target.id[0];

  if (newUnits === units) {
    return;
  }

  switch (newUnits) {
    case "f": {
      units = "f";
      document.getElementById("f-button").classList.add("selected");
      document.getElementById("c-button").classList.remove("selected");
      document.getElementById("h-button").classList.remove("selected");
      break;
    }
    case "c": {
      units = "c";
      document.getElementById("c-button").classList.add("selected");
      document.getElementById("f-button").classList.remove("selected");
      document.getElementById("h-button").classList.remove("selected");
      break;
    }
    case "h": {
      units = "h";
      document.getElementById("h-button").classList.add("selected");
      document.getElementById("f-button").classList.remove("selected");
      document.getElementById("c-button").classList.remove("selected");
      break;
    }
    default: {
      break;
    }
  }

  let data = JSON.parse(sessionStorage.getItem("data"));
  populateInfo(data);
}

function fToC(f) {
  return (((f - 32) * 5) / 9).toFixed(1);
}

function miToKm(mi) {
  return (mi * 1.60934).toFixed(1);
}

function mbToIn(mb) {
  return (mb * 0.0295301).toFixed(2);
}
