import { AppModule } from './app.module';
import { BootNest } from '@src/shared/infrastructure/adapters/nest/base/nest-boot';


async function bootstrap() {
  //Iniciando Framework Nestjs
  await BootNest(AppModule);
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});


