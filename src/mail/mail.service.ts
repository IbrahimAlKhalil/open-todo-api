import { Inject, Injectable } from '@nestjs/common';
import { MAIL_TRANSPORT } from './constants';
import { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  constructor(@Inject(MAIL_TRANSPORT) private transport: Mail) {
  }

  send(options: MailOptions): Promise<SentMessageInfo> {
    return this.transport.sendMail(options);
  }
}

export interface MailOptions {
  subject: string;
  html: string;
  from: string;
  to: string;
}
