import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { Config } from './config/config.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [Config],
      useFactory(config: Config) {
        return {
          ...(config.db as TypeOrmModuleOptions),
          entities: ['dist/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
