import { Controller, Get, PathParams, Post } from '@tsed/common';

@Controller('/file')
export default class FileController {
  /*
    Uploads a new file to the server

    should send the file as multi-part form and the session
    in requisition header
  */

  @Post()
  create(): void {
    console.log('POST - olá, mundo');
  }

  /*
    Returns all compressed files of a session

    should send the session in requisition header
  */
  @Get('/:id')
  index(@PathParams('id') id: string): string {
    console.log('GET - olá, mundo');
    return id;
  }
}
