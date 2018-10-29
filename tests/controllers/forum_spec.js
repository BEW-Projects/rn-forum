const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const should = chai.should();
const mongoose = require('mongoose');
const { forum } = require('../../models');

// setup chai to use http assertion
chai.use(chaiHttp);

// create our testForum
const testForum = {
  title: 'testForum',
  subtitle: 'this is a test',
  category: mongoose.Types.ObjectId(),
  postCount: 32
};

// start our tests
describe('Forums', () => {

  // delete test forums after testing completed
  after(async () => {
    await forum.deleteMany({ title: 'testForum' })
  })

  // get all test
  it('should return json for request at /forums GET', async () => {
    const res = await chai.request(server).get(`/forums`);
    res.should.have.status(200);
    res.should.be.json;
  });

  // get one test
  it('should return json for request at /forums?_id= GET', async () => {
    const newForum = await forum.create(testForum);
    const res = await chai.request(server).get(`/forums?_id=${newForum._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

  // create one test
  it('should return json for request at /forums?_id= CREATE', async () => {
    const res = await chai.request(server).post(`/forums`).send(testForum);
    res.should.have.status(200);
    res.should.be.json;
  });

  // // update one test
  // it('should return json for request at /forums?_id= UPDATE', async () => {
  //   const newForum = await forum.create(testForum);
  //   const updates = {
  //     title: 'testForums'
  //   };
  //   const res = await chai.request(server).put(`/forums?_id=${newForum._id}`).send(updates);
  //   res.should.have.status(200);
  //   res.should.be.json;
  //   res.body.removed.should.equal(true);
  // });

  // delete one test
  it('should return json for request at /forums?_id= DELETE', async () => {
    const newForum = await forum.create(testForum);
    const res = await chai.request(server).delete(`/forums?_id=${newForum._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

});
