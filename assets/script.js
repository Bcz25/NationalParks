const parksArray = ['Acadia', 'Arches', 'Badlands', 'Big Bend', 'Biscayne', 'Black Canyon', 'Bryce Canyon', 'Canyonlands', 'Capitol Reef', 'Carlsbad', 'Channel Islands', 'Congaree', 'Crater Lake', 'Cuyahoga Valley', 'Death Valley', 'Denali', 'Dry Tortugas', 'Everglades', 'Gates of the Arctic', 'Gateway Arch', 'Glacier Bay', 'Grand Canyon', 'Grand Teton', 'Great Basin', 'Great Sand Dunes', 'Great Smokey Mountains', 'Guadalupe Mountains', 'Haleakalā', 'Hawaiʻi volcanoes', 'Hot Springs', 'Indiana Dunes', 'Isle Royale', 'Joshua Tree', 'Katmai', 'Kenai Fjords', 'Kings Canyon', 'Kobuk Valley', 'Lake Clark', 'Lassen Volcanic', 'Mammoth Cave', 'Mesa Verde', 'Mount Rainier', 'New River Gorge', 'North Cascades', 'Olympic', 'Petrified Forest', 'Pinnacles', 'Redwood', 'Rocky Mountain', 'Saguaro', 'Sequoia', 'Shenandoah', 'Theodore Roosevelt', 'Virgin Islands', 'Voyageurs', 'White Sands', 'Wind Cave', 'Elias', 'Yellowstone', 'Yosemite', 'Zion']

const parkNameEl = document.getElementById('park-name');
const parkDescriptionEl = document.getElementById('description');
const parkWeatherEl = document.getElementById('weather');
const parkActivitiesEl = document.getElementById('activities')
const searchTerm = getRandomPark();

const weatherApiKey = "d819c0f02622027c482907b6666513c6";
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
const forecastContainer = document.getElementById('park-forecast');
const infoContainer = document.getElementById('parkInfo')
const dashboard = document.getElementById('dashboard')

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    // Define the URL of the NPS API endpoint
    const apiUrl = 'https://developer.nps.gov/api/v1/parks';
    
    // Define your API key (replace 'YOUR_API_KEY' with your actual API key)
    const apiKey = 'zsg1JUezGGMHKiM4K9RLRe95wfbFzkZKZx5wr4V4';
    
    // Define the search term for Yellowstone National Park
    const searchTerm = searchInput.value;
    
    // Construct the fetch URL with the search term and API key
    const fetchUrl = `${apiUrl}?q=${searchTerm}&api_key=${apiKey}`;

    fetch(fetchUrl)
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
      })
      .then(data => {
        const park = data.data.find(park => park.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    
        
        // Check if the park was found
        if (park) {
    
            const activityNames = park.activities.map(activity => activity.name)
            // Display information about the park
            const parkData = {
                park: park.fullName,
                description: park.description,
                weather: park.weatherInfo,
                activities: activityNames
            }
    
            createParkCard(parkData);
          console.log(parkData);
        } else {
          console.log('Park not found');
        }
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
});

// Make the fetch request

function createParkCard (data) {
  // Clear existing content
  parkNameEl.innerHTML = '';
  parkDescriptionEl.innerHTML = '';
  parkWeatherEl.innerHTML = '';
  parkActivitiesEl.innerHTML = '';

  const newHeader = document.createElement('h2');
  const descriptionParagraph = document.createElement('p');
  const weatherParagraph = document.createElement('p');
  parkNameEl.appendChild(newHeader).textContent = data.park;
  parkDescriptionEl.appendChild(descriptionParagraph).textContent = data.description;
  parkWeatherEl.appendChild(weatherParagraph).textContent = data.weather;

  const activitiesList = document.createElement('ul')

  data.activities.forEach(activity => {
      const activityItem = document.createElement('li')
      activitiesList.appendChild(activityItem).textContent = activity
  })
  parkActivitiesEl.appendChild(activitiesList);
}

const gallery = document.getElementById('gallery')
function getParkPhotos(event){
  event.preventDefault();
  const apiUrl = `https://api.pexels.com/v1/search`
  const parks = searchInput.value + ' National Park';
  const fetchPics = `${apiUrl}?query=${parks}&per_page=4`;
  fetch(fetchPics, {
      headers: {
          Authorization: "YHJTxEYXr7hGIeSQrGhw7Q5cjhlXubPRmgYVQUK7PXD6ZBhd3sjszejz"
      }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Failed to fetch images")
          }
          return response.json();
      })
      .then (data => {
          // Clear existing content
          gallery.innerHTML = '';
          data.photos.forEach(photo => {
            const img = document.createElement('img');
            const imgContainer = document.createElement('div')
            imgContainer.classList.add('img-container');
            img.src = photo.src.medium;
            const photographer = document.createElement('p');
            photographer.classList.add('citing');
            imgContainer.classList.add('img-container');
            photographer.textContent = `Photo by: ${photo.photographer} on Pexels`;
            gallery.appendChild(imgContainer);
            imgContainer.appendChild(photographer);            
            imgContainer.appendChild(img);
      });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

function populateDatalist() {
  const datalist = document.getElementById('parks-list');
  
  parksArray.forEach(park => {
    const option = document.createElement('option');
    option.value = park;
    datalist.appendChild(option);
  });
}

// Call the function when the page loads
populateDatalist()

function getRandomPark() {
  const randomIndex = Math.floor(Math.random() * parksArray.length);
  return parksArray[randomIndex];
}

openPage();

searchButton.addEventListener('click', getParkPhotos);

  document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
      }
    });
  });
  getRandomPark();

  function openPage() {
    const apiUrl = 'https://developer.nps.gov/api/v1/parks';
    
    // Define your API key (replace 'YOUR_API_KEY' with your actual API key)
    const apiKey = 'zsg1JUezGGMHKiM4K9RLRe95wfbFzkZKZx5wr4V4';
    
    // Define the search term for Yellowstone National Park
    
    
    // Construct the fetch URL with the search term and API key
    const fetchUrl = `${apiUrl}?q=${searchTerm}&api_key=${apiKey}`;

    console.log(searchTerm);

    fetch(fetchUrl)
      .then(response => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
      })
      .then(data => {
        const park = data.data.find(park => park.fullName.toLowerCase().includes(searchTerm.toLowerCase()));
    
        
        // Check if the park was found
        if (park) {
    
            const activityNames = park.activities.map(activity => activity.name)
            // Display information about the park
            const parkData = {
                park: park.fullName,
                description: park.description,
                weather: park.weatherInfo,
                activities: activityNames
            }
    
            createParkCard(parkData);
          console.log(parkData);
        } else {
          console.log('Park not found');
        }
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });

      const imageApiUrl = `https://api.pexels.com/v1/search`
      const imageSearchTerm = searchTerm + ' National Park';
      const fetchPics = `${imageApiUrl}?query=${imageSearchTerm}&per_page=4`;
    
      fetch(fetchPics, {
      headers: {
          Authorization: "YHJTxEYXr7hGIeSQrGhw7Q5cjhlXubPRmgYVQUK7PXD6ZBhd3sjszejz"
      }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Failed to fetch images")
          }
          return response.json();
      })
      .then (data => {
          // Clear existing content
          gallery.innerHTML = '';
          data.photos.forEach(photo => {
            const img = document.createElement('img');
            const imgContainer = document.createElement('div')
            imgContainer.classList.add('img-container');
            img.src = photo.src.medium;
            const photographer = document.createElement('p');
            photographer.classList.add('citing');
            imgContainer.classList.add('img-container');
            photographer.textContent = `Photo by: ${photo.photographer} on Pexels`;
            gallery.appendChild(imgContainer);
            imgContainer.appendChild(photographer);            
            imgContainer.appendChild(img);
      });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
  }
  openPage();

//weather dashboard
function getParkLoc(searchTerm){
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
  return parkLocations[searchTerm];
}

function forecastWeather(searchTerm){
  const parkLoc = getParkLoc(searchTerm);
  const parkName = searchInput.value;
  if (parkLoc) {
      const { latitude, longitude } = parkLoc;
      const fetchForecast = `${weatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;
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
}
function processForecastData(data) {
    const forecasts = [];
    
    const currentDate = new Date();
    const currentDay = currentDate.getDate();

  
    data.list.forEach(item => {
       
        const forecastDate = new Date(item.dt_txt);
        const forecastDay = forecastDate.getDate();

        
        if (forecastDay !== currentDay && forecastDate.getHours() === 12) {
            
            const formattedDate = forecastDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const date = item.dt_txt;
            const maxTemp = item.main.temp_max;
            const minTemp = item.main.temp_min;
            const humidity = item.main.humidity;
            const description = item.weather[0].description;


            forecasts.push({
                date: formattedDate,
                maxTemp: maxTemp,
                minTemp: minTemp,
                humidity: humidity,
                description: description,
            });
        }
    });

    return forecasts;
}

function createForecastCard(forecast) {
    const card = document.createElement('div');
    card.classList.add('card', 'is-2-tablet', 'five-day');
    
    const cardTitle = document.createElement('h4');
    cardTitle.textContent = forecast.date;

    const cardBody = document.createElement('div');
    cardBody.textContent = forecast.description;

    const cardTextContainer = document.createElement('ul');

    const cardMax = document.createElement('li');
    cardMax.textContent = `High: ${forecast.maxTemp}°F`;

    const cardMin = document.createElement('li');
    cardMin.textContent = `Low: ${forecast.minTemp}°F`;

    const cardHumid = document.createElement('li');
    cardHumid.textContent = `Humidity: ${forecast.humidity}%`;

    card.appendChild(cardTitle);
    card.appendChild(cardBody);
    card.appendChild(cardTextContainer);
    cardTextContainer.appendChild(cardMax);
    cardTextContainer.appendChild(cardMin);
    cardTextContainer.appendChild(cardHumid);

    return card;
}


searchButton.addEventListener('click', forecastWeather)
document.addEventListener('DOMContentLoaded', function(searchTerm){
  const parkName = searchInput.value;
  const parkLoc = getParkLoc(searchTerm);
  if (parkLoc) {
      const { latitude, longitude } = parkLoc;
      const fetchForecast = `${weatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;
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