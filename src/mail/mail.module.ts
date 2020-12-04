import { Config } from '../config/config.service';
import { MAIL_TRANSPORT } from './constants';
import { createTransport } from 'nodemailer';
import { MailService } from './mail.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: MAIL_TRANSPORT,
      useFactory(config: Config) {
        return createTransport({
          host: config.mail.host,
          port: config.mail.port,
          secure: config.mail.secure,
          auth: {
            user: config.mail.user,
            pass: config.mail.password,
          },
        });
      },
      inject: [Config],
    },
    MailService,
  ],
  exports: [MailService],
})
export class MailModule {
}
