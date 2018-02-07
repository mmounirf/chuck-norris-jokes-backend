'use strict';
/**
 * Require our modules
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../index');

chai.use(chaiHttp);

describe('Healthcheck', () => {
    /**
     * Test the /GET healtcheck route
     */
    describe('/GET healthcheck', () => {
        it('it should GET the status and a timestamp', (done) => {
            chai.request( server )
                .get('/healthcheck')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.status.should.equal('OK');
                    res.body.timestamp.should.be.a('number');
                    done();
                });
        });
    });
});