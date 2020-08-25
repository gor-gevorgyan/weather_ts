'use strict';

import {OpenWeatherApi} from '../classes/open-weather-api';

export const checkAPI = async (country_name:string) => {
    try {
        let weatherAPI = new OpenWeatherApi();
        let data = await weatherAPI.get({q: country_name});

        return data.data.name.toLowerCase();
    } catch (e) {
        return false;
    }
}