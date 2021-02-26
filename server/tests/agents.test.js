import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '..';

chai.use(chaiHttp);
const { expect } = chai;

describe('Agent endpoint', () => {
    it('should get agent data', (done) => {
        chai.request(app)
            .get('/api/v1/agents/356b03dc-9ec5-11e7-97a6-d501104f897e')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal('Success');
                expect(res.body.success).to.equal(true);
                expect(res.body.agent.logs).to.be.an('array');
                done();
            });
    });
});