const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const should = chai.should();
const mongoose = require('mongoose');
const { post } = require('../../models');

// setup chai to use http assertion
chai.use(chaiHttp);

// create our testPost
const testPost = {
  content: 'chaiTestPost',
  author: mongoose.Types.ObjectId(),
  thread: mongoose.Types.ObjectId()
};

// start our tests
describe('Posts', () => {

  // delete test posts after testing completed
  after(async () => {
    await post.deleteMany({ content: 'chaiTestPost' })
  })

  // get all test
  it('should return json for request at /posts GET', async () => {
    const res = await chai.request(server).get(`/posts`);
    res.should.have.status(200);
    res.should.be.json;
  });

  // get one test
  it('should return json for request at /posts?_id= GET', async () => {
    const newPost = await post.create(testPost);
    const res = await chai.request(server).get(`/posts?_id=${newPost._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

  // create one test
  it('should return json for request at /posts?_id= CREATE', async () => {
    const res = await chai.request(server).post(`/posts`).send(testPost);
    res.should.have.status(200);
    res.should.be.json;
  });

  // update one test
  it('should return json for request at /posts?_id= UPDATE', async () => {
    const newPost = await post.create(testPost);
    const updates = {
      removed: true
    };
    const res = await chai.request(server).put(`/posts?_id=${newPost._id}`).send(updates);
    res.should.have.status(200);
    res.should.be.json;
    res.body.removed.should.equal(true);
  });

  // delete one test
  it('should return json for request at /posts?_id= DELETE', async () => {
    const newPost = await post.create(testPost);
    const res = await chai.request(server).delete(`/posts?_id=${newPost._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

});
