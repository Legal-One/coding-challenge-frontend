import { fetchAgentHistory, fetchAllCallHistory, fetchCallHistory } from '../../src/services';

describe('All Services', () => {
    const response = {
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

    describe('Fetch All Call History GET /calls', () => {
        it('returns an array of all calls', async done => {
            window.fetch = jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve({ ...response }) }));

            const allCallHistory = await fetchAllCallHistory();

            expect(allCallHistory).toEqual(response);
            done();
        });
    });

    describe('Fetch Agent History GET /agent/:ID', () => {
        const agentId = '356b03dc-9ec5-11e7-97a6-d501104f897e';
        const response = {
            agent: {
                identifier: agentId,
                firstName: 'Abraham',
                lastName: 'Ellis',
                email: 'Abraham.Ellis@callcenter.xyz',
                photo: 'https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson',
            },
            calls: [
                {
                    identifier: 'f53b3e0e-6a21-11eb-9439-0242ac130002',
                    agentIdentifier: agentId,
                    number: '+49151484522',
                    dateTime: '2020-10-05T14:48:00.000Z',
                    duration: 230,
                    resolution: 'need reschedule',
                },
            ],
        };

        it('returns an array of all calls', async done => {
            window.fetch = jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve({ ...response }) }));

            const agentCallHistory = await fetchAgentHistory(agentId);

            expect(agentCallHistory).toEqual(response);
            expect(response.agent.identifier).toEqual(agentId);
            done();
        });
    });

    describe('Fetch Call History GET /call/:number', () => {
        const phoneNumber = '+49151484522';

        const response = {
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

        it('returns an array of call history for the specified number', async done => {
            window.fetch = jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve({ ...response }) }));

            const agentCallHistory = await fetchCallHistory(phoneNumber);

            expect(agentCallHistory).toEqual(response);
            done();
        });
    });
});
