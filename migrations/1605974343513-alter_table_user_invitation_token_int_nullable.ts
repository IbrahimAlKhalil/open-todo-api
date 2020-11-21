import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableUserInvitationTokenIntNullable1605974343513 implements MigrationInterface {
    name = 'alterTableUserInvitationTokenIntNullable1605974343513';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "invitation_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "invitation_token" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "invitation_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "invitation_token" character varying NOT NULL`);
    }

}
