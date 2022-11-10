import { MigrationInterface, QueryRunner } from "typeorm";

export class createOnUpdate1668035462231 implements MigrationInterface {
    name = 'createOnUpdate1668035462231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projectTechs" DROP CONSTRAINT "FK_97f7d5f29966840807c25af5c51"`);
        await queryRunner.query(`ALTER TABLE "projectTechs" ADD CONSTRAINT "FK_97f7d5f29966840807c25af5c51" FOREIGN KEY ("techsId") REFERENCES "techs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projectTechs" DROP CONSTRAINT "FK_97f7d5f29966840807c25af5c51"`);
        await queryRunner.query(`ALTER TABLE "projectTechs" ADD CONSTRAINT "FK_97f7d5f29966840807c25af5c51" FOREIGN KEY ("techsId") REFERENCES "techs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
