'use strict';
/**
 * Require our modules
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../index');
chai.use(chaiHttp);

// Define our variables
let jwtToken;

describe('Login', () => {
    /**
     * Test the /POST login with no credentials
     */
    describe('/POST login', () => {
        it('it should give an error because not Authorization Token was given', (done) => {
            chai.request(server)
                .post('/login')
                .end((err, res) => {
                    res.should.have.status(403);
                    res.should.be.json;
                    done();
                });
        });
    });

    /**
     * Test the /GET cache/clear route with a right JWT-Token
     */
    describe('/GET cache/clear', () => {
        it('it should give an a success since the right Bearer Token was given', (done) => {
            // Do a Login
            chai.request(server)
                .post('/login')
                .send({ username: 'admin', password: 'admin' })
                .then((res) => {
                    // Set the Token
                    jwtToken = 'Bearer ' + res.body.token;
                    // Do a request with the token
                    chai.request(server)
                        .get('/cache/clear')
                        .set('Content-Type', 'application/json')
                        .set('Authorization', jwtToken)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.should.be.json;
                            done();
                        });
                });
        });
    });
});