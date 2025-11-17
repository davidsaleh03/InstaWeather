//http://api.weatherapi.com/v1/forecast.json?key=af0baaec05d9499b85f41128250111&q=London&days=7&aqi=yes&alerts=yes


const accessKey = '538fe67faa9a3be2f8642bc851754629';
const city = 'Los Angeles';
const url1 = `http://api.weatherapi.com/v1/current.json?key=af0baaec05d9499b85f41128250111&q=${city}&aqi=yes`;
const url2 = `http://api.weatherapi.com/v1/forecast.json?key=af0baaec05d9499b85f41128250111&q=${city}&days=7&aqi=yes&alerts=yes`
const temperatureFront = document.querySelector(".temperature__module");
const temperatureZoom = document.querySelector(".module__more--temp");
const qualityFront = document.querySelector(".quality__module");
const qualityZoom = document.querySelector(".module__more--quality");




async function getForecast() {
    const info = await fetch(url2);
    const infoForecast = await info.json();
    console.log(infoForecast);
    temperatureFront.innerHTML = temperatureHTML(infoForecast);
    qualityFront.innerHTML = qualityHTML(infoForecast);
    // qualityZoom.innerHTML = infoWeather.map(quality =>
    //     qualzoomHTML(quality)).join(""); 
      
}

setTimeout(() => {
  getForecast();
});

//temperature.forecast.forecastDay[0].day[daily_chance_of_rain]

function temperatureHTML(temperature) {
    return `<div class="temp__right">
                <div class="temp__top">
                    <img src="${temperature.current.condition.icon}" alt="" class="fa-cloud-sun">
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
                        <span class="temp__more-text">Precipitation : ${temperature.forecast.forecastday[0].day["daily_chance_of_rain"]}%</span>
                    </div>
                    <div class="temp__more--item">Wind : 4kph</div>
                    <div class="temp__more--item">Visibility : ${temperature.current.vis_km} km</div>
                    <div class="temp__more--item">UV : ${temperature.current.uv}</div>
                </div>
            </div>`
}

temperatureHTML()

//quality.current.air_quality.gb-defra-index

function qualityHTML(quality) {
   return `<div class="quality__right">
            <div class="quality__title">Air Quality</div>
            <ul class="quality__list">
                <li class="quality__item">CO : ${quality.current.air_quality.co}</li>
                <li class="quality__item">NO2 : ${quality.current.air_quality.no2}</li>
                <li class="quality__item">O3 : ${quality.current.air_quality.o3}</li>
            </ul>
        </div>
        <div class="module__bg"></div>
        <div class="module__more--quality">
            <div class="quality__more">
                <div class="quality__more--item">US EPA Index : ${quality.current.air_quality["us-epa-index"]}</div>
                <div class="quality__more--item">GB Defra Index : ${quality.current.air_quality["gb-defra-index"]}</div>
                <div class="quality__more--item">SO2 : ${quality.current.air_quality.so2}</div>              
                <div class="quality__more--item">PM 2.5 : ${quality.current.air_quality.pm2_5}</div>
                <div class="quality__more--item">PM 10 : ${quality.current.air_quality.pm10}</div>
            </div>
        </div>`
}

qualityHTML();





