'use strict';

import {checkAPI} from "./weather";

const axios = require('axios');

jest.mock('axios');

test('weather api', async () => {
    axios.get.mockResolvedValue({
        data: {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":20.02,"feels_like":13.04,"temp_min":18.89,"temp_max":21,"pressure":997,"humidity":64},"visibility":10000,"wind":{"speed":11.3,"deg":240,"gust":17},"clouds":{"all":75},"dt":1598363646,"sys":{"type":1,"id":1414,"country":"GB","sunrise":1598331761,"sunset":1598382167},"timezone":3600,"id":2643743,"name":"London","cod":200}
    });

    let name = await checkAPI('london');

    expect(name).toEqual('London')
});