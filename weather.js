document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const authPage = document.getElementById('auth-page');
    const welcomePage = document.getElementById('welcome-page');
    const userNameSpan = document.getElementById('user-name');
    const userCitySpan = document.getElementById('user-city');
    const currentTimeSpan = document.getElementById('current-time');
    const weatherInfoDiv = document.getElementById('weather-info');

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const city = document.getElementById('city').value;

        userNameSpan.textContent = name;
        userCitySpan.textContent = city;
        updateCurrentTime();
        authPage.classList.add('hidden');
        welcomePage.classList.remove('hidden');
    });

    document.getElementById('celsius').addEventListener('click', () => {
        getWeather(userCitySpan.textContent, 'metric');
    });

    document.getElementById('fahrenheit').addEventListener('click', () => {
        getWeather(userCitySpan.textContent, 'imperial');
    });

    function updateCurrentTime() {
        const now = new Date();
        currentTimeSpan.textContent = now.toLocaleTimeString();
        setTimeout(updateCurrentTime, 1000);
    }

    function getWeather(city, units) {
        const apiKey = 'd6cdc6a36b4aa1e8f35719196b883669'; // Replace with your OpenWeatherMap API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                weatherInfoDiv.innerHTML = `<p>Temperature: ${temperature}°</p><p>${weatherDescription}</p>`;
            })
            .catch(error => {
                weatherInfoDiv.innerHTML = `<p>Error fetching weather data.</p>`;
            });
    }
});
