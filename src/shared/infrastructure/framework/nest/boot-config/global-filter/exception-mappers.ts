import { HttpStatus } from '@nestjs/common';
import { AppError } from '@shared/core/errors/app-error';

export interface HandledError {
    status: number;
    code: string;
    message: string;
    details?: any;
}

export const ExceptionMappers = {
    handleAppError(exception: AppError): HandledError {
        return {
            status: HttpStatus.BAD_REQUEST,
            code: exception.code,
            message: exception.message,
        };
    },

    handleDuplicateEntry(): HandledError {
        return {
            status: HttpStatus.CONFLICT,
            code: 'DB_UNIQUE_CONSTRAINT',
            message: 'Conflicto de duplicidad en la base de datos',
        };
    },

    handleForeignKeyError(): HandledError {
        return {
            status: HttpStatus.BAD_REQUEST,
            code: 'DB_FOREIGN_KEY_ERROR',
            message: 'Error de relación: Referencia no encontrada',
        };
    },

    handleNestHttpError(exception: any): HandledError {
        const status = exception.getStatus();
        const res = exception.getResponse() as any;

        if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
            return {
                status,
                code: 'VALIDATION_ERROR',
                message: 'Los datos enviados no pasaron las validaciones',
                details: Array.isArray(res.message) ? res.message[0] : res.message,
            };
        }

        return {
            status,
            code: res.error ? res.error.toUpperCase().replace(/\s+/g, '_') : 'HTTP_ERROR',
            message: res.message || res,
        };
    },

    handleDefault(): HandledError {
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal Server Error',
        };
    }
};