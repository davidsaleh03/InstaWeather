//http://api.weatherapi.com/v1/forecast.json?key=af0baaec05d9499b85f41128250111&q=London&days=7&aqi=yes&alerts=yes

const accessKey = "538fe67faa9a3be2f8642bc851754629";
const city = "Los Angeles";
const url1 = `http://api.weatherapi.com/v1/current.json?key=af0baaec05d9499b85f41128250111&q=${city}&aqi=yes`;
const url2 = `http://api.weatherapi.com/v1/forecast.json?key=af0baaec05d9499b85f41128250111&q=${city}&days=7&aqi=yes&alerts=yes`;
const searchFront = document.querySelector(".search__results");
const slider = document.querySelector(".search__temp--change");


async function getForecast() {
  const info = await fetch(url2);
  const infoForecast = await info.json();
  currentWeather = infoForecast;
  console.log(infoForecast);
  searchFront.innerHTML = searchHTML(infoForecast);
}

setTimeout(() => {
  getForecast();
});

//temperature.forecast.forecastDay[0].day[daily_chance_of_rain]
//temperature.current.temp_c
function searchHTML(temperature) {
  return `<div class="temperature__module module">
                    <div class="temp__right">
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
            </div>
                </div>
                <div class="quality__module module">
                <div class="quality__right">
            <div class="quality__title">Air Quality</div>
            <ul class="quality__list">
                <li class="quality__item">CO : ${temperature.current.air_quality.co}</li>
                <li class="quality__item">NO2 : ${temperature.current.air_quality.no2}</li>
                <li class="quality__item">O3 : ${temperature.current.air_quality.o3}</li>
            </ul>
        </div>
        <div class="module__bg"></div>
        <div class="module__more--quality">
            <div class="quality__more">
                <div class="quality__more--item">US EPA Index : ${temperature.current.air_quality["us-epa-index"]}</div>
                <div class="quality__more--item">GB Defra Index : ${temperature.current.air_quality["gb-defra-index"]}</div>
                <div class="quality__more--item">SO2 : ${temperature.current.air_quality.so2}</div>              
                <div class="quality__more--item">PM 2.5 : ${temperature.current.air_quality.pm2_5}</div>
                <div class="quality__more--item">PM 10 : ${temperature.current.air_quality.pm10}</div>
            </div>
        </div>
                </div>
                <div class="alert__module">
                    <div class="alert__title">Alerts</div>
                    <div class="alert">
                        <h1 class="alert__text">Wind Advisory issued November 5 at 12:41PM EST until November 6 at 8:00AM EST by NWS Upton NY</h1>
                    </div>
                </div>
                <div class="forecast__module">
                    <ul class="forecast__list">
                        <li class="forecast__day">
                            <div class="forecast__list--small">
                                <div class="forecast__date zoom__margin">${temperature.forecast.forecastday[1].date.slice(5, 10)}</div>
                                <div class="forecast__temp">
                                    <img src="${temperature.forecast.forecastday[1].day.condition.icon}" alt="" class="fa-sun">
                                    <div class="max-temp">
                                    ${temperature.forecast.forecastday[1].day["maxtemp_c"]}°C ${temperature.forecast.forecastday[1].day["mintemp_c"]}°C
                                    </div>
                                </div>
                                <div class="humidity">
                                    <i class="fa-solid fa-droplet"></i>
                                    <span class="humidity__num">${temperature.forecast.forecastday[1].day.avghumidity}</span>
                                </div>
                                <div class="precipitation zoom__margin">
                                    <i class="fa-solid fa-cloud-rain"></i>
                                    <span class="precipitation__num">${temperature.forecast.forecastday[1].day["daily_chance_of_rain"]}%</span>
                                </div>
                            </div>
                            <div class="forecast__list--zoom">
                                <div class="forecast__item--zoom two">UV : ${temperature.forecast.forecastday[1].day.uv}</div>
                                <div class="forecast__item--zoom two">CO : ${temperature.forecast.forecastday[1].day["air_quality"].co.toFixed(1)}</div>
                                <div class="forecast__item--zoom two">NO2 : ${temperature.forecast.forecastday[1].day["air_quality"].no2.toFixed(1)}</div>
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : ${temperature.forecast.forecastday[1].day["air_quality"].o3.toFixed(1)}</div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunrise.png" class="forecast__rise-set">
                                    <div class="forecast-rise__time">0${temperature.forecast.forecastday[1].astro.sunrise.slice(1,5)}</div>
                                </div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunset.png"  class="forecast__rise-set">
                                    <div class="forecast-set__time">19:00</div>
                                </div>
                            </div>
                        </li>
                        <li class="forecast__day">
                            <div class="forecast__list--small">
                                <div class="forecast__date zoom__margin">${temperature.forecast.forecastday[2].date.slice(5, 10)}</div>
                                <div class="forecast__temp">
                                    <img src="${temperature.forecast.forecastday[2].day.condition.icon}" alt="" class="fa-sun">
                                    <div class="max-temp">
                                    ${temperature.forecast.forecastday[2].day["maxtemp_c"]}°C ${temperature.forecast.forecastday[2].day["mintemp_c"]}°C
                                    </div>
                                </div>
                                <div class="humidity">
                                    <i class="fa-solid fa-droplet"></i>
                                    <span class="humidity__num">${temperature.forecast.forecastday[2].day.avghumidity}</span>
                                </div>
                                <div class="precipitation zoom__margin">
                                    <i class="fa-solid fa-cloud-rain"></i>
                                    <span class="precipitation__num">${temperature.forecast.forecastday[2].day["daily_chance_of_rain"]}%</span>
                                </div>
                            </div>
                            <div class="forecast__list--zoom">
                                <div class="forecast__item--zoom two">UV : ${temperature.forecast.forecastday[2].day.uv}</div>
                                <div class="forecast__item--zoom two">CO : ${temperature.forecast.forecastday[2].day["air_quality"].co.toFixed(1)}</div>
                                <div class="forecast__item--zoom two">NO2 : ${temperature.forecast.forecastday[2].day["air_quality"].no2.toFixed(1)}</div>
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : ${temperature.forecast.forecastday[2].day["air_quality"].o3.toFixed(1)}</div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunrise.png" class="forecast__rise-set">
                                    <div class="forecast-rise__time">0${temperature.forecast.forecastday[2].astro.sunrise.slice(1,5)}</div>
                                </div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunset.png"  class="forecast__rise-set">
                                    <div class="forecast-set__time">19:00</div>
                                </div>
                            </div>
                        </li>
                        <li class="forecast__day">
                            <div class="forecast__list--small">
                                <div class="forecast__date zoom__margin">${temperature.forecast.forecastday[3].date.slice(5, 10)}</div>
                                <div class="forecast__temp">
                                    <img src="${temperature.forecast.forecastday[3].day.condition.icon}" alt="" class="fa-sun">
                                    <div class="max-temp">
                                    ${temperature.forecast.forecastday[3].day["maxtemp_c"]}°C ${temperature.forecast.forecastday[3].day["mintemp_c"]}°C
                                    </div>
                                </div>
                                <div class="humidity">
                                    <i class="fa-solid fa-droplet"></i>
                                    <span class="humidity__num">${temperature.forecast.forecastday[3].day.avghumidity}</span>
                                </div>
                                <div class="precipitation zoom__margin">
                                    <i class="fa-solid fa-cloud-rain"></i>
                                    <span class="precipitation__num">${temperature.forecast.forecastday[3].day["daily_chance_of_rain"]}%</span>
                                </div>
                            </div>
                            <div class="forecast__list--zoom">
                                <div class="forecast__item--zoom two">UV : ${temperature.forecast.forecastday[3].day.uv}</div>
                                <div class="forecast__item--zoom two">CO : ${temperature.forecast.forecastday[3].day["air_quality"].co.toFixed(1)}</div>
                                <div class="forecast__item--zoom two">NO2 : ${temperature.forecast.forecastday[3].day["air_quality"].no2.toFixed(1)}</div> 
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : ${temperature.forecast.forecastday[3].day["air_quality"].o3.toFixed(1)}</div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunrise.png" class="forecast__rise-set">
                                    <div class="forecast-rise__time">0${temperature.forecast.forecastday[3].astro.sunrise.slice(1,5)}</div>
                                </div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunset.png"  class="forecast__rise-set">
                                    <div class="forecast-set__time">19:00</div>
                                </div>
                            </div>
                        </li>
                        <li class="forecast__day">
                            <div class="forecast__list--small">
                                <div class="forecast__date zoom__margin">${temperature.forecast.forecastday[4].date.slice(5, 10)}</div>
                                <div class="forecast__temp">
                                    <img src="${temperature.forecast.forecastday[4].day.condition.icon}" alt="" class="fa-sun">
                                    <div class="max-temp">
                                    ${temperature.forecast.forecastday[4].day["maxtemp_c"]}°C ${temperature.forecast.forecastday[4].day["mintemp_c"]}°C
                                    </div>
                                </div>
                                <div class="humidity">
                                    <i class="fa-solid fa-droplet"></i>
                                    <span class="humidity__num">${temperature.forecast.forecastday[4].day.avghumidity}</span>
                                </div>
                                <div class="precipitation zoom__margin">
                                    <i class="fa-solid fa-cloud-rain"></i>
                                    <span class="precipitation__num">${temperature.forecast.forecastday[4].day["daily_chance_of_rain"]}%</span>
                                </div>
                            </div>
                            <div class="forecast__list--zoom">
                                <div class="forecast__item--zoom two">UV : ${temperature.forecast.forecastday[4].day.uv}</div>
                                <div class="forecast__item--zoom two">CO : ${temperature.forecast.forecastday[4].day["air_quality"].co}</div>
                                <div class="forecast__item--zoom two">NO2 : ${temperature.forecast.forecastday[4].day["air_quality"].no2}</div>
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : ${temperature.forecast.forecastday[4].day["air_quality"].o3}</div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunrise.png" class="forecast__rise-set">
                                    <div class="forecast-rise__time">0${temperature.forecast.forecastday[4].astro.sunrise.slice(1,5)}</div>
                                </div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunset.png"  class="forecast__rise-set">
                                    <div class="forecast-set__time">19:00</div>
                                </div>
                            </div>
                        </li>
                        <li class="forecast__day">
                            <div class="forecast__list--small">
                                <div class="forecast__date zoom__margin">${temperature.forecast.forecastday[5].date.slice(5, 10)}</div>
                                <div class="forecast__temp">
                                    <img src="${temperature.forecast.forecastday[5].day.condition.icon}" alt="" class="fa-sun">
                                    <div class="max-temp">
                                    ${temperature.forecast.forecastday[5].day["maxtemp_c"]}°C ${temperature.forecast.forecastday[5].day["mintemp_c"]}°C
                                    </div>
                                </div>
                                <div class="humidity">
                                    <i class="fa-solid fa-droplet"></i>
                                    <span class="humidity__num">${temperature.forecast.forecastday[5].day.avghumidity}</span>
                                </div>
                                <div class="precipitation zoom__margin">
                                    <i class="fa-solid fa-cloud-rain"></i>
                                    <span class="precipitation__num">${temperature.forecast.forecastday[5].day["daily_chance_of_rain"]}%</span>
                                </div>
                            </div>
                            <div class="forecast__list--zoom">
                                <div class="forecast__item--zoom two">UV : ${temperature.forecast.forecastday[5].day.uv}</div>
                                <div class="forecast__item--zoom two">CO : no data</div>
                                <div class="forecast__item--zoom two">NO2 : no data</div>
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : no data</div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunrise.png" class="forecast__rise-set">
                                    <div class="forecast-rise__time">0${temperature.forecast.forecastday[5].astro.sunrise.slice(1,5)}</div>
                                </div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunset.png"  class="forecast__rise-set">
                                    <div class="forecast-set__time">19:00</div>
                                </div>
                            </div>
                        </li>
                        <li class="forecast__day one">
                            <div class="forecast__list--small">
                                <div class="forecast__date zoom__margin">${temperature.forecast.forecastday[6].date.slice(5, 10)}</div>
                                <div class="forecast__temp">
                                    <img src="${temperature.forecast.forecastday[6].day.condition.icon}" alt="" class="fa-sun">
                                    <div class="max-temp">
                                    ${temperature.forecast.forecastday[6].day["maxtemp_c"]}°C ${temperature.forecast.forecastday[6].day["mintemp_c"]}°C
                                    </div>
                                </div>
                                <div class="humidity">
                                    <i class="fa-solid fa-droplet"></i>
                                    <span class="humidity__num">${temperature.forecast.forecastday[6].day.avghumidity}</span>
                                </div>
                                <div class="precipitation zoom__margin">
                                    <i class="fa-solid fa-cloud-rain"></i>
                                    <span class="precipitation__num">${temperature.forecast.forecastday[6].day["daily_chance_of_rain"]}%</span>
                                </div>
                            </div>
                            <div class="forecast__list--zoom">
                                <div class="forecast__item--zoom two">UV : ${temperature.forecast.forecastday[6].day.uv}</div>
                                <div class="forecast__item--zoom two">CO : no data</div>
                                <div class="forecast__item--zoom two">NO2 : no data</div>
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : no data</div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunrise.png" class="forecast__rise-set">
                                    <div class="forecast-rise__time">0${temperature.forecast.forecastday[6].astro.sunrise.slice(1,5)}</div>
                                </div>
                                <div class="forecast__item--zoom rise__zoom">
                                    <img src="./assets/sunset.png"  class="forecast__rise-set">
                                    <div class="forecast-set__time">19:00</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="time__module module">
                    <div class="rise-set__time">
                        <span class="rise__set">Sunrise</span>
                        <span class="time">07:01</span>
                        <div class="rise-set__title">+7hr20m</div>
                    </div>
                    <div class="module__bg"></div>
                    <div class="module__more--time">
                        <div class="time__more">
                            <div class="time__more--item">
                                <span class="time__more--text">Sunrise</span>
                                <span class="time__more--text"> : 06:20</span>
                                </div>
                            <div class="time__more--item">
                                <span class="time__more--text">Sunset</span>
                                <span class="time__more--text">: 19:00</span>
                            </div>
                            <div class="time__more--item">
                                <span class="time__more--text">Moonrise</span>
                                <span class="time__more--text">: 17:00</span>
                            </div>              
                            <div class="time__more--item">
                                <span class="time__more--text">Moonset</span>
                                <span class="time__more--text">: 19:00</span>
                            </div>
                        </div>
                    </div>
                </div>`;
}

searchHTML();



function btnSlide(mode) {
    if (mode === "C") {
    slider.classList.remove("f-active");
    slider.classList.add("c-active");
    }
    else {
    slider.classList.remove("c-active");
    slider.classList.add("f-active");
    }
}

btnSlide();

function btnChange(value) {
    if (!currentWeather) return;
    
    const tempActual = document.querySelector(".temp__actual");
    const tempFeels = document.querySelector(".temp__more--item:nth-child(1)");
    const oneTemp = document.querySelector(".forecast__day:nth-child(1) .max-temp");
    const twoTemp = document.querySelector(".forecast__day:nth-child(2) .max-temp");
    const threeTemp = document.querySelector(".forecast__day:nth-child(3) .max-temp");
    const fourTemp = document.querySelector(".forecast__day:nth-child(4) .max-temp");
    const fiveTemp = document.querySelector(".forecast__day:nth-child(5) .max-temp");
    const sixTemp = document.querySelector(".forecast__day:nth-child(6) .max-temp");

    if (value === "C") {
        tempActual.innerText = `${currentWeather.current.temp_c}°C`;
        tempFeels.innerText = `Feels Like : ${currentWeather.current.feelslike_c}°C`;
        oneTemp.innerText = `${currentWeather.forecast.forecastday[1].day["maxtemp_c"]}°C ${currentWeather.forecast.forecastday[1].day["mintemp_c"]}°C`;
        twoTemp.innerText = `${currentWeather.forecast.forecastday[2].day["maxtemp_c"]}°C ${currentWeather.forecast.forecastday[2].day["mintemp_c"]}°C`;
        threeTemp.innerText = `${currentWeather.forecast.forecastday[3].day["maxtemp_c"]}°C ${currentWeather.forecast.forecastday[3].day["mintemp_c"]}°C`;
        fourTemp.innerText = `${currentWeather.forecast.forecastday[4].day["maxtemp_c"]}°C ${currentWeather.forecast.forecastday[4].day["mintemp_c"]}°C`;
        fiveTemp.innerText = `${currentWeather.forecast.forecastday[5].day["maxtemp_c"]}°C ${currentWeather.forecast.forecastday[5].day["mintemp_c"]}°C`;
        sixTemp.innerText = `${currentWeather.forecast.forecastday[6].day["maxtemp_c"]}°C ${currentWeather.forecast.forecastday[6].day["mintemp_c"]}°C`;
    }
    else if (value === "F") {
        tempActual.innerText = `${currentWeather.current.temp_f}°F`;
        tempFeels.innerText = `Feels Like : ${currentWeather.current.feelslike_f}°F`;
        oneTemp.innerText = `${currentWeather.forecast.forecastday[1].day["maxtemp_f"]}°F ${currentWeather.forecast.forecastday[1].day["mintemp_f"]}°F`;
        twoTemp.innerText = `${currentWeather.forecast.forecastday[2].day["maxtemp_f"]}°F ${currentWeather.forecast.forecastday[2].day["mintemp_f"]}°F`;
        threeTemp.innerText = `${currentWeather.forecast.forecastday[3].day["maxtemp_f"]}°F ${currentWeather.forecast.forecastday[3].day["mintemp_f"]}°F`;
        fourTemp.innerText = `${currentWeather.forecast.forecastday[4].day["maxtemp_f"]}°F ${currentWeather.forecast.forecastday[4].day["mintemp_f"]}°F`;
        fiveTemp.innerText = `${currentWeather.forecast.forecastday[5].day["maxtemp_f"]}°F ${currentWeather.forecast.forecastday[5].day["mintemp_f"]}°F`;
        sixTemp.innerText = `${currentWeather.forecast.forecastday[6].day["maxtemp_f"]}°F ${currentWeather.forecast.forecastday[6].day["mintemp_f"]}°F`;
    }
}

//temperature.forecast.forecastday[0].astro.sunrise



