export const allCallHistory = {
    calls: [
        {
            phoneNumber: '+49151484522',
            numberOfCalls: 13,
            lastCall: {
                agent: {
                    identifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
                    firstName: 'Abraham',
                    lastName: 'Ellis',
                    email: 'Abraham.Ellis@callcenter.xyz',
                    photo: 'https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson',
                },
                duration: 146,
                dateTime: '2020-10-07T14:50:00.000Z',
            },
        },
    ],
    totalAgents: 4,
    totalCalls: 28,
};

export const agentCallHistory = {
    agent: {
        identifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
        firstName: 'Abraham',
        lastName: 'Ellis',
        email: 'Abraham.Ellis@callcenter.xyz',
        photo: 'https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson',
    },
    calls: [
        {
            identifier: 'f53b3e0e-6a21-11eb-9439-0242ac130002',
            agentIdentifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
            number: '+49151484522',
            dateTime: '2020-10-05T14:48:00.000Z',
            duration: 230,
            resolution: 'need reschedule',
        },
    ],
};

export const phoneNumberLogs = {
    dateTime: '2020-10-05T14:48:00.000Z',
    duration: 230,
    resolution: 'need reschedule',
    agent: {
        identifier: '356b03dc-9ec5-11e7-97a6-d501104f897e',
        firstName: 'Abraham',
        lastName: 'Ellis',
        email: 'Abraham.Ellis@callcenter.xyz',
        photo: 'https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson',
    },
};
