import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./context/app.module";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";

export async function BootNestJs() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new GlobalExceptionFilter());
    
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