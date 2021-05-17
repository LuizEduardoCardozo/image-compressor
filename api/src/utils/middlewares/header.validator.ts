import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import BadRequest from '../errors/badrequest';

export default function validator(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classDto: ClassConstructor<any>,
): RequestHandler {
  return async (req: Request, _res: Response, nxt: NextFunction) => {
    const classPayload = plainToClass(classDto, req.headers);
    const errors = await validate(classPayload);
    if (errors.length === 0) {
      nxt();
    } else {
      nxt(new BadRequest(errors));
    }
  };
}
