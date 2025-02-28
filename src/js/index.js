import "../css/styles.css";
import getData from "./data.js";

document.addEventListener("DOMContentLoaded", async () => {
  let data = await getData();
  populateInfo(data);
});

document.getElementById("search-button").addEventListener("click", search);
document.getElementById("search-input").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    search();
  }
});

function populateInfo(data) {
  populateCurrentInfo(data);
  populateDetails(data);
  populateWeekInfo(data);
  populateHourlyInfo(data);
}

function populateCurrentInfo(data) {
  document.getElementById("location").textContent = data.city;
  document.getElementById("date").textContent = data.dateTime;
  document.getElementById("desc").textContent = data.description;
  document.getElementById("current-feels").textContent = data.feelsLike;
  document.getElementById("current-conditions").textContent = data.conditions;
  document.getElementById("current-high").textContent = data.high;
  document.getElementById("current-low").textContent = data.low;
  document.getElementById("current-icon").src = data.iconSrc;
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
    document.getElementById(`day-${i}-icon`).src = day.iconSrc;
    document.getElementById(`day-${i}-high`).textContent = day.high;
    document.getElementById(`day-${i}-low`).textContent = day.low;
    document.getElementById(`day-${i}-conditions`).textContent = day.conditions;
  }
}

function populateHourlyInfo(data) {
  const nextHour = new Date().getHours();
  let hourIndex = nextHour;
  let dayIndex = 0;

  for (let i = 1; i < 13; i++) {
    let hour = data.days[dayIndex].hours[hourIndex];
    document.getElementById(`hour-${i}-time`).textContent =
      hour.dateTime.substring(0, 5);
    document.getElementById(`hour-${i}-icon`).src = hour.iconSrc;
    document.getElementById(`hour-${i}-temp`).textContent = hour.feelsLike;
    document.getElementById(`hour-${i}-conditions`).textContent =
      hour.conditions;

    hourIndex++;
    if (hourIndex === 24) {
      hourIndex = 0;
      dayIndex++;
    }
  }
}

async function search() {
  const search = document.getElementById("search-input").value;
  let data = await getData(search);
  populateInfo(data);
}
