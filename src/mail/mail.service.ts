import { Inject, Injectable } from '@nestjs/common';
import { MAIL_TRANSPORT } from '../constants';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  constructor(@Inject(MAIL_TRANSPORT) private transport: Mail) {
  }
}
