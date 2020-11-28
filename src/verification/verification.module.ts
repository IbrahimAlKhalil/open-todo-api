import { VerificationService } from './verification.service';
import { JwtModule } from '../jwt/jwt.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [JwtModule],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {
}
