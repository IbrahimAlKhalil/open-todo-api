import { VerificationService } from './verification.service';
import { Config } from '../config/config.service';
import { MailModule } from '../mail/mail.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory(config: Config) {
        const options = {
          audience: config.verification.tokenAudience,
          subject: config.verification.tokenSubject,
        };

        return {
          secret: config.app.secret,
          signOptions: {
            ...options,
            expiresIn: config.verification.tokenLifetime,
          },
          verifyOptions: options,
        };
      },
      inject: [Config],
    }),
    MailModule,
  ],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {
}
