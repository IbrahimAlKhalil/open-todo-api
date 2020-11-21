import { BcryptModule } from '../bcrypt/bcrypt.module';
import { UserSubscriber } from './user.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BcryptModule,
  ],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserModule {
}
