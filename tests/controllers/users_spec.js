const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const should = chai.should();
const mongoose = require('mongoose');
const { user } = require('../../models');

// setup chai to use http assertion
chai.use(chaiHttp);

// create our testUser
const testUser = {
  firstname: 'test',
  lastname: 'test',
  username: 'testuser',
  password: 'test111',
  email: 'test@test.com',
  role: 1,
  accountstatus: 'active',
  statusreason: 'test',
  statusexpire: '10/30/2018'
};

// start our tests
describe('Users', () => {

  // delete test users after testing completed
  afterEach(async () => {
    await user.deleteMany({ username: 'testuser' })
  })

  // get all test
  it('should return json for request at /users GET', async () => {
    const res = await chai.request(server).get(`/users`);
    res.should.have.status(200);
    res.should.be.json;
  });

  // get one test
  it('should return json for request at /users?_id= GET', async () => {
    const newUser = await user.create(testUser);
    const res = await chai.request(server).get(`/users?_id=${newUser._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

  // create one test
  it('should return json for request at /users?_id= POST', async () => {
    const res = await chai.request(server).post(`/users`).send(testUser);
    res.should.have.status(200);
    res.should.be.json;
  });

  // update one test
  it('should return json for request at /users?_id= PUT', async () => {
    const newUser = await user.create(testUser);
    const updates = {
      role: 2
    };
    const res = await chai.request(server).put(`/users?_id=${newUser._id}`).send(updates);
    res.should.have.status(200);
    res.should.be.json;
    res.body.role.should.equal(2);
  });

  // delete one test
  it('should return json for request at /users?_id= DELETE', async () => {
    const newUser = await user.create(testUser);
    const res = await chai.request(server).delete(`/users?_id=${newUser._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

});
