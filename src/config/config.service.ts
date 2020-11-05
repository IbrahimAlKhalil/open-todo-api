import { Injectable } from '@nestjs/common';

@Injectable()
export class Config {
  env = process.env.NODE_ENV;

  isDev(): boolean {
    return process.env.NODE_ENV === 'development';
  }
}