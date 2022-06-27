function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES");

    if (cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}

function consultAPI(cityName) {
    let claveApi = "7bd8f5bfc0d8d0b934abf9a144da03cf"
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${claveApi}&units=metric&lang=es`)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("error")
        })
        .then(data => {
            showWeather(data);
        })
        .catch(error => {
            return "error"
        });
}

function showWeather(data) {
    let ciudad = data.name;
    let icono = data.weather[0].icon;
    let temperatura = data.main.temp;
    let sensacion_terminca = data.main.feels_like;
    let humedad = data.main.humidity;
    let viento = data.wind.speed;
    let presion = data.main.pressure;

    let card = `<div class="card">
                    <h3>${ciudad}</h3>
                    <img src="http://openweathermap.org/img/wn/${icono}.png" alt="Imagen">
                    <p>Temperatura: ${temperatura}°</p>
                    <p>Sensación Térmica: ${sensacion_terminca}°</p>
                    <p>Humedad: ${humedad}%</p>
                    <p>Velocidad del Viento: ${viento}km/h</p>
                    <p>Presión: ${presion} P</p>
                </div>`

    let section = document.getElementById("section-weather-result");
    if (section) {
        section.innerHTML = "";
        section.innerHTML += card;
    }
}