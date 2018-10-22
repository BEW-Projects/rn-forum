const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const should = chai.should();
const mongoose = require('mongoose');
const { thread } = require('../../models');

// setup chai to use http assertion
chai.use(chaiHttp);

// create our testThread
const testThread = {
  name: 'testname',
  slug: 'www.test.io',
  postCount: 2,
  author: mongoose.Types.ObjectId(),
  locked: true
};

// start our tests
describe('Threads', () => {

  // delete test threads after testing completed
  after(async () => {
    await thread.deleteMany({ name: 'testname' })
  })

  // get all test
  it('should return json for request at /threads GET', async () => {
    const res = await chai.request(server).get(`/threads`);
    res.should.have.status(200);
    res.should.be.json;
  });

  // get one test
  it('should return json for request at /threads?_id= GET', async () => {
    const newThread = await thread.create(testThread);
    const res = await chai.request(server).get(`/threads?_id=${newThread._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

  // create one test
  it('should return json for request at /threads?_id= CREATE', async () => {
    const res = await chai.request(server).post(`/threads`).send(testThread);
    res.should.have.status(200);
    res.should.be.json;
  });

  // update one test
  it('should return json for request at /threads?_id= UPDATE', async () => {
    const newThread = await thread.create(testThread);
    const updates = {
      locked: false
    };
    const res = await chai.request(server).put(`/threads?_id=${newThread._id}`).send(updates);
    res.should.have.status(200);
    res.should.be.json;
  });

  // delete one test
  it('should return json for request at /threads?_id= DELETE', async () => {
    const newThread = await thread.create(testThread);
    const res = await chai.request(server).delete(`/threads?_id=${newThread._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

});
