import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../../app.module';
import { PermissionRepositoryToken } from '../../app/contracts/PermissionRepository';

async function seed() {
    const appContext = await NestFactory.createApplicationContext(AppModule);
    const seeder = appContext.get(PermissionRepositoryToken);
    await seeder.seedPermissions();
    await appContext.close();
}

seed()
    .then(() => console.log('Seeding completed!'))
    .catch((error) => console.error('Seeding failed:', error));
