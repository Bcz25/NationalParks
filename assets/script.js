const parksArray = ['Acadia', 'Arches', 'Badlands', 'Big Bend', 'Biscayne', 'Black Canyon', 'Bryce Canyon', 'Canyonlands', 'Capitol Reef', 'Carlsbad', 'Channel Islands', 'Congaree', 'Crater Lake', 'Cuyahoga Valley', 'Death Valley', 'Denali', 'Dry Tortugas', 'Everglades', 'Gates of the Artic', 'Gateway Arch', 'Glacier Bay', 'Glacier', 'Grand Canyon', 'Grand Teton', 'Great Basin', 'Great Sand Dunes', 'Great Smokey Mountains', 'Guadalupe Mountains', 'Haleakala', 'Hawaii Volcanoes', 'Hot Springs', 'Indiana Dues', 'Isle Royale', 'Joshua Tree', 'Katmai', 'Kenai Fjords', 'Kings Canyon', 'Kobuk Valley', 'Lake Clark', 'Lassen Volcanic', 'Mammoth Cave', 'Mesa Verde', 'Mount Ranier', 'American Samoa', 'New River Gorge', 'North Cascades', 'Olympic', 'Petrified Forest', 'Pinnacles', 'Redwood', 'Rocky Mountain', 'Saguaro', 'Sequoia', 'Shenandoah', 'Theodore Roosevelt', 'Virgin Islands', 'Voyageurs', 'White Sands', 'Wind Cave', 'Wrangell-St Elias', 'Yellowstone', 'Yosemite', 'Zion']

const parkNameEl = document.getElementById('park-name');
const parkDescriptionEl = document.getElementById('description');
const parkWeatherEl = document.getElementById('weather');
const parkActivitiesEl = document.getElementById('activities')


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
  const parks = searchInput.value;
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
               // added div
               const img = document.createElement('img');
               const imgContainer = document.createElement('div')
               imgContainer.classList.add('img-container');
               img.src = photo.src.medium;
               const photographer = document.createElement('p');
               photographer.classList.add('citing');
               imgContainer.classList.add('img-container');
               //copy below
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

  function openPage() {
    const apiUrl = 'https://developer.nps.gov/api/v1/parks';
    
    // Define your API key (replace 'YOUR_API_KEY' with your actual API key)
    const apiKey = 'zsg1JUezGGMHKiM4K9RLRe95wfbFzkZKZx5wr4V4';
    
    // Define the search term for Yellowstone National Park
    const searchTerm = 'zion';
    
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

      const imageApiUrl = `https://api.pexels.com/v1/search`
  const parks = 'zion';
  const fetchPics = `${imageApiUrl}?query=${parks}&per_page=6`;
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
            // added div
            const img = document.createElement('img');
            const imgContainer = document.createElement('div')
            img.src = photo.src.medium;
            const photographer = document.createElement('p');
            photographer.classList.add('citing');
            imgContainer.classList.add('img-container');
            //copy below
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

const apiKey = "d819c0f02622027c482907b6666513c6";
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast';
const forecastContainer = document.getElementById('park-forecast');
const forecastHeader = document.getElementById('forecast-header')


function forecastWeather(event){
    event.preventDefault();
    const parkSearch = searchInput.value.trim();
    const fetchForecast = `${apiForecast}?q=${parkSearch}&units=imperial&appid=${apiKey}`;
    fetch(fetchForecast)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const forecasts = processForecastData(data);
            forecastContainer.innerHTML = ''; 
            forecasts.forEach(forecast => {
                const forecastCard = createForecastCard(forecast);
                forecastContainer.appendChild(forecastCard);
                if(forecasts){
                  const parkSearch = searchInput.value.trim();
                  const forecastId = document.createElement('h3');
                  const forecastHeader = document.getElementById('forecast-header')
                  forecastHeader.innerHTML= "";
                  forecastId.textContent = `Forecasted weather for ${parkSearch}`;
                  forecastHeader.appendChild(forecastId);
                };
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
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
            const iconCode = item.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;


            forecasts.push({
                date: formattedDate,
                maxTemp: maxTemp,
                minTemp: minTemp,
                humidity: humidity,
                description: description,
                iconUrl: iconUrl
            });
        }
    });

    return forecasts;
}

function createForecastCard(forecast) {
    const card = document.createElement('div');
    card.classList.add('card', 'col-md-2', 'five-day');
    
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

document.addEventListener('DOMContentLoaded', function (){
  const parkSearch = "Zion National Park";
 forecastWeather(parkSearch);
})