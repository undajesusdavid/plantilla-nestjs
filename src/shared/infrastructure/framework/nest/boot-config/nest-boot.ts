import { Type, Logger} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { GlobalExceptionFilter } from './global-filter/global-exception.filter';
import { GlobalPipe } from './global-pipe/global-pipe';

export async function BootNest(rootModule: Type<any>) {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(rootModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(GlobalPipe);
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  logger.log(
    `El servidor API esta corriendo en la siguiente URL: http://localhost:${port}/api/v1`,
  );
}


