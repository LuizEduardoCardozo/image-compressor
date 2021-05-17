import { Length } from 'class-validator';
import express, { json } from 'express';
import request from 'supertest';
import headerValidator from './header.validator';

describe('header middleware validator', () => {
  test('should throw a error if payload is invalid', async () => {
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
    const reponse = await request(app)
      .post('/')
      .set('Authorization', 'abc')
      .send();
    expect(reponse.statusCode).toBe(400);
  });
});
