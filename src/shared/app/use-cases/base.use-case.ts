// src/shared/app/use-cases/base.use-case.ts
import { IUseCase } from '../../core/interfaces/use-case.interface';
import { Logger, InternalServerErrorException } from '@nestjs/common';

export abstract class BaseUseCase<I, O> implements IUseCase<I, O> {
    protected readonly logger = new Logger(this.constructor.name);

    // El método que los hijos implementarán con la lógica real
    protected abstract internalExecute(input: I): Promise<O>;

    // El método público que llama el controlador
    async execute(input: I): Promise<O> {
        try {
            this.logger.log(`Ejecutando caso de uso con: ${JSON.stringify(input)}`);
            return await this.internalExecute(input);
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any): never {
        this.logger.error(error);
        // Aquí puedes mapear errores de Dominio a errores de NestJS (HTTP)
        if (error.isDomainError) {
            throw error; // O un transformador de excepciones
        }
        throw new InternalServerErrorException('Error inesperado en el servidor');
    }
}