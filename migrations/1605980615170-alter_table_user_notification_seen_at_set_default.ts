import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableUserNotificationSeenAtSetDefault1605980615170 implements MigrationInterface {
    name = 'alterTableUserNotificationSeenAtSetDefault1605980615170';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "notification_seen_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "notification_seen_at" DROP DEFAULT`);
    }

}
