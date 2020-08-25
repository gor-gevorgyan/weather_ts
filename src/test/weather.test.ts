'use strict';

import {checkAPI} from "./weather";

test('weather api', async () => {
    expect( await checkAPI('london')).toBe('london');
});