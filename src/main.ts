import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { GlobalExceptionFilter } from './shared/infrastructure/filters/global-exception.filter'; // Asegúrate de que la ruta coincida

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. Filtro de Excepciones Global
  // Este es el "receptor" de los errores que lanza el BaseUseCase
  app.useGlobalFilters(new GlobalExceptionFilter());

  // 2. Pipes de Validación y Transformación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
      // Opcional: Esto ayuda a que los errores de validación de NestJS 
      // mantengan un formato coherente con tus otros errores
      errorHttpStatusCode: 422,
    }),
  );

  // 3. Configuración de Red
  app.enableCors();

  // Opcional: Prefijo global para versionar tu API
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`🚀 Boilerplate API is running on: http://localhost:${port}/api/v1`);
}

bootstrap();