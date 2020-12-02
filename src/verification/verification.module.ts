import { VerificationService } from './verification.service';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '../jwt/jwt.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [JwtModule, MailModule],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {
}
