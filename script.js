function getWeather() {
    const apiKey = '49f94ca95ab8e4fa90e99b8e38d5968b'; 
    const cityInput = document.getElementById('cityInput').value;
    const weatherContainer = document.getElementById('weather-container');

    if (cityInput.trim() === '') {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;

    // AJAX call using XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // asyncronous reqesting to api
    xhr.open('GET', apiUrl, true);

    // Handle progress event (optional)
    xhr.onprogress = function (event) {   
       console.log('Progress:', event.loaded, '/', event.total);
    };
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const weatherData = JSON.parse(xhr.responseText);
                displayWeather(weatherData);
            } else {
                alert('Unable to fetch weather data. Please try again.');
            }
        }
    };
    xhr.send();
    console.log('We are done');
    
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = '';

    const cityName = data.name;
    const temperature = (data.main.temp - 273.15).toFixed(2); // Convert temperature to Celsius

    const weatherInfo = document.createElement('div');
    weatherInfo.innerHTML = `<h2>${cityName}</h2><p>Temperature: ${temperature} °C</p>`;

    weatherContainer.appendChild(weatherInfo);
    
}
