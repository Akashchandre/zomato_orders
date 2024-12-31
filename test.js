import request from 'supertest';
import app from './server.js'; 

describe('Orders API', () => {
  it('should fetch all orders with default limit and offset', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array); 
  });

  it('should fetch paginated orders', async () => {
    const res = await request(app).get('/api/orders?limit=2&offset=1');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2); 
  });

  
});
