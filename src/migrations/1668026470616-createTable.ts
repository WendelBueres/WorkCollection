import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1668026470616 implements MigrationInterface {
    name = 'createTable1668026470616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "techs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_8ab2729ee26c5893090fb7b1b2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projectTechs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "techsId" uuid NOT NULL, "projectsId" uuid NOT NULL, CONSTRAINT "PK_4f78aa53e709cb9f7557370a928" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" character varying NOT NULL, "image" text, "link" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(120) NOT NULL, "image" character varying, "bio" character varying NOT NULL, "contactId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_4b815f82ec3577420df61b7b6c" UNIQUE ("contactId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "linkedin" text, "github" text, "phone" text, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "techs" ADD CONSTRAINT "FK_94ff512dcbfbcff5143fe348333" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projectTechs" ADD CONSTRAINT "FK_97f7d5f29966840807c25af5c51" FOREIGN KEY ("techsId") REFERENCES "techs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projectTechs" ADD CONSTRAINT "FK_b1ae4d9a1b7a5bab84b33002e59" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_4b815f82ec3577420df61b7b6c5" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4b815f82ec3577420df61b7b6c5"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`ALTER TABLE "projectTechs" DROP CONSTRAINT "FK_b1ae4d9a1b7a5bab84b33002e59"`);
        await queryRunner.query(`ALTER TABLE "projectTechs" DROP CONSTRAINT "FK_97f7d5f29966840807c25af5c51"`);
        await queryRunner.query(`ALTER TABLE "techs" DROP CONSTRAINT "FK_94ff512dcbfbcff5143fe348333"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "projectTechs"`);
        await queryRunner.query(`DROP TABLE "techs"`);
    }

}
