import { Injectable } from '@nestjs/common';
import db from './data/db';

@Injectable()
export class Config {
  // Configuration data goes here
  db = db();
}