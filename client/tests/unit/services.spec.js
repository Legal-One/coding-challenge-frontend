import { fetchAgentHistory, fetchAllCallHistory, fetchCallHistory } from '../../src/services';
import {
    allCallHistory as allCallHistoryResponse,
    agentCallHistory as agentCallHistoryResponse,
    phoneNumberLogs,
} from '../mocks/';

describe('All Services', () => {
    describe('Fetch All Call History GET /calls', () => {
        it('returns an array of all calls', async done => {
            window.fetch = jest
                .fn()
                .mockImplementationOnce(() =>
                    Promise.resolve({ json: () => Promise.resolve({ ...allCallHistoryResponse }) }),
                );

            const allCallHistory = await fetchAllCallHistory();

            expect(allCallHistory).toEqual(allCallHistoryResponse);
            done();
        });
    });

    describe('Fetch Agent History GET /agent/:ID', () => {
        const agentId = '356b03dc-9ec5-11e7-97a6-d501104f897e';

        it('returns an array of all calls', async done => {
            window.fetch = jest
                .fn()
                .mockImplementationOnce(() =>
                    Promise.resolve({ json: () => Promise.resolve({ ...agentCallHistoryResponse }) }),
                );

            const agentCallHistory = await fetchAgentHistory(agentId);

            expect(agentCallHistory).toEqual(agentCallHistory);
            expect(agentCallHistoryResponse.agent.identifier).toEqual(agentId);
            done();
        });
    });

    describe('Fetch Call History GET /call/:number', () => {
        const phoneNumber = '+49151484522';

        it('returns an array of call history for the specified number', async done => {
            window.fetch = jest
                .fn()
                .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve({ ...phoneNumberLogs }) }));

            const agentCallHistory = await fetchCallHistory(phoneNumber);

            expect(agentCallHistory).toEqual(phoneNumberLogs);
            done();
        });
    });
});
