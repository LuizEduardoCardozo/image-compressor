import 'reflect-metadata';
import {
  Controller,
  Get,
  Post,
  Response as ResponseP,
  Request as RequestP,
} from '@decorators/express';
import { Response, Request } from 'express';

@Controller('/')
export default class FileController {
  /*
    Uploads a new file to the server

    should send the file as multi-part form and the session
    in requisition header
  */
  @Post('/files/')
  create(@ResponseP() res: Response, @RequestP() req: Request): void {
    res.send({ msg: 'POST', body: req.body });
  }

  /*
    Returns all compressed files of a session

    should send the session in requisition header
  */
  @Get('/files')
  index(@ResponseP() res: Response): void {
    res.send({ msg: 'GET' });
  }
}
