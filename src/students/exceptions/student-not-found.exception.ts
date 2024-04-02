import { HttpException, HttpStatus } from '@nestjs/common';

export class StudentNotFoundException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(message || 'Student not found', status || HttpStatus.NOT_FOUND);
  }
}
