import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeYearPublishedToDate1747746704073 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" ADD COLUMN "yearPublished_temp" DATE`);
    await queryRunner.query(`
      UPDATE "book" SET "yearPublished_temp" = TO_DATE("yearPublished"::text || '-01-01', 'YYYY-MM-DD')
    `);
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "yearPublished"`);
    await queryRunner.query(`ALTER TABLE "book" RENAME COLUMN "yearPublished_temp" TO "yearPublished"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" ADD COLUMN "yearPublished_temp" INTEGER`);
    await queryRunner.query(`UPDATE "book" SET "yearPublished_temp" = EXTRACT(YEAR FROM "yearPublished")::INTEGER`);
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "yearPublished"`);
    await queryRunner.query(`ALTER TABLE "book" RENAME COLUMN "yearPublished_temp" TO "yearPublished"`);
  }
}