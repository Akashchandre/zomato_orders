import {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from './server.js';

chai.use(chaiHttp);


describe('Orders API', () => {
  it('should fetch all orders with default limit and offset', async () => {
    const res = await chai.request(app).get('/api/orders');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should fetch paginated orders', async () => {
    const res = await chai.request(app).get('/api/orders?limit=2&offset=1');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array').that.has.lengthOf(2);
  });

  it('should return a 400 error for invalid query parameters', async () => {
    const res = await chai.request(app).get('/api/orders?limit=invalid&offset=-1');
    expect(res).to.have.status(400);
    expect(res.body.errors).to.be.an('array');
  });
});
