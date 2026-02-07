import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { AppModule } from 'src/app.module';

export class BuildSeeders {
    private appContext: Promise<INestApplicationContext>;
    private seeds: string[];

    constructor(seeds: string[]) {
        this.appContext = NestFactory.createApplicationContext(AppModule);
        this.seeds = seeds;
    }

    private async build() {
        const context = await this.appContext;
        const sequelize = context.get(Sequelize);
        if (!sequelize) {
            throw new Error("No se pudo obtener la instancia de Sequelize");
        }
        sequelize.options.logging = false;
        const transaction = await sequelize.transaction();
        const seeds = this.seeds.map((seed) => context.get(seed));
        return { transaction, seeds };
    }

    async execute() {
        const { transaction, seeds } = await this.build();
        try {
            for (const seed of seeds) {
                await seed(transaction);
            }
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

}