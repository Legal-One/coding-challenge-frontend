const { 
    updateOrCreatePhoneLog,
    getPhoneLogsMap,
    getPhoneNumberFromLogs
} = require('../phone-logs');
const { getAgentsMap } = require('../../utils/agent');
const mockPhoneLogs = require('./phone-logs-mock.json');

const newPhoneLogDummyData = {
    number: '+49151484522',
    logs: [
      {
        identifier: '0b96031e-6a22-11eb-9439-0242ac130002',
        agentIdentifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
        number: '+49151484522',
        dateTime: '2020-10-06T13:50:00.000Z',
        duration: 93,
        agent: {
          identifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
          firstName: 'Abraham',
          lastName: 'Ellis',
          email: 'Abraham.Ellis@callcenter.xyz',
          photo: 'https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson'
        }
      },
    ]
};

describe('PhoneLogs', () => {
    test('updateOrCreatePhoneLog', () => {
        let phoneLogsMap = new Map();
        let agentsMap = new Map();
        agentsMap.set('356b03dc-9ec5-11e7-97a6-d501104f897e', {
            identifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
            firstName: 'Abraham',
            lastName: 'Ellis',
            email: 'Abraham.Ellis@callcenter.xyz',
            photo: 'https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson'
        });
        const newPhoneLog = updateOrCreatePhoneLog(agentsMap, phoneLogsMap, {
            identifier: '0b96031e-6a22-11eb-9439-0242ac130002',
            agentIdentifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
            number: '+49151484522',
            dateTime: '2020-10-06T13:50:00.000Z',
            duration: 93,
        });
        expect(newPhoneLog).toStrictEqual(newPhoneLogDummyData);
    });

    test('getPhoneLogsMap', () => {
        return getAgentsMap().then((agentsMap) => {
            return getPhoneLogsMap(agentsMap).then((phoneLogsMap) => {
                expect(phoneLogsMap.has('+49151484522')).toEqual(true);
            });
        });
    });

    test('getPhoneNumberFromLogs', () => {
        return getPhoneNumberFromLogs().then((phoneLogs) => {
            expect({ phoneLogs }).toEqual(mockPhoneLogs);
        });
    });
});