//http://api.weatherapi.com/v1/forecast.json?key=af0baaec05d9499b85f41128250111&q=London&days=7&aqi=yes&alerts=yes

const accessKey = "538fe67faa9a3be2f8642bc851754629";
let city = " ";
const searchFront = document.querySelector(".search__results");
const slider = document.querySelector(".search__temp--change");
let tempMode = "C"
const emptyState = document.getElementById("emptyState");
const errorState = document.getElementById("errorState");


async function getForecast() {
  const url2 = `http://api.weatherapi.com/v1/forecast.json?key=af0baaec05d9499b85f41128250111&q=${city}&days=7&aqi=yes&alerts=yes`;
  const info = await fetch(url2);
  const infoForecast = await info.json();

  if (infoForecast.error) {
    const cityTitle = document.querySelector(".search__info")
    searchFront.innerHTML = " "
    cityTitle.innerHTML = `Search Results: "Not Found"`;
    emptyState.classList.add("hidden");
    errorState.classList.remove("hidden");
  }

  currentWeather = infoForecast;
  console.log(infoForecast);
  searchFront.innerHTML = searchHTML(infoForecast);
  emptyState.classList.add("hidden");
  errorState.classList.add("hidden");
  riseSet(infoForecast.forecast.forecastday[0].astro, infoForecast.location.localtime);
  const cityTitle = document.querySelector(".search__info")
  cityTitle.innerText = `Search Results: "${infoForecast.location.name}, ${infoForecast.location.country}"`;
  btnChange(tempMode);
}

function chngCity(event) {
    event.preventDefault();

    const input = document.querySelector("#cityInput")
    const newCity = input.value.trim();
    if (!newCity) return;
    city = newCity;
    getForecast();
}



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
                        <h1 class="alert__text">${alertMod(currentWeather.alerts.alert[0])}</h1>
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
                                <div class="forecast__item--zoom two">CO : ${qualityData(currentWeather.forecast.forecastday[1].day["air_quality"].co)}</div>
                                <div class="forecast__item--zoom two">NO2 : ${qualityData(currentWeather.forecast.forecastday[1].day["air_quality"].no2)}</div>
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : ${qualityData(currentWeather.forecast.forecastday[1].day["air_quality"].o3)}</div>
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
                                <div class="forecast__item--zoom two">CO : ${qualityData(currentWeather.forecast.forecastday[2].day["air_quality"].co)}</div>
                                <div class="forecast__item--zoom two">NO2 : ${qualityData(currentWeather.forecast.forecastday[2].day["air_quality"].no2)}</div>
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : ${qualityData(currentWeather.forecast.forecastday[2].day["air_quality"].o3)}</div>
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
                                <div class="forecast__item--zoom two">CO : ${qualityData(currentWeather.forecast.forecastday[3].day["air_quality"].co)}</div>
                                <div class="forecast__item--zoom two">NO2 : ${qualityData(currentWeather.forecast.forecastday[3].day["air_quality"].no2)}</div> 
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : ${qualityData(currentWeather.forecast.forecastday[3].day["air_quality"].o3)}</div>
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
                                <div class="forecast__item--zoom two">CO : ${qualityData(currentWeather.forecast.forecastday[4].day["air_quality"].co)}</div>
                                <div class="forecast__item--zoom two">NO2 : ${qualityData(currentWeather.forecast.forecastday[4].day["air_quality"].no2)}</div>
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : ${qualityData(currentWeather.forecast.forecastday[4].day["air_quality"].o3)}</div>
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
                                <div class="forecast__item--zoom two">CO : ${qualityData(currentWeather.forecast.forecastday[5].day["air_quality"].co)}</div>
                                <div class="forecast__item--zoom two">NO2 : ${qualityData(temperature.forecast.forecastday[5].day["air_quality"].no2)}</div>
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : ${qualityData(currentWeather.forecast.forecastday[5].day["air_quality"].o3)}</div>
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
                                <div class="forecast__item--zoom two">CO : ${qualityData(currentWeather.forecast.forecastday[6].day["air_quality"].co)}</div>
                                <div class="forecast__item--zoom two">NO2 : ${qualityData(currentWeather.forecast.forecastday[6].day["air_quality"].no2)}</div>
                                <div class="forecast__item--zoom two zoom__margin--more">O3 : ${qualityData(currentWeather.forecast.forecastday[6].day["air_quality"].o3)}</div>
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
                        <span class="rise__set"></span>
                        <span class="time"></span>
                        <div class="rise-set__title"></div>
                    </div>
                    <div class="module__bg"></div>
                    <div class="module__more--time">
                        <div class="time__more">
                            <div class="time__more--item">
                                <span class="time__more--text">Sunrise</span>
                                <span class="time__more--text"> : ${temperature.forecast.forecastday[0].astro.sunrise}</span>
                                </div>
                            <div class="time__more--item">
                                <span class="time__more--text">Sunset</span>
                                <span class="time__more--text">: ${temperature.forecast.forecastday[0].astro.sunset}</span>
                            </div>
                            <div class="time__more--item">
                                <span class="time__more--text">Moonrise</span>
                                <span class="time__more--text">: ${temperature.forecast.forecastday[0].astro.moonrise}</span>
                            </div>              
                            <div class="time__more--item">
                                <span class="time__more--text">Moonset</span>
                                <span class="time__more--text">: ${temperature.forecast.forecastday[0].astro.moonset}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
}

searchHTML();

function qualityData(data) {
    if (!data) {
        return "---"
    }
    return `${data.toFixed(1)}`
}

function setMode(mode) {
    tempMode = mode;
    btnSlide(mode);
    btnChange(mode);
}

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
    
        if (value === "C") {
            tempActual.innerText = `${currentWeather.current.temp_c}°C`;
            tempFeels.innerText = `Feels Like : ${currentWeather.current.feelslike_c}°C`;
            for (let i = 1; i <= 6; ++i) {
                const maxTemp = document.querySelector(`.forecast__day:nth-child(${i}) .max-temp`);
                const day = currentWeather.forecast.forecastday[i].day;
                maxTemp.innerText = `${day["maxtemp_c"]}°C ${day["mintemp_c"]}°C`;
            }
        }
        else if (value === "F") {
            tempActual.innerText = `${currentWeather.current.temp_f}°F`;
            tempFeels.innerText = `Feels Like : ${currentWeather.current.feelslike_f}°F`;
            for (let i = 1; i <= 6; ++i) {
                const maxTemp = document.querySelector(`.forecast__day:nth-child(${i}) .max-temp`);
                const day = currentWeather.forecast.forecastday[i].day;
                maxTemp.innerText = `${day["maxtemp_f"]}°F ${day["mintemp_f"]}°F`;
            }
        }
}

function alertMod(alertChk) {
    if (!alertChk) {
        return `No Current Alerts`
    }
    else {
        return `${currentWeather.alerts.alert[0].desc}`
    }
}

function timeToMinutes(t) {
    let [time, modifier] = t.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return hours * 60 + minutes; 
}

function localTimeMin(localTime) {
    const time = localTime.split(" ")[1];
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

function riseSet(astro, localTime) {
    const currentMinutes = localTimeMin(localTime);

    const sunriseMinutes = timeToMinutes(`${astro.sunrise}`);
    const sunsetMinutes = timeToMinutes(`${astro.sunset}`);
    
    let nextEvent = "";
    let nextTitle = "";
    let nextMinutes = 0;

    if (sunriseMinutes > currentMinutes && sunsetMinutes > currentMinutes) {
        nextEvent = sunriseMinutes < sunsetMinutes ? "sunrise" : "sunset";
        nextTitle = sunriseMinutes < sunsetMinutes ? "Sunrise" : "Sunset";
    }
    else if (sunriseMinutes > currentMinutes) {
        nextEvent = "sunrise";
        nextTitle = "Sunrise";
    }
    else if (sunsetMinutes > currentMinutes) {
        nextEvent = "sunset";
        nextTitle = "Sunset";
    }
    else {
        nextEvent = "sunriseTomorrow";
        nextTitle = "Sunrise";
    }

    const nextEventTime = nextEvent === "sunriseTomorrow" ? `${astro.sunrise}` : `${astro[nextEvent]}`;
    nextMinutes = nextEvent === "sunriseTomorrow" ? sunriseMinutes + 1440 : timeToMinutes(nextEventTime);

    let diff = nextMinutes - currentMinutes;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    const timeUntil = `+${hours}hr${minutes}m`

    const timeTitle = document.querySelector(".rise__set");
    const timeActual = document.querySelector(".time");
    const timeLeft = document.querySelector(".rise-set__title");
    timeTitle.innerText = `${nextTitle}`;
    timeActual.innerText = `${nextEventTime}`
    timeLeft.innerText = `${timeUntil}`

    console.log("file loaded");
    console.log(nextEventTime);
    console.log(timeUntil);
}

riseSet();





