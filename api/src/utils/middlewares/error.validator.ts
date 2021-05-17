import { Request, Response, NextFunction } from 'express';
import BadRequest from '../errors/badrequest';

export default (
  err: Error,
  req: Request,
  res: Response,
  _nxt: NextFunction,
): void => {
  if (err && err instanceof BadRequest) {
    res.status(err.getStatusCode()).send(err.getMessage());
  } else if (err) {
    res.status(500).send(err.message);
  }
  _nxt();
};
