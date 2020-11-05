import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
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

  await app.listen(3000);
}

bootstrap();
