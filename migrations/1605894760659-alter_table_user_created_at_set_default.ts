import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableUserCreatedAtSetDefault1605894760659 implements MigrationInterface {
    name = 'alterTableUserCreatedAtSetDefault1605894760659';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user"
            ALTER COLUMN "created_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"
            ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
    }

}
