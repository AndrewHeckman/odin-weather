import clearDayIcon from "../img/icons/clear-day.svg";
import clearNightIcon from "../img/icons/clear-night.svg";
import cloudyIcon from "../img/icons/cloudy.svg";
import fogIcon from "../img/icons/fog.svg";
import partlyCloudyDayIcon from "../img/icons/partly-cloudy-day.svg";
import partlyCloudyNightIcon from "../img/icons/partly-cloudy-night.svg";
import rainIcon from "../img/icons/rain.svg";
import snowIcon from "../img/icons/snow.svg";
import windIcon from "../img/icons/wind.svg";
import clearDayBackground from "../img/backgrounds/clear-day.jpg";
import clearNightBackground from "../img/backgrounds/clear-night.jpg";
import cloudyBackground from "../img/backgrounds/cloudy.jpg";
import fogBackground from "../img/backgrounds/fog.jpg";
import partlyCloudyDayBackground from "../img/backgrounds/partly-cloudy-day.jpg";
import partlyCloudyNightBackground from "../img/backgrounds/partly-cloudy-night.jpg";
import rainBackground from "../img/backgrounds/rain.jpg";
import snowBackground from "../img/backgrounds/snow.jpg";
import windBackground from "../img/backgrounds/wind.jpg";

const icons = {
  "clear-day": {
    src: clearDayIcon,
    alt: "Clear Day Icon",
  },
  "clear-night": {
    src: clearNightIcon,
    alt: "Clear Night Icon",
  },
  cloudy: {
    src: cloudyIcon,
    alt: "Cloudy Icon",
  },
  fog: {
    src: fogIcon,
    alt: "Fog Icon",
  },
  "partly-cloudy-day": {
    src: partlyCloudyDayIcon,
    alt: "Partly Cloudy Day Icon",
  },
  "partly-cloudy-night": {
    src: partlyCloudyNightIcon,
    alt: "Partly Cloudy Night Icon",
  },
  rain: {
    src: rainIcon,
    alt: "Rain Icon",
  },
  snow: {
    src: snowIcon,
    alt: "Snow Icon",
  },
  wind: {
    src: windIcon,
    alt: "Wind Icon",
  },
};

const backgrounds = {
  "clear-day": {
    src: clearDayBackground,
    nameText: "Ritam Baishya",
    nameLink:
      "https://unsplash.com/@ritambaishya?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    srcLink:
      "https://unsplash.com/photos/white-clouds-and-blue-sky-during-daytime-ROVBDer29PQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
  },
  "clear-night": {
    src: clearNightBackground,
    nameText: "Adelin Preda",
    nameLink:
      "https://unsplash.com/@adelinpreda?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    srcLink:
      "https://unsplash.com/photos/a-view-of-the-night-showing-stars--tOr_T4qTpQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
  },
  cloudy: {
    src: cloudyBackground,
    nameText: "Alex Plesovskich",
    nameLink: "https://unsplash.com/@aples?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    srcLink: "https://unsplash.com/photos/photograph-of-gray-clouds-tJzAUeNygwA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
  },
  fog: {
    src: fogBackground,
    nameText: "Paul Pastourmatzis",
    nameLink: "https://unsplash.com/@pueblovista?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    srcLink: "https://unsplash.com/photos/silhouette-of-trees-covered-by-fog-KT3WlrL_bsg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
  },
  "partly-cloudy-day": {
    src: partlyCloudyDayBackground,
    nameText: "Engin Akyurt",
    nameLink: "https://unsplash.com/@enginakyurt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    srcLink: "https://unsplash.com/photos/white-clouds-and-blue-sky-during-daytime-OelZIyyRKZw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
  },
  "partly-cloudy-night": {
    src: partlyCloudyNightBackground,
    nameText: "Billy Huynh",
    nameLink: "https://unsplash.com/@billy_huy?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    srcLink: "https://unsplash.com/photos/full-moon-hiding-on-a-cloud-cycMgDyN5ko?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
  },
  rain: {
    src: rainBackground,
    nameText: "Noah Silliman",
    nameLink: "https://unsplash.com/@noahsilliman?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    srcLink: "https://unsplash.com/photos/water-drops-on-glass-i2J9jnvaAbU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
  },
  snow: {
    src: snowBackground,
    nameText: "Jasmin Schuler",
    nameLink: "https://unsplash.com/@jasmint?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    srcLink: "https://unsplash.com/photos/time-lapse-photo-of-snow-7YU8sX2Vup0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
  },
  wind: {
    src: windBackground,
    nameText: "Jason Mavrommatis",
    nameLink: "https://unsplash.com/@jeisblack?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    srcLink: " https://unsplash.com/photos/wind-turbines-on-snowy-mountain-under-clear-blue-sky-during-daytime-nyL-rzwP-Mk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
  },
};

export function getIconSrc(icon) {
  return icons[icon];
}

export function getBackgroundSrc(icon) {
  return backgrounds[icon];
}
