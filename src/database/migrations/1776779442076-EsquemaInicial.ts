import { MigrationInterface, QueryRunner } from "typeorm";

export class EsquemaInicial1776779442076 implements MigrationInterface {
    name = 'EsquemaInicial1776779442076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ac_permisos" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e419d38a9c935a79522599266c0" UNIQUE ("name"), CONSTRAINT "PK_1d93f64a266374dc2cf04fce9f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ac_roles" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c8687b023770efec7ce9cf792d2" UNIQUE ("name"), CONSTRAINT "PK_287101bf8d682c7e670542a5084" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_9f78cfde576fc28f279e2b7a9cb" UNIQUE ("username"), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ac_role_permissions" ("roleId" uuid NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_357eaff11a378ed7d360253cccc" PRIMARY KEY ("roleId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_10eb25bc28342a116d03e557f5" ON "ac_role_permissions" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7f70d470b547f75ab298d58598" ON "ac_role_permissions" ("permissionId") `);
        await queryRunner.query(`CREATE TABLE "user_roles" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_88481b0c4ed9ada47e9fdd67475" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_472b25323af01488f1f66a06b6" ON "user_roles" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_86033897c009fcca8b6505d6be" ON "user_roles" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "ac_role_permissions" ADD CONSTRAINT "FK_10eb25bc28342a116d03e557f5a" FOREIGN KEY ("roleId") REFERENCES "ac_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ac_role_permissions" ADD CONSTRAINT "FK_7f70d470b547f75ab298d585988" FOREIGN KEY ("permissionId") REFERENCES "ac_permisos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "ac_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`);
        await queryRunner.query(`ALTER TABLE "ac_role_permissions" DROP CONSTRAINT "FK_7f70d470b547f75ab298d585988"`);
        await queryRunner.query(`ALTER TABLE "ac_role_permissions" DROP CONSTRAINT "FK_10eb25bc28342a116d03e557f5a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86033897c009fcca8b6505d6be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_472b25323af01488f1f66a06b6"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f70d470b547f75ab298d58598"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10eb25bc28342a116d03e557f5"`);
        await queryRunner.query(`DROP TABLE "ac_role_permissions"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "ac_roles"`);
        await queryRunner.query(`DROP TABLE "ac_permisos"`);
    }

}


