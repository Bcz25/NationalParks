'use strict';const parksArray="Acadia;Arches;Badlands;Big Bend;Biscayne;Black Canyon;Bryce Canyon;Canyonlands;Capitol Reef;Carlsbad;Channel Islands;Congaree;Crater Lake;Cuyahoga Valley;Death Valley;Denali;Dry Tortugas;Everglades;Gates of the Arctic;Gateway Arch;Glacier Bay;Grand Canyon;Grand Teton;Great Basin;Great Sand Dunes;Great Smokey Mountains;Guadalupe Mountains;Haleakal\u0101;Hawai\u02bbi volcanoes;Hot Springs;Indiana Dunes;Isle Royale;Joshua Tree;Katmai;Kenai Fjords;Kings Canyon;Kobuk Valley;Lake Clark;Lassen Volcanic;Mammoth Cave;Mesa Verde;Mount Rainier;New River Gorge;North Cascades;Olympic;Petrified Forest;Pinnacles;Redwood;Rocky Mountain;Saguaro;Sequoia;Shenandoah;Theodore Roosevelt;Virgin Islands;Voyageurs;White Sands;Wind Cave;Elias;Yellowstone;Yosemite;Zion".split(";"),
parkNameEl=document.getElementById("park-name"),parkDescriptionEl=document.getElementById("description"),parkWeatherEl=document.getElementById("weather"),parkActivitiesEl=document.getElementById("activities"),searchTerm=getRandomPark(),weatherApiKey="d819c0f02622027c482907b6666513c6",weatherApiUrl="https://api.openweathermap.org/data/2.5/forecast",forecastContainer=document.getElementById("park-forecast"),infoContainer=document.getElementById("parkInfo"),dashboard=document.getElementById("dashboard"),
searchButton=document.getElementById("search-button"),searchInput=document.getElementById("search-input");
searchButton.addEventListener("click",function(c){c.preventDefault();const a=searchInput.value;fetch(`${"https://developer.nps.gov/api/v1/parks"}?q=${a}&api_key=${"zsg1JUezGGMHKiM4K9RLRe95wfbFzkZKZx5wr4V4"}`).then(b=>{if(!b.ok)throw Error("Network response was not ok");return b.json()}).then(b=>{if(b=b.data.find(e=>e.fullName.toLowerCase().includes(a.toLowerCase()))){const e=b.activities.map(d=>d.name);b={park:b.fullName,description:b.description,weather:b.weatherInfo,activities:e};createParkCard(b);
console.log(b)}else console.log("Park not found")}).catch(b=>{console.error("Error fetching data:",b)})});
function createParkCard(c){parkNameEl.innerHTML="";parkDescriptionEl.innerHTML="";parkWeatherEl.innerHTML="";parkActivitiesEl.innerHTML="";const a=document.createElement("h2"),b=document.createElement("p"),e=document.createElement("p");parkNameEl.appendChild(a).textContent=c.park;parkDescriptionEl.appendChild(b).textContent=c.description;parkWeatherEl.appendChild(e).textContent=c.weather;const d=document.createElement("ul");c.activities.forEach(f=>{const g=document.createElement("li");d.appendChild(g).textContent=
f});parkActivitiesEl.appendChild(d)}const gallery=document.getElementById("gallery");
function getParkPhotos(c){c.preventDefault();fetch(`${"https://api.pexels.com/v1/search"}?query=${searchInput.value+" National Park"}&per_page=4`,{headers:{Authorization:"YHJTxEYXr7hGIeSQrGhw7Q5cjhlXubPRmgYVQUK7PXD6ZBhd3sjszejz"}}).then(a=>{if(!a.ok)throw Error("Failed to fetch images");return a.json()}).then(a=>{gallery.innerHTML="";a.photos.forEach(b=>{const e=document.createElement("img"),d=document.createElement("div");d.classList.add("img-container");e.src=b.src.medium;const f=document.createElement("p");
f.classList.add("citing");d.classList.add("img-container");f.textContent=`Photo by: ${b.photographer} on Pexels`;gallery.appendChild(d);d.appendChild(f);d.appendChild(e)})}).catch(a=>{console.error("Error fetching data:",a)})}function populateDatalist(){const c=document.getElementById("parks-list");parksArray.forEach(a=>{const b=document.createElement("option");b.value=a;c.appendChild(b)})}populateDatalist();function getRandomPark(){return parksArray[Math.floor(Math.random()*parksArray.length)]}openPage();
searchButton.addEventListener("click",getParkPhotos);
document.addEventListener("DOMContentLoaded",()=>{function c(){(document.querySelectorAll(".modal")||[]).forEach(a=>{a.classList.remove("is-active")})}(document.querySelectorAll(".js-modal-trigger")||[]).forEach(a=>{const b=document.getElementById(a.dataset.target);a.addEventListener("click",()=>{b.classList.add("is-active")})});(document.querySelectorAll(".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button")||[]).forEach(a=>{const b=a.closest(".modal");a.addEventListener("click",
()=>{b.classList.remove("is-active")})});document.addEventListener("keydown",a=>{"Escape"===a.key&&c()})});getRandomPark();
function openPage(){const c=`${"https://developer.nps.gov/api/v1/parks"}?q=${searchTerm}&api_key=${"zsg1JUezGGMHKiM4K9RLRe95wfbFzkZKZx5wr4V4"}`;console.log(searchTerm);fetch(c).then(a=>{if(!a.ok)throw Error("Network response was not ok");return a.json()}).then(a=>{if(a=a.data.find(b=>b.fullName.toLowerCase().includes(searchTerm.toLowerCase()))){const b=a.activities.map(e=>e.name);a={park:a.fullName,description:a.description,weather:a.weatherInfo,activities:b};createParkCard(a);console.log(a)}else console.log("Park not found")}).catch(a=>
{console.error("Error fetching data:",a)});fetch(`${"https://api.pexels.com/v1/search"}?query=${searchTerm+" National Park"}&per_page=4`,{headers:{Authorization:"YHJTxEYXr7hGIeSQrGhw7Q5cjhlXubPRmgYVQUK7PXD6ZBhd3sjszejz"}}).then(a=>{if(!a.ok)throw Error("Failed to fetch images");return a.json()}).then(a=>{gallery.innerHTML="";a.photos.forEach(b=>{const e=document.createElement("img"),d=document.createElement("div");d.classList.add("img-container");e.src=b.src.medium;const f=document.createElement("p");
f.classList.add("citing");d.classList.add("img-container");f.textContent=`Photo by: ${b.photographer} on Pexels`;gallery.appendChild(d);d.appendChild(f);d.appendChild(e)})}).catch(a=>{console.error("Error fetching data:",a)})}openPage();
function forecastWeather(c){c.preventDefault();const a=searchInput.value;fetch(`${weatherApiUrl}?q=${a}&units=imperial&appid=${weatherApiKey}`).then(b=>{if(b.ok)infoContainer.classList.add("column","is-three-quaters");else throw infoContainer.classList.add("column","is-full"),Error("Network response was not ok");return b.json()}).then(b=>{const e=document.createElement("h3");e.textContent=`Forecasted weather for ${a} National Park`;b=processForecastData(b);forecastContainer.innerHTML="";forecastContainer.appendChild(e);
b.forEach(d=>{d=createForecastCard(d);forecastContainer.appendChild(d)})}).catch(b=>{console.error("Error fetching data:",b);dashboard.removeChild(forecastContainer)})}
function processForecastData(c){const a=[],b=(new Date).getDate();c.list.forEach(e=>{var d=new Date(e.dt_txt);d.getDate()!==b&&12===d.getHours()&&(d=d.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),a.push({date:d,maxTemp:e.main.temp_max,minTemp:e.main.temp_min,humidity:e.main.humidity,description:e.weather[0].description,iconUrl:`http://openweathermap.org/img/w/${e.weather[0].icon}.png`}))});return a}
function createForecastCard(c){const a=document.createElement("div");a.classList.add("card","is-2-tablet","five-day");const b=document.createElement("h4");b.textContent=c.date;const e=document.createElement("div");e.textContent=c.description;const d=document.createElement("ul"),f=document.createElement("li");f.textContent=`High: ${c.maxTemp}\u00b0F`;const g=document.createElement("li");g.textContent=`Low: ${c.minTemp}\u00b0F`;const h=document.createElement("li");h.textContent=`Humidity: ${c.humidity}%`;
a.appendChild(b);a.appendChild(e);a.appendChild(d);d.appendChild(f);d.appendChild(g);d.appendChild(h);return a}searchButton.addEventListener("click",forecastWeather);
document.addEventListener("DOMContentLoaded",function(){fetch(`${weatherApiUrl}?q=${searchTerm}&units=imperial&appid=${weatherApiKey}`).then(c=>{if(c.ok)infoContainer.classList.add("column","is-three-quaters");else throw infoContainer.classList.add("column","is-full"),Error("Network response was not ok");return c.json()}).then(c=>{const a=document.createElement("h3");a.textContent=`Forecasted weather for ${searchTerm} National Park`;c=processForecastData(c);forecastContainer.innerHTML="";forecastContainer.appendChild(a);
c.forEach(b=>{b=createForecastCard(b);forecastContainer.appendChild(b)})}).catch(c=>{console.error("Error fetching data:",c);dashboard.removeChild(forecastContainer)})});




const parkName = searchInput.value.trim();
    const parkLocations = {
      'Acadia': { latitude: '44.35', longitude: '-68.21' },
      'Arches': { latitude: '38.68', longitude: '-109.57' },
      'Badlands': { latitude: '43.75', longitude: '-102.5' },
      'Big Bend': { latitude: '29.25', longitude: '-103.25' },
      'Biscayne': { latitude: '25.65', longitude: '-80.08' },
      'Black Canyon': { latitude: '38.57', longitude: '-107.72' },
      'Bryce': { latitude: '37.57', longitude: '-112.18' },
      'Canyonlands': { latitude: '38.2', longitude: '-109.93' },
      'Capitol Reef': { latitude: '38.2', longitude: '-111.17' },
      'Carlsbad': { latitude: '32.17', longitude: '-104.44' },
      'Channel Islands': { latitude: '34.01', longitude: '-119.42' },
      'Cuyahoga Valley': { latitude: '41.24', longitude: '-81.55' },
      'Crater Lake': { latitude: '42.94', longitude: '-122.1' },
      'Death Valley': { latitude: '36.24', longitude: '-116.82' },
      'Denali': { latitude: '63.33', longitude: '-150.5' },
      'Dry Tortugas': { latitude: '24.63', longitude: '-82.87' },
      'Everglades': { latitude: '25.32', longitude: '-80.93' },
      'Gates of the Arctic': { latitude: '67.78', longitude: '-153.3' },
      'Gateway Arch': { latitude: '38.63', longitude: '-90.19' },
      'Glacier Bay': { latitude: '58.5', longitude: '-137' },
      'Grand Canyon': { latitude: '36.06', longitude: '-112.14' },
      'Grand Teton': { latitude: '43.73', longitude: '-110.8' },
      'Great Basin': { latitude: '38.98', longitude: '-114.3' },
      'Great Sand Dunes': { latitude: '37.73', longitude: '-105.51' },
      'Great Smoky Mountains': { latitude: '35.68', longitude: '-83.53' },
      'Guadalupe Mountains': { latitude: '31.92', longitude: '-104.87' },
      'Haleakalā': { latitude: '20.72', longitude: '-156.17' },
      'Hawaii Volcanoes': { latitude: '19.38', longitude: '-155.2' },
      'Hot Springs': { latitude: '34.51', longitude: '-93.05' },
      'Indiana Dunes': { latitude: '41.6533', longitude: '-87.0524' },
      'Isle Royale': { latitude: '48.1', longitude: '-88.55' },
      'Joshua Tree': { latitude: '33.79', longitude: '-115.9' },
      'Katmai': { latitude: '58.5', longitude: '-155' },
      'Kenai Fjords': { latitude: '59.92', longitude: '-149.65' },
      'Kings Canyon': { latitude: '36.8', longitude: '-118.55' },
      'Kobuk Valley': { latitude: '67.55', longitude: '-159.28' },
      'Lake Clark': { latitude: '60.97', longitude: '-153.42' },
      'Lassen Volcanic': { latitude: '40.49', longitude: '-121.51' },
      'Mammoth Cave': { latitude: '37.18', longitude: '-86.1' },
      'Mesa Verde': { latitude: '37.18', longitude: '-108.49' },
      'Mount Rainier': { latitude: '48.7', longitude: '-121.2' },
      'New River Gorge': { latitude: '38.1', longitude: '-81.1' },
      'North Cascades': { latitude: '48.7', longitude: '-121.2' },
      'Olympic': { latitude: '47.97', longitude: '-123.5' },
      'Petrified Forest': { latitude: '35.07', longitude: '-109.78' },
      'Pinnacles': { latitude: '36.48', longitude: '-121.16' },
      'Redwood': { latitude: '41.3', longitude: '-124' },
      'Rocky Mountain': { latitude: '40.4', longitude: '-105.58' },
      'Saguaro': { latitude: '32.25', longitude: '-110.5' },
      'Sequoia': { latitude: '36.43', longitude: '-118.68' },
      'Shenandoah': { latitude: '38.53', longitude: '-78.35' },
      'Theodore Roosevelt': { latitude: '46.97', longitude: '-103.45' },
      'Virgin Islands': { latitude: '18.33', longitude: '-64.73' },
      'Voyageurs': { latitude: '48.5', longitude: '-92.88' },
      'White Sands': { latitude: '32.7', longitude: '-106.17' },
      'Wind Cave': { latitude: '43.57', longitude: '-103.48' },
      'Wrangell-St. Elias': { latitude: '61', longitude: '-142' },
      'Yellowstone': { latitude: '44.6', longitude: '-110.5' },
      'Yosemite': { latitude: '37.83', longitude: '-119.5' },
      'Zion': { latitude: '37.3', longitude: '-113.05' }
  };
    const parkLoc = parkLocations[parkName];
    if (parkLoc) {
        const { latitude, longitude } = parkLoc;
        const fetchForecast = `${weatherApiUrl}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApiKey}`;
        fetch(fetchForecast)
      .then(response => {
          if (!response.ok) {
              infoContainer.classList.add('column', 'is-full')
              throw new Error("Network response was not ok");
          }
          else {
            infoContainer.classList.add('column', 'is-three-quaters');
          }
          return response.json();
      })
      .then(data => {
          const forecastTitle = document.createElement('h3')
          forecastTitle.textContent = `Forecasted weather for ${parkName} National Park`;
          const forecasts = processForecastData(data);
          forecastContainer.innerHTML = '';
          forecastContainer.appendChild(forecastTitle);
              forecasts.forEach(forecast => {
              const forecastCard = createForecastCard(forecast);
              forecastContainer.appendChild(forecastCard);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          dashboard.removeChild(forecastContainer);
      });
    }
})