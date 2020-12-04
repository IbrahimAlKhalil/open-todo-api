import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HttpExceptionFilter } from './http-exception.filter';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'production') {
    const options: CorsOptions = {
      methods: ['GET', 'POST', 'OPTIONS', 'HEAD'],
    };

    if (process.env.CORS_ORIGIN) {
      options.origin = process.env.CORS_ORIGIN
        .split(',')
        .map(origin => origin.trim());
    }

    app.enableCors(options);
    app.use(helmet());
  }

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV === 'production',
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
