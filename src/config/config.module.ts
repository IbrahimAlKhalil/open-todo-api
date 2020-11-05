import { DynamicModule, Global, Module } from '@nestjs/common';
import { Config } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  static async forRoot(): Promise<DynamicModule> {
    // Load environment variables from .env file in development environment
    if (process.env.NODE_ENV !== 'production') {
      (await import('dotenv')).config();
    }

    return {
      module: ConfigModule,
      providers: [
        Config,
      ],
      exports: [Config],
    };
  }
}