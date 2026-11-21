const API_KEY = "6336ab174ac76b31d9e2a0b1d25ed363";
const CITY_ID = "2365267";

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&units=metric&appid=${API_KEY}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&units=metric&appid=${API_KEY}`;

const currentTemperature = document.querySelector("#current-temperature");
const weatherDescription = document.querySelector("#weather-description");
const forecastContainer = document.querySelector("#forecast-container");

async function getWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherURL),
            fetch(forecastURL)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        console.error("Weather error:", error);

        currentTemperature.textContent = "Weather unavailable";
        weatherDescription.textContent = "Weather unavailable";
        forecastContainer.textContent = "Forecast unavailable";
    }
}

function displayCurrentWeather(data) {
    currentTemperature.textContent = `${Math.round(data.main.temp)} °C`;

    weatherDescription.textContent = data.weather[0].description;
}

function displayForecast(data) {
    forecastContainer.innerHTML = "";

    const dailyForecasts = {};

    data.list.forEach((forecast) => {
        const localDate = new Date(
            (forecast.dt + data.city.timezone) * 1000
        );

        const dateKey = localDate.toISOString().split("T")[0];

        if (!dailyForecasts[dateKey]) {
            dailyForecasts[dateKey] = [];
        }

        dailyForecasts[dateKey].push({
            forecast: forecast,
            hour: localDate.getUTCHours()
        });
    });

    const today = new Date(
        (data.list[0].dt + data.city.timezone) * 1000
    );

    const todayKey = today.toISOString().split("T")[0];

    const nextThreeDays = Object.keys(dailyForecasts)
        .filter((date) => date > todayKey)
        .slice(0, 3);

    nextThreeDays.forEach((date) => {
        const forecasts = dailyForecasts[date];

        const selectedForecast = forecasts.reduce((closest, current) => {
            return Math.abs(current.hour - 12) < Math.abs(closest.hour - 12)
                ? current
                : closest;
        });

        const forecastDate = new Date(`${date}T12:00:00Z`);

        const dayName = forecastDate.toLocaleDateString("en-US", {
            weekday: "long",
            timeZone: "UTC"
        });

        const temperature = Math.round(
            selectedForecast.forecast.main.temp
        );

        const dayElement = document.createElement("p");

        dayElement.textContent = `${dayName}: ${temperature} °C`;

        forecastContainer.appendChild(dayElement);
    });
}

getWeather();