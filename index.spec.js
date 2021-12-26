const request = require('supertest');
const { app } = require('./index.js');


describe('', () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/").send({})
        expect(response.statusCode).toBe(200)
    })

    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/logs").send({})
        expect(response.statusCode).toBe(200)
    });

    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/logs/+49151484").send({})
        const { phoneLogs = [] } = response.body;
        expect(response.statusCode).toBe(200);
        expect(phoneLogs.length).toBe(0);
    });

    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/logs/+49151484522").send({})
        expect(response.statusCode).toBe(200)
    });

    test("should respond with a 404 status code", async () => {
        const response = await request(app).get("/agent").send({})
        expect(response.statusCode).toBe(404)
    });

    test("should respond with a 404 status code", async () => {
        const response = await request(app).get("/agent/356b03dc-9ec5-11e7-97a6-d501104f897e232").send({})
        expect(response.statusCode).toBe(404)
    })

    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/agent/356b03dc-9ec5-11e7-97a6-d501104f897e").send({})
        expect(response.statusCode).toBe(200)
    })
});