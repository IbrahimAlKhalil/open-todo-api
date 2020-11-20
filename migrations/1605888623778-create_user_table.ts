import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1605888623778 implements MigrationInterface {
  name = 'createUserTable1605888623778';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "user_gender_enum" AS ENUM('FEMALE', 'OTHER', 'MALE')`);
    await queryRunner.query(`CREATE TABLE "user"
                             (
                                 "id"                   SERIAL                   NOT NULL,
                                 "first_name"           character varying        NOT NULL,
                                 "last_name"            character varying        NOT NULL,
                                 "gender"               "user_gender_enum"       NOT NULL,
                                 "username"             character varying        NOT NULL,
                                 "password"             character varying        NOT NULL,
                                 "invitation_token"     character varying        NOT NULL,
                                 "notification_seen_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                                 "created_at"           TIMESTAMP WITH TIME ZONE NOT NULL,
                                 CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                                 CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "user_gender_enum"`);
  }

}
