import request from 'supertest';

import app from '../index';

describe('Test index and 404 routes', () => {
    it('should return success for the index route', async done => {
        const result = await request(app).get('/');

        expect(result.status).toBe(200);
        expect(result.body.status).toBe('success');
        done();
    });

    it('should return an error for a route that does not exist', async done => {
        const result = await request(app).get('/bogus-route');

        expect(result.status).toBe(404);
        expect(result.body.status).toBe('error');
        expect(result.body.message).toBe('Route does not exist');
        done();
    });
});

describe('Get Calls endpoint GET /calls', () => {
    it('should return a formatted payload for all calls', async done => {
        const result = await request(app).get('/calls');

        expect(result.status).toBe(200);
        expect(result.body.status).toBe('success');
        expect(result.body.data).toBeInstanceOf(Object);

        const firstItem = result.body.data.calls[0];

        expect(firstItem).toHaveProperty('phoneNumber');
        expect(firstItem).toHaveProperty('numberOfCalls');
        expect(firstItem).toHaveProperty('lastCall');
        expect(firstItem.lastCall).toHaveProperty('agent');
        expect(firstItem.lastCall).toHaveProperty('duration');
        expect(firstItem.lastCall).toHaveProperty('dateTime');
        done();
    });
});

describe('Get Agent Calls GET /agent/{ID}', () => {
    it('should return a return a payload for agent calls ', async done => {
        const agentId = '356b03dc-9ec5-11e7-97a6-d501104f897e';
        const result = await request(app).get(`/agent/${agentId}`);

        expect(result.status).toBe(200);
        expect(result.body.status).toBe('success');
        expect(result.body.data).toBeInstanceOf(Object);
        expect(result.body.data).toHaveProperty('agent');
        expect(result.body.data).toHaveProperty('calls');
        expect(result.body.data.agent).toHaveProperty('firstName');
        expect(result.body.data.agent).toHaveProperty('lastName');
        expect(result.body.data.calls[0]).toHaveProperty('resolution');
        expect(result.body.data.calls[0]).toHaveProperty('duration');
        expect(result.body.data.calls[0]).toHaveProperty('dateTime');
        expect(result.body.data.agent.identifier).toMatch(agentId);
        done();
    });

    it('should return a 404 for a bogus agent id', async done => {
        const agentId = '356b03dc-9ec5-11es7-97a6-dss501104f897e';

        const result = await request(app).get(`/agent/${agentId}`);

        expect(result.status).toBe(404);
        expect(result.body.status).toBe('error');
        expect(result.body.message).toBe(`Agent with ID ${agentId} does not exist`);
        done();
    });
});

describe('Get Call Details GET /call/{number}', () => {
    it('should return a formatted structure for call details ', async done => {
        const phoneNumber = '+49151484522';
        const result = await request(app).get(`/call/${phoneNumber}`);

        expect(result.status).toBe(200);
        expect(result.body.status).toBe('success');
        expect(result.body.data).toBeInstanceOf(Array);

        const firstItem = result.body.data[0];

        expect(firstItem).toHaveProperty('agent');
        expect(firstItem).toHaveProperty('duration');
        expect(firstItem).toHaveProperty('dateTime');
        expect(firstItem).toHaveProperty('resolution');
        expect(firstItem.agent).toHaveProperty('firstName');
        expect(firstItem.agent).toHaveProperty('lastName');
        done();
    });

    it('should return a 404 for a bogus phone number', async done => {
        const phoneNumber = '+4rr9151484522';

        const result = await request(app).get(`/call/${phoneNumber}`);

        expect(result.status).toBe(404);
        expect(result.body.status).toBe('error');
        expect(result.body.message).toBe(`No call log exists for ${phoneNumber}`);
        done();
    });
});
