import { NestFactory } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { AppModule } from 'src/app.module';
import { ErrorConsole } from 'src/shared/app/errors/ErrorConsole';

async function executeSeedUsers() {
    const appContext = await NestFactory.createApplicationContext(AppModule);
    const sequelize = appContext.get(Sequelize);
    if (!sequelize) {
        throw new Error("No se pudo obtener la instancia de Sequelize");
    }
    const transaction = await sequelize.transaction();

    const seedUsers = appContext.get('seedUsers');
    try {
        await seedUsers(transaction);
        transaction.commit();
        console.log("✅ Users seeding completed!");
    } catch (error) {
        await transaction.rollback();
        throw new ErrorConsole(
            "Error al intentar ejecutar los seeders de users",
            "USERS_SEEDER_FAILED",
            { originalError: error, class: "UsersSeeder", method: "seedUsers" }
        );
    }
    await appContext.close();
}

executeSeedUsers()
    .then(() => console.log('Seeding completed!'))
    .catch((error) => console.error('Seeding failed:', error));