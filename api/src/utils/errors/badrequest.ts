import { ValidationError } from 'class-validator';
import AppError from './apperror';

interface ErrorResponse {
  field: string;
  errors: string[];
}

export default class BadRequest extends AppError {
  private readonly statusCode: number = 400;
  private errors: ErrorResponse[] = [];
  constructor(errors: ValidationError[]) {
    super();
    errors.forEach(error => {
      this.errors.push({
        field: error.property,
        errors: Object.keys(error.constraints ?? []),
      });
    });
  }

  getStatusCode(): number {
    return this.statusCode;
  }
  getMessage(): unknown {
    return this.errors;
  }
}
