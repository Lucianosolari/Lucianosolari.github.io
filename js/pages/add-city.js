const botonAgregar = document.getElementById("agregar")
botonAgregar.addEventListener("click", addCityToLocalStorage)


async function validateCity(newCity) {
    let cities = getCitiesFromLocalStorage();

    for (let i = 0; i < cities.length; i++) {
        if (newCity == cities[i]) {
            return "warning";
        };
    };

    if (consultAPI(newCity) == "error") {
        return "error";
    } else {
        return "success";
    };
}

function removeMessage() {
    setTimeout(function() {
        document.getElementsByClassName("mensaje_unificado")[0].remove();
    }, 3000);
}

async function addCityToLocalStorage() {
    let cities = getCitiesFromLocalStorage();
    let newCity = document.getElementById("ciudad_agregada").value;
    newCity = newCity.toUpperCase()

    switch (await validateCity(newCity)) {
        case "success":
            cities.push(newCity);
            localStorage.setItem("CITIES", JSON.stringify(cities));
            document.getElementById("añadir_ciudad").innerHTML += exitoMessage;
            removeMessage();
            break;
        case "warning":
            document.getElementById("añadir_ciudad").innerHTML += existeMessage;
            removeMessage();
            break;
        case "error":
            document.getElementById("añadir_ciudad").innerHTML += errorMessage;
            removeMessage();
            break;
    };
};

let exitoMessage = '<p class="success mensaje_unificado" >Ciudad agregada con éxito</p>';
let errorMessage = '<p class="error mensaje_unificado" >Error: La ciudad ingresada no se encuenta en la API o se produjo un error al consultar</p>';
let existeMessage = '<p class="warning mensaje_unificado">La ciudad ingresada ya se encuentra almacenada</p>';