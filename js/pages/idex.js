let selector = document.getElementById("ciudad");

function addCitiesToSelector() {
    let cities = getCitiesFromLocalStorage();

    selector.innerHTML += `<option value="" disabled selected>Seleccionar Ciudad</option>`
    for (let i = 0; i < cities.length; i++) {
        selector.innerHTML += `<option value="${cities[i]}">${cities[i]}</option>`
    }

}

function createCard() {
    consultAPI(selector.value);
}

let consultButton = document.getElementById("consultar");
consultButton.addEventListener("click", createCard)

addCitiesToSelector();