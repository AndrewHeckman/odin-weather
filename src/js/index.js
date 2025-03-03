import "../css/styles.css";
import getData from "./data.js";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


document.addEventListener("DOMContentLoaded", async () => {
  library.add(faMagnifyingGlass);
  const searchIcon = icon(faMagnifyingGlass);
  let data = await getData();
  populateInfo(data);
  document.getElementById("search-button").addEventListener("click", search);
  document.getElementById("search-input").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      search();
    }
  });
  document.getElementById("search-button").appendChild(searchIcon.node[0]);
});


function populateInfo(data) {
  populateWeekInfo(data);
  populateCurrentInfo(data);
  populateDetails(data);
  populateHourlyInfo(data);

  show();
}

function populateCurrentInfo(data) {
  document.getElementById("location").textContent = data.city;
  document.getElementById("date").textContent = data.dateTimeString;
  document.getElementById("desc").textContent = data.description;
  document.querySelector("body").style.backgroundImage =
    `url(${data.backgroundSrc.src})`;
  document.getElementById("img-attr-name").textContent = data.backgroundSrc.nameText;
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
  document.getElementById("precipitation-type").textContent =
    data.precipitationTypeString;
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
    document.getElementById(`day-${i}-conditions`).textContent = day.conditions;
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
    document.getElementById(`hour-${i}-conditions`).textContent =
      hour.conditions;

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
