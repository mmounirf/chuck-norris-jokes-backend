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

describe('Login', () => {
    /**
     * Test the /POST login with no credentials
     */
    describe('/POST login', () => {
        it('it should give an error because no Authorization Token was given', (done) => {
            chai.request(server)
                .post('/login')
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.be.json;
                    done();
                });
        });
    });

    /**
     * Test the /POST login with right credentials
     */
    describe('/POST login', () => {
        it('it should give a success since the right credentials were provided given', (done) => {
            // Do a Login
            chai.request(server)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({ username: config.admin.username, password: config.admin.password })
                // .send({ 'username': 'admin', 'password': 'admin' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
        });
    });
});