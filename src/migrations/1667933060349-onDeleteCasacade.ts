import { MigrationInterface, QueryRunner } from "typeorm";

export class onDeleteCasacade1667933060349 implements MigrationInterface {
    name = 'onDeleteCasacade1667933060349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projectTechs" DROP CONSTRAINT "FK_b1ae4d9a1b7a5bab84b33002e59"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`ALTER TABLE "projectTechs" ADD CONSTRAINT "FK_b1ae4d9a1b7a5bab84b33002e59" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`ALTER TABLE "projectTechs" DROP CONSTRAINT "FK_b1ae4d9a1b7a5bab84b33002e59"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projectTechs" ADD CONSTRAINT "FK_b1ae4d9a1b7a5bab84b33002e59" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
