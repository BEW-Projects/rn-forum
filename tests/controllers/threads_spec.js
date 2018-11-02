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
  name: 'chaiTestThread',
  slug: 'www.test.io',
  author: mongoose.Types.ObjectId(),
  category: mongoose.Types.ObjectId()
};

// start our tests
describe('Threads', () => {

  // delete test threads after testing completed
  after(async () => {
    await thread.deleteMany({ name: 'chaiTestThread' })
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
  it('should return json for request at /threads?_id= POST', async () => {
    const res = await chai.request(server).post(`/threads`).send(testThread);
    res.should.have.status(200);
    res.should.be.json;
  });

  // update one test
  it('should return json for request at /threads?_id= PUT', async () => {
    const newThread = await thread.create(testThread);
    const updates = {
      locked: true
    };
    const res = await chai.request(server).put(`/threads?_id=${newThread._id}`).send(updates);
    res.should.have.status(200);
    res.should.be.json;
    res.body.locked.should.equal(true);
  });

  // delete one test
  it('should return json for request at /threads?_id= DELETE', async () => {
    const newThread = await thread.create(testThread);
    const res = await chai.request(server).delete(`/threads?_id=${newThread._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

});
