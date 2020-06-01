import {Weather} from "./Weather.js"
import {API} from "./API.js"
import * as helper from "./helper.js"

export class Modal {
    static weather = null;
    static setWeather(weather) {
        this.weather = weather;
    }
    static displayModal() {
        let modalContent = document.querySelector(".modal-content");
        let content= `
            <div class="modal-header ">
                    <h3 class="modal-title text-center col-12"> ${helper.getFullDate(this.weather.date)}
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    </h3>
                  </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-around align-items-center">
                        <div class="text-center">
                             <h4 class="text-center"></h4>
                            <img id="modal-img" src="${API.getWeatherImg(this.weather.weatherImg)}" alt="">
                            <div class="d-flex">
                               <div class="mr-4">
                               <p class="text-center" id="modal-low">Low</p>
                               ${this.weather.lowTemp}&#176; ${Weather.determineTempMetric()}
                               </div>
                               <div>
                               <p class="text-center" id="modal-high">High</p>
                               ${this.weather.highTemp}&#176; ${Weather.determineTempMetric()}
                               </div>
                            </div>
                        </div>
                        <div>
                            <p class="modal-detail"><span>${this.weather.location} </span></p>
                            <p class="modal-detail"><span id="modal-descrip">${helper.capitalizeFirstLetter(this.weather.weatherDescrip)}</span></p>
                            <p class="modal-detail-2"><span >Humidity</span>:  ${this.weather.humidity}%</p>
                            <p class="modal-detail-2"><span >Wind</span>: ${Weather.determineSpeedMetric(this.weather.wind)} </p>
                        </div>
                    </div>
                </div>    
            </div>
        `;
        modalContent.innerHTML = content;
    }

}