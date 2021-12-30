let server = require('../index')
let chai = require('chai')
let chaiHttp = require('chai-http')

chai.should()
chai.use(chaiHttp)

describe('Test API', () => {
	describe('Test Call-Logs API', () => {

		// Test the GET CALL LOGS API
		it('It should return all the call-logs', (done) => {
			chai.request(server)
				.get('/call-logs')
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('Array');
					response.body.length.should.not.be.eq(0)
					done()
				})
		})

		it('It should not return all the call-logs', (done) => {
			chai.request(server)
				// wronng API URL
				.get('/call-logs-test')
				.end((err, response) => {
					response.should.have.status(404);
					done()
				})
		})
	})

	describe('Test Agent-Logs API', () => {
		it('It should return all the call-logs of agent Abraham Ellis', (done) => {
			const agentId = '356b03dc-9ec5-11e7-97a6-d501104f897e'
			chai.request(server)
				.get(`/agent-logs/${agentId}`)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('Array');
					response.body.length.should.not.be.eq(0)
					done()
				})
		})
	})

	describe('Test Phone-Number-Logs API', () => {
		it('It should return all the call-logs of number +49151484522', (done) => {
			const phoneNo = '+49151484522'
			chai.request(server)
				.get(`/phone-no-logs/${phoneNo}`)
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('Array');
					response.body.length.should.not.be.eq(0)
					const data = response.body[0]
					data.should.have.property('resolution')
					data.should.have.property('callTime')
					data.should.have.property('agentName')
					done()
				})
		})
	})
})