import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1609734045604 implements MigrationInterface {
    name = 'Initial1609734045604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "tokenVersion" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tokenVersion"`);
    }

}
