//http://api.weatherapi.com/v1/forecast.json?key=af0baaec05d9499b85f41128250111&q=London&days=7&aqi=yes&alerts=yes


const accessKey = '538fe67faa9a3be2f8642bc851754629';
const city = 'New York';
const url1 = `http://api.weatherapi.com/v1/current.json?key=af0baaec05d9499b85f41128250111&q=${city}&aqi=yes`;
const url2 = `http://api.weatherapi.com/v1/forecast.json?key=af0baaec05d9499b85f41128250111&q=${city}&days=5&aqi=yes&alerts=yes`
const temperatureFront = document.querySelector(".temperature__module");
const temperatureZoom = document.querySelector(".module__more--temp");
const qualityFront = document.querySelector(".quality__module");
const qualityZoom = document.querySelector(".module__more--quality");




async function getWeather() {
    const info = await fetch(url1);
    const infoWeather = await info.json();
    temperatureFront.innerHTML = temperatureHTML(infoWeather);
    // temperatureZoom.innerHTML = infoWeather.map(temperature =>
    //     tempzoomHTML(temperature)).join("");
    // qualityFront.innerHTML = infoWeather.map(quality =>
    //     qualityHTML(quality)).join("");
    // qualityZoom.innerHTML = infoWeather.map(quality =>
    //     qualzoomHTML(quality)).join(""); 
     console.log(infoWeather); 
      
}

setTimeout(() => {
  getWeather();
});

function temperatureHTML(temperature) {
    return `<div class="temp__right">
                <div class="temp__top">
                    <img src=${temperature.current.condition.icon} alt="" class="fa-cloud-sun">
                    <span class="temp__actual">${temperature.current.temp_c}°C</span>
                </div>
                <div class="temp__descrip">${temperature.current.condition.text}</div>
            </div>
            <div class="module__bg"></div>
            <div class="module__more--temp">
                <div class="temp__more">
                    <div class="temp__more--item">Feels Like :  ${temperature.current.feelslike_c}°C</div>
                    <div class="temp__more--item">
                            <span class="temp__more-text">Humidity : ${temperature.current.humidity}</span>
                    </div>
                    <div class="temp__more--item">
                        <span class="temp__more-text">Precipitation : 0%</span>
                    </div>
                    <div class="temp__more--item">Wind : 4kph</div>
                    <div class="temp__more--item">Visibility : ${temperature.current.vis_km} km</div>
                    <div class="temp__more--item">UV : ${temperature.current.uv}</div>
                </div>
            </div>`
}

temperatureHTML()

// async function getForecast() {
//     const info = await fetch(url2);
//     const infoForecast = await info.json();
//     console.log(infoForecast);
//     forecastHolder.innerHTML = infoForecast.map(forecast =>
//         forecastHTML(forecast)).join("");
// }



// getForecast();


