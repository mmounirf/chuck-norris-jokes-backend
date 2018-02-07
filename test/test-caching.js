'use strict';
/**
 * Require our modules
 */
const config = require('../config/config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../index');
chai.use(chaiHttp);

// Define our variables
let jwtToken;

describe('Caching', () => {
    /**
     * Test the /GET cache/clear route with no JWT-Token
     */
    describe('/GET cache/clear Error 400', () => {
        it('it should give an error because not Authorization Token was given', (done) => {
            chai.request(server)
                .get('/cache/clear')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.err.should.equal('JWT-Token Invalid');
                    done();
                });
        });
    });

    /**
     * Test the /GET cache/clear route with a right JWT-Token
     */
    describe('/GET cache/clear Success 200', () => {
        it('it should give an a success since the right Bearer Token was given', (done) => {
            // Do a Login
            chai.request(server)
                .post('/login')
                .send({ username: config.admin.username, password: config.admin.password })
                // .send({ 'username': 'admin', 'password': 'admin' })
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