const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server.js');
const should = chai.should();

// setup chai to use http assertion
chai.use(chaiHttp);

// start our tests
describe('API', () => {

  // get index test
  it('should return json for request at / GET', async () => {
    const res = await chai.request(server).get(`/`);
    res.should.have.status(200);
    res.should.be.json;
  });

  // notFoundHandler test
  it('should return json error for invalid GET request', async () => {
    const res = await chai.request(server).get(`/invalidpath`);
    res.should.have.status(404);
    res.should.be.json;
  });

});
