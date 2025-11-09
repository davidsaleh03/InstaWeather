//http://api.weatherapi.com/v1/forecast.json?key=af0baaec05d9499b85f41128250111&q=London&days=7&aqi=yes&alerts=yes


const accessKey = '538fe67faa9a3be2f8642bc851754629';
const city = 'New York';
const url1 = `http://api.weatherapi.com/v1/current.json?key=af0baaec05d9499b85f41128250111&q=${city}&aqi=yes`;
const url2 = `http://api.weatherapi.com/v1/forecast.json?key=af0baaec05d9499b85f41128250111&q=${city}&days=8&aqi=yes&alerts=yes`
const userList
async function getWeather() {
    const info = await fetch(url1);
    const infoWeather = await info.json();
    console.log(infoWeather);
    weatherPlace.innerHTML = infoWeather.map(weather => 
        weatherHTML(weather)).join("");
}


async function getForecast() {
    const info = await fetch(url2);
    const infoForecast = await info.json();
    console.log(infoForecast);
    forecastPlace.innerHTML = infoForecast.map(forecast =>
        forecastHTML(forecast)).join("");
}


getWeather();
getForecast();


