import { Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './context/app.module';
import { GlobalExceptionFilter } from '@shared/infrastructure/adapters/nest/filters/global-exception.filter';

export async function BootNest() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
      errorHttpStatusCode: 422,
      exceptionFactory: (validationErrors) => {
        const errorsObject = validationErrors.reduce((acc, error) => {
          const constraints = Object.values(error.constraints || {});
          acc[error.property] = constraints.length > 0 ? constraints[0] : 'Dato inválido';
          return acc;
        }, {});
        return new UnprocessableEntityException([errorsObject]);
      },

    }),
  );
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(
    `🚀 Boilerplate API is running on: http://localhost:${port}/api/v1`,
  );
}


