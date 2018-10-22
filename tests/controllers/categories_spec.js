const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const should = chai.should();
const mongoose = require('mongoose');
const { category } = require('../../models');

// setup chai to use http assertion
chai.use(chaiHttp);

// create our testCategory
const testCategory = {
  name: 'chaiTestCategory',
  author: mongoose.Types.ObjectId(),
  color: 'blue'
};

// start our tests
describe('Categories', () => {

  // delete test categories after testing completed
  after(async () => {
    await category.deleteMany({ name: 'chaiTestCategory' })
  })

  // get all test
  it('should return json for request at /categories GET', async () => {
    const res = await chai.request(server).get(`/categories`);
    res.should.have.status(200);
    res.should.be.json;
  });

  // get one test
  it('should return json for request at /categories?_id= GET', async () => {
    const newCategory = await category.create(testCategory);
    const res = await chai.request(server).get(`/categories?_id=${newCategory._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

  // create one test
  it('should return json for request at /categories?_id= POST', async () => {
    const res = await chai.request(server).post(`/categories`).send(testCategory);
    res.should.have.status(200);
    res.should.be.json;
  });

  // update one test
  it('should return json for request at /categories?_id= UPDATE', async () => {
    const newCategory = await category.create(testCategory);
    const updates = {
      weight: 3
    };
    const res = await chai.request(server).put(`/categories?_id=${newCategory._id}`).send(updates);
    res.should.have.status(200);
    res.should.be.json;
    res.body.weight.should.equal(3);
  });

  // delete one test
  it('should return json for request at /categories?_id= DELETE', async () => {
    const newCategory = await category.create(testCategory);
    const res = await chai.request(server).delete(`/categories?_id=${newCategory._id}`);
    res.should.have.status(200);
    res.should.be.json;
  });

});
