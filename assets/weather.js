const apiKey = "d819c0f02622027c482907b6666513c6";
const apiForecast = 'https://api.openweathermap.org/data/2.5/forecast';
const parkNameEl = document.getElementById('park-name');
const forecastContainer = document.getElementById('park-forecast');


const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

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

    const icon = document.createElement('img');
    icon.src = forecast.iconUrl;

    
    card.appendChild(cardTitle);
    card.appendChild(cardBody);
    card.appendChild(cardTextContainer);
    cardTextContainer.appendChild(cardMax);
    cardTextContainer.appendChild(cardMin);
    cardTextContainer.appendChild(cardHumid);
    cardBody.appendChild(icon);

    return card;
}

searchButton.addEventListener('click', forecastWeather)