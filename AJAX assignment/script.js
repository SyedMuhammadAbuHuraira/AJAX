function getWeather() {
    var cityInput = document.getElementById('cityInput').value;
    var apiKey = 'b998b74f0000a8e4625fc8649ed405ac'; // Replace with your API key

    if (cityInput === '') {
        alert('Please enter a city name.');
        return;
    }

    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;

    // Make an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            var weatherData = JSON.parse(xhr.responseText);
            displayWeather(weatherData);
        } else {
            alert('Error fetching weather data. Please try again.');
        }
    };

    xhr.send();
}

function displayWeather(data) {
    var weatherDataDiv = document.getElementById('weatherData');

    // Extract relevant information from the API response
    var cityName = data.name;
    var country = data.sys.country;
    var temperature = (data.main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius
    var description = data.weather[0].description;
    var feelsLike = (data.main.feels_like - 273.15).toFixed(2); // Convert Kelvin to Celsius
    var windSpeed = data.wind.speed;
    var windDirection = data.wind.deg;
    var pressure = data.main.pressure;
    var humidity = data.main.humidity;
    var uvIndex = data.uvi;
    var dewPoint = (data.main.temp - ((100 - humidity) / 5) - 273.15).toFixed(2); // Convert Kelvin to Celsius

    // Format and display the fetched data
    var html = `
        <h2>${cityName}, ${country}</h2>
        <p>${new Date().toLocaleString()}</p>
        <p>${temperature}°C</p>
        <p>Feels like ${feelsLike}°C. ${description}</p>
        <p>Wind: ${windSpeed}m/s ${getWindDirection(windDirection)}</p>
        <p>Pressure: ${pressure}hPa</p>
        <p>Humidity: ${humidity}%</p>
        <p>UV Index: ${uvIndex}</p>
        <p>Dew point: ${dewPoint}°C</p>
        <p>Visibility: ${data.visibility / 1000}km</p>
    `;

    weatherDataDiv.innerHTML = html;
}

// Helper function to convert wind direction in degrees to cardinal direction
function getWindDirection(degrees) {
    var cardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    var index = Math.round((degrees % 360) / 45);
    return cardinalDirections[(index % 8)];
}


