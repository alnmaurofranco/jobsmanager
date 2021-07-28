import request from 'supertest';
import server from '../../../src/server';

describe('JOB | Jobs', () => {
  it('should be not authorized find all Jobs GET /api/job', async () => {
    const { status } = await request(server).get('/api/job');

    expect(status).toBe(200);
  });
});
