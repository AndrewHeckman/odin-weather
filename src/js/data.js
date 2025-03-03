import { getIconSrc, getBackgroundSrc } from "./img";

export default async function getData(searchTerm) {
  if (searchTerm) {
    let data = await getWeather(searchTerm);
    if (data) {
      sessionStorage.setItem("data", JSON.stringify(data));
      return data;
    } else {
      alert("City not found");
    }
  }

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
        dateTimeString: formatTime(data.currentConditions.datetime),
        description: data.description,
        dewPoint: data.currentConditions.dew,
        feelsLike: data.currentConditions.feelslike,
        high: data.days[0].tempmax,
        low: data.days[0].tempmin,
        humidity: data.currentConditions.humidity,
        icon: data.currentConditions.icon,
        iconSrc: getIconSrc(data.currentConditions.icon),
        backgroundSrc: getBackgroundSrc(data.currentConditions.icon),
        moonPhase: formatMoonPhase(data.currentConditions.moonphase),
        precipitation: data.currentConditions.precip,
        precipitationProbability: data.currentConditions.precipprob,
        precipitationType: data.currentConditions.preciptype,
        precipitationTypeString: formatPrecipitationType(
          data.currentConditions.preciptype,
        ),
        pressure: data.currentConditions.pressure,
        snow: data.currentConditions.snow,
        snowDepth: data.currentConditions.snowdepth,
        sunrise: formatTime(data.currentConditions.sunrise),
        sunset: formatTime(data.currentConditions.sunset),
        temperature: data.currentConditions.temp,
        uvIndex: data.currentConditions.uvindex,
        visibility: data.currentConditions.visibility,
        windDirection: data.currentConditions.winddir,
        windDirectionString: formatWindDirection(
          data.currentConditions.winddir,
        ),
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
          humidity: day.humidity,
          icon: day.icon,
          iconSrc: getIconSrc(day.icon),
          moonPhase: formatMoonPhase(day.moonphase),
          precipitation: day.precip,
          precipitationCover: day.precipcover,
          precipitationProbability: day.precipprob,
          precipitationType: day.preciptype,
          precipitationTypeString: formatPrecipitationType(day.preciptype),
          pressure: day.pressure,
          severeRisk: day.severerisk,
          snow: day.snow,
          snowDepth: day.snowdepth,
          sunrise: day.sunrise,
          sunset: day.sunset,
          high: day.tempmax,
          low: day.tempmin,
          uvIndex: day.uvindex,
          visibility: day.visibility,
          windDirection: day.winddir,
          windDirectionString: formatWindDirection(day.winddir),
          windGust: day.windgust,
          windSpeed: day.windspeed,
          hours: day.hours.map(parseHour),
        };

        function parseHour(hour) {
          return {
            dateTime: hour.datetime,
            dateTimeString: formatTime(hour.datetime),
            cloudCover: hour.cloudcover,
            conditions: hour.conditions,
            dewPoint: hour.dew,
            feelsLike: hour.feelslike,
            humidity: hour.humidity,
            icon: hour.icon,
            iconSrc: getIconSrc(hour.icon),
            precipitation: hour.precip,
            precipitationProbability: hour.precipprob,
            precipitationType: hour.preciptype,
            precipitationTypeString: formatPrecipitationType(hour.preciptype),
            pressure: hour.pressure,
            severeRisk: hour.severerisk,
            snow: hour.snow,
            snowDepth: hour.snowdepth,
            temperature: hour.temp,
            uvIndex: hour.uvindex,
            visibility: hour.visibility,
            windDirection: hour.winddir,
            windDirectionString: formatWindDirection(hour.winddir),
            windGust: hour.windgust,
            windSpeed: hour.windspeed,
          };
        }
      }

      function formatPrecipitationType(precipArray) {
        let precipType = "";
        if (!precipArray) {
          precipType = "rain";
        } else {
          for (let i = 0; i < precipArray.length; i++) {
            precipType += precipArray[i];

            if (i !== precipArray.length - 1) {
              precipType += ", ";
            }
          }
        }
        return precipType;
      }

      function formatWindDirection(degrees) {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
      }

      function formatTime(time) {
        time = time.substring(0, 5);

        if (time.substring(0, 2) > 12) {
          time = `${time.substring(0, 2) - 12}${time.substring(2)} PM`;
        }
        else if (time.substring(0, 2) === "12") {
          time += "PM";
        }
        else if (time.substring(0, 2) === "00") {
          time = `12${time.substring(2)} AM`;
        }
        else if (time.substring(0, 1) === "0") {
          time = `${time.substring(1)} AM`;
        }
        else {
          time = `${time} AM`;
        }

        return time;
      }

      function formatMoonPhase(phase) {
        if (phase == 0) {
          return "new moon";
        }
        else if (phase < 0.25) {
          return "waxing crescent";
        }
        else if (phase == 0.25) {
          return "first quarter";
        }
        else if (phase < 0.5) {
          return "waxing gibbous";
        }
        else if (phase == 0.5) {
          return "full moon";
        }
        else if (phase < 0.75) {
          return "waning gibbous";
        }
        else if (phase == 0.75) {
          return "last quarter";
        }
        else {
          return "waning crescent";
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
