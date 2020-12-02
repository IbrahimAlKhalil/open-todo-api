import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableUserAddVerified1606694759527 implements MigrationInterface {
    name = 'alterTableUserAddVerified1606694759527';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "verified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verified"`);
    }

}
