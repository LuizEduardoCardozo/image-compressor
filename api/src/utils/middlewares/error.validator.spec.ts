import { Length } from 'class-validator';
import express, { json } from 'express';
import request from 'supertest';
import headerValidator from './header.validator';
import errorHandler from './error.validator';

describe('header middleware validator', () => {
  test('should return the correct response for bad request', async () => {
    class headerDTO {
      @Length(5, 10)
      Authorization: string;
      constructor(Authorization: string) {
        this.Authorization = Authorization;
      }
    }
    const app = express();
    app.use(json());
    app.post('/', await headerValidator(headerDTO), (req, res) => {
      return res.send({ msg: 'ok' });
    });
    app.use(errorHandler);
    const response = await request(app)
      .post('/')
      .set('Authorization', 'abc')
      .send()
      .expect(400);
    expect(response.body).toStrictEqual([
      { field: 'Authorization', errors: ['isLength'] },
    ]);
  });
  test('should return 500 for a unknown error', async () => {
    const app = express();
    app.use(json());
    app.post('/', () => {
      throw new Error();
    });
    app.use(errorHandler);
    await request(app).post('/').send().expect(500);
  });
});
