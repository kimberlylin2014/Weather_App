export function getInput(inputType) {
    let input = document.querySelector(`input[type="${inputType}"]`).value
    if(input.length === 0) {
        return null;
    } else {
        return input;
    }
}

export function resetUI() {
    document.getElementById("weather-header").textContent = "";
    document.getElementById("weather-body").textContent = "";
}

export function removeFormLoadSpinner() {
    // document.querySelector("#weatherSearchForm").style.display ="none";
    document.querySelector(".spinner-border").style.display = "block";
}

export function removeSpinner() {
    document.querySelector(".spinner-border").style.display = "none";
}