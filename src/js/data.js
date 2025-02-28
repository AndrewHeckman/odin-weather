export default async function getData() {
  let data = JSON.parse(sessionStorage.getItem("data"));
  
  if (!data) {
    let coords = await getLocation();
    if (coords) {
      // TODO: for user display, use a reverse geocoding API to get the city name
      data = await getWeather(coords);
    }
    // if they don't give location, default to London
    else {
      data = await getWeather("London");
    }
    sessionStorage.setItem("data", JSON.stringify(data));
  } else if (!freshData(data)) {
    data = await getWeather(data.city);
    sessionStorage.setItem("data", JSON.stringify(data));
  }
  
  return data;

  async function getWeather(city) {
    try {
      const baseUrl =
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
      const apiKey = "WYKTTPYG29F83WMFFLGWFGNMY";
      const response = await fetch(`${baseUrl}${city}?key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`Response not OK: ${response.status}`);
      }
      const data = await response.json();
      return parseData(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  
    function parseData(data) {
      if (!data) {
        return null;
      }
  
      return {
        city: data.resolvedAddress,
        epoch: data.currentConditions.datetimeEpoch,
        cloudCover: data.currentConditions.cloudcover,
        conditions: data.currentConditions.conditions,
        dateTime: data.currentConditions.datetime,
        description: data.description,
        dewPoint: data.currentConditions.dew,
        feelsLike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        icon: data.currentConditions.icon,
        moonPhase: data.currentConditions.moonphase,
        precipitation: data.currentConditions.precip,
        precipitationProbability: data.currentConditions.precipprob,
        precipitationType: data.currentConditions.preciptype,
        pressure: data.currentConditions.pressure,
        snow: data.currentConditions.snow,
        snowDepth: data.currentConditions.snowdepth,
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        temperature: data.currentConditions.temp,
        uvIndex: data.currentConditions.uvindex,
        visibility: data.currentConditions.visibility,
        windDirection: data.currentConditions.winddir,
        windGust: data.currentConditions.windgust,
        windSpeed: data.currentConditions.windspeed,
        days: data.days.map(parseDay),
      };
  
      function parseDay(day) {
        return {
          dateTime: day.datetime,
          cloudCover: day.cloudcover,
          conditions: day.conditions,
          description: day.description,
          dewPoint: day.dew,
          feelsLikeMax: day.feelslikemax,
          feelsLikeMin: day.feelslikemin,
          humidity: day.humidity,
          icon: day.icon,
          moonPhase: day.moonphase,
          precipitation: day.precip,
          precipitationCover: day.precipcover,
          precipitationProbability: day.precipprob,
          precipitationType: day.preciptype,
          pressure: day.pressure,
          severeRisk: day.severerisk,
          snow: day.snow,
          snowDepth: day.snowdepth,
          sunrise: day.sunrise,
          sunset: day.sunset,
          temperatureMax: day.tempmax,
          temperatureMin: day.tempmin,
          uvIndex: day.uvindex,
          visibility: day.visibility,
          windDirection: day.winddir,
          windGust: day.windgust,
          windSpeed: day.windspeed,
          hours: day.hours.map(parseHour),
        };
  
        function parseHour(hour) {
          return {
            dateTime: hour.datetime,
            cloudCover: hour.cloudcover,
            conditions: hour.conditions,
            dewPoint: hour.dew,
            feelsLike: hour.feelslike,
            humidity: hour.humidity,
            icon: hour.icon,
            precipitation: hour.precip,
            precipitationProbability: hour.precipprob,
            precipitationType: hour.preciptype,
            pressure: hour.pressure,
            severeRisk: hour.severerisk,
            snow: hour.snow,
            snowDepth: hour.snowdepth,
            temperature: hour.temp,
            uvIndex: hour.uvindex,
            visibility: hour.visibility,
            windDirection: hour.winddir,
            windGust: hour.windgust,
            windSpeed: hour.windspeed,
          };
        }
      }
    }
  }
  
  /**
   * Checks if the data is fresh (no older than 1 hour)
   * @param {JSON} data Data object from sessionStorage
   * @returns {boolean} True if the data is no older than 1 hour, false otherwise
   */
  function freshData(data) {
    const date = new Date(data.epoch * 1000);
    return Date.now() - date.getTime() < 3600000;
  }
  
  async function getLocation() {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return null;
    }
  
    try {
      const position = await new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      let coords = `${position.coords.latitude},${position.coords.longitude}`;
      return coords;
    } catch (error) {
      console.error("Error getting geolocation:", error);
      return null;
    }
  }
}
