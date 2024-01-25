const apiKey = "46b04cd4b8d04c5d64688c3b086d206d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");
const weatherDiv = document.querySelector(".weather");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        var data = await response.json();

        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";

        updateWeatherIcon(data.weather[0].main);
        errorDiv.style.display = "none";
        weatherDiv.style.display = "block";
    } catch (error) {
        console.error('Error fetching weather data:', error);
        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";
    }
}

function updateWeatherIcon(weatherCondition) {
    const weatherIcons = {
        "Clouds": "images/clouds.png",
        "Clear": "images/clear.png",
        "Rain": "images/rain.png",
        "Drizzle": "images/drizzle.png",
        "Mist": "images/mist.png"
    };
    weatherIcon.src = weatherIcons[weatherCondition] || "images/default.png";
}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});
