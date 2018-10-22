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
  username: 'testuser',
  password: 'test111',
  email: 'test@test.com',
  role: 0
};

const testUser2 = {
  username: 'testuser2',
  password: 'test2222',
  email: 'test2@test.com',
  role: 0
};

const testUser3 = {
  username: 'testuser3',
  password: 'test3333',
  email: 'test3@test.com',
  role: 0
};

const testUser4 = {
  username: 'testuser4',
  password: 'test4444',
  email: 'test4@test.com',
  role: 0
};
// start our tests
describe('Users', () => {

  // delete test user after testing completed
  after(async () => {
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
  it('should return json for request at /users?_id= CREATE', async () => {
    const res = await
    chai.request(server).post(`/users`).send(testUser2);
    res.should.have.status(200);
    res.should.be.json;
  });

  // update one test
  it('should return json for request at /users?_id= UPDATE', async () => {
    const newUser = await user.create(testUser3);
    const updates = {
      removed: true
    };
    const res = await chai.request(server).put(`/users?_id=${newUser._id}`).send(updates);
    res.should.have.status(200);
    res.should.be.json;
  });

  // delete one test
  it('should return json for request at /users?_id= DELETE', async () => {
    const newUser = await user.create(testUser4);
    const res = await chai.request(server).delete(`/users?_id=${newUser._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

});
