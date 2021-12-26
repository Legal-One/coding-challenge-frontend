const { 
    getResolutionsMap,
    getPhoneLogsByAgent,
    getPhoneLogsByNumber
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
        return getPhoneLogsByAgent('356b03dc-9ec5-11e7-97a6-d501104f897e').then((phonelogs) => {
            const filteredLogs = phonelogs.filter(({ agentIdentifier }) => agentIdentifier === '356b03dc-9ec5-11e7-97a6-d501104f897e');
            const filteredResolutions = phonelogs.filter((item) => item.hasOwnProperty('resolution'));
            expect(phonelogs.length).toEqual(filteredLogs.length);
            expect(phonelogs.length).toEqual(filteredResolutions.length);
        });
    });

    test('getPhoneLogsByAgent with wrong path', () => {
        return getPhoneLogsByAgent('356b03dc-9ec5-11e7-97a6-d501104f897e', 'json-data/logs2.json').catch(({ message }) => {
            expect(message).toEqual(`ENOENT: no such file or directory, open 'json-data/logs2.json'`);
        });
    });

    test('getPhoneLogsByNumber', () => {
        return getPhoneLogsByNumber('+49151484522').then((phonelogs) => {
            const filteredLogs = phonelogs.filter(({ number }) => number === '+49151484522');
            expect(phonelogs.length).toEqual(filteredLogs.length);
        });
    });

    test('getPhoneLogsByNumber with wrong path', () => {
        return getPhoneLogsByNumber('+49151484522', new Map(), 'json-data/logs2.json').catch(({ message }) => {
            expect(message).toEqual(`ENOENT: no such file or directory, open 'json-data/logs2.json'`);
        });
    });
});