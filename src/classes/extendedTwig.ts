'use strict';

import twig from 'twig';
import {OpenWeatherApi} from './open-weather-api';
import moment from 'moment';

twig.extendFunction('weather_icon', (name: string): string => {
    return OpenWeatherApi.getIconURL(name);
});

twig.extendFunction('date_format', (date: number, format: string): string => {
    return moment.unix(date).format(format);
});

export default twig;