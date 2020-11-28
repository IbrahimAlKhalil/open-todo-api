import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { Config } from '../config/config.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      useFactory: (config: Config) => ({
        secret: config.app.secret,
      }),
      inject: [Config],
    }),
  ],
  exports: [JwtModule],
})
export class JwtModule {
}
