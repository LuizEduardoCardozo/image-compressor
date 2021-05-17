import { IsNumber, IsString, validate } from 'class-validator';
import BadRequest from './badrequest';

describe('bad request error', () => {
  class DTO {
    @IsString()
    public name: string;
    @IsNumber()
    public age: string;
    constructor(name: string, age: string) {
      this.name = name;
      this.age = age;
    }
  }
  let user: DTO;
  beforeAll(() => {
    user = new DTO('eduardo', '26');
  });
  test('should parse the error array', async () => {
    const errors = await validate(user);
    const badRequestError = new BadRequest(errors);
    expect(badRequestError.getMessage()).toStrictEqual([
      {
        field: 'age',
        errors: ['isNumber'],
      },
    ]);
  });
});
