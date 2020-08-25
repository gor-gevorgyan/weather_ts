'use strict';

import axios from 'axios';
import {DefaultObject} from '../interfaces/global';
const config = require("../../config.json");

const API_URL: string = 'https://api.openweathermap.org/data/2.5/weather';

class OpenWeatherApi {
    /*
    create end point URL
    */
    generateURL(params: DefaultObject): string {
        let url_params: string = "?";
        let keys: string[] = Object.keys(params);

        if (keys.length > 0) {
            for (let param_name of keys) {
                url_params += `${param_name}=${params[param_name]}&`;
            }
        } else {
            throw new Error("params can't be empty");
        }

        return `${API_URL}/${url_params}APPID=${config.weather_api_key}`;
    }

    static getIconURL(name: string, big:boolean = false): string {
        return `http://openweathermap.org/img/wn/${name}${big ? '@2x' : ''}.png`;
    }

    async get(params: DefaultObject) {
        return await axios.get(this.generateURL(params));
    }
}

export {
    OpenWeatherApi
};