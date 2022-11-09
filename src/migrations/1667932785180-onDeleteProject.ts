import { MigrationInterface, QueryRunner } from "typeorm";

export class onDeleteProject1667932785180 implements MigrationInterface {
    name = 'onDeleteProject1667932785180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projectTechs" DROP CONSTRAINT "FK_97f7d5f29966840807c25af5c51"`);
        await queryRunner.query(`ALTER TABLE "techs" DROP CONSTRAINT "FK_94ff512dcbfbcff5143fe348333"`);
        await queryRunner.query(`ALTER TABLE "techs" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "techs" ADD CONSTRAINT "FK_94ff512dcbfbcff5143fe348333" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projectTechs" ADD CONSTRAINT "FK_97f7d5f29966840807c25af5c51" FOREIGN KEY ("techsId") REFERENCES "techs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projectTechs" DROP CONSTRAINT "FK_97f7d5f29966840807c25af5c51"`);
        await queryRunner.query(`ALTER TABLE "techs" DROP CONSTRAINT "FK_94ff512dcbfbcff5143fe348333"`);
        await queryRunner.query(`ALTER TABLE "techs" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "techs" ADD CONSTRAINT "FK_94ff512dcbfbcff5143fe348333" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projectTechs" ADD CONSTRAINT "FK_97f7d5f29966840807c25af5c51" FOREIGN KEY ("techsId") REFERENCES "techs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
