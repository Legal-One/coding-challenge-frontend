const { 
    updateOrCreatePhoneLog,
    getPhoneLogsMap,
    getPhoneNumberFromLogs
} = require('../phone-logs');
const mockPhoneLogs = require('./phone-logs-mock.json');

const newPhoneLogDummyData = {
    number: "+49151484522",
    logs: [
        {
            "identifier": "f53b3e0e-6a21-11eb-9439-0242ac130002",
            "agentIdentifier": "356b03dc-9ec5-11e7-97a6-d501104f897e",
            "number": "+49151484522",
            "dateTime": "2020-10-05T14:48:00.000Z",
            "duration": 230
        }
    ]
};

describe('PhoneLogs', () => {
    test('updateOrCreatePhoneLog', () => {
        let phoneLogsMap = new Map();
        const newPhoneLog = updateOrCreatePhoneLog(phoneLogsMap, {
            "identifier": "f53b3e0e-6a21-11eb-9439-0242ac130002",
            "agentIdentifier": "356b03dc-9ec5-11e7-97a6-d501104f897e",
            "number": "+49151484522",
            "dateTime": "2020-10-05T14:48:00.000Z",
            "duration": 230
        });
        expect(newPhoneLog).toStrictEqual(newPhoneLogDummyData);
    });

    test('getPhoneLogsMap', () => {
        return getPhoneLogsMap().then((phoneLogsMap) => {
            expect(phoneLogsMap.has('+49151484522')).toEqual(true);
        });
    });

    test('getPhoneNumberFromLogs', () => {
        return getPhoneNumberFromLogs().then((phoneLogs) => {
            expect({ phoneLogs }).toEqual(mockPhoneLogs);
        });
    });
});