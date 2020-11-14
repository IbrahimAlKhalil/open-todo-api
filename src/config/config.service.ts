import { Injectable } from '@nestjs/common';
import mail from './data/mail';
import db from './data/db';

@Injectable()
export class Config {
  // Configuration data goes here
  db = db();
  mail = mail();
}