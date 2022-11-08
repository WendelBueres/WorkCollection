import { MigrationInterface, QueryRunner } from "typeorm";

export class onDeleteTechs1667934910124 implements MigrationInterface {
    name = 'onDeleteTechs1667934910124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "techs" DROP CONSTRAINT "FK_94ff512dcbfbcff5143fe348333"`);
        await queryRunner.query(`ALTER TABLE "techs" ADD CONSTRAINT "FK_94ff512dcbfbcff5143fe348333" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "techs" DROP CONSTRAINT "FK_94ff512dcbfbcff5143fe348333"`);
        await queryRunner.query(`ALTER TABLE "techs" ADD CONSTRAINT "FK_94ff512dcbfbcff5143fe348333" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
