import * as UI from "/js/UI.js";
import {API} from "/js/API.js"
import {Weather} from "/js/Weather.js"
import {Modal} from "/js/Modal.js"

$(document).ready(function() {
    let globalWeather = [];

    function loadEventListeners() {
        document.getElementById("weatherSearchForm").addEventListener("submit", fetchWeatherData)
        document.getElementById("weather-body").addEventListener("click", handleMoreBtn);
        document.getElementById("weather-header").addEventListener("click", handleMetricBtn);
    }

    loadEventListeners();

    function handleMetricBtn(e) {
        let fBtn = document.getElementById("F");
        let cBtn = document.getElementById("C");
        if(e.target.classList.contains("btn-metric")) {
            if(!e.target.classList.contains("disabled")) {
                fBtn.classList.toggle("disabled");
                cBtn.classList.toggle("disabled");            
                let selectedMetric = e.target.getAttribute("id");           
                Weather.setMetric(selectedMetric, true)
                document.getElementById("weather-body").textContent = ""
                Weather.changeTempMetric(globalWeather);  
            } 
        }
    }

    function handleMoreBtn(e) {
        if(e.target.classList.contains("more-btn")) {
            let id = parseInt(e.target.getAttribute("data-id"));
            let selectedWeather =  globalWeather.filter((weather) => {
                return weather.id === id;
            });
            let newWeatherObj = {...selectedWeather[0]}
            let dataAttribute = e.target.getAttribute("data-target").slice(1);
            document.querySelector(".modal").setAttribute("id", dataAttribute);
            Modal.setWeather(newWeatherObj);
            Modal.displayModal();
        }
    }
    
    function fetchWeatherData(e) {
        e.preventDefault();
        UI.resetUI();
        globalWeather = [];
        let input = UI.getInput("text");
        document.querySelector(`input[type="text"]`).value = "";
        if(!input) {
            displayWarningMsg("No Valid Input", "red");
        } else { 
            let url = prepareWeatherUrl(input);
            UI.removeFormLoadSpinner();
            getData(url)
                .then(displayWeatherComponent)
                .catch((e) =>{
                    console.log(e.message)
                    UI.removeSpinner();
                    displayWarningMsg("Something Went Wrong", "red")
                });
            }
    }

    function displayWarningMsg(message, colorCode) {
        let error = document.getElementById("error-msg");
        let searchBtn = document.querySelector("input[type='submit']")
        error.style.color = colorCode;
        error.textContent = message
        searchBtn.disabled = true;
        setTimeout(() => {
            error.textContent = ""
            searchBtn.disabled = false;
        }, 2000);
    }

    function prepareWeatherUrl(input) {
        let checkedSearchRadio = document.querySelector("input[name='weather-radio']:checked").value;
        let paramObj = {};
        paramObj[checkedSearchRadio] = input;
        return API.getAPIbasedOnInput(input, paramObj);
    }

    function prepareOneCallAPIurl(paramObj) {
        return API.getOneCallAPIurl(paramObj);
    }

    function gatherDataForOneCallAPI(data) {
        let param = {lon : data.coord.lon, lat: data.coord.lat, units: "imperial"}
        return param;
    }

    async function getData(url) {
        let resp = await fetch(url);
        let validatedResp = await checkResp(resp)
        let data = await validatedResp.json();
        let locationName = data.name;
        Weather.setCityName(locationName)
        let params = gatherDataForOneCallAPI(data);
        let oneCallUrl = prepareOneCallAPIurl(params);
        let oneCallResp = await fetch(oneCallUrl);
        let validatedOneCallResp = await checkResp(oneCallResp);
        let oneCallData = await validatedOneCallResp.json();
        return oneCallData;    
    }

    function displayWeatherComponent(oneCallData) {
        Weather.setMetric("F");
        Weather.displayWeatherHeader();
        UI.removeSpinner();
        let count = 0;
        let newArr = oneCallData.daily.slice(0, oneCallData.daily.length - 2).map((weather) => {
            count++;
            let weatherClassObj = createWeatherClassObj(weather, count);
            weatherClassObj.displayWeatherBodyContent();
            return weatherClassObj;
        });
        globalWeather = [...newArr]
    }

    function createWeatherClassObj(data, count) {
        let weatherObj = {
            id: count,
            location: Weather.cityName,
            mainTemp: data.temp.day,
            humidity: data.humidity,
            wind: data.wind_speed,
            weatherDescrip: data.weather[0].description,
            weatherImg : data.weather[0].icon,
            date: data.dt,
            lowTemp: data.temp.min,
            highTemp: data.temp.max,
            sunrise: data.sunrise,
            sunset: data.sunset
        }
        return new Weather(weatherObj);
    }

    function checkResp(resp) {
        if(resp.status === 200) {
            return resp;
        } else {
            throw new Error(`Http Error Status Code: ${resp.status}`)
        }
    }  
});