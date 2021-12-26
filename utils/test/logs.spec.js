const { 
    getResolutionsMap,
    getPhoneLogsByAgent
} = require('../logs'); 

describe('Logs', () => {
    test('getResolutionsMap', () => {
        return getResolutionsMap().then((resolutions) => {
            expect(resolutions.size).toEqual(28);
        });
    });

    test('getResolutionsMap with wrong path', () => {
        return getResolutionsMap('json-data/resolution2.json').then((resolutions) => {
            expect(resolutions.size).toEqual(0);
        });
    });

    test('getPhoneLogsByAgent', () => {
        return getPhoneLogsByAgent().then((phonelogs) => {

        });
    });
});