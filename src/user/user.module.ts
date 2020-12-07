import { VerificationModule } from '../verification/verification.module';
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { UserSubscriber } from './user.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    VerificationModule,
    BcryptModule,
  ],
  providers: [UserService, UserSubscriber, UserResolver],
  exports: [UserService],
})
export class UserModule {
}
