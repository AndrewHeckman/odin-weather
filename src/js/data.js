import { getIconSrc, getBackgroundSrc } from "./img";

export default async function getData(searchTerm) {
  // if they search for a city, try to find it
  if (searchTerm) {
    let data = await getWeather(searchTerm);
    if (data) {
      sessionStorage.setItem("data", JSON.stringify(data));
      return data;
    } else {
      return null;
    }
  }

  // if they did not search for a city, try to get data from session storage
  let data = JSON.parse(sessionStorage.getItem("data"));
  if (data && freshData(data)) {
    // if data is no older than 1 hour, return it
    return data;
  } else if (data && !freshData(data)) {
    // if data is older than 1 hour, try to get fresh data
    let newData = await getWeather(data.city);
    if (newData) {
      sessionStorage.setItem("data", JSON.stringify(newData));
      return newData;
    }
    // if we can't get fresh data, return the old data
    return data;
  }

  // if there is no data in session storage, try to get their location
  let coords = await getLocation();
  if (coords) {
    data = await getWeather(coords);
    if (data) {
      data.city = (await getAddress(coords)) ?? coords;
      sessionStorage.setItem("data", JSON.stringify(data));
      return data;
    }
  }

  // if they don't give location, default to London
  data = await getWeather("London");
  if (data) {
    sessionStorage.setItem("data", JSON.stringify(data));
    return data;
  }

  return null;

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
        conditions: data.currentConditions.conditions,
        dateTime: data.currentConditions.datetime,
        dateTimeString:
          formatTime(data.currentConditions.datetime) +
          " " +
          formatOffset(data.tzoffset),
        description: data.description,
        dewPoint: data.currentConditions.dew,
        feelsLike: data.currentConditions.feelslike,
        high: data.days[0].tempmax,
        low: data.days[0].tempmin,
        humidity: data.currentConditions.humidity,
        iconSrc: getIconSrc(data.currentConditions.icon),
        backgroundSrc: getBackgroundSrc(data.currentConditions.icon),
        moonPhase: formatMoonPhase(data.currentConditions.moonphase),
        precipitationProbability: data.currentConditions.precipprob,
        precipitationTypeString: formatPrecipitationType(
          data.currentConditions.preciptype,
        ),
        pressure: data.currentConditions.pressure,
        sunrise: formatTime(data.currentConditions.sunrise),
        sunset: formatTime(data.currentConditions.sunset),
        uvIndex: data.currentConditions.uvindex,
        visibility: data.currentConditions.visibility,
        windDirectionString: formatWindDirection(
          data.currentConditions.winddir,
        ),
        windSpeed: data.currentConditions.windspeed,
        days: data.days.map(parseDay),
      };

      function parseDay(day) {
        return {
          dateTime: day.datetime,
          iconSrc: getIconSrc(day.icon),
          precipitationProbability: day.precipprob,
          precipitationTypeString: formatPrecipitationType(day.preciptype),
          high: day.tempmax,
          low: day.tempmin,
          hours: day.hours.map(parseHour),
        };

        function parseHour(hour) {
          return {
            dateTime: hour.datetime,
            dateTimeString: formatTime(hour.datetime),
            feelsLike: hour.feelslike,
            iconSrc: getIconSrc(hour.icon),
            precipitationProbability: hour.precipprob,
            precipitationTypeString: formatPrecipitationType(hour.preciptype),
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
        } else if (time.substring(0, 2) === "12") {
          time += " PM";
        } else if (time.substring(0, 2) === "00") {
          time = `12${time.substring(2)} AM`;
        } else if (time.substring(0, 1) === "0") {
          time = `${time.substring(1)} AM`;
        } else {
          time = `${time} AM`;
        }

        return time;
      }

      function formatOffset(offset) {
        let sign = offset < 0 ? "-" : "+";
        offset = Math.abs(offset);
        let hours = Math.floor(offset);
        let minutes = Math.round((offset - hours) * 60);

        if (hours < 10) {
          hours = `0${hours}`;
        }
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }

        return `(UTC${sign}${hours}:${minutes})`;
      }

      function formatMoonPhase(phase) {
        if (phase == 0) {
          return "new moon";
        } else if (phase < 0.25) {
          return "waxing crescent";
        } else if (phase == 0.25) {
          return "first quarter";
        } else if (phase < 0.5) {
          return "waxing gibbous";
        } else if (phase == 0.5) {
          return "full moon";
        } else if (phase < 0.75) {
          return "waning gibbous";
        } else if (phase == 0.75) {
          return "last quarter";
        } else {
          return "waning crescent";
        }
      }
    }
  }

  /**
   * Checks if the data is fresh (no older than 30 minutes)
   * @param {JSON} data Data object from sessionStorage
   * @returns {boolean} True if the data is no older than 30 minutes, false otherwise
   */
  function freshData(data) {
    const date = new Date(data.epoch * 1000);
    return Date.now() - date.getTime() < 1800000;
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

  async function getAddress(coords) {
    try {
      const baseUrl = "https://revgeocode.search.hereapi.com/v1/revgeocode";
      const apiKey = "bp976wBc5XRzwETd4Y_vXNP7jfVAe2vMOzVw_VXw0nc";
      const response = await fetch(`${baseUrl}?at=${coords}&apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error(`Response not OK: ${response.status}`);
      }
      const data = await response.json();
      if (!data) {
        throw new Error("No data returned");
      }
      return parseAddress(data);
    } catch (error) {
      console.error(error);
      return null;
    }

    function parseAddress(data) {
      if (!data) {
        return null;
      }

      let city = data.items[0].address.city;
      let country = data.items[0].address.countryName;
      let state = data.items[0].address.state;
      let address;

      if (state === city || state === country) {
        address = `${city}, ${country}`;
      } else {
        address = `${city}, ${state}, ${country}`;
      }

      return address;
    }
  }
}
