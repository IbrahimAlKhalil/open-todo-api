import verification from './data/verification';
import { Injectable } from '@nestjs/common';
import mail from './data/mail';
import app from './data/app';
import db from './data/db';

@Injectable()
export class Config {
  // Configuration data goes here
  verification = verification();
  mail = mail();
  app = app();
  db = db();
}