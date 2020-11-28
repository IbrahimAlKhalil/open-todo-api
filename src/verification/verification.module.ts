import { VerificationService } from './verification.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {
}
