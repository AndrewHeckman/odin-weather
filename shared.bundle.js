(()=>{"use strict";var t,e={261:(t,e,r)=>{r.d(e,{A:()=>k});const n=r.p+"55f155dffdd173d4bbe5.svg",o=r.p+"17ac83aa4b47967708fa.svg",i=r.p+"57f38995f0f82dd5dc08.svg",s=r.p+"5465c93e38463cdf13b3.svg",a=r.p+"fb0c783594fd8102cf86.svg",c=r.p+"f1726c4a3f3910b9e9ba.svg",u=r.p+"6e58cc7dcb66f8b2afb5.svg",p=r.p+"5cd9d2df6b8a615bb430.svg",l=r.p+"5a95427cbc9a431f7838.svg",d=r.p+"83181e96af243f69df37.webp",m=r.p+"ff65998b4eddd0b06c93.webp",h=r.p+"a30cbe55542b9e2593ad.webp",f=r.p+"6b7186aee68bf38f7123.webp",y=r.p+"1d017c250e992f68c186.webp",g=r.p+"b34785c6e326ad94f1d3.webp",b=r.p+"0f542f22c4aadf634e01.webp",w=r.p+"905be936e5257fd5385b.webp",_=r.p+"dd5e0e74fd1afedcfb19.webp",v={"clear-day":{src:n,alt:"Clear Day Icon"},"clear-night":{src:o,alt:"Clear Night Icon"},cloudy:{src:i,alt:"Cloudy Icon"},fog:{src:s,alt:"Fog Icon"},"partly-cloudy-day":{src:a,alt:"Partly Cloudy Day Icon"},"partly-cloudy-night":{src:c,alt:"Partly Cloudy Night Icon"},rain:{src:u,alt:"Rain Icon"},snow:{src:p,alt:"Snow Icon"},wind:{src:l,alt:"Wind Icon"}},C={"clear-day":{src:d,nameText:"Ritam Baishya",nameLink:"https://unsplash.com/@ritambaishya?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",srcLink:"https://unsplash.com/photos/white-clouds-and-blue-sky-during-daytime-ROVBDer29PQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},"clear-night":{src:m,nameText:"Adelin Preda",nameLink:"https://unsplash.com/@adelinpreda?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",srcLink:"https://unsplash.com/photos/a-view-of-the-night-showing-stars--tOr_T4qTpQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},cloudy:{src:h,nameText:"Alex Plesovskich",nameLink:"https://unsplash.com/@aples?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",srcLink:"https://unsplash.com/photos/photograph-of-gray-clouds-tJzAUeNygwA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},fog:{src:f,nameText:"Paul Pastourmatzis",nameLink:"https://unsplash.com/@pueblovista?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",srcLink:"https://unsplash.com/photos/silhouette-of-trees-covered-by-fog-KT3WlrL_bsg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},"partly-cloudy-day":{src:y,nameText:"Engin Akyurt",nameLink:"https://unsplash.com/@enginakyurt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",srcLink:"https://unsplash.com/photos/white-clouds-and-blue-sky-during-daytime-OelZIyyRKZw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},"partly-cloudy-night":{src:g,nameText:"Billy Huynh",nameLink:"https://unsplash.com/@billy_huy?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",srcLink:"https://unsplash.com/photos/full-moon-hiding-on-a-cloud-cycMgDyN5ko?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},rain:{src:b,nameText:"Noah Silliman",nameLink:"https://unsplash.com/@noahsilliman?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",srcLink:"https://unsplash.com/photos/water-drops-on-glass-i2J9jnvaAbU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},snow:{src:w,nameText:"Jasmin Schuler",nameLink:"https://unsplash.com/@jasmint?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",srcLink:"https://unsplash.com/photos/time-lapse-photo-of-snow-7YU8sX2Vup0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},wind:{src:_,nameText:"Jason Mavrommatis",nameLink:"https://unsplash.com/@jeisblack?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",srcLink:"https://unsplash.com/photos/wind-turbines-on-snowy-mountain-under-clear-blue-sky-during-daytime-nyL-rzwP-Mk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"}};function T(t){return v[t]}async function k(t){if(t){let e=await n(t);return e?(sessionStorage.setItem("data",JSON.stringify(e)),e):null}let e=JSON.parse(sessionStorage.getItem("data"));if(e&&o(e))return e;if(e&&!o(e)){let t=await n(e.city);return t?(sessionStorage.setItem("data",JSON.stringify(t)),t):e}let r=await async function(){if(!navigator.geolocation)return console.error("Geolocation not supported"),null;try{const t=await new Promise((function(t,e){navigator.geolocation.getCurrentPosition(t,e)}));return`${t.coords.latitude},${t.coords.longitude}`}catch(t){return console.error("Error getting geolocation:",t),null}}();return r&&(e=await n(r),e)?(e.city=await async function(t){try{const e="https://revgeocode.search.hereapi.com/v1/revgeocode",r="bp976wBc5XRzwETd4Y_vXNP7jfVAe2vMOzVw_VXw0nc",n=await fetch(`${e}?at=${t}&apiKey=${r}`);if(!n.ok)throw new Error(`Response not OK: ${n.status}`);const o=await n.json();if(!o)throw new Error("No data returned");return function(t){if(!t)return null;let e,r=t.items[0].address.city,n=t.items[0].address.countryName,o=t.items[0].address.state;return e=o===r||o===n?`${r}, ${n}`:`${r}, ${o}, ${n}`,e}(o)}catch(t){return console.error(t),null}}(r)??r,sessionStorage.setItem("data",JSON.stringify(e)),e):(e=await n("London"),e?(sessionStorage.setItem("data",JSON.stringify(e)),e):null);async function n(t){try{const e="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",r="WYKTTPYG29F83WMFFLGWFGNMY",n=await fetch(`${e}${t}?key=${r}`);if(!n.ok)throw new Error(`Response not OK: ${n.status}`);return function(t){return t?{city:t.resolvedAddress,epoch:t.currentConditions.datetimeEpoch,conditions:t.currentConditions.conditions,dateTime:t.currentConditions.datetime,dateTimeString:i(t.currentConditions.datetime)+" "+function(t){let e=t<0?"-":"+";t=Math.abs(t);let r=Math.floor(t),n=Math.round(60*(t-r));return r<10&&(r=`0${r}`),n<10&&(n=`0${n}`),`(UTC${e}${r}:${n})`}(t.tzoffset),description:t.description,dewPoint:t.currentConditions.dew,feelsLike:t.currentConditions.feelslike,high:t.days[0].tempmax,low:t.days[0].tempmin,humidity:t.currentConditions.humidity,iconSrc:T(t.currentConditions.icon),backgroundSrc:(n=t.currentConditions.icon,C[n]),moonPhase:(r=t.currentConditions.moonphase,0==r?"new moon":r<.25?"waxing crescent":.25==r?"first quarter":r<.5?"waxing gibbous":.5==r?"full moon":r<.75?"waning gibbous":.75==r?"last quarter":"waning crescent"),precipitationProbability:t.currentConditions.precipprob,precipitationTypeString:o(t.currentConditions.preciptype),pressure:t.currentConditions.pressure,sunrise:i(t.currentConditions.sunrise),sunset:i(t.currentConditions.sunset),uvIndex:t.currentConditions.uvindex,visibility:t.currentConditions.visibility,windDirectionString:(e=t.currentConditions.winddir,["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]),windSpeed:t.currentConditions.windspeed,days:t.days.map((function(t){return{dateTime:t.datetime,iconSrc:T(t.icon),precipitationProbability:t.precipprob,precipitationTypeString:o(t.preciptype),high:t.tempmax,low:t.tempmin,hours:t.hours.map((function(t){return{dateTime:t.datetime,dateTimeString:i(t.datetime),feelsLike:t.feelslike,iconSrc:T(t.icon),precipitationProbability:t.precipprob,precipitationTypeString:o(t.preciptype)}}))}}))}:null;var e,r,n;function o(t){let e="";if(t)for(let r=0;r<t.length;r++)e+=t[r],r!==t.length-1&&(e+=", ");else e="rain";return e}function i(t){return(t=t.substring(0,5)).substring(0,2)>12?t=`${t.substring(0,2)-12}${t.substring(2)} PM`:"12"===t.substring(0,2)?t+=" PM":t="00"===t.substring(0,2)?`12${t.substring(2)} AM`:"0"===t.substring(0,1)?`${t.substring(1)} AM`:`${t} AM`,t}}(await n.json())}catch(t){return console.error(t),null}}function o(t){const e=new Date(1e3*t.epoch);return Date.now()-e.getTime()<18e5}}}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={id:t,exports:{}};return e[t](i,i.exports,n),i.exports}n.m=e,t=[],n.O=(e,r,o,i)=>{if(!r){var s=1/0;for(p=0;p<t.length;p++){for(var[r,o,i]=t[p],a=!0,c=0;c<r.length;c++)(!1&i||s>=i)&&Object.keys(n.O).every((t=>n.O[t](r[c])))?r.splice(c--,1):(a=!1,i<s&&(s=i));if(a){t.splice(p--,1);var u=o();void 0!==u&&(e=u)}}return e}i=i||0;for(var p=t.length;p>0&&t[p-1][2]>i;p--)t[p]=t[p-1];t[p]=[r,o,i]},n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&"SCRIPT"===e.currentScript.tagName.toUpperCase()&&(t=e.currentScript.src),!t)){var r=e.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&(!t||!/^http(s?):/.test(t));)t=r[o--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t})(),(()=>{var t={804:0};n.O.j=e=>0===t[e];var e=(e,r)=>{var o,i,[s,a,c]=r,u=0;if(s.some((e=>0!==t[e]))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(c)var p=c(n)}for(e&&e(r);u<s.length;u++)i=s[u],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(p)},r=self.webpackChunkodin_weather=self.webpackChunkodin_weather||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))})(),n.nc=void 0;var o=n(261);o=n.O(o)})();