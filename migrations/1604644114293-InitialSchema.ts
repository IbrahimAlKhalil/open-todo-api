import { MigrationInterface, QueryRunner } from 'typeorm';
import { promises as fs } from 'fs';
import { join } from 'path';

export class InitialSchema1604644114293 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      await fs.readFile(join(__dirname, './initial-schema-up.sql'), { encoding: 'utf8' }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      await fs.readFile(join(__dirname, './initial-schema-down.sql'), { encoding: 'utf8' }),
    );
  }
}
