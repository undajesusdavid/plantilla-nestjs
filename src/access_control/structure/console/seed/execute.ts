import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

async function seed() {
    const appContext = await NestFactory.createApplicationContext(AppModule);
    const seedAccessControl = appContext.get('seedAccessControl');
    await seedAccessControl();
    await appContext.close();
}

seed()
    .then(() => console.log('Seeding completed!'))
    .catch((error) => console.error('Seeding failed:', error));