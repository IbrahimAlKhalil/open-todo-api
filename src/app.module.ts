import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from './config/config.module';
import { Config } from './config/config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MailModule } from './mail/mail.module';
import { Module } from '@nestjs/common';

const isDevEnv = process.env.NODE_ENV === 'development';

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
          synchronize: isDevEnv,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
    }),
    GraphQLModule.forRoot({
      debug: isDevEnv,
      playground: isDevEnv,
      autoSchemaFile: true,
      introspection: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
    }),
    MailModule,
  ],
  providers: [],
})
export class AppModule {
}
