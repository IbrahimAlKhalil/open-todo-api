/* This configuration file is only for TypeORM CLI */

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { env } = process;

module.exports = {
  type: env.DB_TYPE,
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT, 10),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};