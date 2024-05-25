const apiKey = "9bd7892ffffe4b4139eb62af9912cd47";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const form = document.querySelector(".search")
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
// async function checkWeather(city) {
//     const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
//     const data = await response.json();

//     console.log(data);

//     document.querySelector(".city").innerHTML = data.name;
//     document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
//     document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//     document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
// }
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        console.log(data);

        if (data.cod && data.cod !== "404") {
            // Check if the response code indicates success
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "./images/clouds.png"
            }
            else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "./images/sun.png"
            }
            else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "./images/rain.png"
            }
            else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "./images/drizzle.png"
            }
            else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "./images/mist1.png"
            }

            document.querySelector(".weather").style.display ="flex"
        }
        else {
            console.log("Error");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});