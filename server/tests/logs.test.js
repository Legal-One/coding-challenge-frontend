import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '..';

chai.use(chaiHttp);
const { expect } = chai;

describe('All logs', () => {
    it('should get aggregate data', (done) => {
        chai.request(app)
            .get('/api/v1/logs')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal('Success');
                expect(res.body.success).to.equal(true);
                expect(res.body.logs).to.be.an('array');
                done();
            });
    });
    it('should get number data', (done) => {
        chai.request(app)
            .get('/api/v1/logs/+49151484522')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal('Success');
                expect(res.body.success).to.equal(true);
                expect(res.body.logs).to.be.an('array');
                done();
            });
    });
});