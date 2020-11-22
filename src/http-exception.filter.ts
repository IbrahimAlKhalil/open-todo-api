import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthenticationError, UserInputError, ValidationError } from 'apollo-server-express';

@Catch(BadRequestException, UnauthorizedException, UnprocessableEntityException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    if (exception instanceof BadRequestException) {
      return new ValidationError(exception.message);
    }

    if (exception instanceof UnprocessableEntityException) {
      return new UserInputError(exception.message);
    }

    if (exception instanceof UnauthorizedException) {
      return new AuthenticationError('Unauthorized');
    }

    return exception;
  }
}