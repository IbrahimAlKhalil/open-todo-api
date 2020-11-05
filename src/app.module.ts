import { ConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
