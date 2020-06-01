export class API {
    static api_weather_url = config.API_WEATHER_URL;
    static api_onecall_url = config.API_ONECALL_URL;
    static api_weather_img = config.API_WEATHER_IMG;
    static key = config.API_KEY;

    static getAPIbasedOnInput(input, obj) {
        let parameter = "";
        let url = this.api_weather_url;
        if(obj) {
            for (let prop in obj) {
                parameter += prop + "=" + obj[prop] + "&";
            }
            url += parameter  + "appid=" + this.key;
        } 
        return url;
    }

    static getOneCallAPIurl(paramObj) {
        let parameter = "";
        let url = this.api_onecall_url;
        for(let prop in paramObj) {
            parameter += prop + "=" + paramObj[prop] + "&";
        }
        url += parameter + "exclude=hourly,minutely,current&" + `appid=${this.key}`
        return url;
    }
    
    static getWeatherImg(code) {
        return this.api_weather_img + code + "@2x.png"
    } 
}