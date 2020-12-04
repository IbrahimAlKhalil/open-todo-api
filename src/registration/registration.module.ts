import { RegistrationResolver } from './registration.resolver';
import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    UserModule,
  ],
  providers: [RegistrationResolver],
})
export class RegistrationModule {
}
