import { Injectable } from '@nestjs/common';
import db from './config/db';

@Injectable()
export class Config {
  env = process.env.NODE_ENV;

  // Configuration data goes here
  db = db();

  isDev(): boolean {
    return process.env.NODE_ENV === 'development';
  }
}