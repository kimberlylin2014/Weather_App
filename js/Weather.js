import {API} from "./API.js"
import * as helper from "./helper.js"

export class Weather {
    static cityName = null;
    static metric = {"C" : null, "F" : null}

    constructor( id, location, mainTemp, humidity, wind, weatherDescrip,          weatherImg, date, highTemp, lowTemp, sunrise, sunset) {
        this.id = id;
        // this.units = units;
        this.location = helper.capitalizeFirstLetter(location);
        this.mainTemp = parseInt(mainTemp);
        this.humidity = humidity;
        this.wind = wind;
        this.weatherDescrip = helper.capitalizeFirstLetter(weatherDescrip);
        this.weatherImg = weatherImg;
        this.date = new Date(date * 1000);
        this.highTemp= parseInt(highTemp);
        this.lowTemp = parseInt(lowTemp);
        this.sunrise = new Date(sunrise * 1000);
        this.sunset = new Date (sunset * 1000);
    }

    static setCityName(name) {
        this.cityName = name;
    }

    static setMetric(m, boolean) {
        if(m === "C") {
            this.metric.C = true;
            this.metric.F = false;
        } else if (m === "F") {
            this.metric.C = false;
            this.metric.F = true;
        }
    }

    static changeTempMetric(globalWeather) {
        let convertFunction;
        globalWeather.forEach((weather) => {
            if(this.metric.C === true) {
                convertFunction = helper.convertFtoC;
            } else if (this.metric.F === true) {
                convertFunction = helper.convertCtoF;
            }
            weather.mainTemp = parseInt(convertFunction(weather.mainTemp));
            weather.lowTemp = parseInt(convertFunction(weather.lowTemp));
            weather.highTemp = parseInt(convertFunction(weather.highTemp));
            weather.displayWeatherBodyContent();
        });
    }

    static determineSpeedMetric(wind) {
        if(this.metric.F === true) {
            return `${wind} mph`;
        } else if (this.metric.C === true) {
            return `${wind} mps`;
        }
    }

    static determineTempMetric() {
        if(this.metric.F === true) {
            return "F";
        } else if (this.metric.C === true) {
            return "C";
        }
    }
    
    static displayWeatherHeader() {
        let header = document.getElementById("weather-header");
        let cityName = helper.capitalizeFirstLetter(this.cityName);
        header.innerHTML = `
        <div>
            <h2>${cityName}</h2>
            <div class="d-flex justify-content-center">
            <button class="btn btn-sm btn-dark btn-metric disabled" id="F">F &#176;</button>
            <button class="btn btn-sm btn-dark ml-2 btn-metric" id="C">C &#176;</button>
        </div>
        `
    }
    
    displayWeatherBodyContent() {
        let body = document.getElementById("weather-body");
        let bodyContent = `
            <div class="p-2 weatherComponent flex-column align-items-center m-1 text-center">
                <h4 class="m-0">${helper.getStringWeekday(this.date)}</h4>
                <img src="${API.getWeatherImg(this.weatherImg)}" width="90px" alt="img">
                <h3 class="m-0" style="color: black;">${this.mainTemp}&#176;</h3>    
                <button class="btn btn-sm btn-light more-btn mt-3" data-id=${this.id} data-toggle="modal" data-target="#modal-${this.id}">More</button>
            </div>
          `         
        body.innerHTML += bodyContent;
    }
}