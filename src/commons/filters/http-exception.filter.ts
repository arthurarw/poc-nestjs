import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    if (exception instanceof InternalServerErrorException) {
      return response.status(500).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Error',
        error: exception.name,
      });
    }

    if (
      exception.name === 'QueryFailedError' ||
      exception.name === 'TypeError'
    ) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
        error: exception.name,
      });
    }

    return response.status(exception.getStatus()).send(exception);
  }
}
